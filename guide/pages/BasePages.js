// pages/base/BasePage.js

/**
 * Base Page - Modern version with page.locator()
 */
export class BasePage {
    constructor(page) {
        this.page = page;
    }

    /**
     * Navigate to URL
     */
    async goto(url) {
        await this.page.goto(url);
    }

    /**
     * Wait for page to load
     */
    async waitForPageLoad() {
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Get page title
     */
    async getTitle() {
        return await this.page.title();
    }

    /**
     * Get current URL
     */
    async getCurrentURL() {
        return this.page.url();
    }

    /**
     * Take screenshot
     */
    async takeScreenshot(name) {
        await this.page.screenshot({ 
            path: `screenshots/${name}.png`,
            fullPage: true 
        });
    }
}