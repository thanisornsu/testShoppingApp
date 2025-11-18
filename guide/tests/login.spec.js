// tests/auth/login.spec.js

import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { TestData } from '../../fixtures/testData';

test.describe('Login Tests', () => {
    let loginPage;
    let inventoryPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        
        await loginPage.navigate();
    });

    test('TC001: Successful login with valid credentials', async () => {
        // Arrange
        const { username, password } = TestData.users.standard;
        
        // Act
        await loginPage.login(username, password);
        
        // Assert
        await inventoryPage.verifyInventoryPage();
        expect(await inventoryPage.getCurrentURL()).toContain('inventory');
    });

    test('TC002: Login fails with invalid credentials', async () => {
        // Act
        await loginPage.login('invalid_user', 'wrong_password');
        
        // Assert
        await loginPage.verifyErrorVisible();
        await loginPage.verifyErrorContains('Username and password do not match');
    });

    test('TC003: Login fails with locked out user', async () => {
        // Arrange
        const { username, password } = TestData.users.locked;
        
        // Act
        await loginPage.login(username, password);
        
        // Assert
        await loginPage.verifyErrorVisible();
        await loginPage.verifyErrorContains('locked out');
    });

    test('TC004: Error message can be closed', async () => {
        // Act
        await loginPage.login('', '');
        await loginPage.verifyErrorVisible();
        
        await loginPage.closeError();
        
        // Assert
        await expect(loginPage.errorMessage()).not.toBeVisible();
    });
});