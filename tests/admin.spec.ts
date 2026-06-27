import { test, expect } from '@playwright/test';

/**
 * Admin sign-in page. There is no public sign-up, and we never submit real
 * credentials, so these tests only verify the page renders and is reachable.
 * Note: the "Sign In" button is disabled when Supabase is not configured in
 * the environment, so we assert presence rather than clicking submit.
 */
test.describe('Admin login', () => {
  test('renders the sign-in form', async ({ page }) => {
    await page.goto('/admin/login', { waitUntil: 'domcontentloaded' });

    await expect(page).toHaveTitle(/Admin Sign In \| Navya EdTech/);
    await expect(page.getByRole('heading', { name: 'Admin Dashboard' })).toBeVisible();
    await expect(page.getByLabel('Email Address')).toBeVisible();
    await expect(page.getByLabel('Password', { exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Sign In' })).toBeVisible();
  });

  test('toggles password visibility', async ({ page }) => {
    await page.goto('/admin/login', { waitUntil: 'domcontentloaded' });
    const password = page.getByLabel('Password', { exact: true });
    await expect(password).toHaveAttribute('type', 'password');

    await page.getByRole('button', { name: 'Show password' }).click();
    await expect(password).toHaveAttribute('type', 'text');
  });

  test('does not expose the dashboard without authentication', async ({ page }) => {
    await page.goto('/admin', { waitUntil: 'domcontentloaded' });
    // RequireAdmin should keep an unauthenticated visitor away from /admin
    // (redirected to the login route, never showing the dashboard shell).
    await expect(page).toHaveURL(/\/admin\/login/);
  });
});
