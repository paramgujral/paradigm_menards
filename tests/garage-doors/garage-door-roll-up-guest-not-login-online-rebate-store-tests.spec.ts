import { test, expect } from '@playwright/test';
import { allLogins, buildStateFilePath, MenardsAppNames } from '../../utils/menards/test-init-constants';
import * as purchaseTests from '../purchase/purchase'
import * as summaryTestsSpecs from '../summary/summary'

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
    await page.locator('text=Roll-Up Doors').click();
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
    await page.click('text=4 Ft 0 In');

    await page.locator('text=6 Ft 0 In').nth(1).click();
    await page.waitForSelector('#spinner', { state: 'hidden' });


    await page.click('text=Design Options');
    await page.locator('text=Glossy White').click();

    await page.click('text=Track and Spring Options');

    await page.click('text=Hardware and Accessories');

    await page.locator('text=No Top Weather Seal').click();



    await page.click('text=Add to Design');
    await beginConfigureDesignNamePopup(page)

    await page.click('text=×Close');
}

async function configureProductTwo(page) {

    await page.waitForSelector('#spinner', { state: 'hidden' });
    await Promise.all([
        page.waitForNavigation(),
        page.click('text=Roll-Up - Heavy Duty')
    ]);

    // if (!state.isInternal) {
    // await page.click('text=Yes');
    // }
    if (await page.$('.modal-header button.close')) {
        await page.locator('.modal-header button.close').click();
    }
    let helpmePopup = page.locator('#lightboxBackdrop img')
    await page.click('text=Help me choose');
    await expect.soft(helpmePopup).toBeVisible()
    await page.click('#lightboxBackdrop button');

    await page.locator('text=4 Ft 0 In').first().click();
    await page.locator('text=6 Ft 0 In').nth(1).click();
    await page.click('text=Design Options');

    await page.locator('text=Glossy White').click();
    await page.click('text=Track and Spring Options');

    await page.click('text=Hardware and Accessories');

    await page.locator('text=No Chain Hoist or Sprocket').click();
    await page.locator('text=NoYes - Steel Jambs >> img').first().click();
    await page.locator('text=No Top Weather Seal').click();
    await page.locator('text=Yes').nth(1).click();
    await page.locator('text=Left (ISLO)').first().click();

    await page.waitForSelector('#spinner', { state: 'hidden' });
    //   let secondYesBtn = page.locator('text=Yes >> nth=2')
    //   await page.waitForSelector(secondYesBtn, { timeout: 10000 });

    await page.locator('text=Yes').nth(2).click();


    await page.click('text=Add to Design');
}





//------------------------------------------
// Tests
//------------------------------------------

test.describe.configure({ mode: 'serial' });

// TODO: When initialization is debugged, remove this line in favor of the above loop.
const state = allLogins[3];
const stateFilePath = buildStateFilePath({ ...state, appName: MenardsAppNames.garageDoors });
// Load garage door storage state
test.use({ storageState: stateFilePath });

// All Garage Door Tests
test.describe('Garage Door Roll-up Doors Tests', () => {

    test('Garage-Doors-roll-up-test-Summary Rebate', async ({ page }) => {
        test.setTimeout(2 * 60 * 1000);
        await startQuote(page);
        await beginConfigureSteelDoor(page);
        await page.click('text=Roll-Up - Mini Storage');
        await page.waitForTimeout(4000);
        await configureProductOne(page);
        await summaryTestsSpecs.verifyingRebatePriceOnSummaryPage(page)
      })
    
      test('Garage-Doors-roll-up-test-Verifying-Online purchase Tab ', async ({ page }) => {
        test.setTimeout(2 * 60 * 1000);
        await startQuote(page);
        await beginConfigureSteelDoor(page);
        await page.click('text=Roll-Up - Mini Storage');
        await page.waitForTimeout(4000);
        await configureProductOne(page);
        await purchaseTests.verifyPurchaseForRebate(page)
      })


});
