# Testing

Two complementary layers:

| Layer                | Tool                       | Location            | Runs in CI            |
| -------------------- | -------------------------- | ------------------- | --------------------- |
| Unit / integration   | Vitest + React Testing Lib | `src/**/*.test.ts(x)` | ✅ (`quality` job)     |
| End-to-end (browser) | Playwright                 | `tests/*.spec.ts`   | ⛔ run locally for now |

The two never collide: Vitest only collects `*.test.*` under `src/`; Playwright
only runs `tests/`.

## Commands

```bash
npm test              # run the unit suite once (CI mode)
npm run test:watch    # watch mode while developing
npm run test:coverage # run with coverage + enforce thresholds
npx playwright test   # E2E across Chromium/Firefox/WebKit (starts the dev server)
```

## Unit / integration suite

Focused on the **highest-risk pure logic**, where a regression is silent and
costly:

- `src/lib/utils.test.ts` — `cn`, `safeUrl` (incl. `javascript:`/obfuscation
  XSS vectors), `formatDate`.
- `src/lib/rateLimit.test.ts` — cooldown window math (fake timers).
- `src/lib/structuredData.test.ts` — schema.org builders.
- `src/components/blog/Markdown.test.tsx` — the hand-rolled Markdown renderer,
  including the security cases: `javascript:` links rendered as inert text,
  `data:` images allowed only for images, unsafe images dropped (alt kept).
- `src/services/blogs.test.ts` — `getRelatedPosts` scoring, empty-catalogue and
  error paths.
- `src/services/admin.test.ts` — `getOverviewCharts` day-bucketing / window
  trimming / rating clamping (RPC **and** client-side fallback), dashboard
  stats, and CRUD wrappers.
- `src/services/contact.test.ts` — honeypot, throttle rejection (SQLSTATE
  23514) surfacing its friendly message, generic-error masking, and the
  Turnstile Edge-Function path.

Supabase is stubbed with a small chainable query-builder mock (no network), so
these are fast and deterministic.

## Coverage gate

`npm run test:coverage` writes an HTML/lcov report to `coverage/` and **fails**
if the targeted modules fall below the thresholds in
[`vitest.config.ts`](./vitest.config.ts) (lines/statements/functions ≥ 80,
branches ≥ 70). Coverage is scoped to those high-risk modules rather than the
whole app, so the gate stays meaningful (pages/effects are exercised by the E2E
suite, not unit-counted).

## Known follow-ups (need a live database)

These require credentials this repo doesn't ship, so they're left as documented
gaps rather than half-mocked:

- **Authenticated admin CRUD in E2E.** Add a seeded test-admin user and a
  Playwright project that saves/reuses auth state
  (`storageState` + a `setup` project that logs in once), then drive the
  dashboard create/edit/delete flows. The CRUD *logic* is already covered at the
  unit level in `admin.test.ts`.
- **RLS behaviour against a real Postgres** — e.g. future-dated posts hidden
  from anonymous reads, anon insert restricted to unpublished testimonials.
  Best asserted with an integration test that points `supabase-js` at a local
  `supabase start` instance using the anon key.
