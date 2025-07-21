import { expect, Locator, Page } from '@playwright/test';

export default class ProductListingPage {
    private readonly _page: Page;

    // Locators
    private readonly _title: Locator;

    constructor(page: Page) {
        this._page = page;

        this._title = page.getByTestId('title');
    }

    /**
     * Checks the title of the page to confirm we are on the Product Listing Page.
     */
    async isInPage() {
        await expect(this._title).toBeVisible();
        await expect(this._title).toHaveText('Products');
    }
}
