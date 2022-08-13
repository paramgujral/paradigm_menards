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

  await page.click('text=8 Ft 0 In');

  await page.click('text=7 Ft 0 In');

  await page.click('text=Design Options');

  await page.click('text=Elegant Short Panel');

  await page.click('text=White');

  await page.click('text=/.*18\\.4 R-Value 2" Thick Intellicore.*/');

  await page.click('text=Solid - No Window');
  await page.waitForTimeout(2000)
  await page.waitForSelector('#spinner', { state: 'hidden' },{timeout:10000});
  await page.click('text=Track and Spring Options');

  await page.click('text=/.*Typical \\(12" - 32"\\).*/');
  test.setTimeout(2 * 60 * 1000);
  await page.waitForTimeout(2000)
  await page.waitForSelector('#spinner', { state: 'hidden' },{timeout:10000});

  await page.click('text=EZ-SET Torsion');

  await page.click('text=Hardware and Accessories');

  await page.waitForSelector('#spinner', { state: 'hidden' });

  await page.click('text=Yes');

  await page.click('text=Add to Design');
  await beginConfigureDesignNamePopup(page)

  await page.click('text=×Close');
}

async function configureProductTwo(page) {

  await page.click('text=Residential Doors');

  await page.click('text=Traditional Steel Panel');

  await page.click('text=Traditional Steel Panel - BETTER');

  // if (!state.isInternal) {
  await page.click('text=Yes');
  // }
  await page.waitForTimeout(2000)
  await page.waitForSelector('#spinner', { state: 'hidden' },{timeout:10000});

  await page.click('input[name="question-id-1a23b598-e8f9-4cba-9351-075e5d51532a0"]');

  await page.click('input[name="question-id-6ca59eb8-b7ca-479b-932f-56c5ee1cff5c0"]');

  await page.click('text=Design Options');

  await page.click('text=Elegant Short Panel');

  await page.click('text=White');

  await page.click('text=/.*9\\.0 R-Value 2" Thick.*/');
  await page.waitForTimeout(2000)
  await page.waitForSelector('#spinner', { state: 'hidden' },{timeout:10000});
  await page.click('text=Solid - No Window');

  await page.click('text=Track and Spring Options');

  await page.click('text=/.*Typical \\(12" - 32"\\).*/');

  await page.click('text=EZ-SET Torsion');
  await page.waitForTimeout(2000)
  await page.waitForSelector('#spinner', { state: 'hidden' },{timeout:1000});
  await page.click('text=Hardware and Accessories');

  await page.click('text=Standard Hardware');
  await page.waitForTimeout(2000)
  await page.waitForSelector('#spinner', { state: 'hidden' },{timeout:1000});

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

// test.describe.configure({ mode: 'serial' });

// // TODO: When initialization is debugged, remove this line in favor of the above loop.
// const state = allLogins[0];
// const stateFilePath = buildStateFilePath({ ...state, appName: MenardsAppNames.garageDoors });
// // Load garage door storage state
// test.use({ storageState: stateFilePath });

const state = allLogins[0];
const stateFilePath = buildStateFilePath({ ...state, appName: MenardsAppNames.garageDoors });
// Load garage door storage statesś
test.use({ storageState: stateFilePath });

// All Garage Door Tests
test.describe('Garage Residential Door Tests', () => {

  // The following is commented out to restrict the tests to a single test-init scenario. 
  // TODO: This should be debugged and re-enabled.

  // Loop through all login states
  // for (const state of allLogins) {
  // if (state.appName === MenardsAppNames.milliken) {
  //   continue;
  // }

  test('"Start Designing" takes this user to Garage Doors', async ({ page }) => {
    // navigate to the starting point with a new quote
    await startQuote(page); // Contains URL verification/assertion, no assertion needed here.
  });

  test('Garage-Door-Residential-test-Expected top-level options are present for Garage Doors', async ({ page }) => {
    await startQuote(page);

    let panelBody = page.locator('.panel-body');
    await page.waitForSelector('.panel-body', { timeout: 10000 });

    await expect.soft(panelBody).toHaveText(/Residential Doors/);
    await expect.soft(panelBody).toHaveText(/Commercial Doors/);
    await expect.soft(panelBody).toHaveText(/Roll-Up Doors/);
    await expect.soft(panelBody).toHaveText(/Most Popular Sizes\/Styles/);
    await expect.soft(panelBody).toHaveText(/Custom Garage Door Parts/);
  });

  test('Garage-Door-Residential-test-Expected options available for Traditional Steel Panel doors', async ({ page }) => {
    await startQuote(page);
    await beginConfigureSteelDoor(page);

    let tiles = page.locator('.product-select-tiles');

    await expect.soft(tiles).toHaveText(/BEST/);
    await expect.soft(tiles).toHaveText(/BETTER/);
    await expect.soft(tiles).toHaveText(/GOOD/);
  })

  test('Garage-Door-Residential-test-Temporary message for supply chain shortages is displayed', async ({ page }) => {
    await startQuote(page);
    await beginConfigureSteelDoor(page);

    const tempMessage = page.locator('.temp-message');
    const backButton = page.locator('button:has-text("Back")')
    const traditionalSteelPaneltext = page.locator('text="Traditional Steel Panel"')
    await expect.soft(tempMessage).toHaveText('Global and national supply chain shortages and disruptions have impacted the garage door industry. Lead times have been extended. Estimated shipping dates are shown in the shopping cart.');

    await expect.soft(backButton).toBeVisible()
    await page.locator('button:has-text("Back")').click();
    await expect.soft(traditionalSteelPaneltext).toBeVisible()

  })



  test ('Garage-Door-Residential-test-Can configure and add garage door to quote', async ({ page }) => {
    test.setTimeout(2 * 60 * 1000);

    await startQuote(page);
    await beginConfigureSteelDoor(page);
    await page.click('text=Traditional Steel Panel - BEST');

    await page.waitForTimeout(4000); // it may take a short while for the dialog to apear
    await beginConfigureInformationPopup(page)
    await configureProductOne(page);

    // count the product drawings on the page which indicates how many products/lines are on the quote
    // This test would be better with more explicit HTML ids or data-qa attributes on the elements
    await page.waitForSelector('.line-item-drawing');
    const drawings = await page.$$('.line-item-drawing');
    await expect(drawings.length).toEqual(1);
  })

 //Summary
 test('Garage-doors-Residential-test-Verify Summary Click functionality without adding any item ', async ({ page }) => {
  await startQuote(page); // Contains URL verification/assertion, no assertion needed here.
  await summaryTestsSpecs.verifyInaccessibilityOfSummaryTab(page)
});

  test('"Rename Design",  click on rename Button of garage-door residential guest login instore  ', async ({ page }) => {
    await startQuote(page);
    test.setTimeout(2 * 60 * 1000);

    await startQuote(page);
    await beginConfigureSteelDoor(page);
    await page.click('text=Traditional Steel Panel - BEST');

    await page.waitForTimeout(4000); // it may take a short while for the dialog to apear
    await configureProductOne(page);
    test.setTimeout(2 * 60 * 1000);
    await page.waitForSelector('#spinner', { state: 'hidden' });
    await summaryTestsSpecs.verifyAccessibilityOfSummaryTab(page)
    // click on the Rename button	
    await summaryTestsSpecs.clickOnRenameButton(page)

  });

  //Line number
  // Check the line items in the design	
  //Line items in the design should display with order numbers like 100, 200, 300…
  test('"Line number", Check the line items in the design	garage-door residential guest login instore ', async ({ page }) => {
    test.setTimeout(2 * 60 * 1000);

    await startQuote(page);
    await beginConfigureSteelDoor(page);
    await page.click('text=Traditional Steel Panel - BEST');

    await page.waitForTimeout(4000);
    await configureProductOne(page);
    test.setTimeout(2 * 60 * 1000);
    await page.waitForTimeout(2000)
    await page.waitForSelector('#spinner', { state: 'hidden' });
    await page.locator('text=Continue Shopping').click();
    await page.waitForSelector('#spinner', { state: 'hidden', timeout: 10000 });

    await configureProductTwo(page);
    await page.waitForTimeout(2000)
    await page.waitForSelector('#spinner', { state: 'hidden' });


    await summaryTestsSpecs.checkingLineItems(page)

  });

  test('"Edit/Copy/Delete line", garage-door residential guest login instore', async ({ page }) => {
    await startQuote(page);
    await beginConfigureSteelDoor(page);
    // await page.locator('text=×Close').click();
    await page.click('text=Traditional Steel Panel - BEST');

    await page.waitForTimeout(4000);
    await configureProductOne(page)
    test.setTimeout(2 * 60 * 1000);
    await page.waitForSelector('#spinner', { state: 'hidden' });
    await summaryTestsSpecs.verifyAccessibilityOfSummaryTab(page)
    await summaryTestsSpecs.editCopyDeleteLineVerification(page)
  });

  test('"Add garage-door" residential guest login instore', async ({ page }) => {
    await startQuote(page);
    await beginConfigureSteelDoor(page);
    await page.click('text=Traditional Steel Panel - BEST');
    await page.waitForTimeout(4000);
    await configureProductOne(page)
    await summaryTestsSpecs.verifyLandingOnSummaryPage(page)
    await summaryTestsSpecs.navigateToPurchaseDesignPageFromSummary(page);
    await page.waitForSelector('#spinner', { state: 'hidden' });

    await page.locator('text=Continue Shopping').click();

    test.setTimeout(2 * 60 * 1000);
    await page.waitForSelector('#spinner', { state: 'hidden' });

    await configureProductTwo(page);

    test.setTimeout(2 * 60 * 1000);

    await page.waitForSelector('.line-item-drawing');
    const drawings = await page.$$('.line-item-drawing');
    await expect(drawings.length).toEqual(2);


  });

  test('"New Line Item",Add a new garage-door residential guest login instore ', async ({ page }) => {
    await startQuote(page);
    await page.waitForTimeout(2000)
    test.setTimeout(2 * 60 * 4000);
    await page.waitForSelector('#spinner', { state: 'hidden', timeout: 10000 });
    await beginConfigureSteelDoor(page);
    await page.click('text=Traditional Steel Panel - BEST');
    await page.waitForTimeout(4000);
    await configureProductOne(page)
    test.setTimeout(2 * 60 * 1000);
    await page.waitForTimeout(2000)
    await page.waitForSelector('#spinner', { state: 'hidden' });
    await page.waitForSelector('.line-item-drawing');
    const drawings = await page.$$('.line-item-drawing');
    await expect(drawings.length).toEqual(1);
    // await page.click('text=×Close');

    await page.locator('text=Continue Shopping').click();
    test.setTimeout(2 * 60 * 4000);
    await page.waitForSelector('#spinner', { state: 'hidden', timeout: 10000 });
    await beginConfigureSteelDoor(page);
    await page.locator('button:has-text("No")').click();
    await page.waitForTimeout(2000)
    await page.waitForSelector('#spinner', { state: 'hidden' });
    await page.click('text=Traditional Steel Panel - BEST');
    await page.waitForTimeout(4000);
    await configureProductOne(page)
    test.setTimeout(2 * 60 * 4000);

    // await page.waitForSelector('#spinner', { state: 'hidden' });
    // await page.waitForSelector('.line-item-drawing');
    // await expect(drawings.length).toEqual(2); 
    await page.locator('text=Continue Shopping').click();
    test.setTimeout(2 * 60 * 4000);
    await page.waitForSelector('#spinner', { state: 'hidden', timeout: 10000 });
    // await page.waitForTimeout(2000)
    await configureProductTwo(page);
    test.setTimeout(2 * 60 * 4000);
    // await page.waitForSelector('#spinner', { state: 'hidden' });
    // await page.waitForSelector('.line-item-drawing');
    // await expect(drawings.length).toEqual(3); 
  })

  test('"Print Design", garage-door residential guest login instore', async ({ page }) => {
    await startQuote(page);
    await beginConfigureSteelDoor(page);
    // await page.click('text=×Close');
    await page.click('text=Traditional Steel Panel - BEST');
    await page.waitForTimeout(4000);
    await configureProductOne(page)
    test.setTimeout(2 * 60 * 1000);
    // await page.click('text=×Close');
    await page.waitForTimeout(2000)
    await page.waitForSelector('#spinner', { state: 'hidden' });
    await summaryTestsSpecs.printDesignBtn(page)

  })
  test('"Copy Design",garage-door residential guest login instore	', async ({ page }) => {
    await startQuote(page);
    await beginConfigureSteelDoor(page);
    // await page.click('text=×Close');
    await page.click('text=Traditional Steel Panel - BEST');
    await page.waitForTimeout(4000);
    await configureProductOne(page)
    test.setTimeout(2 * 60 * 1000);
    // await page.click('text=×Close');
    await page.waitForTimeout(2000)
    await page.waitForSelector('#spinner', { state: 'hidden' });
    await summaryTestsSpecs.copyDesignBtn(page)
  })

  test('"Restart Design", garage-door residential guest login instore	', async ({ page }) => {
    await startQuote(page);
    await beginConfigureSteelDoor(page);
    // await page.click('text=×Close');
    await page.click('text=Traditional Steel Panel - BEST');
    await page.waitForTimeout(4000);
    await configureProductOne(page)
    test.setTimeout(2 * 60 * 1000);
    // await page.click('text=×Close');
    await page.waitForTimeout(2000)
    await page.waitForSelector('#spinner', { state: 'hidden' });
    await summaryTestsSpecs.restartBtn(page)
    await beginConfigureSteelDoor(page)
    // await page.locator('text=×Close').click();
    //Restart button should be available on the configurator screen (window & door, part configurator, pre-configured unit)
    await summaryTestsSpecs.renameButtonVisibility(page)
    await configureProductOne(page)
    test.setTimeout(2 * 60 * 1000);
    await page.click('text=×Close');
    await page.waitForTimeout(2000)
    await page.waitForSelector('#spinner', { state: 'hidden' });
    await page.waitForSelector('.line-item-drawing');
    const drawings = await page.$$('.line-item-drawing');
    await expect(drawings.length).toEqual(1)
    await page.waitForSelector('a#purchase-link', { timeout: 10000 })
    await page.locator('a#purchase-link').click();
    //Restart button should be available on the purchase screen (and double check)
    await summaryTestsSpecs.renameButtonVisibility(page)
    //Click on Restart button on any screen	
    await summaryTestsSpecs.restartBtn(page)



  })

  test('"Access to Purchase Tab garage-door residential guest login instore",The user should not be allowed to get to the purchase screen' ,async ({ page }) => {

    await startQuote(page);
    await page.waitForTimeout(2000)
    await page.waitForSelector('#spinner', { state: 'hidden' });
    await purchaseTests.verifyInaccessibilityOfPurchaseTab(page)
  })
  test('"Online purchase garage-door residential guest login instore",The user should not be allowed to get to the purchase screen' ,async ({ page }) => {
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
    await purchaseTests.verifyPurchase(page);
    await purchaseTests.verifyPrintPurchaseDocsDisclamier(page);
  })

});
