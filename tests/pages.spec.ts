import { test, expect } from '@playwright/test';

/**
 * Smoke tests for every public route: the page should render and set the
 * correct document title. Titles are applied client-side by react-helmet-async,
 * so `toHaveTitle` auto-waits for React to mount and <Helmet> to apply.
 */
const routes: { path: string; title: RegExp }[] = [
  { path: '/', title: /Navya EdTech \| Enterprise IT Services & Software Development in Nepal/ },
  { path: '/about', title: /About \| Navya EdTech/ },
  { path: '/services', title: /Custom Software & Enterprise Solutions in Nepal \| Navya EdTech/ },
  { path: '/blog', title: /Insights \| Navya EdTech/ },
  { path: '/contact', title: /Enterprise Consultation \| Navya EdTech/ },
  { path: '/share-your-story', title: /Share Your Story \| Navya EdTech/ },
  { path: '/privacy-policy', title: /Privacy Policy \| Navya EdTech/ },
  { path: '/terms', title: /Terms of Service \| Navya EdTech/ },
];

for (const { path, title } of routes) {
  test(`${path} loads with the correct title and a heading`, async ({ page }) => {
    // Don't block on the full `load` event — these pages run continuous canvas
    // / WebGL animations that keep it pending on slower engines. Navigate on
    // DOMContentLoaded and let the web-first assertions below wait for content.
    await page.goto(path, { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveTitle(title);
    // Every public page renders exactly one top-level heading (hero h1).
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });
}

test('unknown routes render the 404 page', async ({ page }) => {
  await page.goto('/this-route-does-not-exist');
  await expect(page).toHaveTitle(/404: Page Not Found \| Navya EdTech/);
});
