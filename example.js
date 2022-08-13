const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: false
  });
  const context = await browser.newContext();

  // Open new page
  const page = await context.newPage();

  // Go to https://menardsdev.wtsparadigm.com/test-init
  await page.goto('https://menardsdev.wtsparadigm.com/test-init');

  // Click input[name="storeNumber"]
  await page.locator('input[name="storeNumber"]').click();

  // Fill input[name="storeNumber"]
  await page.locator('input[name="storeNumber"]').fill('3011');

  // Click input[name="guestAccountId"]
  await page.locator('input[name="guestAccountId"]').click();

  // Fill input[name="guestAccountId"]
  await page.locator('input[name="guestAccountId"]').fill('12345');

  // Click text=Submit
  await page.locator('text=Submit').click();
  // assert.equal(page.url(), 'https://menardsdev.wtsparadigm.com/home');

  // Click text=Search Saved Designs
  await page.locator('text=Search Saved Designs').click();
  // assert.equal(page.url(), 'https://menardsdev.wtsparadigm.com/quotes/designs');

  // Click .alert
  await page.locator('.alert').click();

  // Click [placeholder="Design\ ID"]
  await page.locator('[placeholder="Design\\ ID"]').click();

  // Fill [placeholder="Design\ ID"]
  await page.locator('[placeholder="Design\\ ID"]').fill('301156822126');

  // Click input:has-text("Recall Design")
  await page.locator('input:has-text("Recall Design")').click();
  // assert.equal(page.url(), 'https://menardsdev.wtsparadigm.com/quotes/designs');

  // Click .alert
  await page.locator('.alert').click();

  // Click .alert
  await page.locator('.alert').click();

  // Click [placeholder="Design\ ID"]
  await page.locator('[placeholder="Design\\ ID"]').click();

  // ---------------------
  await context.close();
  await browser.close();
})();