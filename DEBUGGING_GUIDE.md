# Debugging GitHub Actions Failures Guide

Complete guide for debugging and handling test failures in GitHub Actions.

## 📁 Understanding Test Artifacts

### Why You Don't See `test-results` and `playwright-report` in Git

These directories are **intentionally ignored** by git (in `.gitignore`). This is correct because:

- They contain generated files (reports, screenshots, videos)
- They can be large and change frequently
- They're environment-specific

### How to View Them Locally

**After running tests:**

```bash
# Run tests to generate reports
npm run test:dev

# View HTML report
npm run report
# or open directly
start playwright-report/index.html  # Windows
open playwright-report/index.html  # Mac
```

**Check if directories exist:**

```bash
# Windows PowerShell
Get-ChildItem -Force | Where-Object { $_.Name -match "test-results|playwright-report" }

# Or just list all
dir /a
```

## 🔍 When Tests Fail in GitHub Actions

### 1. **Check the Workflow Run**

1. Go to **Actions** tab in GitHub
2. Click on the failed workflow
3. Click on the failed job
4. Review the logs

### 2. **Download Artifacts**

After a test run (pass or fail), you'll see artifacts:

- **playwright-report-{env}** - HTML report with all test results
- **test-results-{env}** - Raw test results, traces, screenshots
- **screenshots-{env}** - Screenshots from failed tests (only on failure)
- **videos-{env}** - Video recordings of failed tests (only on failure)

**How to download:**

1. Scroll to bottom of workflow run
2. Click on artifact name
3. Download the zip file
4. Extract and view

### 3. **View Test Summary**

Each workflow now includes a **Test Summary** that shows:

- ✅ Pass status or ❌ Failure status
- Next steps to debug
- Environment and branch information

### 4. **Reproduce Locally**

```bash
# Pull latest code
git pull origin main

# Install dependencies (if needed)
npm install

# Run the same test that failed
npm run test:dev        # For dev environment
npm run test:staging    # For staging
npm run test:prod      # For production

# Or run specific test file
npx playwright test tests/login.spec.js

# With UI mode for debugging
npm run test:ui:dev
```

## 🛠️ Enhanced Workflow Features

### Automatic Artifact Upload

All workflows now upload:

- ✅ **Playwright HTML Report** - Always (pass or fail)
- ✅ **Test Results** - Always (traces, logs)
- ✅ **Screenshots** - Only on failure
- ✅ **Videos** - Only on failure

### Test Summary

Each workflow includes a summary with:

- Test status (pass/fail)
- Next steps for debugging
- Environment information
- Branch information

### Failure Notifications

The `notify-on-failure.yml` workflow:

- Automatically comments on PRs when tests fail
- Provides direct links to workflow runs
- Suggests next steps

## 📋 Debugging Checklist

When tests fail:

- [ ] **Check workflow logs** - Look for error messages
- [ ] **Download artifacts** - Get reports, screenshots, videos
- [ ] **View HTML report** - Open `playwright-report/index.html`
- [ ] **Check screenshots** - See what the page looked like when it failed
- [ ] **Watch videos** - See the exact sequence of actions
- [ ] **Reproduce locally** - Run the same test on your machine
- [ ] **Check environment** - Verify URLs, credentials, secrets
- [ ] **Review recent changes** - What changed that might cause this?
- [ ] **Check for flakiness** - Is it consistent or intermittent?
- [ ] **Notify team** - If blocking, alert the team

## 🔧 Common Failure Scenarios

### 1. **Test Failure (Application Bug)**

**Symptoms:**

- Specific test fails consistently
- Error message points to application issue
- Screenshot shows wrong UI state

**Action:**

1. Create bug ticket
2. Attach screenshots/videos
3. Document steps to reproduce
4. Tag relevant developers

### 2. **Environment Failure**

**Symptoms:**

- Connection errors
- Timeout errors
- "Environment not available"

**Action:**

1. Check if environment is up
2. Verify secrets are set correctly
3. Check network connectivity
4. Contact DevOps/Infrastructure

### 3. **Flaky Test**

**Symptoms:**

- Fails sometimes, passes other times
- Timing-related errors
- Race conditions

**Action:**

1. Add retries (already configured)
2. Add explicit waits
3. Investigate timing issues
4. Stabilize the test

### 4. **Configuration Error**

**Symptoms:**

- "Secret not found"
- "Environment variable missing"
- Configuration errors

**Action:**

1. Check GitHub Secrets
2. Verify `.env` files locally
3. Update workflow files
4. Check environment settings

### 5. **Dependency Issue**

**Symptoms:**

- "Module not found"
- "Package installation failed"
- Version conflicts

**Action:**

1. Update `package.json`
2. Clear npm cache
3. Check Node version
4. Update dependencies

## 📊 Viewing Reports Locally

### HTML Report

```bash
# Generate report
npm run test:dev

# View report
npm run report

# Or open directly
start playwright-report/index.html  # Windows
```

### Test Results Structure

```
test-results/
├── test-name/
│   ├── trace.zip          # Full trace file
│   ├── screenshot.png     # Screenshot on failure
│   └── video.webm         # Video recording
```

## 🚨 Production Failures

When production tests fail:

1. **Immediate Actions:**

   - Download artifacts immediately
   - Check test summary
   - Review screenshots/videos
   - Notify team

2. **Investigation:**

   - Check if it's a real production issue
   - Verify if it's a test issue
   - Check recent deployments

3. **Resolution:**
   - Fix application bug (if real issue)
   - Fix test (if test issue)
   - Update configuration

## 💡 Pro Tips

1. **Always download artifacts** - They contain valuable debugging info
2. **Reproduce locally first** - Faster feedback loop
3. **Check screenshots/videos** - Visual debugging is powerful
4. **Use UI mode for debugging** - `npm run test:ui:dev`
5. **Check test summary** - Quick overview of what happened
6. **Review workflow logs** - Detailed error information
7. **Use trace viewer** - For complex debugging

## 🔗 Related Files

- `.github/workflows/*.yml` - Workflow definitions
- `playwright.config.js` - Test configuration
- `MULTI_ENV_GUIDE.md` - Environment setup guide
- `.gitignore` - Ignored files (including test-results/)

## 📝 Quick Commands

```bash
# Run tests
npm run test:dev
npm run test:staging
npm run test:prod

# View report
npm run report

# Debug mode
npm run test:debug

# UI mode
npm run test:ui:dev

# Check git status
git status

# Pull latest
git pull origin main
```
