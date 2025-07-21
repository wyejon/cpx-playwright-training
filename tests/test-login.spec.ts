import { test } from '@playwright/test';
import LoginPage from './common/pom/LoginPage';

// test.describe.configure({ mode: 'parallel' }); // Run all tests in this file in parallel

test('login using valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.loginWithValidCredentials('standard_user', 'secret_sauce');
});

test('login without username', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.loginWithInvalidCredentials('', '', 'Epic sadface: Username is required');
});

test('login with username but no password', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.loginWithInvalidCredentials('anything', '', 'Epic sadface: Password is required');
});

test('login using invalid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.loginWithInvalidCredentials('wrong_username', 'wrong_password', 'Epic sadface: Username and password do not match any user in this service');
});
