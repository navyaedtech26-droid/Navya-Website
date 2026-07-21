import { test, expect } from '@playwright/test';

/**
 * Navigation through the desktop navbar. The nav links live inside the
 * <header> and are only shown at the `lg` breakpoint (>=1024px); the default
 * desktop devices in playwright.config.ts use a 1280px viewport, so they are
 * visible. Scoping to `header` avoids matching the same labels in the footer.
 * "Services", "Solutions", and "Industries" are mega-menu triggers (buttons),
 * not plain links, so they're covered separately below.
 */
const navTargets: { label: string; path: RegExp; title: RegExp }[] = [
  { label: 'About', path: /\/about$/, title: /About \| Navya EdTech/ },
  { label: 'Insights', path: /\/blog$/, title: /Insights \| Navya EdTech/ },
  { label: 'Contact', path: /\/contact$/, title: /Enterprise Consultation \| Navya EdTech/ },
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

test('the "Services" mega menu opens and links to a service page', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  const header = page.locator('header');
  await header.getByRole('button', { name: 'Services', exact: true }).hover();
  // Each mega-menu item is a single link whose accessible name is its title
  // plus its description, so match the title as a prefix rather than exactly.
  await header
    .getByRole('link', { name: /^Custom Software Development/ })
    .click();
  await expect(page).toHaveURL(/\/services\/custom-software-development$/);
});

test('the logo returns to the home page', async ({ page }) => {
  await page.goto('/about', { waitUntil: 'domcontentloaded' });
  await page.locator('header').getByRole('link', { name: 'Navya EdTech home' }).click();
  await expect(page).toHaveURL(/\/$/);
  await expect(page).toHaveTitle(/Navya EdTech \| Enterprise IT Services & Software Development in Nepal/);
});

test('the "Book Free Consultation" button opens the contact page', async ({ page }) => {
  await page.goto('/');
  await page.locator('header').getByRole('link', { name: 'Book Free Consultation' }).click();
  await expect(page).toHaveURL(/\/contact$/);
});
