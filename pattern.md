playwright-pom-project/
├── pages/                          # Page Objects
│   ├── base/
│   │   └── BasePage.js            # Base class สำหรับทุก page
│   ├── LoginPage.js
│   ├── InventoryPage.js
│   ├── CartPage.js
│   ├── CheckoutPage.js
│   └── components/                 # Reusable components
│       ├── Header.js
│       └── Footer.js
├── tests/                          # Test files
│   ├── auth/
│   │   └── login.spec.js
│   ├── e2e/
│   │   └── checkout.spec.js
│   └── smoke/
│       └── inventory.spec.js
├── fixtures/                       # Test data & fixtures
│   ├── testData.js
│   └── users.json
├── utils/                          # Utilities
│   ├── helpers.js
│   └── constants.js
├── playwright.config.js            # Playwright config
├── package.json
└── README.md