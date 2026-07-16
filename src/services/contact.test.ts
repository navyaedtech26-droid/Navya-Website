import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import type { submitContact as SubmitContact } from "@/services/contact";

const h = vi.hoisted(() => ({ send: vi.fn() }));

vi.mock("@emailjs/browser", () => ({
  default: { send: h.send },
}));

const input = {
  name: "Jane",
  email: "jane@example.com",
  message: "Hello there",
};

describe("submitContact — honeypot & unconfigured", () => {
  // No VITE_EMAILJS_* vars are stubbed here, so the module's default
  // (unconfigured) state applies.
  let submitContact: typeof SubmitContact;

  beforeEach(async () => {
    vi.resetModules();
    h.send.mockReset();
    ({ submitContact } = await import("@/services/contact"));
  });

  it("silently 'succeeds' without sending anything when the honeypot is filled", async () => {
    const res = await submitContact({ ...input, company_website: "bot.com" });
    expect(res.ok).toBe(true);
    expect(h.send).not.toHaveBeenCalled();
  });

  it("does not hard-fail the UI when EmailJS is unconfigured", async () => {
    expect(await submitContact(input)).toEqual({ ok: true });
    expect(h.send).not.toHaveBeenCalled();
  });
});

describe("submitContact — EmailJS path", () => {
  let submitContact: typeof SubmitContact;

  beforeEach(async () => {
    vi.resetModules();
    vi.stubEnv("VITE_EMAILJS_PUBLIC_KEY", "pub_key");
    vi.stubEnv("VITE_EMAILJS_SERVICE_ID", "service_1");
    vi.stubEnv("VITE_EMAILJS_NOTIFY_TEMPLATE_ID", "template_notify");
    h.send.mockReset();
    ({ submitContact } = await import("@/services/contact"));
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("returns ok and sends the notify template on success", async () => {
    h.send.mockResolvedValue({ status: 200 });
    expect(await submitContact(input)).toEqual({ ok: true });
    expect(h.send).toHaveBeenCalledWith(
      "service_1",
      "template_notify",
      expect.objectContaining({ name: "Jane", email: "jane@example.com" }),
      { publicKey: "pub_key" }
    );
  });

  it("skips the auto-reply send when no auto-reply template is configured", async () => {
    h.send.mockResolvedValue({ status: 200 });
    await submitContact(input);
    expect(h.send).toHaveBeenCalledTimes(1);
  });

  it("returns a generic message when the notify send fails", async () => {
    h.send.mockRejectedValue(new Error("emailjs down"));
    const res = await submitContact(input);
    expect(res.ok).toBe(false);
    expect(res.error).toBe("Something went wrong. Please try again.");
  });
});

describe("submitContact — optional auto-reply", () => {
  let submitContact: typeof SubmitContact;

  beforeEach(async () => {
    vi.resetModules();
    vi.stubEnv("VITE_EMAILJS_PUBLIC_KEY", "pub_key");
    vi.stubEnv("VITE_EMAILJS_SERVICE_ID", "service_1");
    vi.stubEnv("VITE_EMAILJS_NOTIFY_TEMPLATE_ID", "template_notify");
    vi.stubEnv("VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID", "template_autoreply");
    h.send.mockReset();
    h.send.mockResolvedValue({ status: 200 });
    ({ submitContact } = await import("@/services/contact"));
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("also sends the auto-reply template when configured", async () => {
    await submitContact(input);
    expect(h.send).toHaveBeenCalledTimes(2);
    expect(h.send).toHaveBeenNthCalledWith(
      2,
      "service_1",
      "template_autoreply",
      expect.objectContaining({ email: "jane@example.com" }),
      { publicKey: "pub_key" }
    );
  });
});
