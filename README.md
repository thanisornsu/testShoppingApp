## testShoppingApp

A Playwright testing project for web UI automation. Includes example tests, page objects, and a Playwright configuration with HTML reporting.

### Project Structure

```text
.
├─ basicFunction.js
├─ guide/
│  ├─ pages/
│  │  ├─ BasePages.js
│  │  ├─ CartPage.js
│  │  ├─ CheckoutPage.js
│  │  ├─ InventoryPage.js
│  │  ├─ LoginPage.js
│  │  └─ fixtures/
│  │     └─ testData.js
│  └─ tests/
│     └─ login.spec.js
├─ pages/
│  ├─ BasePage.js
│  └─ LoginPage.js
├─ tests/
│  ├─ example.spec.js
│  ├─ jsonplaceholder.spec.js
│  └─ swagLabs.spec.js
├─ login.ts
├─ login.spec.ts
├─ playwright.config.js
├─ playwright-report/
│  └─ index.html
├─ test-results/
├─ package.json
├─ package-lock.json
└─ pattern.md
```

### Key Files

- `playwright.config.js`: Central Playwright test configuration (test directory, reporters, projects).
- `tests/`: Primary Playwright test specs.
- `pages/`: Page Object Model (POM) helpers for tests.
- `guide/`: A parallel example set of pages/specs used as a reference/guide.
- `playwright-report/`: HTML reports produced after a run.
- `test-results/`: Raw artifacts like traces, screenshots, and videos.

### Prerequisites

- Node.js 18+ recommended

### Install

```bash
npm install
npx playwright install
```

The second command installs the required browser binaries for Playwright.

### Run Tests

```bash
# Run all tests
npx playwright test

# Run a single file
npx playwright test tests/swagLabs.spec.js

# UI mode (interactive)
npx playwright test --ui
```

### View HTML Report

```bash
# Open the last test report
npx playwright show-report
```

Alternatively, open `playwright-report/index.html` in your browser after a completed run.

### Notes

- This repo currently does not define npm scripts in `package.json`. Commands above use `npx` directly.
- The `guide/` folder contains tutorial-style examples; the `tests/` folder is the primary suite.
