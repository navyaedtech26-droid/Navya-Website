import { test, expect } from '@playwright/test';

/**
 * Form behaviour tests. These exercise client-side validation only — they
 * never submit to Supabase, so they pass whether or not the backend is
 * configured in this environment.
 */

test.describe('Contact form', () => {
  test('renders its fields', async ({ page }) => {
    await page.goto('/contact', { waitUntil: 'domcontentloaded' });
    await expect(page.getByLabel('Full Name')).toBeVisible();
    await expect(page.getByLabel('Email Address')).toBeVisible();
    await expect(page.getByLabel('Service Interested In')).toBeVisible();
    await expect(page.getByLabel('Project Description')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Send Message' })).toBeVisible();
  });

  test('shows validation errors when submitted empty', async ({ page }) => {
    await page.goto('/contact', { waitUntil: 'domcontentloaded' });
    await page.getByRole('button', { name: 'Send Message' }).click();

    await expect(page.getByText('Please enter your name.')).toBeVisible();
    await expect(page.getByText('Please enter your email.')).toBeVisible();
    await expect(page.getByText('Please select a service.')).toBeVisible();
    await expect(page.getByText('Please describe your project.')).toBeVisible();
  });

  test('rejects an invalid email address', async ({ page }) => {
    await page.goto('/contact', { waitUntil: 'domcontentloaded' });
    await page.getByLabel('Full Name').fill('Jane Doe');
    await page.getByLabel('Email Address').fill('not-an-email');
    await page.getByRole('button', { name: 'Send Message' }).click();

    await expect(page.getByText('Please enter a valid email.')).toBeVisible();
  });

  test('clears a field error once it is corrected', async ({ page }) => {
    await page.goto('/contact', { waitUntil: 'domcontentloaded' });
    await page.getByRole('button', { name: 'Send Message' }).click();
    await expect(page.getByText('Please enter your name.')).toBeVisible();

    await page.getByLabel('Full Name').fill('Jane Doe');
    await expect(page.getByText('Please enter your name.')).toBeHidden();
  });
});

test.describe('Share-your-story form', () => {
  test('renders its fields', async ({ page }) => {
    await page.goto('/share-your-story', { waitUntil: 'domcontentloaded' });
    await expect(page.getByLabel('Your experience')).toBeVisible();
    await expect(page.getByLabel('Your name')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Submit My Story' })).toBeVisible();
  });

  test('shows an error when submitted without a quote and name', async ({ page }) => {
    await page.goto('/share-your-story', { waitUntil: 'domcontentloaded' });
    await page.getByRole('button', { name: 'Submit My Story' }).click();
    await expect(
      page.getByText('Please share a few words and your name.')
    ).toBeVisible();
  });

  test('lets you pick a star rating', async ({ page }) => {
    await page.goto('/share-your-story', { waitUntil: 'domcontentloaded' });
    await expect(page.getByRole('button', { name: '4 stars' })).toBeVisible();
    await page.getByRole('button', { name: '4 stars' }).click();
    // No assertion on visual fill (it's a canvas-free SVG class toggle); this
    // just confirms the control is interactive and doesn't throw.
  });
});
