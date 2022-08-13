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

    // The following is commented out to restrict the tests to a single test-init scenario. 
    // TODO: This should be debugged and re-enabled.

    // Loop through all login states
    // for (const state of allLogins) {
    // if (state.appName === MenardsAppNames.milliken) {
    //   continue;
    // }

    test('"Start Designing" takes this user to Garage Doors Roll-up', async ({ page }) => {
        // navigate to the starting point with a new quote
        await startQuote(page); // Contains URL verification/assertion, no assertion needed here.
    });

    test('Expected top-level options are present for Garage Doors Roll-up', async ({ page }) => {
        await startQuote(page);

        let panelBody = page.locator('.panel-body');
        await page.waitForSelector('.panel-body', { timeout: 10000 });


        await expect.soft(panelBody).toHaveText(/Residential Doors/);
        await expect.soft(panelBody).toHaveText(/Commercial Doors/);
        await expect.soft(panelBody).toHaveText(/Roll-Up Doors/);
        await expect.soft(panelBody).toHaveText(/Most Popular Sizes\/Styles/);
        await expect.soft(panelBody).toHaveText(/Custom Garage Door Parts/);
    });

    test('Garage-doors-roll-up-test-Expected options available', async ({ page }) => {
        await startQuote(page);
        await beginConfigureSteelDoor(page);

        let tiles = page.locator('.product-select-tiles');

        await expect.soft(tiles).toHaveText(/Roll-Up - Mini Storage/);
        await expect.soft(tiles).toHaveText(/Roll-Up - Heavy Duty/);

    })

    test('Garage-doors-roll-up-test-Temporary message for supply chain shortages is displayed', async ({ page }) => {
        await startQuote(page);
        await beginConfigureSteelDoor(page);

        const tempMessage = page.locator('.temp-message');
        const backButton = page.locator('button:has-text("Back")')
        const commercialDoortext = page.locator('text=Roll-Up Doors')
        await expect.soft(tempMessage).toHaveText('Global and national supply chain shortages and disruptions have impacted the garage door industry. Lead times have been extended. Estimated shipping dates are shown in the shopping cart.');

        await expect.soft(backButton).toBeVisible()
        await page.locator('button:has-text("Back")').click();
        await page.waitForSelector('#spinner', { state: 'hidden' });
        await expect.soft(commercialDoortext).toBeVisible()

    })

    test('Garage-doors-roll-up-test-Can configure and add garage door to quote', async ({ page }) => {
        test.setTimeout(2 * 60 * 1000);

        await startQuote(page);
        await beginConfigureSteelDoor(page);

        await page.click('text=Roll-Up - Mini Storage');

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
    test('Garage-doors-roll-up-test-Verify Summary Click functionality without adding any item ', async ({ page }) => {
        await startQuote(page); // Contains URL verification/assertion, no assertion needed here.
        await summaryTestsSpecs.verifyInaccessibilityOfSummaryTab(page)
    });

    test('Garage-doors-roll-up-test-verifying accessibilty to Purchase Tab,the user should not be allowed to get to the purchase screen', async ({ page }) => {

        await startQuote(page);
        await page.waitForTimeout(2000)
        await page.waitForSelector('#spinner', { state: 'hidden' });
        await purchaseTests.verifyInaccessibilityOfPurchaseTab(page)
    })

    test('Garage-doors-roll-up-test-Verifying-Online purchase Tab', async ({ page }) => {
        test.setTimeout(2 * 60 * 1000);

        await startQuote(page);
        await beginConfigureSteelDoor(page);
        await page.click('text=Roll-Up - Mini Storage');
        await page.waitForTimeout(4000);
        await configureProductOne(page);
        await purchaseTests.verifyPurchase(page);
        await purchaseTests.verifyPrintPurchaseDocsDisclamier(page);
    })


});
