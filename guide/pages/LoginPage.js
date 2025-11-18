// pages/LoginPage.js

import { BasePage } from './base/BasePage';
import { expect } from '@playwright/test';

/**
 * Login Page - Modern version
 */
export class LoginPage extends BasePage {
    constructor(page) {
        super(page);
    }

    // ✅ Locators as arrow functions (Modern way)
    username = () => this.page.locator('#user-name');
    password = () => this.page.locator('#password');
    loginButton = () => this.page.locator('#login-button');
    errorMessage = () => this.page.locator('[data-test="error"]');
    errorButton = () => this.page.locator('.error-button');
    logo = () => this.page.locator('.login_logo');

    /**
     * Navigate to login page
     */
    async navigate() {
        await this.goto('https://www.saucedemo.com/');
        await this.waitForPageLoad();
    }

    /**
     * Login with credentials
     */
    async login(username, password) {
        await this.username().fill(username);
        await this.password().fill(password);
        await this.loginButton().click();
    }

    /**
     * Quick login with standard user
     */
    async loginAsStandardUser() {
        await this.login('standard_user', 'secret_sauce');
    }

    /**
     * Get error message text
     */
    async getErrorMessage() {
        return await this.errorMessage().textContent();
    }

    /**
     * Close error message
     */
    async closeError() {
        await this.errorButton().click();
    }

    /**
     * Verify login page is loaded
     */
    async verifyLoginPage() {
        await expect(this.logo()).toBeVisible();
        await expect(this.username()).toBeVisible();
        await expect(this.password()).toBeVisible();
        await expect(this.loginButton()).toBeVisible();
    }

    /**
     * Verify error is visible
     */
    async verifyErrorVisible() {
        await expect(this.errorMessage()).toBeVisible();
    }

    /**
     * Verify error message contains text
     */
    async verifyErrorContains(text) {
        await expect(this.errorMessage()).toContainText(text);
    }
}