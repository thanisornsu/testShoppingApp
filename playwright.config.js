// @ts-check
import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";
import {
  getEnvironment,
  getCurrentEnvironment,
} from "./config/environments.js";

/**
 * Load environment variables from .env file
 * Supports: .env, .env.local, .env.{ENV}
 */
const env = process.env.ENV || "dev";
const envFile = `.env.${env}`;
const envLocalFile = `.env.${env}.local`;

// Try to load environment-specific .env file, fallback to .env
dotenv.config({ path: path.resolve(__dirname, envLocalFile) });
dotenv.config({ path: path.resolve(__dirname, envFile) });
dotenv.config({ path: path.resolve(__dirname, ".env.local") });
dotenv.config({ path: path.resolve(__dirname, ".env") });

// Get current environment configuration
const envConfig = getEnvironment(env);
const currentEnv = getCurrentEnvironment();

console.log(`🚀 Running tests against: ${envConfig.name} (${currentEnv})`);
console.log(`📍 Base URL: ${envConfig.baseURL}`);

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry based on environment */
  retries: process.env.CI ? envConfig.retries : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: process.env.CI ? [["html"], ["github"]] : "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL from environment configuration */
    baseURL: envConfig.baseURL,
    /* Timeout from environment configuration */
    actionTimeout: envConfig.timeout,
    navigationTimeout: envConfig.timeout,
    /* Collect trace when retrying the failed test. */
    trace: "on-first-retry",
    /* Screenshot on failure */
    screenshot: "only-on-failure",
    /* Video on failure */
    video: "retain-on-failure",
  },
  /* Global test timeout */
  timeout: envConfig.timeout * 2,

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

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

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
