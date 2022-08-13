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
async function beginConfigureInformationPopup(page) {
    let informationPopupMessage = page.locator('div:has-text("Some of our most common configuration options and sizes have been pre-selected t") >> nth=4')
    await expect.soft(informationPopupMessage).toHaveText("Some of our most common configuration options and sizes have been pre-selected to make your experience as simple as possible.Please make sure to review all questions/answers before adding this line to your design.");

}
async function beginConfigureSteelDoor(page) {
    await page.locator('text=Commercial Doors').click();
}

async function beginConfigureDesignNamePopup(page) {
    let designNamePopUp = page.locator('text=/.*To easily manage and recall your design, click "Save" to save to your account\. I.*/')
    let designNameInputBox = page.locator('form div:has-text("Design Name:") >> nth=2')
    await expect.soft(designNamePopUp).toHaveText('To easily manage and recall your design, click "Save" to save to your account. If you do not want to create an account, be sure to reference your Design ID.')
    await expect.soft(designNameInputBox).toBeVisible()
}
async function configureProductOne(page) {


    if (await page.$$('.modal-header button.close')) {
        await page.locator('.modal-header button.close').click();
    }

    let helpmePopup = page.locator('#lightboxBackdrop img')
    await page.click('text=Help me choose');
    await expect.soft(helpmePopup).toBeVisible()
    await page.click('#lightboxBackdrop button');

    await page.click('text=9 Ft 0 In >> nth=0');

    await page.click('text=8 Ft 0 In');
    await page.waitForSelector('#spinner', { state: 'hidden' });

    // await page.locator('div:nth-child(2) > label > #question-id-6ca59eb8-b7ca-479b-932f-56c5ee1cff5c0').click();
    // await page.waitForSelector('#spinner', { state: 'hidden' });

    await page.click('text=Design Options');
    await page.locator('div:nth-child(3) > .panel-body > .question-answers-wrapper > .images-loaded-container > .answers-row > div').first().click();
    await page.locator('text=/.*18\\.4 R-Value 2" Thick Intellicore.*/').click();
    await page.locator('text=Solid - No Window').click();
    await page.locator('text=Track and Spring Options Jamb Material: Headroom Available: Track Size: Track Mo >> button').click();
    await page.locator('text=Wood JambsSteel or Masonry Jambs >> img').first().click();
    await page.locator('div:nth-child(3) > .panel-body > .question-answers-wrapper > .images-loaded-container > .answers-row > div').first().click();
    await page.locator('div:nth-child(4) > .panel-body > .question-answers-wrapper > .images-loaded-container > .answers-row > div').first().click();
    await page.locator('div:nth-child(7) > .panel-body > .question-answers-wrapper > .images-loaded-container > .answers-row > div').first().click();
    await page.click('text=Hardware and Accessories');
    await page.waitForSelector('#spinner', { state: 'hidden' });
    await page.locator('text=Yes').first().click();

    await page.waitForSelector('#spinner', { state: 'hidden' });

    await page.locator('text=Torsion Shaft').click();
    await page.locator('text=Yes').nth(1).click();

    await page.locator('div:nth-child(10) > .panel-body > .question-answers-wrapper > .images-loaded-container > .answers-row > div').first().click();
    await page.waitForSelector('#spinner', { state: 'hidden' });

    await page.locator('text=Yes').nth(2).click();
    await page.waitForSelector('#spinner', { state: 'hidden' });

    await page.click('text=Add to Design');
    // await beginConfigureDesignNamePopup(page)
    await page.click('text=×Close');
}

async function configureProductTwo(page) {

    await page.click('text=Commercial Doors');

    await page.click('text=Commercial - BETTER');

    // if (!state.isInternal) {
    await page.click('text=Yes');
    // }
    await page.locator('text=9 Ft 0 In').first().click();
    await page.locator('text=8 Ft 0 In').click();
    await page.click('text=Design Options');
    await page.locator('text=/.*9\\.0 R-Value 2" Thick.*/').click();
    await page.click('text=Track and Spring Options');
    await page.click('text=Hardware and Accessories');
    await page.click('text=Yes');
    await page.click('text=Add to Design');
}

async function configureProductThree(page) {

    await page.click('text=Commercial Doors');

    await page.waitForSelector('#spinner', { state: 'hidden' });

    await Promise.all([
        page.waitForNavigation(),
        page.click('text=Commercial - GOOD')
    ]);
    // if (!state.isInternal) {
    await page.click('text=Yes');
    // }

    // if (await page.$('.modal-header button.close')) {
    //     await page.locator('.modal-header button.close').click();
    // }
    await page.click('text=Help me choose');
    await page.click('#lightboxBackdrop button');

    await page.locator('text=9 Ft 0 In').first().click();
    await page.locator('text=8 Ft 0 In').click();
    await page.click('text=Design Options');
    await page.locator('text=Deep Ribbed Smooth').click();
    await page.click('text=White');
    await page.locator('text=/.*6\\.5 R-Value 1-3/8" Vinyl Backed.*/').click();
    await page.locator('text=24 Gauge').click();
    await page.click('text=Solid - No Window');
    await page.click('text=Track and Spring Options');
    await page.locator('text=Wood Jambs').click();
    await page.locator('div:nth-child(3) > .panel-body > .question-answers-wrapper > .images-loaded-container > .answers-row > div > .question-answer-image-inner').first().click();
    await page.locator('div:nth-child(4) > .panel-body > .question-answers-wrapper > .images-loaded-container > .answers-row > div > .question-answer-image-inner').first().click();
    await page.locator('text=/.*12".*/').nth(1).click();
    await page.click('text=Hardware and Accessories');
    await page.locator('text=Yes').first().click();
    await page.locator('text=Torsion Shaft').click();
    await page.locator('text=Yes').nth(1).click();
    await page.locator('text=ATS 211 W (1/2 HP)').click();
    await page.locator('text=Yes').nth(2).click();
    await page.click('text=Add to Design');
}

