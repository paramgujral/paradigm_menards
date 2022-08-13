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

// Used to launch configurator from the line-items/summary page.
async function addAnotherProduct(page) {
  await page.click('text=Design');
}

async function beginConfigureSteelDoor(page) {
  await page.click('text=Residential Doors');
  await page.click('text=Traditional Steel Panel');
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

async function configureProductTwo(page) {

  await page.click('text=Residential Doors');

  await page.click('text=Traditional Steel Panel');

  await page.click('text=Traditional Steel Panel - BETTER');

  // if (!state.isInternal) {
  await page.click('text=Yes');
  // }

  await page.click('input[name="question-id-1a23b598-e8f9-4cba-9351-075e5d51532a0"]');

  await page.click('input[name="question-id-6ca59eb8-b7ca-479b-932f-56c5ee1cff5c0"]');

  await page.click('text=Design Options');

  await page.click('text=Elegant Short Panel');

  await page.click('text=White');

  await page.click('text=/.*9\\.0 R-Value 2" Thick.*/');

  await page.click('text=Solid - No Window');

  await page.click('text=Track and Spring Options');

  await page.click('text=/.*Typical \\(12" - 32"\\).*/');

  await page.click('text=EZ-SET Torsion');

  await page.click('text=Hardware and Accessories');

  await page.click('text=Standard Hardware');

  await page.click('text=Yes');

  await page.click('text=Add to Design');
}

async function configureProductThree(page) {

  await page.click('text=Residential Doors');

  await page.waitForSelector('#spinner', { state: 'hidden' });

  await page.click('text=Traditional Steel Panel');

  await Promise.all([
    page.waitForNavigation(),
    page.click('text=Traditional Steel Panel - GOOD')
  ]);

  // if (!state.isInternal) {
  await page.click('text=Yes');
  // }

  await page.click('text=Help me choose');

  await page.click('#lightboxBackdrop button');

  await page.click('input[name="question-id-1a23b598-e8f9-4cba-9351-075e5d51532a0"]');

  await page.click('input[name="question-id-6ca59eb8-b7ca-479b-932f-56c5ee1cff5c0"]');

  await page.click('text=Design Options');

  await page.click('text=Short Panel');

  await page.click('text=Almond');

  await page.click('text=/.*6\\.3 R-Value 1-5/16" Vinyl backed.*/');

  await page.click('text=Solid - No Window');

  await page.click('text=Track and Spring Options');

  await page.click('text=/.*Typical \\(12" - 32"\\).*/');

  await page.click('text=EZ-SET Torsion');

  await page.click('text=Hardware and Accessories');

  await page.click('text=Standard Hardware');

  await page.click('text=Yes');

  await page.click('text=Add to Design');
}

//------------------------------------------
// Tests
//------------------------------------------

test.describe.configure({ mode: 'serial' });

// All Garage Door Tests
test.describe('Garage Door Tests', () => {

  // The following is commented out to restrict the tests to a single test-init scenario. 
  // TODO: This should be debugged and re-enabled.

  // Loop through all login states
  // for (const state of allLogins) {
  // if (state.appName === MenardsAppNames.milliken) {
  //   continue;
  // }

  // TODO: When initialization is debugged, remove this line in favor of the above loop.
  const state = allLogins[0];
  const stateFilePath = buildStateFilePath({ ...state, appName: MenardsAppNames.garageDoors });
  // Load garage door storage state
  test.use({ storageState: stateFilePath });

  test('"Start Designing" takes this user to Garage Doors', async ({ page }) => {
    // navigate to the starting point with a new quote
    await startQuote(page); // Contains URL verification/assertion, no assertion needed here.
  });

  test('Expected top-level options are present for Garage Doors', async ({ page }) => {
    await startQuote(page);

    let panelBody = page.locator('.panel-body');

    await expect.soft(panelBody).toHaveText(/Residential Doors/);
    await expect.soft(panelBody).toHaveText(/Commercial Doors/);
    await expect.soft(panelBody).toHaveText(/Roll-Up Doors/);
    await expect.soft(panelBody).toHaveText(/Most Popular Sizes\/Styles/);
    await expect.soft(panelBody).toHaveText(/Custom Garage Door Parts/);
  });

  test('Expected options available for Traditional Steel Panel doors', async ({ page }) => {
    await startQuote(page);
    await beginConfigureSteelDoor(page);

    let tiles = page.locator('.product-select-tiles');

    await expect.soft(tiles).toHaveText(/BEST/);
    await expect.soft(tiles).toHaveText(/BETTER/);
    await expect.soft(tiles).toHaveText(/GOOD/);
  })

  test('Temporary message for supply chain shortages is displayed', async ({ page }) => {
    await startQuote(page);
    await beginConfigureSteelDoor(page);

    const tempMessage = page.locator('.temp-message');

    await expect.soft(tempMessage).toHaveText('Global and national supply chain shortages and disruptions have impacted the garage door industry. Lead times have been extended. Estimated shipping dates are shown in the shopping cart.');
  })

  test('Can configure and add garage door to quote', async ({ page }) => {
    test.setTimeout(2 * 60 * 1000);

    await startQuote(page);
    await beginConfigureSteelDoor(page);

    await configureProductOne(page);

    // count the product drawings on the page which indicates how many products/lines are on the quote
    // This test would be better with more explicit HTML ids or data-qa attributes on the elements
    await page.waitForSelector('.line-item-drawing');
    const drawings = await page.$$('.line-item-drawing');
    await expect(drawings.length).toEqual(1);
  })

  test('Can configure and add second garage door to quote', async ({ page }) => {
    test.setTimeout(4 * 60 * 1000);

    await startQuote(page);
    await page.click('text=Residential Doors');
    await page.click('text=Traditional Steel Panel');


    await configureProductOne(page);
    await addAnotherProduct(page);
    await configureProductTwo(page);

    // count the product drawings on the page which indicates how many products/lines are on the quote
    // This test would be better with more explicit HTML ids or data-qa attributes on the elements
    await page.waitForSelector('.line-item-drawing');
    const drawings = await page.$$('.line-item-drawing');
    await expect(drawings.length).toEqual(2);

  })

  test('Can configure and add third garage door to quote', async ({ page }) => {
    test.setTimeout(6 * 60 * 1000);

    await startQuote(page);
    await page.click('text=Residential Doors');
    await page.click('text=Traditional Steel Panel');

    await configureProductOne(page);

    await addAnotherProduct(page);
    await configureProductTwo(page);

    await addAnotherProduct(page);
    await configureProductThree(page);

    // count the product drawings on the page which indicates how many products/lines are on the quote
    // This test would be better with more explicit HTML ids or data-qa attributes on the elements      
    await page.waitForSelector('.line-item-drawing');
    const drawings = await page.$$('.line-item-drawing');
    await expect(drawings.length).toEqual(3);
  })
  //Summary
  test('Garage-doors-test-Verify Summary Click functionality without adding any item ', async ({ page }) => {
    await startQuote(page); // Contains URL verification/assertion, no assertion needed here.
    await summaryTestsSpecs.verifyInaccessibilityOfSummaryTab(page)
  });
  
  test('Garage-doors-test-verifying accessibilty to Purchase Tab,the user should not be allowed to get to the purchase screen', async ({ page }) => {

    await startQuote(page);
    await page.waitForTimeout(2000)
    await page.waitForSelector('#spinner', { state: 'hidden' });
    await purchaseTests.verifyInaccessibilityOfPurchaseTab(page)
  })
  test('Garage-doors-test-verifying Online purchase Tab', async ({ page }) => {
    test.setTimeout(6 * 60 * 1000);

    await startQuote(page);
    await page.click('text=Residential Doors');
    await page.click('text=Traditional Steel Panel');

    await configureProductOne(page);
    await summaryTestsSpecs.verifyAccessibilityOfSummaryTab(page)
    // await page.click('text=×Close');
    test.setTimeout(2 * 60 * 4000);
    await purchaseTests.verifyPurchase(page);
    await purchaseTests.verifyPrintPurchaseDocsDisclamier(page);
  })

  // }
});
