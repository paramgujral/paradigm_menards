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
  await page.click('text=Residential Doors');
  await page.click('text=Traditional Steel Panel');
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

  await page.click('text=8 Ft 0 In');

  await page.click('text=7 Ft 0 In');

  await page.click('text=Design Options');

  await page.click('text=Elegant Short Panel');

  await page.click('text=White');

  await page.click('text=/.*18\\.4 R-Value 2" Thick Intellicore.*/');

  await page.click('text=Solid - No Window');
  await page.waitForTimeout(2000)
  await page.waitForSelector('#spinner', { state: 'hidden' }, { timeout: 10000 });
  await page.click('text=Track and Spring Options');

  await page.click('text=/.*Typical \\(12" - 32"\\).*/');
  test.setTimeout(2 * 60 * 1000);
  await page.waitForTimeout(2000)
  await page.waitForSelector('#spinner', { state: 'hidden' }, { timeout: 10000 });

  await page.click('text=EZ-SET Torsion');

  await page.click('text=Hardware and Accessories');

  await page.waitForSelector('#spinner', { state: 'hidden' });

  await page.click('text=Yes');

  await page.click('text=Add to Design');
  await beginConfigureDesignNamePopup(page)

  await page.click('text=×Close');
}



//------------------------------------------
// Tests
//------------------------------------------

const state = allLogins[0];
const stateFilePath = buildStateFilePath({ ...state, appName: MenardsAppNames.garageDoors });
// Load garage door storage statesś
test.use({ storageState: stateFilePath });

// All Garage Door Tests
test.describe('Garage Residential Door Tests', () => {


  test('Garage-Doors-Residential-test-Summary Rebate', async ({ page }) => {
    await startQuote(page);
    await beginConfigureSteelDoor(page);
    // await page.click('text=×Close');
    await page.click('text=Traditional Steel Panel - BEST');
    await page.waitForTimeout(4000);
    await configureProductOne(page)
    test.setTimeout(2 * 60 * 1000);
    // await page.click('text=×Close');
    // await page.waitForTimeout(2000)
    await page.waitForSelector('#spinner', { state: 'hidden' });
    await summaryTestsSpecs.verifyingRebatePriceOnSummaryPage(page)
  })

  test('Garage-Doors-Residential-test-Verifying-Online purchase Tab ', async ({ page }) => {
    await startQuote(page);
    await beginConfigureSteelDoor(page);
    // await page.click('text=×Close');
    await page.click('text=Traditional Steel Panel - BEST');
    await page.waitForTimeout(4000);
    await configureProductOne(page)
    test.setTimeout(2 * 60 * 1000);
    // await page.click('text=×Close');
    // await page.waitForTimeout(2000)
    await page.waitForSelector('#spinner', { state: 'hidden' });
    await purchaseTests.verifyPurchaseForRebate(page)
  })

});
