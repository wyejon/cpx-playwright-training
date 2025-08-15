import { expect, Locator, Page } from '@playwright/test';

export default class ProductListingPage {
    private readonly _page: Page;

    // Locators
    private readonly _title: Locator;
    private readonly _inventoryList: Locator;
    private readonly _inventoryItems: Locator;
    private readonly _inventoryItemNames: Locator;
    private readonly _shoppingCartBadge: Locator
    private readonly _productSortContainer: Locator;

    constructor(page: Page) {
        this._page = page;

        this._title = page.getByTestId('title');
        this._inventoryList = page.getByTestId('inventory-list');
        this._inventoryItems = this._inventoryList.getByTestId('inventory-item'); // chaining locators to find child elements
        this._inventoryItemNames = this._inventoryItems.getByTestId('inventory-item-name'); // two-level chain
        this._shoppingCartBadge = page.locator('span.shopping_cart_badge'); // just for variety, using a CSS selector here
        this._productSortContainer = page.getByTestId('product-sort-container');
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

    /**
     * Advanced chaining of locators to find the "Add to cart" button for a specific product by its name.
     * 
     * @param buttonLabel Label of the button, e.g., "Add to cart" or "Remove"
     * @param productName Product name to locate the button for
     * @returns Locator for the "Add to cart" button of the specified product
     */
    private async locateCartButtonForProductName(buttonLabel: string, productName: string): Promise<Locator> {
        // First find the product by its name
        const inventoryItemNameLocator = this._page.getByText(productName, { exact: true });
        // Find the parent inventory item that contains this product name (reverse chaining, this is super useful!)
        const inventoryItemLocator = this._inventoryItems.filter({ has: inventoryItemNameLocator });
        // Now find the "Add to cart" button within that inventory item
        return inventoryItemLocator.getByRole('button', { name: buttonLabel, exact: true });
    }

    /**
     * Finds the "Add to cart" button for a specific product and clicks it.
     * 
     * @param productName Name of the product to add to the cart
     */
    async addToCart(productName: string) {
        const buttonLocator = await this.locateCartButtonForProductName('Add to cart', productName);
        await buttonLocator.click();
    }

    /**
     * Finds the "Remove" button for a specific product and clicks it.
     * 
     * @param productName Name of the product to remove from the cart
     */
    async removeFromCart(productName: string) {
        const buttonLocator = await this.locateCartButtonForProductName('Remove', productName);
        await buttonLocator.click();
    }

    /**
     * Checks if the shopping cart badge is visible and contains the expected number of items.
     * 
     * @param expectedCount The expected number of items in the shopping cart.
     */
    async validateShoppingCartBadge(expectedCount: number) {
        await expect(this._shoppingCartBadge).toBeVisible();
        await expect(this._shoppingCartBadge).toHaveText(expectedCount.toString());
    }

    /**
     * Select an option from the product sort dropdown.
     * 
     * @param option The option to select from the product sort dropdown, e.g., "az", "za", "lohi", "hilo".
     */
    async selectProductSortOption(option: string) {
        await this._productSortContainer.selectOption(option);
    }

    async getInventoryItemNames(): Promise<string[]> {
        const names = await this._inventoryItemNames.allTextContents();
        return names.map(name => name.trim()); // Trim whitespace from each name
    }
}
