import { PwProjectName } from '@/common/allure/allure.typedefs';
import { MOBILE_DEVICES } from '@/common/constants/devices';
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import fs from 'fs';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

const envFilesPath = './environment';

const envType = process.env.ENV_TYPE || '';
const isCi = envType === 'ci';

if (fs.existsSync(`${envFilesPath}/.env.${process.env.ENV_TYPE}`)) {
  dotenv.config({
    path: `${envFilesPath}/.env.${process.env.ENV_TYPE}`,
  });
} else {
  throw new Error(`
Missing config file ${envFilesPath}/.env.${process.env.ENV_TYPE}, create from sample if available.
`);
}

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  timeout: isCi ? 60000 : 30000,
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: isCi ? 1 : 0,
  /* Opt out of parallel tests on CI. */
  workers: isCi ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['list'], ['allure-playwright']],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    baseURL: process.env.BASE_URL,
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
  },

  expect: {
    timeout: 10000,
  },

  snapshotPathTemplate:
    './resources/playwright-snapshots/{testFileDir}/{arg}.png',

  /* Configure projects for major browsers */
  projects: [
    {
      name: PwProjectName.Chromium,
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: PwProjectName.Android,
      use: {
        ...devices['Pixel 5'],
        isMobile: true,
        viewport: MOBILE_DEVICES.pixel5.viewport,
      },
      testMatch: `**.android.mobile.spec.ts`,
      testIgnore: /ios.mobile.spec.ts/,
    },
    {
      name: PwProjectName.IOS,
      use: {
        ...devices['iPhone 13 Pro Max'],
        defaultBrowserType: 'chromium',
        isMobile: true,
        viewport: MOBILE_DEVICES.iPhone13ProMax.viewport,
      },
      testMatch: '**.mobile.spec.ts',
      testIgnore: /android.mobile.spec.ts/,
    },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
