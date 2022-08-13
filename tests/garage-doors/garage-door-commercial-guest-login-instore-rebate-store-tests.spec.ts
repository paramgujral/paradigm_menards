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
    await page.locator('text=Commercial Doors').click();
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
test.describe('Garage Door Commercial Doors Rebate Tests', () => {
   
    test('Garage-Doors-Commercial-test-Summary Rebate', async ({ page }) => {
        test.setTimeout(2 * 60 * 1000);
        await startQuote(page);
        await beginConfigureSteelDoor(page);
        await page.click('text=Commercial - BEST');
        await page.waitForTimeout(4000); // it may take a short while for the dialog to apear
        await configureProductOne(page);
        // await page.click('text=×Close');
        test.setTimeout(2 * 60 * 4000);
        await summaryTestsSpecs.verifyingRebatePriceOnSummaryPage(page)
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
        await purchaseTests.verifyPurchaseForRebate(page)
    })


});
