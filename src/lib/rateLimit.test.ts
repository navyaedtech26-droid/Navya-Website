import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { cooldownRemaining, markUsed, cooldownMessage } from "@/lib/rateLimit";

describe("rateLimit", () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-06-28T00:00:00.000Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("reports 0 remaining when the key has never been used", () => {
    expect(cooldownRemaining("contact", 30_000)).toBe(0);
  });

  it("returns the full window right after markUsed, then counts down", () => {
    markUsed("contact");
    expect(cooldownRemaining("contact", 30_000)).toBe(30_000);

    vi.advanceTimersByTime(10_000);
    expect(cooldownRemaining("contact", 30_000)).toBe(20_000);
  });

  it("returns 0 once the window has fully elapsed", () => {
    markUsed("contact");
    vi.advanceTimersByTime(30_000);
    expect(cooldownRemaining("contact", 30_000)).toBe(0);

    vi.advanceTimersByTime(5_000);
    expect(cooldownRemaining("contact", 30_000)).toBe(0);
  });

  it("scopes cooldowns per key", () => {
    markUsed("contact");
    expect(cooldownRemaining("testimonial", 30_000)).toBe(0);
  });

  it("treats a corrupt stored value as 'ready'", () => {
    window.localStorage.setItem("navya:cooldown:contact", "not-a-number");
    expect(cooldownRemaining("contact", 30_000)).toBe(0);
  });
});

describe("cooldownMessage", () => {
  it("rounds up to whole seconds and pluralizes", () => {
    expect(cooldownMessage(1_000)).toBe("Please wait 1 second before trying again.");
    expect(cooldownMessage(2_000)).toBe("Please wait 2 seconds before trying again.");
    expect(cooldownMessage(1_500)).toBe("Please wait 2 seconds before trying again.");
  });
});
