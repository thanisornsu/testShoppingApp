// pages/InventoryPage.js

import { BasePage } from './base/BasePage';
import { expect } from '@playwright/test';

/**
 * Inventory Page - Modern version
 */
export class InventoryPage extends BasePage {
    constructor(page) {
        super(page);
    }

    // ✅ Locators as arrow functions
    title = () => this.page.locator('.title');
    inventoryItems = () => this.page.locator('.inventory_item');
    itemName = () => this.page.locator('.inventory_item_name');
    itemPrice = () => this.page.locator('.inventory_item_price');
    addToCartButton = (itemName) => this.page.locator(`[data-test="add-to-cart-${itemName}"]`);
    removeButton = (itemName) => this.page.locator(`[data-test="remove-${itemName}"]`);
    cartBadge = () => this.page.locator('.shopping_cart_badge');
    cartLink = () => this.page.locator('.shopping_cart_link');
    sortDropdown = () => this.page.locator('[data-test="product_sort_container"]');
    burgerMenu = () => this.page.locator('#react-burger-menu-btn');

    /**
     * Verify inventory page is loaded
     */
    async verifyInventoryPage() {
        await expect(this.title()).toHaveText('Products');
    }

    /**
     * Get all product names
     */
    async getAllProductNames() {
        return await this.itemName().allTextContents();
    }

    /**
     * Get all product prices
     */
    async getAllProductPrices() {
        const prices = await this.itemPrice().allTextContents();
        return prices.map(price => parseFloat(price.replace('$', '')));
    }

    /**
     * Add item to cart by name
     */
    async addItemToCart(itemName) {
        await this.addToCartButton(itemName).click();
    }

    /**
     * Add multiple items to cart
     */
    async addMultipleItemsToCart(itemNames) {
        for (const itemName of itemNames) {
            await this.addItemToCart(itemName);
        }
    }

    /**
     * Remove item from cart
     */
    async removeItemFromCart(itemName) {
        await this.removeButton(itemName).click();
    }

    /**
     * Get cart item count
     */
    async getCartCount() {
        const isVisible = await this.cartBadge().isVisible();
        if (!isVisible) return 0;
        
        const count = await this.cartBadge().textContent();
        return parseInt(count);
    }

    /**
     * Click on cart
     */
    async goToCart() {
        await this.cartLink().click();
    }

    /**
     * Sort products
     */
    async sortProducts(option) {
        await this.sortDropdown().selectOption(option);
    }

    /**
     * Get product details by index
     */
    async getProductDetails(index) {
        const item = this.inventoryItems().nth(index);
        
        const name = await item.locator('.inventory_item_name').textContent();
        const priceText = await item.locator('.inventory_item_price').textContent();
        const price = parseFloat(priceText.replace('$', ''));
        
        return { name, price };
    }

    /**
     * Verify product is visible
     */
    async verifyProductVisible(productName) {
        await expect(this.inventoryItems().filter({ hasText: productName })).toBeVisible();
    }

    /**
     * Open burger menu
     */
    async openMenu() {
        await this.burgerMenu().click();
    }

    /**
     * Logout
     */
    async logout() {
        await this.openMenu();
        await this.page.waitForTimeout(500);
        await this.page.locator('#logout_sidebar_link').click();
    }
}