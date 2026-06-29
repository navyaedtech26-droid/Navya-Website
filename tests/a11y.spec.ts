import { test, expect } from '@playwright/test';

/**
 * Accessibility behaviours that are easy to regress: the skip link, the <main>
 * landmark it targets, and focus moving to <main> on client-side navigation so
 * keyboard / screen-reader users don't lose context after following a link.
 */

test('skip link is visually hidden until focused, then moves focus to main', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });

  const skip = page.getByRole('link', { name: 'Skip to content' });
  // Present in the DOM but visually clipped (sr-only) until focused.
  await expect(skip).toBeAttached();
  await expect(skip).not.toBeInViewport();

  // It is the first thing a keyboard user reaches.
  await page.keyboard.press('Tab');
  await expect(skip).toBeFocused();
  await expect(skip).toBeInViewport();

  // Activating it sends focus to the main content region.
  await skip.press('Enter');
  await expect(page.locator('#main-content')).toBeFocused();
});

test('main landmark exists and receives focus after navigation', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('main#main-content')).toHaveCount(1);

  await page
    .locator('header')
    .getByRole('link', { name: 'About', exact: true })
    .click();
  await expect(page).toHaveURL(/\/about$/);

  // After the route change, focus is on the new page's <main>, not left on the
  // (now-unmounted) nav link.
  await expect(page.locator('#main-content')).toBeFocused();
});
