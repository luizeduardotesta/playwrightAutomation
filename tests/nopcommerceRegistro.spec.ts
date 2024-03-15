import { expect, test } from '@playwright/test';
import { faker } from '@faker-js/faker/locale/en';

test.use({
    locale: 'pt-BR',
    headless: true
});

test.beforeEach(async ({ page }) => {
    // Nada precisa ser feito aqui.
});

test.afterEach(async ({ page }) => {
    await page.close();
});

test('Fazer um registro com sucesso', async ({ page }) => {

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

        await page.click('input#gender-male');
        await page.fill('input#FirstName', 'Luiz');
        await page.fill('input#LastName', 'Testa');
        await page.selectOption('//select[@name="DateOfBirthDay"]', '1');
        await page.selectOption('//select[@name="DateOfBirthMonth"]', 'September');
        await page.selectOption('//select[@name="DateOfBirthYear"]', '1990');
        await page.fill('input#Email', email);
        await page.fill('input#Company', 'QA.Coders');
        await page.check('input#Newsletter');
        await page.fill('input#Password', 'Test@12345');
        await page.fill('input#ConfirmPassword', 'Test@12345');
        await page.click('button#register-button');

    });

});
