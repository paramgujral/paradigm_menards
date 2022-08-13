
import { test, expect } from '@playwright/test';
import { allLogins, buildStateFilePath, MenardsAppNames } from '../../utils/menards/test-init-constants';
import * as summaryTestsSpecs from '../summary/summary'
import * as purchaseTests from '../purchase/purchase'

async function verifyConfiguratorUrlForWindows(page) {
  return await expect(page).toHaveURL(/\/quotes\/.*\/configure\/product-select\/MenardsWindows$/);
}

// Used to start a new quote and launch the configurator
async function startQuote(page) {
  // navigate to the starting point with a new quote
  await page.goto('/home');
  await page.click('text=Start Designing');
  
}

async function navigateToMostPopularSizesStylesPage(page) {
  await page.locator('text=Most Popular Sizes/StylesSelectThe most common styles ready to order —- simply e >> a').click();
  await expect(page).toHaveURL(/\/quotes\/.*\/sku-search$/);
}

//------------------------------------------
// Tests
//------------------------------------------

test.describe.configure({ mode: 'serial' });

// TODO: When initialization is debugged, remove this line in favor of the above loop.
const state = allLogins[5];
const stateFilePath = buildStateFilePath({ ...state, appName: MenardsAppNames.windows });
// Load windows storage state
test.use({ storageState: stateFilePath });

// All Most Popular Sizes/Styles Tests
test.describe('Windows-Most Popular Sizes/Styles Rebate Tests', () => {

  
  test('Windows-Popular-test-Verifying-Online purchase Tab for Rebate', async ({ page }) => {
    await startQuote(page);
    await navigateToMostPopularSizesStylesPage(page);
    test.setTimeout(2 * 60 * 2000);
    await page.waitForSelector('#spinner', { state: 'hidden' });
    await page.locator('td:nth-child(5) > .btn').first().click();
    test.setTimeout(2 * 60 * 2000);
    await page.waitForSelector('#spinner', { state: 'hidden' });
    await summaryTestsSpecs.verifyAccessibilityOfSummaryTab(page)
    await page.click('text=×Close');
    test.setTimeout(2 * 60 * 4000);
    await purchaseTests.verifyPurchaseForRebate(page)
  })

  test('Windows-Popular-test-Verifying-Summary Rebate', async ({ page }) => {
    await startQuote(page);
    await navigateToMostPopularSizesStylesPage(page);
    test.setTimeout(2 * 60 * 2000);
    await page.waitForSelector('#spinner', { state: 'hidden' });
    await page.locator('td:nth-child(5) > .btn').first().click();
    test.setTimeout(2 * 60 * 2000);
    await page.waitForSelector('#spinner', { state: 'hidden' });
    await summaryTestsSpecs.verifyAccessibilityOfSummaryTab(page)
    await page.click('text=×Close');
    test.setTimeout(2 * 60 * 4000);
    await summaryTestsSpecs.verifyingRebatePriceOnSummaryPage(page)
  })

});



