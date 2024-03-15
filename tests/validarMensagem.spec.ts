import { expect, test } from '@playwright/test';
import { faker } from '@faker-js/faker/locale/en';

test.use({
    locale: 'pt-BR',
    headless: true
});

test.beforeEach(async ({ page }) => {
    
});

test.afterEach(async ({ page }) => {
    await page.close();
});

test('Registro de usuário com campos obrigatórios em branco', async ({ page }) => {
    
    await test.step('Navego para tela principal da nopCommerce', async () => {
        await page.goto('https://demo.nopcommerce.com/');
    });

    await test.step('Tela principal da nopCommerce é apresentada', async () => {
        const currentUrl = page.url();
        expect(currentUrl).toBe('https://demo.nopcommerce.com/');
    });

    await test.step('Navegar para a página de registro', async () => {
        const email: string = faker.internet.email();

        await page.click('a[class="ico-register"]');
        await page.waitForLoadState('domcontentloaded');

        await page.click('button#register-button');
        
        const firstNameError = await page.evaluate(() => {
            const element = document.querySelector('span[data-valmsg-for="FirstName"]');
            return element ? element.textContent?.trim() : null;
        });
        expect(firstNameError).toContain('First name is required.');

        const lastNameError = await page.evaluate(() => {
            const element = document.querySelector('span[data-valmsg-for="LastName"]');
            return element ? element.textContent?.trim() : null;
        });
        expect(lastNameError).toContain('Last name is required.');

        const emailError = await page.evaluate(() => {
            const element = document.querySelector('span[data-valmsg-for="Email"]');
            return element ? element.textContent?.trim() : null;
        });
        expect(emailError).toContain('Email is required.');

        const passwordError = await page.evaluate(() => {
            const element = document.querySelector('span[data-valmsg-for="Password"]');
            return element ? element.textContent?.trim() : null;
        });
        expect(passwordError).toContain('Password is required.');

        const confirmPasswordError = await page.evaluate(() => {
            const element = document.querySelector('span[data-valmsg-for="ConfirmPassword"]');
            return element ? element.textContent?.trim() : null;
        });
        expect(confirmPasswordError).toContain('Password is required.');

    });
});