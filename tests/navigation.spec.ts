import { test, expect } from '@playwright/test';

/**
 * Navigation through the desktop navbar. The nav links live inside the
 * <header> and are only shown at the `lg` breakpoint (>=1024px); the default
 * desktop devices in playwright.config.ts use a 1280px viewport, so they are
 * visible. Scoping to `header` avoids matching the same labels in the footer.
 */
const navTargets: { label: string; path: RegExp; title: RegExp }[] = [
  { label: 'About', path: /\/about$/, title: /About \| Navya EdTech/ },
  { label: 'Services', path: /\/services$/, title: /Services \| Navya EdTech/ },
  { label: 'Blog', path: /\/blog$/, title: /Blog \| Navya EdTech/ },
  { label: 'Contact', path: /\/contact$/, title: /Contact \| Navya EdTech/ },
];

for (const { label, path, title } of navTargets) {
  test(`navbar link "${label}" navigates to the right page`, async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page
      .locator('header')
      .getByRole('link', { name: label, exact: true })
      .click();
    await expect(page).toHaveURL(path);
    await expect(page).toHaveTitle(title);
  });
}

test('the logo returns to the home page', async ({ page }) => {
  await page.goto('/about', { waitUntil: 'domcontentloaded' });
  await page.locator('header').getByRole('link', { name: 'Navya EdTech home' }).click();
  await expect(page).toHaveURL(/\/$/);
  await expect(page).toHaveTitle(/Navya EdTech \| High-Performance Websites/);
});

test('the "Let\'s Talk" button opens the contact page', async ({ page }) => {
  await page.goto('/');
  await page.locator('header').getByRole('link', { name: "Let's Talk" }).click();
  await expect(page).toHaveURL(/\/contact$/);
});
