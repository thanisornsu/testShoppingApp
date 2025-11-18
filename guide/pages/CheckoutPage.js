// pages/CheckoutPage.js

import { BasePage } from './base/BasePage';
import { expect } from '@playwright/test';

/**
 * Checkout Page - Modern version
 */
export class CheckoutPage extends BasePage {
    constructor(page) {
        super(page);
    }

    // ✅ Locators as arrow functions
    // Step 1: Information
    firstNameInput = () => this.page.locator('[data-test="firstName"]');
    lastNameInput = () => this.page.locator('[data-test="lastName"]');
    postalCodeInput = () => this.page.locator('[data-test="postalCode"]');
    continueButton = () => this.page.locator('[data-test="continue"]');
    cancelButton = () => this.page.locator('[data-test="cancel"]');
    errorMessage = () => this.page.locator('[data-test="error"]');
    
    // Step 2: Overview
    title = () => this.page.locator('.title');
    cartItems = () => this.page.locator('.cart_item');
    itemTotal = () => this.page.locator('.summary_subtotal_label');
    tax = () => this.page.locator('.summary_tax_label');
    total = () => this.page.locator('.summary_total_label');
    finishButton = () => this.page.locator('[data-test="finish"]');
    
    // Step 3: Complete
    completeHeader = () => this.page.locator('.complete-header');
    completeText = () => this.page.locator('.complete-text');
    backHomeButton = () => this.page.locator('[data-test="back-to-products"]');

    /**
     * Fill checkout information
     */
    async fillCheckoutInformation(info) {
        await this.firstNameInput().fill(info.firstName);
        await this.lastNameInput().fill(info.lastName);
        await this.postalCodeInput().fill(info.postalCode);
    }

    /**
     * Continue to overview
     */
    async continueToOverview() {
        await this.continueButton().click();
    }

    /**
     * Complete checkout step 1
     */
    async completeCheckoutStep1(info) {
        await this.fillCheckoutInformation(info);
        await this.continueToOverview();
    }

    /**
     * Get subtotal price
     */
    async getSubtotal() {
        const text = await this.itemTotal().textContent();
        const match = text.match(/\$(\d+\.?\d*)/);
        return match ? parseFloat(match[1]) : 0;
    }

    /**
     * Get tax amount
     */
    async getTax() {
        const text = await this.tax().textContent();
        const match = text.match(/\$(\d+\.?\d*)/);
        return match ? parseFloat(match[1]) : 0;
    }

    /**
     * Get total amount
     */
    async getTotal() {
        const text = await this.total().textContent();
        const match = text.match(/\$(\d+\.?\d*)/);
        return match ? parseFloat(match[1]) : 0;
    }

    /**
     * Finish checkout
     */
    async finishCheckout() {
        await this.finishButton().click();
    }

    /**
     * Verify order completion
     */
    async verifyOrderComplete() {
        await expect(this.completeHeader()).toContainText('Thank you');
    }

    /**
     * Get completion message
     */
    async getCompletionMessage() {
        return await this.completeText().textContent();
    }

    /**
     * Go back home
     */
    async backToHome() {
        await this.backHomeButton().click();
    }

    /**
     * Cancel checkout
     */
    async cancelCheckout() {
        await this.cancelButton().click();
    }

    /**
     * Verify checkout page
     */
    async verifyCheckoutPage() {
        await expect(this.title()).toContainText('Checkout');
    }
}