import { test, expect } from '@playwright/test';

test.describe('Version span style', () => {
  test('result-version should have gray background', async ({ page, baseURL }) => {
    await page.goto(baseURL + '/');
    const resultVersion = await page.locator('#result-version');
    const bgColor = await resultVersion.evaluate(el => getComputedStyle(el).backgroundColor);
    expect(bgColor).toBe('rgb(238, 238, 238)'); // #eee
  });

  test('leo-version should have gray background', async ({ page, baseURL }) => {
    await page.goto(baseURL + '/');
    const leoVersion = await page.locator('#leo-version');
    const bgColor = await leoVersion.evaluate(el => getComputedStyle(el).backgroundColor);
    expect(bgColor).toBe('rgb(238, 238, 238)'); // #eee
  });

  test('hero section should have same gray background as version spans', async ({ page, baseURL }) => {
    await page.goto(baseURL + '/');
    const hero = await page.locator('.bg-version').first();
    const bgColor = await hero.evaluate(el => getComputedStyle(el).backgroundColor);
    expect(bgColor).toBe('rgb(238, 238, 238)'); // #eee - same as .version
  });
});
