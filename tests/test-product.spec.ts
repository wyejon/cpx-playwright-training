import { test } from './common/base';

// Runs before each individual test, logs in with valid credentials
test.beforeEach(async ({ loginPage, productListingPage }) => {
  await loginPage.goto();
  await loginPage.loginWithValidCredentials('standard_user', 'secret_sauce');
  await productListingPage.isInPage();
});

test('ensure 6 products on listing page', async ({ productListingPage }) => {
  await productListingPage.validateProductCount(6);
});
