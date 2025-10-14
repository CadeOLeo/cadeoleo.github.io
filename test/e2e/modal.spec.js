import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:5173');
});

test('deve mostrar o modal quando o botão é clicado', async ({ page }) => {
    // Verifica se o modal está oculto inicialmente
    await expect(page.locator('#leo-modal')).toBeHidden();

    // Clica no botão para abrir o modal
    const button = await page.getByText('veja a versão do Léo »');
    await button.click();

    // Verifica se o modal está visível
    await expect(page.locator('#leo-modal')).toBeVisible();
    await expect(page.locator('#leo-modal')).toHaveAttribute('aria-modal', 'true');
});

test('deve mostrar a versão correta do Leo', async ({ page }) => {
    // Abre o modal
    await page.click('text=veja a versão do Léo');
    
    // Verifica se a versão está no formato correto
    const versionText = await page.locator('#leo-version').textContent();
    expect(versionText).toMatch(/^v\d+\.\d+\.\d+$/);
    expect(versionText).not.toBe('v0.0.0');
});

test('deve fechar o modal ao clicar no botão de fechar', async ({ page }) => {
    // Abre o modal
    await page.click('text=veja a versão do Léo');
    await expect(page.locator('#leo-modal')).toBeVisible();
    
    // Fecha o modal
    await page.click('.btn-close');
    
    // Verifica se o modal está fechado
    await expect(page.locator('#leo-modal')).not.toBeVisible();
});

test('deve mostrar o popover ao clicar no botão de parabéns', async ({ page }) => {
    // Abre o modal
    await page.click('text=veja a versão do Léo');
    
    // Clica no botão do popover
    await page.click('button[data-bs-toggle="popover"]');
    
    // Verifica se o popover está visível
    await expect(page.locator('.popover')).toBeVisible();
    await expect(page.locator('.popover-body')).toContainText('dias');
});
