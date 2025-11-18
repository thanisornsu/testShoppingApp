/**
 * Base Page - Parent class for all page objects
 * Contains common methods and utilities
 *
 */
export class BasePage {
    constructor (page) {
        this.page = page;
    }

    async goto(url){
        await this.page.goto(locator);
    }

    async waitForPageLoad() {
        await this.page.waitForPageLStat('networkidle');

    }

    async getTitle() {
        return await this.page.title();
    }
    
    async getCurrentURL(){
        return await this.page.url();
    }

    async takeScreenshot(name) {
        await this.page.takeScreenshot({
            path: `screenshots/${name}.png`,
            fullPage: true
        });

    }
 
}
