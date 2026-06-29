import { describe, it, expect, vi } from "vitest";
import { getDashboardStats, getOverviewCharts, listContacts } from "@/services/admin";

// With Supabase unconfigured, every admin call must return a friendly error
// rather than throwing.
vi.mock("@/lib/supabase", () => ({
  isSupabaseConfigured: false,
  supabase: null,
}));

describe("admin services — Supabase not configured", () => {
  it("returns the not-configured error instead of throwing", async () => {
    expect((await getDashboardStats()).error).toMatch(/not configured/i);
    expect((await getOverviewCharts()).error).toMatch(/not configured/i);
    expect((await listContacts()).error).toMatch(/not configured/i);
  });
});
