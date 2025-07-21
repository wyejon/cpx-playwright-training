import { expect, Locator, Page } from '@playwright/test';

export default class LoginPage {
    private readonly _page: Page;

    // Locators
    private readonly _usernameInput: Locator;
    private readonly _passwordInput: Locator;
    private readonly _loginButton: Locator;
    private readonly _errorMessage: Locator;

    constructor(page: Page) {
        this._page = page;

        // TODO: test these different selectors to confirm they work as expected

        // There are several styles of selectors you can use in Playwright.  
        // You should always aim to use the selector that is most specific to the element you are trying to interact with.
        // Here are some examples:

        // Using user perceived attributes for selectors (Playwright's preferred method)
        // ================================================================================
        this._usernameInput = page.getByRole('textbox', { name: 'Username' });
        this._passwordInput = page.getByRole('textbox', { name: 'Password' });
        this._loginButton = page.getByRole('button', { name: 'Login' });
        this._errorMessage = page.getByRole('heading', { name: 'Epic sadface' }); // not a good selector as it depends on the error message being consistent

        // Using test id attributes for selectors
        // Note: for saucedemo.com we use the attribute "data-test" instead of "data-testid"
        // ================================================================================
        // this._usernameInput = page.getByTestId('username');
        // this._passwordInput = page.getByTestId('password');
        // this._loginButton = page.getByTestId('login-button');
        // this._errorMessage = page.getByTestId('error');  // this is the most specific selector for this element

        // Using CSS selectors
        // ================================================================================
        // this._usernameInput = page.locator('#user-name');
        // this._passwordInput = page.locator('#password');
        // this._loginButton = page.locator('#login-button');
        // this._errorMessage = page.locator('.error-message-container');
    }

    /**
     * Navigate to the login page.
     */
    async goto() {
        await this._page.goto('https://www.saucedemo.com/');
    }

    /**
     * Fill up the login form and submit it.
     * 
     * @param username value of username
     * @param password value of password
     */
    private async login(username: string, password: string) {
        await this._usernameInput.fill(username); // fill instantly populates the input field
        await this._passwordInput.pressSequentially(password);  // pressSequentially emulates typing
        await this._loginButton.click();
    }

    /**
     * Login with valid credentials and assure no error message is displayed.
     * 
     * @param username value of username
     * @param password value of password
     */
    async loginWithValidCredentials(username: string, password: string) {
        await this.login(username, password);
        await expect(this._errorMessage).toBeHidden();
    }

    /**
     * Login with invalid credentials and check for the expected error message.
     * 
     * @param username value of username
     * @param password value of password
     * @param errorMessage value of expected error message
     */
    async loginWithInvalidCredentials(username: string, password: string, errorMessage: string) {
        await this.login(username, password);
        await expect(this._errorMessage).toBeVisible()

        if (errorMessage) { // if errorMessage is provided, check it
            await expect(this._errorMessage).toHaveText(errorMessage);
        }
    }
}