async function configureProductFour(page) {

    await page.click('text=Commercial Doors');

    await page.waitForSelector('#spinner', { state: 'hidden' });

    await Promise.all([
        page.waitForNavigation(),
        page.click('text=Commercial - Aluminum Glass')
    ]);
    // if (!state.isInternal) {
    await page.click('text=Yes');
    // }

    // if (await page.$('.modal-header button.close')) {
    //     await page.locator('.modal-header button.close').click();
    // }
    await page.click('text=Help me choose');
    await page.click('#lightboxBackdrop button');

    await page.locator('text=8 Ft 0 In').first().click();
    await page.locator('text=7 Ft 0 In').first().click();
    await page.click('text=Design Options');
    //   await page.locator('text=Deep Ribbed Smooth').click();
    await page.click('text=White');
    await page.locator('text=Yes').first().click();
    await page.locator('text=Insulated').nth(1).click();

    await page.click('text=Track and Spring Options');
    await page.locator('text=Wood Jambs').click();
    await page.locator('div:nth-child(3) > .panel-body > .question-answers-wrapper > .images-loaded-container > .answers-row > div >> nth=0').first().click();
    await page.locator('text=/.*12".*/ >> nth=1').first().click();

    await page.click('text=Hardware and Accessories');
    await page.locator('text=No Lock').click();
    await page.locator('text=Torsion Shaft').click();
    await page.locator('#configurator-app >> text=No').nth(1).click();



    await page.click('text=Add to Design');
}

//------------------------------------------
// Tests
//------------------------------------------

test.describe.configure({ mode: 'serial' });

// TODO: When initialization is debugged, remove this line in favor of the above loop.
const state = allLogins[0];
const stateFilePath = buildStateFilePath({ ...state, appName: MenardsAppNames.garageDoors });
// Load garage door storage state
test.use({ storageState: stateFilePath });

// All Garage Door Tests
test.describe('Garage Door Commercial Doors Tests', () => {

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

    test('Expected top-level options are present for Garage Doors Commercial Doors', async ({ page }) => {
        await startQuote(page);
        test.setTimeout(2 * 60 * 1000);

        let panelBody = page.locator('.panel-body');

        await expect.soft(panelBody).toHaveText(/Residential Doors/);
        await expect.soft(panelBody).toHaveText(/Commercial Doors/);
        await expect.soft(panelBody).toHaveText(/Roll-Up Doors/);
        await expect.soft(panelBody).toHaveText(/Most Popular Sizes\/Styles/);
        await expect.soft(panelBody).toHaveText(/Custom Garage Door Parts/);
    });

    test('Expected options available for Commercial doors', async ({ page }) => {
        await startQuote(page);
        await beginConfigureSteelDoor(page);

        let tiles = page.locator('.product-select-tiles');

        await expect.soft(tiles).toHaveText(/BEST/);
        await expect.soft(tiles).toHaveText(/BETTER/);
        await expect.soft(tiles).toHaveText(/GOOD/);
        await expect.soft(tiles).toHaveText(/Glass/);
    })

    test('Garage-Doors-Commercial-test-Temporary message for supply chain shortages is displayed', async ({ page }) => {
        await startQuote(page);
        await beginConfigureSteelDoor(page);

        const tempMessage = page.locator('.temp-message');
        const backButton = page.locator('button:has-text("Back")')
        const commercialDoortext = page.locator('text=Commercial Doors')
        await expect.soft(tempMessage).toHaveText('Global and national supply chain shortages and disruptions have impacted the garage door industry. Lead times have been extended. Estimated shipping dates are shown in the shopping cart.');

        await expect.soft(backButton).toBeVisible()
        await page.locator('button:has-text("Back")').click();
        await expect.soft(commercialDoortext).toBeVisible()

    })



    test('Garage-Doors-Commercial-test-Can configure and add garage door to quote', async ({ page }) => {
        test.setTimeout(2 * 60 * 1000);

        await startQuote(page);
        await beginConfigureSteelDoor(page);
        await page.click('text=Commercial - BEST');
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
    test('Garage-Doors-Commercial-test-Verify Summary Click functionality without adding any item ', async ({ page }) => {
        await startQuote(page); // Contains URL verification/assertion, no assertion needed here.
        await summaryTestsSpecs.verifyInaccessibilityOfSummaryTab(page)
    });

    test('Garage-Doors-Commercial-test-verifying accessibilty to Purchase Tab,the user should not be allowed to get to the purchase screen', async ({ page }) => {

        await startQuote(page);
        await page.waitForTimeout(2000)
        await page.waitForSelector('#spinner', { state: 'hidden' });
        await purchaseTests.verifyInaccessibilityOfPurchaseTab(page)
    })

    test('Garage-Doors-Commercial-test-Verifying-Online purchase Tab ', async ({ page }) => {
        test.setTimeout(2 * 60 * 1000);

        await startQuote(page);
        await beginConfigureSteelDoor(page);
        await page.click('text=Commercial - BEST');
        await page.waitForTimeout(4000); // it may take a short while for the dialog to apear
        await configureProductOne(page);
        // await page.click('text=×Close');
        test.setTimeout(2 * 60 * 4000);
        await purchaseTests.verifyPurchase(page);
        await purchaseTests.verifyPrintPurchaseDocsDisclamier(page);
    })


});
