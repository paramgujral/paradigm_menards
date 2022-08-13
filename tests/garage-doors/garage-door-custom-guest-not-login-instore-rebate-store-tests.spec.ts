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



async function beginConfigureSteelDoor(page) {
  await page.waitForSelector('text=Custom Garage Door PartsSelectReplacement Sections and Commercial Openers >> a', { timeout: 10000 });

  await page.locator('text=Custom Garage Door PartsSelectReplacement Sections and Commercial Openers >> a').click();
}
async function beginConfigureInformationPopup(page) {
  let informationPopupMessage = page.locator('div:has-text("Some of our most common configuration options and sizes have been pre-selected t") >> nth=4')
  await expect.soft(informationPopupMessage).toHaveText("Some of our most common configuration options and sizes have been pre-selected to make your experience as simple as possible.Please make sure to review all questions/answers before adding this line to your design.");

}

async function beginConfigureDesignNamePopup(page) {
  let designNamePopUp = page.locator('text=/.*To easily manage and recall your design, click "Save" to save to your account\. I.*/')
  let designNameInputBox = page.locator('form div:has-text("Design Name:") >> nth=2')
  await expect.soft(designNamePopUp).toHaveText('To easily manage and recall your design, click "Save" to save to your account. If you do not want to create an account, be sure to reference your Design ID.')
  await expect.soft(designNameInputBox).toBeVisible()
}

async function configureProductOne(page) {


  if (await page.$('.modal-header button.close')) {
    await page.locator('.modal-header button.close').click();
  }

  let helpmePopup = page.locator('#lightboxBackdrop img')
  await page.click('text=Help me choose');
  await expect.soft(helpmePopup).toBeVisible()
  await page.click('#lightboxBackdrop button');

  await page.locator('text=8 Ft 0 In').first().click();

  await page.click('text=18 In');

  await page.locator('text=Bottom with Astragal').click();

  await page.click('text=Design Options');

  await page.click('text=Elegant Short Panel');

  await page.click('text=White');

  await page.click('text=/.*18\\.4 R-Value 2" Thick Intellicore.*/');


  await page.waitForSelector('#spinner', { state: 'hidden' });

  await page.click('text=Add to Design');
  await page.waitForSelector('#spinner', { state: 'hidden' });

  await beginConfigureDesignNamePopup(page)

  await page.click('text=×Close');
}








//------------------------------------------
// Tests
//------------------------------------------

test.describe.configure({ mode: 'serial' });


// TODO: When initialization is debugged, remove this line in favor of the above loop.
const state = allLogins[6];
const stateFilePath = buildStateFilePath({ ...state, appName: MenardsAppNames.garageDoors });
// Load garage door storage state
test.use({ storageState: stateFilePath });

// All Garage Door Tests
test.describe('Garage Door Custom Doors Rebate Tests', () => {

  test('Garage-Doors-Custom-test-Summary Rebate', async ({ page }) => {
    test.setTimeout(2 * 60 * 1000);

    await startQuote(page);
    await beginConfigureSteelDoor(page);
    await page.locator('text=Residential Doors').click();
    await page.locator('text=Traditional Steel Panel').click();
    await page.click('text=Traditional Steel Panel - BEST');

    await page.waitForTimeout(4000); // it may take a short while for the dialog to apear
    await configureProductOne(page);
    // await page.click('text=×Close');
    test.setTimeout(2 * 60 * 4000);
    await summaryTestsSpecs.verifyingRebatePriceOnSummaryPage(page)
  })

  test('Garage-Doors-Custom-test-Verifying-Online purchase Tab ', async ({ page }) => {
    test.setTimeout(2 * 60 * 1000);

    await startQuote(page);
    await beginConfigureSteelDoor(page);
    await page.locator('text=Residential Doors').click();
    await page.locator('text=Traditional Steel Panel').click();
    await page.click('text=Traditional Steel Panel - BEST');

    await page.waitForTimeout(4000); // it may take a short while for the dialog to apear
    await configureProductOne(page);
    // await page.click('text=×Close');
    test.setTimeout(2 * 60 * 4000);
    await purchaseTests.verifyPurchaseForRebate(page)
  })



});
