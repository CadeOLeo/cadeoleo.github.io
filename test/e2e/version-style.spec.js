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

  test('jumbotron should have gray background', async ({ page, baseURL }) => {
    await page.goto(baseURL + '/');
    const jumbotron = await page.locator('.jumbotron').first();
    const bgColor = await jumbotron.evaluate(el => getComputedStyle(el).backgroundColor);
    expect(bgColor).toBe('rgb(245, 245, 245)'); // #f5f5f5
  });
});
