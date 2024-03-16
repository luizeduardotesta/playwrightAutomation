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

test('Fazer um registro com sucesso', async ({ page }) => {

    await test.step('Navego para tela principal da nopCommerce', async () => {
        await page.goto('https://demo.nopcommerce.com/');
    });

    await test.step('Tela principal da nopCommerce é apresentada', async () => {
        const currentUrl = page.url();
        expect(currentUrl).toBe('https://demo.nopcommerce.com/');
    });

    await test.step('Navegar para a página de registro e se registrar', async () => {
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
    });

    await test.step('Validar se a data selecionada corresponde com o input desejado', async () => {

        const selectedDay = await page.evaluate(() => {
            const element = document.evaluate('//select[@name="DateOfBirthDay"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            return element instanceof HTMLSelectElement ? element.value : null;
        });
    
        const selectedMonth = await page.evaluate(() => {
            const element = document.evaluate('//select[@name="DateOfBirthMonth"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            return element instanceof HTMLSelectElement ? element.value : null;
        });
    
        const selectedYear = await page.evaluate(() => {
            const element = document.evaluate('//select[@name="DateOfBirthYear"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            return element instanceof HTMLSelectElement ? element.value : null;
        });
    
        const expectedDay = '1';
        const expectedMonth = '9';
        const expectedYear = '1990';
    
        expect(selectedDay).toBe(expectedDay);
        expect(selectedMonth).toBe(expectedMonth);
        expect(selectedYear).toBe(expectedYear);
    });

    await test.step('Clicar no botão de registro', async () => {
        await page.click('button#register-button');
    });

    await test.step('Verificar o resultado do registro', async () => {

        await page.waitForURL('https://demo.nopcommerce.com/registerresult/1?returnUrl=/');
        await page.waitForSelector('div.result:visible');
            
        const registerSuccessMessage = await page.textContent('div.result');
        expect(registerSuccessMessage).toContain('Your registration completed');
    });
});
