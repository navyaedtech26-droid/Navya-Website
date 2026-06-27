import { test } from '@playwright/test';

/**
 * One-time warm-up that runs (as the `setup` project) after the Vite dev
 * server is up and before the browser projects start. The dev server compiles
 * modules on demand, so a cold fan-out of parallel workers can each trigger a
 * slow first compile and time out. Loading the app once primes Vite's
 * server-side transform cache for every browser that follows.
 */
test('warm up the dev server', async ({ page }) => {
  test.setTimeout(120_000);
  // "/" eagerly imports every public page (see src/App.tsx), so this single
  // load compiles the whole public module graph.
  await page.goto('/', { waitUntil: 'load' });
  // The admin area is lazy-loaded; pull its chunk too.
  await page.goto('/admin/login', { waitUntil: 'load' });
});
