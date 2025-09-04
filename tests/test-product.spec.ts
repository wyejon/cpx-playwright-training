import { expect } from '@playwright/test';
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
  await productListingPage.validateShoppingCartBadge(0);
});

test('test product sorting - a to z', async ({ productListingPage }) => {
  await productListingPage.selectProductSortOption('az');
  const inventoryItemNames = await productListingPage.getInventoryItemNames();

  // Note: as a principal, we don't want reimplement the sorting logic here, just validate the result
  // hence we are hardcoding the expected results for assertions
  expect(inventoryItemNames[0]).toEqual('Sauce Labs Backpack');
  expect(inventoryItemNames[1]).toEqual('Sauce Labs Bike Light');
  expect(inventoryItemNames[2]).toEqual('Sauce Labs Bolt T-Shirt');
  expect(inventoryItemNames[3]).toEqual('Sauce Labs Fleece Jacket');
  expect(inventoryItemNames[4]).toEqual('Sauce Labs Onesie');
  expect(inventoryItemNames[5]).toEqual('Test.allTheThings() T-Shirt (Red)');
});

// Homework
// ========
test('test product sorting - z to a', async ({ productListingPage }) => {
  await productListingPage.selectProductSortOption('za');
  const inventoryItemNames = await productListingPage.getInventoryItemNames();

  // Note: as a principal, we don't want reimplement the sorting logic here, just validate the result
  // hence we are hardcoding the expected results for assertions
  expect(inventoryItemNames[0]).toEqual('Test.allTheThings() T-Shirt (Red)');
  expect(inventoryItemNames[1]).toEqual('Sauce Labs Onesie');
  expect(inventoryItemNames[2]).toEqual('Sauce Labs Fleece Jacket');
  expect(inventoryItemNames[3]).toEqual('Sauce Labs Bolt T-Shirt');
  expect(inventoryItemNames[4]).toEqual('Sauce Labs Bike Light');
  expect(inventoryItemNames[5]).toEqual('Sauce Labs Backpack');
});

// Homework
// ========
// Test sorting by product price, low to high
test('test product sorting - lo to hi', async ({ productListingPage }) => {
  await productListingPage.selectProductSortOption('lohi');
  const inventoryItemPrices = await productListingPage.getInventoryItemPrices();

  // Note: as a principal, we don't want reimplement the sorting logic here, just validate the result
  // hence we are hardcoding the expected results for assertions
  expect(inventoryItemPrices[0]).toEqual(7.99);
  expect(inventoryItemPrices[1]).toEqual(9.99);
  expect(inventoryItemPrices[2]).toEqual(15.99);
  expect(inventoryItemPrices[3]).toEqual(15.99);
  expect(inventoryItemPrices[4]).toEqual(29.99);
  expect(inventoryItemPrices[5]).toEqual(49.99);
});

// Homework
// ========
// Test sorting by product price, high to low
