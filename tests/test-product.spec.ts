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

test('test the cart badge count by adding/removing products', async ({ productListingPage }) => {
  await productListingPage.addToCart('Sauce Labs Backpack');
  await productListingPage.validateShoppingCartBadge(1);

  await productListingPage.addToCart('Sauce Labs Bike Light');
  await productListingPage.validateShoppingCartBadge(2);

  await productListingPage.addToCart('Sauce Labs Bolt T-Shirt');
  await productListingPage.validateShoppingCartBadge(3);

  await productListingPage.removeFromCart('Sauce Labs Backpack');
  await productListingPage.validateShoppingCartBadge(2);

  await productListingPage.removeFromCart('Sauce Labs Bike Light');
  await productListingPage.validateShoppingCartBadge(1);

  await productListingPage.removeFromCart('Sauce Labs Bolt T-Shirt');
  // Homework
  // ========
  // How can we check to ensure that the shopping cart badge count is now 0?
  // await productListingPage.validateShoppingCartBadge(0);
});