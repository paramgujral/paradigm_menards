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
  await page.waitForSelector('text=Custom Garage Door PartsSelectReplacement Sections and Commercial Openers >> a', { timeout:10000});

    await page.locator('text=Custom Garage Door PartsSelectReplacement Sections and Commercial Openers >> a').click();
}
async function beginConfigureInformationPopup(page) {
    let informationPopupMessage = page.locator('div:has-text("Some of our most common configuration options and sizes have been pre-selected t") >> nth=4')
    await expect.soft(informationPopupMessage).toHaveText("Some of our most common configuration options and sizes have been pre-selected to make your experience as simple as possible.Please make sure to review all questions/answers before adding this line to your design.");

}

async function beginConfigureDesignNamePopup(page) {
    let designNamePopUp =page.locator('text=/.*To easily manage and recall your design, click "Save" to save to your account\. I.*/') 
    let designNameInputBox=page.locator('form div:has-text("Design Name:") >> nth=2')
    await expect.soft(designNamePopUp).toHaveText('To easily manage and recall your design, click "Save" to save to your account. If you do not want to create an account, be sure to reference your Design ID.')
    await expect.soft(designNameInputBox).toBeVisible()
  }

async function configureProductOne(page) {
      

    if(await page.$('.modal-header button.close')){
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
const state = allLogins[2];
const stateFilePath = buildStateFilePath({ ...state, appName: MenardsAppNames.garageDoors });
// Load garage door storage state
test.use({ storageState: stateFilePath });

// All Garage Door Tests
test.describe('Garage Door Custom Doors Tests', () => {

    // The following is commented out to restrict the tests to a single test-init scenario. 
    // TODO: This should be debugged and re-enabled.

    // Loop through all login states
    // for (const state of allLogins) {
    // if (state.appName === MenardsAppNames.milliken) {
    //   continue;
    // }


    test('Garage-Doors-Custom-test-Expected options available for Custom doors', async ({ page }) => {
        await startQuote(page);
        await beginConfigureSteelDoor(page);
        const backButton = page.locator('text=Back')
        let customDoor =page.locator('text=Custom Garage Door Parts')

        let tiles = page.locator('.product-select-tiles');
        let panelBody = page.locator('.panel-body');
        await page.waitForSelector('.panel-body', { timeout:10000});
        await expect.soft(panelBody).toHaveText(/Residential Doors/);
        await expect.soft(panelBody).toHaveText(/Commercial Doors/);
        await expect.soft(backButton).toBeVisible()
        await page.locator('text=Back').click();
        await expect.soft(customDoor).toBeVisible()

        await beginConfigureSteelDoor(page);
        await page.locator('text=Residential Doors').click();

        
        await page.waitForSelector('.panel-body', { timeout:10000});

    
        await expect.soft(panelBody).toHaveText(/Traditional Steel Panel/);
        await expect.soft(panelBody).toHaveText(/Designer Steel Panel/);
        await expect.soft(panelBody).toHaveText(/Recessed Steel Panel/);
        await expect.soft(panelBody).toHaveText(/Modern Flush Steel Panel/);


    })


    test('Garage-Doors-Custom-test-Temporary message for supply chain shortages is displayed', async ({ page }) => {
        await startQuote(page);
        await beginConfigureSteelDoor(page);
        await page.locator('text=Residential Doors').click();
        await page.locator('text=Traditional Steel Panel').click();

        const tempMessage = page.locator('.temp-message');
        const backButton = page.locator('button:has-text("Back")')
        const traditionalSteelDoortext = page.locator('text=Traditional Steel Panel')
        await expect.soft(tempMessage).toHaveText('Global and national supply chain shortages and disruptions have impacted the garage door industry. Lead times have been extended. Estimated shipping dates are shown in the shopping cart.');

        await expect.soft(backButton).toBeVisible()
        await page.locator('button:has-text("Back")').click();
        await page.waitForSelector('#spinner', { state: 'hidden' });

        await expect.soft(traditionalSteelDoortext).toBeVisible()

    })

    test('Expected options available for Custom doors in Traditional Steel Panel', async ({ page }) => {
        await startQuote(page);
        await beginConfigureSteelDoor(page);
        await page.locator('text=Residential Doors').click();
        await page.locator('text=Traditional Steel Panel').click();

        
        let panelBody = page.locator('.panel-body');
        await page.waitForSelector('.panel-body', { timeout:10000});

        let tiles = page.locator('.product-select-tiles');
        await expect.soft(tiles).toHaveText(/BEST/);
      await expect.soft(tiles).toHaveText(/BETTER/);
      await expect.soft(tiles).toHaveText(/GOOD/);


    })
    test('Garage-Doors-Custom-test-Expected options available for Modern Steel', async ({ page }) => {
        await startQuote(page);
        await beginConfigureSteelDoor(page);
        const backButton = page.locator('button:has-text("Back")')
        const modernSteelDoortext = page.locator('text=Modern Flush Steel Panel')

        await page.locator('text=Residential Doors').click();
        await page.waitForSelector('#spinner', { state: 'hidden' });

        await page.locator('text=Modern Flush Steel Panel').click();

        
        let panelBody = page.locator('.panel-body');
        await page.waitForSelector('.panel-body', { timeout:10000});

        let tiles = page.locator('div.garage-door-answer>>p>>label');
        await expect.soft(panelBody).toHaveText(/Contemporary/);
      await expect.soft(panelBody).toHaveText(/Designer/);
      await expect.soft(panelBody).toHaveText(/Traditional/);

      
      await expect.soft(backButton).toBeVisible()
      await page.locator('button:has-text("Back")').click();
      await expect.soft(modernSteelDoortext).toBeVisible()


    })

    test('Garage-Doors-Custom-test-Can configure and add garage door to quote', async ({ page }) => {
        test.setTimeout(2 * 60 * 1000);

        await startQuote(page);
        await beginConfigureSteelDoor(page);
        await page.locator('text=Residential Doors').click();
        await page.locator('text=Traditional Steel Panel').click();
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
  //The user should not be allowed to get to the Summary screen
  test('Garage-Doors-Custom-test-Verify Summary Click functionality without adding any item ', async ({ page }) => {
    await startQuote(page); // Contains URL verification/assertion, no assertion needed here.
    await summaryTestsSpecs.verifyInaccessibilityOfSummaryTab(page)
  });

  test('Garage-doors-Popular-test-verifying accessibilty to Purchase Tab,the user should not be allowed to get to the purchase screen', async ({ page }) => {

    await startQuote(page);
    await page.waitForTimeout(2000)
    await page.waitForSelector('#spinner', { state: 'hidden' });
    await purchaseTests.verifyInaccessibilityOfPurchaseTab(page)
  })
  
    test('Garage-Doors-Custom-test-Verifying-Online purchase Tab' ,async ({ page }) => {
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
      await purchaseTests.verifyPurchase(page);
      await purchaseTests.verifyPrintPurchaseDocsDisclamier(page);
    })

   
});
