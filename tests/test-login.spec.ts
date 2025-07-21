// import { test } from '@playwright/test';  // non fixture version
import { test } from './common/base'; // fixture version
import LoginPage from './common/pom/LoginPage';
import ProductListingPage from './common/pom/ProductListingPage';

// test.describe.configure({ mode: 'parallel' }); // Run all tests in this file in parallel

test('login using valid credentials', async ({ page }) => { // non fixture version
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.loginWithValidCredentials('standard_user', 'secret_sauce');

  const productListingPage = new ProductListingPage(page);
  await productListingPage.isInPage();
});

test('login using valid credentials (fixtures version)', async ({ loginPage, productListingPage }) => { // fixtures version
  await loginPage.goto();
  await loginPage.loginWithValidCredentials('standard_user', 'secret_sauce');

  await productListingPage.isInPage();
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
