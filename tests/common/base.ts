import { test as base } from '@playwright/test';
import LoginPage from './pom/LoginPage';
import ProductListingPage from './pom/ProductListingPage';

type PomFixtures = {
    loginPage: LoginPage,
    productListingPage: ProductListingPage,
}

export const test = base.extend<PomFixtures>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    productListingPage: async ({ page }, use) => {
        await use(new ProductListingPage(page));
    },
});
