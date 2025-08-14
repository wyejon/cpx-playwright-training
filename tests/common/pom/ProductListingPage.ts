import { expect, Locator, Page } from '@playwright/test';

export default class ProductListingPage {
    private readonly _page: Page;

    // Locators
    private readonly _title: Locator;
    private readonly _inventoryList: Locator;
    private readonly _inventoryItems: Locator;

    constructor(page: Page) {
        this._page = page;

        this._title = page.getByTestId('title');
        this._inventoryList = page.getByTestId('inventory-list');
        this._inventoryItems = this._inventoryList.getByTestId('inventory-item'); // chaining locators to find child elements
    }

    /**
     * Checks the title of the page to confirm we are on the Product Listing Page.
     */
    async isInPage() {
        await expect(this._title).toBeVisible();
        await expect(this._title).toHaveText('Products');
    }

    /**
     * Asserts that the number of products displayed on the page matches the expected count.
     * 
     * @param expectedCount The expected number of products to be displayed on the page.
     */
    async validateProductCount(expectedCount: number) {
        await expect(this._inventoryItems).toHaveCount(expectedCount);
    }
}
