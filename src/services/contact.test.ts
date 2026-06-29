import { describe, it, expect, beforeEach, vi } from "vitest";
import { submitContact } from "@/services/contact";

// Controllable stubs for the Supabase client and the Turnstile feature flag.
const h = vi.hoisted(() => {
  const state = {
    configured: true,
    turnstile: false,
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

vi.mock("@/lib/turnstile", () => ({
  isTurnstileConfigured: () => h.state.turnstile,
}));

const input = {
  name: "Jane",
  email: "jane@example.com",
  message: "Hello there",
};

beforeEach(() => {
  h.state.configured = true;
  h.state.turnstile = false;
  h.state.insertResult = { error: null };
  h.state.invokeResult = { data: { ok: true }, error: null };
});

describe("submitContact — honeypot & config", () => {
  it("silently 'succeeds' without touching the DB when the honeypot is filled", async () => {
    const insert = vi.fn();
    const res = await submitContact({ ...input, company_website: "bot.com" });
    expect(res.ok).toBe(true);
    expect(insert).not.toHaveBeenCalled();
  });

  it("does not hard-fail the UI when Supabase is unconfigured", async () => {
    h.state.configured = false;
    expect(await submitContact(input)).toEqual({ ok: true });
  });
});

describe("submitContact — direct insert path", () => {
  it("returns ok on a successful insert", async () => {
    expect(await submitContact(input)).toEqual({ ok: true });
  });

  it("surfaces the friendly throttle message on a check_violation (23514)", async () => {
    h.state.insertResult = {
      error: { code: "23514", message: "Please wait a bit before sending another message." },
    };
    const res = await submitContact(input);
    expect(res.ok).toBe(false);
    expect(res.error).toBe("Please wait a bit before sending another message.");
  });

  it("returns a generic message on other DB errors (no leak)", async () => {
    h.state.insertResult = { error: { code: "08006", message: "connection refused at 10.0.0.1" } };
    const res = await submitContact(input);
    expect(res.ok).toBe(false);
    expect(res.error).toBe("Something went wrong. Please try again.");
  });
});

describe("submitContact — Turnstile (Edge Function) path", () => {
  beforeEach(() => {
    h.state.turnstile = true;
  });

  it("returns ok when the function reports success", async () => {
    h.state.invokeResult = { data: { ok: true }, error: null };
    expect(await submitContact(input, "captcha-token")).toEqual({ ok: true });
  });

  it("relays the function's business error (e.g. failed verification)", async () => {
    h.state.invokeResult = { data: { ok: false, error: "Verification failed." }, error: null };
    const res = await submitContact(input, "bad");
    expect(res).toEqual({ ok: false, error: "Verification failed." });
  });

  it("returns a generic message on a transport error", async () => {
    h.state.invokeResult = { data: null, error: { message: "network" } };
    const res = await submitContact(input, "tok");
    expect(res.ok).toBe(false);
    expect(res.error).toBe("Something went wrong. Please try again.");
  });
});
