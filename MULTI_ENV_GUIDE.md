# Multi-Environment QA Workflow Guide

Complete guide for managing QA tests across multiple environments (dev, staging, prod).

## 📁 Project Structure

```
testShoppingApp/
├── config/
│   ├── environments.js          # Environment configurations
│   ├── env.example.dev          # Dev environment template
│   ├── env.example.staging      # Staging environment template
│   └── env.example.prod         # Prod environment template
├── .github/
│   └── workflows/
│       ├── playwright-dev.yml      # Dev CI/CD workflow
│       ├── playwright-staging.yml  # Staging CI/CD workflow
│       ├── playwright-prod.yml     # Prod CI/CD workflow
│       └── playwright-matrix.yml   # Multi-env matrix workflow
├── .env                          # Local environment (gitignored)
├── .env.dev                      # Dev environment (gitignored)
├── .env.staging                  # Staging environment (gitignored)
├── .env.prod                     # Prod environment (gitignored)
└── playwright.config.js          # Playwright config with env support
```

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

**Note:** This will install:
- `dotenv` - For loading environment variables
- `cross-env` - For cross-platform environment variable support (Windows/Mac/Linux)

### 2. Set Up Environment Files

**For Local Development:**
```bash
# Copy example files
cp config/env.example.dev .env.dev
cp config/env.example.staging .env.staging
cp config/env.example.prod .env.prod

# Edit with your actual values
# .env.dev, .env.staging, .env.prod
```

### 3. Run Tests by Environment

```bash
# Development
npm run test:dev

# Staging
npm run test:staging

# Production
npm run test:prod

# UI Mode (interactive)
npm run test:ui:dev
npm run test:ui:staging
npm run test:ui:prod
```

## 🔧 Configuration

### Environment Configuration (`config/environments.js`)

Centralized configuration for all environments:

```javascript
import { getEnvironment } from './config/environments.js';

const env = getEnvironment('dev'); // or 'staging', 'prod'
console.log(env.baseURL); // https://dev.example.com
console.log(env.users.admin.username);
```

### Using Environment in Tests

```javascript
import { test, expect } from '@playwright/test';
import { getEnvironment } from '../config/environments.js';

test('Login test', async ({ page }) => {
  const env = getEnvironment(process.env.ENV || 'dev');
  
  // Use environment-specific URL
  await page.goto(env.baseURL);
  
  // Use environment-specific credentials
  await page.fill('#username', env.users.standard.username);
  await page.fill('#password', env.users.standard.password);
  await page.click('#login-button');
  
  await expect(page).toHaveURL(`${env.baseURL}/dashboard`);
});
```

### Environment Variables

The system loads environment variables in this order (later overrides earlier):
1. `.env.{ENV}.local` (highest priority, never commit)
2. `.env.{ENV}` (e.g., `.env.dev`, `.env.staging`)
3. `.env.local`
4. `.env` (lowest priority)

**Example `.env.dev`:**
```bash
ENV=dev
BASE_URL=https://dev.example.com
ADMIN_USERNAME=dev_admin
ADMIN_PASSWORD=dev_password
```

## 🔄 CI/CD Workflows

### GitHub Actions Setup

#### 1. Set Up GitHub Secrets

Go to: **Settings → Secrets and variables → Actions**

Add secrets for each environment:

**Development:**
- `DEV_BASE_URL`
- `DEV_ADMIN_USERNAME`
- `DEV_ADMIN_PASSWORD`
- `DEV_STANDARD_USERNAME`
- `DEV_STANDARD_PASSWORD`

**Staging:**
- `STG_BASE_URL`
- `STG_ADMIN_USERNAME`
- `STG_ADMIN_PASSWORD`
- `STG_STANDARD_USERNAME`
- `STG_STANDARD_PASSWORD`

**Production:**
- `PROD_BASE_URL`
- `PROD_ADMIN_USERNAME`
- `PROD_ADMIN_PASSWORD`
- `PROD_STANDARD_USERNAME`
- `PROD_STANDARD_PASSWORD`

#### 2. Set Up GitHub Environments

Go to: **Settings → Environments**

Create three environments:
- `development` - For dev tests
- `staging` - For staging tests
- `production` - For prod tests (add protection rules!)

#### 3. Workflow Triggers

**Development Workflow** (`.github/workflows/playwright-dev.yml`):
- Triggers on: `develop`, `dev` branches
- Runs on: Development environment

**Staging Workflow** (`.github/workflows/playwright-staging.yml`):
- Triggers on: `staging`, `release/*` branches
- Runs on: Staging environment

**Production Workflow** (`.github/workflows/playwright-prod.yml`):
- Triggers on: `main`, `master` branches, or tags `v*`
- Runs on: Production environment
- **Requires manual confirmation** for safety

**Matrix Workflow** (`.github/workflows/playwright-matrix.yml`):
- Manual trigger only
- Can test multiple environments in parallel
- Useful for smoke tests before releases

## 📋 Best Practices

### 1. **Environment-Specific Test Data**

```javascript
// config/environments.js
export const environments = {
  dev: {
    testData: {
      // Dev-specific test data
      maxRetries: 1,
      timeout: 30000,
    }
  },
  prod: {
    testData: {
      // Prod-specific test data
      maxRetries: 3,
      timeout: 60000,
    }
  }
};
```

### 2. **Conditional Test Execution**

```javascript
import { test } from '@playwright/test';

// Only run in staging and prod
test('Production feature test', async ({ page }) => {
  const env = process.env.ENV;
  test.skip(env === 'dev', 'This test only runs in staging/prod');
  
  // Test code...
});
```

### 3. **Environment-Specific Assertions**

