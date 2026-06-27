import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Cap concurrency locally: this marketing site runs several continuous
     canvas animations, and too many parallel workers starve each other of CPU
     (WebKit on Windows is especially sensitive). */
  workers: process.env.CI ? 1 : '50%',
  /* WebKit renders these animation-heavy pages slowly, so give each test and
     assertion more headroom than the 30s / 5s defaults. */
  timeout: 60_000,
  expect: { timeout: 15_000 },
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL so tests can use relative paths like `await page.goto('/contact')`. */
    baseURL: 'http://localhost:5173',

    /* The Vite dev server compiles modules on demand; the very first navigation
       to a route can be slow, so allow extra headroom over the 30s default. */
    navigationTimeout: 60_000,

    /* Quiet the CSS keyframe animations that honour prefers-reduced-motion,
       trimming some of the per-frame work during tests. */
    reducedMotion: 'reduce',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    /* Warm up the Vite dev server once before the browser projects fan out.
       Loading "/" compiles the whole eagerly-imported public bundle and
       "/admin/login" pulls the lazy admin chunk, so by the time the parallel
       workers start, Vite's transform cache is hot. Without this the first
       wave of cold, concurrent compiles can exceed the navigation timeout. */
    {
      name: 'setup',
      testMatch: /warmup\.setup\.ts/,
    },

    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      dependencies: ['setup'],
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
      dependencies: ['setup'],
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
      dependencies: ['setup'],
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Start the Vite dev server before the tests and shut it down afterwards.
     --strictPort keeps the port deterministic so baseURL always matches. */
  webServer: {
    command: 'npm run dev -- --port 5173 --strictPort',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
