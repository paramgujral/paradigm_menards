import { test, expect } from '@playwright/test';
import { allLogins, buildStateFilePath, MenardsAppNames } from '../../utils/menards/test-init-constants';
import * as summaryTestsSpecs from '../summary/summary'
import * as purchaseTests from '../purchase/purchase'
//------------------------------------------
// Test Helper-Functions
//------------------------------------------

async function verifyConfiguratorUrlForGarageDoors(page) {
  return await expect(page).toHaveURL(/\/quotes\/.*\/configure\/product-select\/MenardsGarageDoors$/);
}

// Used to start a new quote and launch the configurator
async function startQuote(page) {
  // navigate to the starting point with a new quote
  await page.goto('/home');
  await page.click('text=Start Designing');
}


async function configureProductOne(page) {

  await page.click('text=Traditional Steel Panel - BEST');

  await page.waitForTimeout(4000); // it may take a short while for the dialog to apear
  if (await page.$('.modal-header button.close')) {
    await page.locator('.modal-header button.close').click();
  }

  await page.click('text=8 Ft 0 In');

  await page.click('text=7 Ft 0 In');

  await page.click('text=Design Options');

  await page.click('text=Elegant Short Panel');

  await page.click('text=White');

  await page.click('text=/.*18\\.4 R-Value 2" Thick Intellicore.*/');

  await page.click('text=Solid - No Window');

  await page.click('text=Track and Spring Options');

  await page.click('text=/.*Typical \\(12" - 32"\\).*/');

  await page.waitForSelector('#spinner', { state: 'hidden' });

  await page.click('text=EZ-SET Torsion');

  await page.click('text=Hardware and Accessories');

  await page.click('text=Yes');

  await page.click('text=Add to Design');

  await page.click('text=×Close');
}



//------------------------------------------
// Tests
//------------------------------------------

test.describe.configure({ mode: 'serial' });

  // TODO: When initialization is debugged, remove this line in favor of the above loop.
  const state = allLogins[4];
  const stateFilePath = buildStateFilePath({ ...state, appName: MenardsAppNames.garageDoors });
  // Load garage door storage state
  test.use({ storageState: stateFilePath });
// All Garage Door Tests
test.describe('Garage Door Rebate Tests', () => {

  test('Garage-Doors-test-Summary Rebate', async ({ page }) => {
    test.setTimeout(6 * 60 * 1000);

    await startQuote(page);
    await page.click('text=Residential Doors');
    await page.click('text=Traditional Steel Panel');

    await configureProductOne(page);
    await summaryTestsSpecs.verifyAccessibilityOfSummaryTab(page)
    // await page.click('text=×Close');
    test.setTimeout(2 * 60 * 4000);
    await summaryTestsSpecs.verifyingRebatePriceOnSummaryPage(page)
  })

  test('Garage-Doors-test-Verifying-Online purchase Tab ', async ({ page }) => {
    test.setTimeout(6 * 60 * 1000);
    await startQuote(page);
    await page.click('text=Residential Doors');
    await page.click('text=Traditional Steel Panel');

    await configureProductOne(page);
    await summaryTestsSpecs.verifyAccessibilityOfSummaryTab(page)
    // await page.click('text=×Close');
    test.setTimeout(2 * 60 * 4000);
    await purchaseTests.verifyPurchaseForRebate(page)
  })

});