```javascript
test('API response validation', async ({ request }) => {
  const env = getEnvironment(process.env.ENV);
  const response = await request.get(`${env.apiURL}/status`);
  
  // Different expectations per environment
  if (env.name === 'Production') {
    expect(response.status()).toBe(200);
  } else {
    // Dev/staging might have different status codes
    expect([200, 503]).toContain(response.status());
  }
});
```

### 4. **Separate Test Suites**

```javascript
// tests/smoke.spec.js - Run on all environments
test('Smoke test', async ({ page }) => {
  // Basic functionality
});

// tests/prod-only.spec.js - Only production
test('Production-specific test', async ({ page }) => {
  test.skip(process.env.ENV !== 'prod');
  // Production-only features
});
```

### 5. **Safe Production Testing**

- Always require manual approval for prod tests
- Use read-only credentials when possible
- Set up production environment protection rules
- Limit production test frequency
- Use tags/annotations to mark prod tests

## 🔐 Security Best Practices

### 1. **Never Commit Secrets**
- ✅ `.env*` files are in `.gitignore`
- ✅ Use GitHub Secrets for CI/CD
- ✅ Use `.env.example` files as templates

### 2. **Environment Isolation**
- Use separate credentials for each environment
- Rotate credentials regularly
- Use least-privilege access

### 3. **Production Safety**
- Require manual approval for prod workflows
- Use environment protection rules
- Limit who can trigger prod tests
- Monitor and alert on prod test failures

## 📊 Running Tests

### Local Development

```bash
# Default (dev)
npm test

# Specific environment
ENV=dev npm test
ENV=staging npm test
ENV=prod npm test

# With UI
npm run test:ui:dev

# Debug mode
npm run test:debug
```

### CI/CD

Tests run automatically based on branch:
- Push to `dev` → Runs dev tests
- Push to `staging` → Runs staging tests
- Push to `main` → Runs prod tests (with approval)

### Manual CI Trigger

1. Go to **Actions** tab in GitHub
2. Select workflow (e.g., "Playwright Tests - All Environments")
3. Click **Run workflow**
4. Select environments and branch
5. Click **Run workflow**

## 🐛 Troubleshooting

### Issue: Tests failing in one environment

1. Check environment configuration in `config/environments.js`
2. Verify `.env.{ENV}` file exists and has correct values
3. Check GitHub Secrets are set correctly
4. Review workflow logs in GitHub Actions

### Issue: Wrong environment being used

```bash
# Explicitly set environment
ENV=staging npm test

# Check current environment
echo $ENV
```

### Issue: Secrets not loading

1. Verify `.env` file exists
2. Check file naming: `.env.dev`, `.env.staging`, `.env.prod`
3. Verify GitHub Secrets are set
4. Check workflow environment settings

## 📝 Example Test Files

### Using Environment Config Directly

```javascript
// tests/login.spec.js
import { test, expect } from '@playwright/test';
import { getEnvironment } from '../config/environments.js';

test.describe('Login Tests', () => {
  let env;
  
  test.beforeAll(() => {
    env = getEnvironment(process.env.ENV || 'dev');
    console.log(`Testing against: ${env.name}`);
  });

  test('should login with valid credentials', async ({ page }) => {
    await page.goto(env.baseURL);
    
    const user = env.users.standard;
    await page.fill('#username', user.username);
    await page.fill('#password', user.password);
    await page.click('#login-button');
    
    await expect(page).toHaveURL(`${env.baseURL}/dashboard`);
  });

  test('should fail with invalid credentials', async ({ page }) => {
    await page.goto(env.baseURL);
    
    await page.fill('#username', 'invalid');
    await page.fill('#password', 'invalid');
    await page.click('#login-button');
    
    await expect(page.locator('.error')).toBeVisible();
  });
});
```

### Using Test Helpers (Recommended)

```javascript
// tests/login-helper.spec.js
import { test, expect } from '@playwright/test';
import { getEnv, getUser, getBaseURL, isProduction, shouldSkipForEnv } from '../utils/testHelpers.js';

test.describe('Login Tests with Helpers', () => {
  test('should login with valid credentials', async ({ page }) => {
    const baseURL = getBaseURL();
    const user = getUser('standard');
    
    await page.goto(baseURL);
    await page.fill('#username', user.username);
    await page.fill('#password', user.password);
    await page.click('#login-button');
    
    await expect(page).toHaveURL(`${baseURL}/dashboard`);
  });

  test('production-only feature', async ({ page }) => {
    // Skip if not in production
    test.skip(shouldSkipForEnv('prod'), 'This test only runs in production');
    
    const baseURL = getBaseURL();
    await page.goto(`${baseURL}/production-feature`);
    // Test production-specific features
  });

  test('conditional test based on environment', async ({ page }) => {
    const env = getEnv();
    const baseURL = getBaseURL();
    
    await page.goto(baseURL);
    
    // Different expectations for different environments
    if (isProduction()) {
      // Production has stricter requirements
      await expect(page.locator('.security-badge')).toBeVisible();
    } else {
      // Dev/staging might not have this
      console.log('Running in non-production environment');
    }
  });
});
```

## 🎯 Summary

1. **Configuration**: Centralized in `config/environments.js`
2. **Secrets**: Stored in `.env.{ENV}` files (local) or GitHub Secrets (CI/CD)
3. **Execution**: Use `ENV={env}` or npm scripts
4. **CI/CD**: Automatic based on branch, manual via workflows
5. **Safety**: Production requires approval, use protection rules

## 🔗 Related Files

- `config/environments.js` - Environment configurations
- `playwright.config.js` - Playwright config with env support
- `.github/workflows/*.yml` - CI/CD workflows
- `SECRETS_GUIDE.md` - Secrets management guide

