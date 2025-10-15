import { test, expect } from '@playwright/test';

const leoBirthday = '2015-10-22';

test.describe('Modal de dias para o aniversário', () => {
  test('Exibe mensagem padrão quando faltam dias', async ({ page }) => {
    await page.goto(`/?d1=${leoBirthday}&d2=2025-10-21`);
    
    // Abrir o modal primeiro
    await page.click('button[data-bs-toggle="modal"]');
    await page.waitForSelector('.modal.show', { state: 'visible' });
    
    // Clicar no botão do popover dentro do modal
    await page.click('[data-bs-toggle="popover"]');
    
    const popover = await page.locator('.popover');
    await expect(popover).toContainText('Quanto falta?');
    await expect(popover).toContainText('Faltam');
    await expect(popover).toContainText('dias');
    await expect(popover).toContainText('pro niver do Léo!');
    await expect(popover).not.toContainText('Parabéns para o Léo!');
  });

  test('Exibe mensagem especial no dia do aniversário', async ({ page }) => {
    await page.goto(`/?d1=${leoBirthday}&d2=2025-10-22`);
    
    // Abrir o modal primeiro
    await page.click('button[data-bs-toggle="modal"]');
    await page.waitForSelector('.modal.show', { state: 'visible' });
    
    // Clicar no botão do popover dentro do modal
    await page.click('[data-bs-toggle="popover"]');
    
    const popover = await page.locator('.popover');
    await expect(popover).toContainText('É hoje!');
    await expect(popover).toContainText('Parabéns para o Léo!');
    await expect(popover).not.toContainText('Faltam');
    await expect(popover).not.toContainText('dias');
    await expect(popover).not.toContainText('pro niver do Léo!');
  });

  test('Exibe mensagem especial em inglês no dia do aniversário', async ({ page }) => {
    await page.goto(`/index_en.html?d1=${leoBirthday}&d2=2025-10-22`);
    
    // Abrir o modal primeiro
    await page.click('button[data-bs-toggle="modal"]');
    await page.waitForSelector('.modal.show', { state: 'visible' });
    
    // Clicar no botão do popover dentro do modal
    await page.click('[data-bs-toggle="popover"]');
    
    const popover = await page.locator('.popover');
    await expect(popover).toContainText("It's today!");
    await expect(popover).toContainText("Parabéns para o Léo!");
    await expect(popover).not.toContainText('There are');
    await expect(popover).not.toContainText('days');
    await expect(popover).not.toContainText("until Léo's birthday!");
  });
});
