-- =============================================================================
-- Per-IP submission throttle (migration 0005)
-- =============================================================================
-- A global, per-IP rate limit for the public forms, layered on top of the
-- existing per-EMAIL throttle (enforce_contact_rules) so a bot can't bypass the
-- limit just by rotating the email field. Enforced by the `submit` Edge Function
-- via register_ip_hit(), called with the service role.
--
-- Storage is a single fixed-window counter per (ip, kind). It is not security-
-- critical state (worst case: a request slips through), so the table carries no
-- RLS policies — only the service role / SECURITY DEFINER function touches it.
-- =============================================================================

create table if not exists public.ip_throttle (
  ip           text        not null,
  kind         text        not null,          -- form type: 'contact' | 'testimonial'
  window_start timestamptz not null default now(),
  hits         integer     not null default 0,
  primary key (ip, kind)
);

-- Locked down: never reachable from the browser (anon / authenticated). RLS is
-- enabled with no policies, so only the service role bypasses it.
alter table public.ip_throttle enable row level security;
revoke all on public.ip_throttle from anon, authenticated;

-- A best-effort sweep of stale rows; the function also self-heals expired
-- windows on write, so this is only housekeeping for IPs that never return.
create index if not exists idx_ip_throttle_window on public.ip_throttle (window_start);

-- register_ip_hit: record one hit and report whether the caller is still under
-- the limit. Fixed window: the first hit (or the first after the window lapses)
-- resets window_start; returns true while hits <= p_max.
create or replace function public.register_ip_hit(
  p_ip     text,
  p_kind   text,
  p_max    integer,
  p_window interval
) returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_hits integer;
begin
  if p_ip is null or p_ip = '' then
    return true;  -- caller not identifiable — don't block
  end if;

  insert into public.ip_throttle as t (ip, kind, window_start, hits)
  values (p_ip, p_kind, now(), 1)
  on conflict (ip, kind) do update
    set hits = case when t.window_start < now() - p_window then 1
                    else t.hits + 1 end,
        window_start = case when t.window_start < now() - p_window then now()
                            else t.window_start end
  returning t.hits into v_hits;

  return v_hits <= p_max;
end;
$$;

-- Only the Edge Function (service role) may call it; never the public API.
revoke all on function public.register_ip_hit(text, text, integer, interval) from public;
grant execute on function public.register_ip_hit(text, text, integer, interval) to service_role;
