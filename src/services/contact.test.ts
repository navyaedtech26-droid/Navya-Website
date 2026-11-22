import { describe, it, expect, beforeEach, vi } from "vitest";
import { submitContact } from "@/services/contact";

const h = vi.hoisted(() => {
  const state = {
    configured: true,
    insertResult: { error: null as unknown },
    invokeResult: { data: { ok: true } as unknown, error: null as unknown },
  };
  return { state };
});

vi.mock("@/lib/supabase", () => ({
  get isSupabaseConfigured() {
    return h.state.configured;
  },
  supabase: {
    from: () => ({ insert: () => Promise.resolve(h.state.insertResult) }),
    functions: { invoke: () => Promise.resolve(h.state.invokeResult) },
  },
}));

const input = {
  name: "Jane",
  email: "jane@example.com",
  message: "Hello there",
};

beforeEach(() => {
  h.state.configured = true;
  h.state.insertResult = { error: null };
  h.state.invokeResult = { data: { ok: true }, error: null };
});

describe("submitContact — honeypot & config", () => {
  it("silently 'succeeds' without touching the DB when the honeypot is filled", async () => {
    const res = await submitContact({ ...input, company_website: "bot.com" });
    expect(res.ok).toBe(true);
  });

  it("does not hard-fail the UI when Supabase is unconfigured", async () => {
    h.state.configured = false;
    expect(await submitContact(input)).toEqual({ ok: true });
  });
});

describe("submitContact — Edge Function (primary) path", () => {
  it("returns ok when the function reports success", async () => {
    h.state.invokeResult = { data: { ok: true }, error: null };
    expect(await submitContact(input, "tok_123")).toEqual({ ok: true });
  });

  it("relays business errors from the Edge Function without falling back to insert", async () => {
    h.state.invokeResult = { data: { ok: false, error: "Verification failed." }, error: null };
    const res = await submitContact(input, "bad_tok");
    expect(res).toEqual({ ok: false, error: "Verification failed." });
  });
});

describe("submitContact — fallback direct insert path", () => {
  beforeEach(() => {
    // Edge function is unreachable or transport fails
    h.state.invokeResult = { data: null, error: { message: "function not found" } };
  });

  it("returns ok when the fallback direct insert succeeds", async () => {
    h.state.insertResult = { error: null };
    expect(await submitContact(input)).toEqual({ ok: true });
  });

  it("surfaces friendly throttle message on check_violation (23514)", async () => {
    h.state.insertResult = {
      error: { code: "23514", message: "Too many messages from this email. Please try again later." },
    };
    const res = await submitContact(input);
    expect(res.ok).toBe(false);
    expect(res.error).toBe("Too many messages from this email. Please try again later.");
  });

  it("returns a generic message on other database errors", async () => {
    h.state.insertResult = {
      error: { code: "08006", message: "connection refused at 10.0.0.1" },
    };
    const res = await submitContact(input);
    expect(res.ok).toBe(false);
    expect(res.error).toBe("Something went wrong. Please try again.");
  });
});
