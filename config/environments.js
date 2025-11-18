/**
 * Environment Configuration
 * Centralized configuration for all environments (dev, staging, prod)
 */

export const environments = {
  dev: {
    name: "Development",
    baseURL: "https://dev.example.com",
    apiURL: "https://api-dev.example.com",
    timeout: 30000,
    retries: 1,
    // Add environment-specific credentials (use env vars in production)
    users: {
      admin: {
        username: process.env.DEV_ADMIN_USERNAME || "dev_admin",
        password: process.env.DEV_ADMIN_PASSWORD || "dev_password",
      },
      standard: {
        username: process.env.DEV_STANDARD_USERNAME || "dev_user",
        password: process.env.DEV_STANDARD_PASSWORD || "dev_password",
      },
    },
  },

  staging: {
    name: "Staging",
    baseURL: "https://staging.example.com",
    apiURL: "https://api-staging.example.com",
    timeout: 30000,
    retries: 2,
    users: {
      admin: {
        username: process.env.STG_ADMIN_USERNAME || "stg_admin",
        password: process.env.STG_ADMIN_PASSWORD || "stg_password",
      },
      standard: {
        username: process.env.STG_STANDARD_USERNAME || "stg_user",
        password: process.env.STG_STANDARD_PASSWORD || "stg_password",
      },
    },
  },

  prod: {
    name: "Production",
    baseURL: "https://www.example.com",
    apiURL: "https://api.example.com",
    timeout: 60000, // Longer timeout for prod
    retries: 3, // More retries for prod
    users: {
      admin: {
        username: process.env.PROD_ADMIN_USERNAME || "",
        password: process.env.PROD_ADMIN_PASSWORD || "",
      },
      standard: {
        username: process.env.PROD_STANDARD_USERNAME || "",
        password: process.env.PROD_STANDARD_PASSWORD || "",
      },
    },
  },
};

/**
 * Get environment configuration
 * @param {string} env - Environment name (dev, staging, prod)
 * @returns {object} Environment configuration
 */
export function getEnvironment(env = process.env.ENV || "dev") {
  const environment = environments[env.toLowerCase()];
  if (!environment) {
    throw new Error(
      `Unknown environment: ${env}. Available: ${Object.keys(environments).join(
        ", "
      )}`
    );
  }
  return environment;
}

/**
 * Get current environment name
 */
export function getCurrentEnvironment() {
  return process.env.ENV || "dev";
}
