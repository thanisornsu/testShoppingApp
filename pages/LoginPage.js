import { expect, test } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
  constructor(page) {
    super(page);
  }
  // Locator LoginPage
  // ✅ Locators as arrow functions (Modern way)

  username = () => this.page.locator("#user-name");
  password = () => this.page.locator("#password");
  loginButton = () => this.page.locator("#login-button");
  errorMessage = () => this.page.locator('[data-test="error"]');
  errorButton = () => this.page.locator(".error-button");
  logo = () => this.page.locator(".login_logo");

  async login(username, password) {
    await this.username().fill(username);
    await this.password().fill(password);
    await this.loginButton().click();
  }

  async navigate() {
    await this.goto("https://www.saucedemo.com/");
    await this.waitForPageLoad();
  }

  async loginAsStandardUser() {
    await this.login("standard_user", "secret_sauce");
  }

  async verifyLoginPage() {
    await expect(this.logo()).toBeVisible();
    await expect(this.username()).toBeVisible();
    await expect(this.password()).toBeVisible();
    await expect(this.loginButton()).toBeVisible();
  }

  async verifyErrorVisible() {
    await expect(this.errorMessage()).toBeVisible();
  }

  async verifyErrorContains(text) {
    await expect(this.errorMessage()).toContainText(text);
  }

  async closeError() {
    await this.errorButton().click();
  }

  async getErrorMessage() {
    return await this.errorMessage().textContent();
  }
}
