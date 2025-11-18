/**
 * Test Helper Utilities
 * Common utilities for working with environments in tests
 */

import { getEnvironment, getCurrentEnvironment } from '../config/environments.js';

/**
 * Get current environment configuration
 * @returns {object} Current environment config
 */
export function getEnv() {
  return getEnvironment(getCurrentEnvironment());
}

/**
 * Get environment-specific user credentials
 * @param {string} userType - 'admin' or 'standard'
 * @returns {object} User credentials {username, password}
 */
export function getUser(userType = 'standard') {
  const env = getEnv();
  return env.users[userType] || env.users.standard;
}

/**
 * Get environment-specific base URL
 * @returns {string} Base URL for current environment
 */
export function getBaseURL() {
  return getEnv().baseURL;
}

/**
 * Get environment-specific API URL
 * @returns {string} API URL for current environment
 */
export function getAPIURL() {
  return getEnv().apiURL;
}

/**
 * Check if running in specific environment
 * @param {string} envName - Environment name (dev, staging, prod)
 * @returns {boolean}
 */
export function isEnvironment(envName) {
  return getCurrentEnvironment().toLowerCase() === envName.toLowerCase();
}

/**
 * Check if running in production
 * @returns {boolean}
 */
export function isProduction() {
  return isEnvironment('prod');
}

/**
 * Check if running in development
 * @returns {boolean}
 */
export function isDevelopment() {
  return isEnvironment('dev');
}

/**
 * Check if running in staging
 * @returns {boolean}
 */
export function isStaging() {
  return isEnvironment('staging');
}

/**
 * Check if test should run in current environment
 * Use with test.skip() in your test files
 * @param {string} requiredEnv - Required environment
 * @returns {boolean} True if should skip
 */
export function shouldSkipForEnv(requiredEnv) {
  const currentEnv = getCurrentEnvironment();
  return currentEnv.toLowerCase() !== requiredEnv.toLowerCase();
}

/**
 * Example usage in tests:
 * 
 * import { getEnv, getUser, getBaseURL, isProduction } from '../utils/testHelpers.js';
 * 
 * test('Login test', async ({ page }) => {
 *   const baseURL = getBaseURL();
 *   const user = getUser('standard');
 *   
 *   await page.goto(baseURL);
 *   await page.fill('#username', user.username);
 *   await page.fill('#password', user.password);
 * });
 */

