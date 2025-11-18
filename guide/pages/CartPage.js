// pages/CartPage.js

import { BasePage } from './base/BasePage';
import { expect } from '@playwright/test';

/**
 * Cart Page - Modern version
 */
export class CartPage extends BasePage {
    constructor(page) {
        super(page);
    }

    // ✅ Locators as arrow functions
    title = () => this.page.locator('.title');
    cartItems = () => this.page.locator('.cart_item');
    itemName = () => this.page.locator('.inventory_item_name');
    itemPrice = () => this.page.locator('.inventory_item_price');
    itemQuantity = () => this.page.locator('.cart_quantity');
    removeButton = (itemName) => this.page.locator(`[data-test="remove-${itemName}"]`);
    continueShoppingButton = () => this.page.locator('[data-test="continue-shopping"]');
    checkoutButton = () => this.page.locator('[data-test="checkout"]');

    /**
     * Verify cart page is loaded
     */
    async verifyCartPage() {
        await expect(this.title()).toHaveText('Your Cart');
    }

    /**
     * Get all items in cart
     */
    async getCartItems() {
        const items = await this.cartItems().all();
        const cartItems = [];
        
        for (const item of items) {
            const name = await item.locator('.inventory_item_name').textContent();
            const priceText = await item.locator('.inventory_item_price').textContent();
            const price = parseFloat(priceText.replace('$', ''));
            const quantityText = await item.locator('.cart_quantity').textContent();
            const quantity = parseInt(quantityText);
            
            cartItems.push({ name, price, quantity });
        }
        
        return cartItems;
    }

    /**
     * Get cart item count
     */
    async getCartItemCount() {
        return await this.cartItems().count();
    }

    /**
     * Remove item from cart
     */
    async removeItem(itemName) {
        await this.removeButton(itemName).click();
    }

    /**
     * Continue shopping
     */
    async continueShopping() {
        await this.continueShoppingButton().click();
    }

    /**
     * Proceed to checkout
     */
    async proceedToCheckout() {
        await this.checkoutButton().click();
    }

    /**
     * Calculate total price
     */
    async getTotalPrice() {
        const items = await this.getCartItems();
        return items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    /**
     * Verify item is in cart
     */
    async verifyItemInCart(itemName) {
        await expect(this.cartItems().filter({ hasText: itemName })).toBeVisible();
    }
}