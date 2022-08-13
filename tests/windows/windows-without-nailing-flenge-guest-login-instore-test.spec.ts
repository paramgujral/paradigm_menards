import { test, expect } from "@playwright/test";
import {
  allLogins,
  buildStateFilePath,
  MenardsAppNames,
} from "../../utils/menards/test-init-constants";
import * as summaryTestsSpecs from '../summary/summary'
import * as purchaseTests from '../purchase/purchase'
import * as globalChange from '../global-change/globalchange'

//------------------------------------------
async function verifyConfiguratorUrlForwindows(page) {
  return await expect(page).toHaveURL(
    /\/quotes\/.*\/configure\/product-select\/MenardsWindows$/
  );
}
async function verifyDesignActive(page) {
  let design = page.locator(".menards-design");
  await expect.soft(design).toHaveClass(/active/);
}
async function startQuote(page) {
  // navigate to the starting point with a new quote
  await page.goto("/home");
  await page.click("text=Start Designing");
  
}
async function closeCross(page) {
  test.setTimeout(2 * 60 * 1000);
  await page.locator("button.close").click();
}
async function withOutNailingFlengeDesign(page) {
  await closeCross(page)
  // Click .css-1hwfws3 >> nth=0
  await page.locator('.css-1hwfws3').first().click();
  // Click #react-select-2-option-5
  await page.locator('#react-select-2-option-5').click();
  // Click .css-bg1rzq-control > .css-1hwfws3
  await page.locator('.css-bg1rzq-control > .css-1hwfws3').click();
  // Click #react-select-3-option-3
  await page.locator('#react-select-3-option-3').click();
  // Click text=Continue >> nth=1
  await page.locator('text=Continue').nth(1).click();
  // Click text=/.*5/8" Flat.*/
  await page.locator('text=/.*5/8" Flat.*/').click();
  // Click #question-id-dddc4cf2-51ed-4afb-9293-34e0aaedad76 div:has-text("— Select —") >> nth=1
  await page.locator('#question-id-dddc4cf2-51ed-4afb-9293-34e0aaedad76 div:has-text("— Select —")').nth(1).click();
  // Click #react-select-5-option-0
  await page.locator('#react-select-5-option-0').click();
  // Click #question-id-dddc4cf2-51ed-4afb-9293-34e0aaedad76 div:has-text("All Glass") >> nth=1
  await page.locator('#question-id-dddc4cf2-51ed-4afb-9293-34e0aaedad76 div:has-text("All Glass")').nth(1).click();
  // Click #react-select-5-option-1
  await page.locator('#react-select-5-option-1').click();
  // Click .form-control >> nth=0
  await page.locator('.form-control').first().click();
  // Fill .form-control >> nth=0
  await page.locator('.form-control').first().fill('3');
  // Click div:nth-child(9) > .panel-body > .row > .col-md-12 > .form-control
  await page.locator('div:nth-child(9) > .panel-body > .row > .col-md-12 > .form-control').click();
  // Fill div:nth-child(9) > .panel-body > .row > .col-md-12 > .form-control
  await page.locator('div:nth-child(9) > .panel-body > .row > .col-md-12 > .form-control').fill('2');
  await page.locator('div:nth-child(10) > .panel-body > .row > .col-md-12 > .form-control').click();
  await page.locator('div:nth-child(10) > .panel-body > .row > .col-md-12 > .form-control').fill('2');
  // Click #question-id-760be12a-58ce-4dba-952b-e081a72c8acd > .css-bg1rzq-control > .css-1hwfws3
  await page.locator('#question-id-760be12a-58ce-4dba-952b-e081a72c8acd > .css-bg1rzq-control > .css-1hwfws3').click();
  // Click .css-1szy77t-control > .css-1hwfws3
  await page.locator('.css-1szy77t-control > .css-1hwfws3').click();
  // Click .css-1szy77t-control > .css-1hwfws3
  await page.locator('.css-1szy77t-control > .css-1hwfws3').click();
  // Click #react-select-4-option-0
  await page.locator('#react-select-4-option-0').click();
  // Click text=Continue >> nth=1
  await page.locator('text=Continue').nth(1).click();
  // Click .form-control >> nth=0
  await page.locator('.form-control').first().click();
  // Fill .form-control >> nth=0
  await page.locator('.form-control').first().fill('62259');
  // Click text=Continue >> nth=1
  await page.locator('text=Continue').nth(1).click();
  // Click text=Continue >> nth=1
  await page.locator('text=Continue').nth(1).click();
  // Click div:nth-child(5) > .panel-body > .question-answers-wrapper > .images-loaded-container > .answers-row > div >> nth=0
  await page.locator('div:nth-child(5) > .panel-body > .question-answers-wrapper > .images-loaded-container > .answers-row > div').first().click();
  // Go to https://menardsdev.wtsparadigm.com/quotes/e8b17827-e1ad-41d0-bc17-11686dc9a4ce/line-items
  // await page.goto('https://menardsdev.wtsparadigm.com/quotes/e8b17827-e1ad-41d0-bc17-11686dc9a4ce/line-items'); --1008

}
async function windowWithOutNailingFlenge(page) {
  // Click text=Windows Without Nailing FlangeSelect >> button
  await page.locator('text=Windows Without Nailing FlangeSelect >> button').click();
  await verifyDesignActive(page)
  // Click text=Back
  await page.locator('text=Back').click();
  let projectType = await page.locator('text=Windows Without Nailing FlangeSelect >> button')
  await expect.soft(projectType).toBeVisible()
  // Click text=Windows Without Nailing FlangeSelect >> button
  await page.locator('text=Windows Without Nailing FlangeSelect >> button').click();
  test.setTimeout(2 * 60 * 1000);
  let panelBody = page.locator(".panel-body");
  await expect.soft(panelBody).toHaveText(/Vinyl Interior & Vinyl Exterior/);
  await expect.soft(panelBody).toHaveText(/Wood Interior & Aluminum Exterior/);
  await expect.soft(panelBody).toHaveText(/Wood Interior & Wood Exterior/);
  // Click text=Vinyl Interior & Vinyl Exterior
  await page.locator('text=Vinyl Interior & Vinyl Exterior').click();
  // Click text=Back
  await page.locator('text=Back').click();
  let materialType = await page.locator('text=Vinyl Interior & Vinyl Exterior')
  await expect.soft(materialType).toBeVisible()
  // Click text=Vinyl Interior & Vinyl Exterior
  await page.locator('text=Vinyl Interior & Vinyl Exterior').click();
  await expect.soft(panelBody).toHaveText(/Single Hung Windows/);
  await expect.soft(panelBody).toHaveText(/Double Hung Windows/);
  await expect.soft(panelBody).toHaveText(/Casement Windows/);
  await expect.soft(panelBody).toHaveText(/Sliding Windows/);
  await expect.soft(panelBody).toHaveText(/Awning Windows/);
  await expect.soft(panelBody).toHaveText(/Picture & Shape Windows/);
  // Click text=Single Hung Windows
  await page.locator('text=Single Hung Windows').click();
  // Click text=Back
  await page.locator('text=Back').click();
  let windowType = await page.locator('text=Single Hung Windows')
  await expect.soft(windowType).toBeVisible()
  // Click text=Single Hung Windows
  await page.locator('text=Single Hung Windows').click();
  await expect.soft(panelBody).toHaveText(/1-Wide/);
  await expect.soft(panelBody).toHaveText(/2-Wide/);
  await expect.soft(panelBody).toHaveText(/3/);
  await expect.soft(panelBody).toHaveText(/3-Wide W/);
  await expect.soft(panelBody).toHaveText(/3-Wide W/);
  await expect.soft(panelBody).toHaveText(/Extended Arch Top/);
  await expect.soft(panelBody).toHaveText(/Extended Semicircle/);
  await expect.soft(panelBody).toHaveText(/Extended Quarter Circle/);
  await expect.soft(panelBody).toHaveText(/Extended Half Arch Top/);
  await expect.soft(panelBody).toHaveText(/3-Wide Extended Arch Top W/);
  await expect.soft(panelBody).toHaveText(/3-Wide Extended Arch Top W/);
  await expect.soft(panelBody).toHaveText(/Design Your Own/);
  await expect.soft(panelBody).toHaveText(/Single Hung W/);
  // Click text=1-Wide
  await page.locator('text=1-Wide').click();
  // Click text=Back
  await page.locator('text=Back').click();
  let mullType = await page.locator('text=1-Wide')
  await expect.soft(mullType).toBeVisible()
  // Click text=1-Wide
  await page.locator('text=1-Wide').click();
  let prevButton = page.locator(".previous");
  await expect.soft(prevButton).toHaveClass(/disabled/);
  let nextButton = page.locator(".next");
  await expect.soft(nextButton).toHaveClass(/disabled/);
  // Click text=One Price Vinyl Program
  await page.locator('text=One Price Vinyl Program').click();
  await page.click('text=×Close');

  await withOutNailingFlangeDesign(page)
}

async function navigationToAddWindowWithOutNailingFlange(page) {
  await page.locator('text=Windows Without Nailing FlangeSelect >> button').click();
  test.setTimeout(2 * 60 * 1000);
  await page.locator('text=Vinyl Interior & Vinyl Exterior').click();
  await page.locator('text=Single Hung Windows').click();
  // Click text=1-Wide
  await page.locator('text=1-Wide').click();
  await page.locator('text=One Price Vinyl Program').click();
}
async function navigationToAddWindowWithOutNailingFlangeForBuildersVinyl(page) {
  await page.locator('text=Windows Without Nailing FlangeSelect >> button').click();
  test.setTimeout(2 * 60 * 1000);
  await page.locator('text=Vinyl Interior & Vinyl Exterior').click();
  await page.locator('text=Single Hung Windows').click();
  // Click text=1-Wide
  await page.locator('text=1-Wide').click();
  await page.locator('text=Builders Vinyl').click();
}

async function withOutNailingFlangeDesign(page) {
  test.setTimeout(2 * 60 * 1000);
  // await page.locator("button.close").click();

  await page.locator('.css-1hwfws3').first().click();

  await page.locator('#react-select-2-option-1').click();

  test.setTimeout(2 * 60 * 1000);
  await page.waitForSelector('#spinner', { state: 'hidden' });

  await page.locator('.css-bg1rzq-control > .css-1hwfws3').first().click();

  await page.locator('#react-select-3-option-1').click();

  await page.locator('text=Continue').nth(1).click();

  test.setTimeout(2 * 60 * 1000);
  await page.waitForSelector('#spinner', { state: 'hidden' });

  await page.locator('text=No Grilles').click();


  await page.locator('text=Continue').nth(1).click();

  await page.locator('.form-control').first().click();

  await page.locator('.form-control').first().fill('50898');
  await page.locator('text=None').nth(1).click();

  // await page.locator('text=Continue').nth(1).click();
  test.setTimeout(2 * 60 * 1000);
  await page.waitForSelector('#spinner', { state: 'hidden' });
  await page.locator('text=Continue').nth(1).click();

  test.setTimeout(2 * 60 * 4000);
  await page.waitForSelector('#spinner', { state: 'hidden' });

  await page.waitForSelector('label:has-text("No Jamb Installation Clips")', { timeout: 10000 });

  await page.locator('label:has-text("No Jamb Installation Clips")').click();


  await page.locator('text=Add to Design').first().click();



}
async function withOutNailingFlangeDesignForBuildersVinyl(page) {
  
  test.setTimeout(2 * 60 * 1000);
  await page.locator('text=Without Nailing Flange').click();

  await page.locator('text=— Select —').first().click();

  await page.locator('#react-select-2-option-1').click();
  test.setTimeout(2 * 60 * 2000);
  await page.waitForSelector('#spinner', { state: 'hidden' }, { timeout: 10000 });
  await page.locator('#question-id-a3093f5f-dafb-48a0-9f22-bd1af5f4dbdd > .css-bg1rzq-control > .css-1hwfws3 ').click();

  await page.locator('#react-select-3-option-1').click();
  test.setTimeout(2 * 60 * 2000);

   await page.locator('text=Continue').nth(1).click();
   await page.waitForTimeout(2000)
   test.setTimeout(2 * 60 * 1000);
   await page.waitForSelector('#spinner', { state: 'hidden' });
   await page.locator('text=White').first().click();
   await page.locator('text=No Grilles').click();
   await page.locator('text=Continue').nth(1).click();
   await page.locator('text=Back Glass Energy EfficiencyEnergy StarAll Options Installation Zip Code STC / O >> input').first().click();
   await page.locator('text=Back Glass Energy EfficiencyEnergy StarAll Options Installation Zip Code STC / O >> input').first().fill('12345');
   await page.locator('text=Installation Zip Code').first().click();
  await page.locator('text=SunFlow').first().click();
  await page.locator('text=Clear').click();
  await page.locator('text=StandardTempered >> img').first().click();
   await page.locator('text=Continue').nth(1).click();
   test.setTimeout(2 * 60 * 2000);
   await page.waitForTimeout(2000)
   await page.waitForSelector('#spinner', { state: 'hidden' });
 
   await page.waitForSelector('label:has-text("No Jamb Installation Clips")', { timeout: 10000 });
 
   await page.locator('text=No Jamb Installation Clips').click();
   await page.waitForTimeout(2000)
   await page.locator('text=Add to Design').first().click();
 
}
async function addPreConfiguredProductToDesign(page) {
  test.setTimeout(2 * 60 * 1000);
  await page.waitForSelector('#spinner', { state: 'hidden' });
  await page.locator('text=Yes').click();

  await page.locator('text=— Select —').first().click();

  await page.locator('#react-select-2-option-1').click();
  test.setTimeout(2 * 60 * 2000);
  await page.waitForSelector('#spinner', { state: 'hidden' }, { timeout: 10000 });
  await page.locator('#question-id-a3093f5f-dafb-48a0-9f22-bd1af5f4dbdd > .css-bg1rzq-control > .css-1hwfws3 ').click();

  await page.locator('#react-select-3-option-1').click();
  test.setTimeout(2 * 60 * 2000);
  await page.waitForSelector('#spinner', { state: 'hidden' });
  await page.waitForSelector('text=Add to Design', { state: 'visible' });

  await page.locator('text=Add to Design').first().click();


}
async function addPreConfiguredProductToDesignForBuildersVinyl(page) {
  test.setTimeout(2 * 60 * 1000);
  await page.waitForSelector('#spinner', { state: 'hidden' });
  await page.locator('text=Yes').click();

  await page.locator('text=— Select —').first().click();

  await page.locator('#react-select-2-option-1').click();
  test.setTimeout(2 * 60 * 2000);
  await page.waitForSelector('#spinner', { state: 'hidden' }, { timeout: 10000 });
  await page.locator('#question-id-a3093f5f-dafb-48a0-9f22-bd1af5f4dbdd > .css-bg1rzq-control > .css-1hwfws3 ').click();

  await page.locator('#react-select-3-option-1').click();
  test.setTimeout(2 * 60 * 2000);
  await page.waitForSelector('#spinner', { state: 'hidden' });
  await page.waitForSelector('text=Add to Design', { state: 'visible' });

  await page.locator('text=Add to Design').first().click();


}

const state = allLogins[0];
const stateFilePath = buildStateFilePath({ ...state, appName: MenardsAppNames.windows });
// Load garage door storage statesś
test.use({ storageState: stateFilePath });
test.describe('Windows Without Nailing Flenge Tests', () => {

  test("window-without-nailing-flenge-test start designing", async ({ page }) => {
    // await verifyLoginPage(page);
    await startQuote(page);
    let panelBody = page.locator(".panel-body");
    await expect.soft(panelBody).toHaveText(/Windows With Nailing Flange/);
    await expect.soft(panelBody).toHaveText(/Windows Without Nailing Flange/);
    await expect.soft(panelBody).toHaveText(/Most Popular Sizes/);
    await expect.soft(panelBody).toHaveText(/Custom Window Parts/);
    await expect.soft(panelBody).toHaveText(/Standard Window Parts/);
    await windowWithOutNailingFlenge(page);
  });

  //*Summary Screen 

  test('"Rename Design",  click on rename Button of Window WithOut Nailing Flange  ', async ({ page }) => {
    await startQuote(page);
    await navigationToAddWindowWithOutNailingFlange(page);
    // await page.click('text=×Close');
    await withOutNailingFlangeDesign(page)
    test.setTimeout(2 * 60 * 1000);
    await page.waitForSelector('#spinner', { state: 'hidden' });
    await summaryTestsSpecs.verifyAccessibilityOfSummaryTab(page)
    // click on the Rename button	
    await summaryTestsSpecs.clickOnRenameButton(page)

  });

  //Line number
  // Check the line items in the design	
  //Line items in the design should display with order numbers like 100, 200, 300…
  test(' Windows-without nailing Flange-test-Check the line items in the design ', async ({ page }) => {
    await startQuote(page);
    await navigationToAddWindowWithOutNailingFlange(page);
    await withOutNailingFlangeDesign(page)
    test.setTimeout(2 * 60 * 1000);
    await page.click('text=×Close');
    await page.waitForTimeout(2000)
    await page.waitForSelector('#spinner', { state: 'hidden' });
    await page.locator('text=Continue Shopping').click();

    await page.waitForSelector('#spinner', { state: 'hidden', timeout: 10000 });

    await navigationToAddWindowWithOutNailingFlange(page)
    test.setTimeout(2 * 60 * 1000);
    await page.waitForTimeout(2000)
    await page.waitForSelector('#spinner', { state: 'hidden' });
    await addPreConfiguredProductToDesign(page)
    await page.waitForTimeout(2000)
    await page.waitForSelector('#spinner', { state: 'hidden' });


    await summaryTestsSpecs.checkingLineItems(page)

  });

  test('Windows-without-nailing-flenge-test-Edit/Copy/Delete the line item', async ({ page }) => {
    await startQuote(page);
    await navigationToAddWindowWithOutNailingFlange(page);
    await withOutNailingFlangeDesign(page)
    test.setTimeout(2 * 60 * 1000);
    await page.waitForSelector('#spinner', { state: 'hidden' });
    await summaryTestsSpecs.verifyAccessibilityOfSummaryTab(page)
    await summaryTestsSpecs.editCopyDeleteLineVerification(page)
  });

  test('"Add Window" without nailing Flange', async ({ page }) => {
    await startQuote(page);
    await navigationToAddWindowWithOutNailingFlange(page);
    await withOutNailingFlangeDesign(page)
    await summaryTestsSpecs.verifyLandingOnSummaryPage(page)
    await summaryTestsSpecs.navigateToPurchaseDesignPageFromSummary(page);
    await page.waitForSelector('#spinner', { state: 'hidden' });

    await page.locator('text=Continue Shopping').click();

    test.setTimeout(2 * 60 * 1000);
    await page.waitForSelector('#spinner', { state: 'hidden' });

    await navigationToAddWindowWithOutNailingFlange(page);
    await addPreConfiguredProductToDesign(page);

    test.setTimeout(2 * 60 * 1000);

    await page.waitForSelector('.line-item-drawing');
    const drawings = await page.$$('.line-item-drawing');
    await expect(drawings.length).toEqual(2);


  });

  test('"New Line Item",Add a new Windows Without Nailing Flange line	 ', async ({ page }) => {
    await startQuote(page);
    await navigationToAddWindowWithOutNailingFlange(page);
    // await page.click('text=×Close');
    await withOutNailingFlangeDesign(page)
    test.setTimeout(2 * 60 * 1000);
    await page.waitForTimeout(2000)
    await page.waitForSelector('#spinner', { state: 'hidden' });
    await page.waitForSelector('.line-item-drawing');
    const drawings = await page.$$('.line-item-drawing');
    await expect(drawings.length).toEqual(1);
    await page.click('text=×Close');

    await page.locator('text=Continue Shopping').click();
    await navigationToAddWindowWithOutNailingFlange(page);
    await page.locator('button:has-text("No")').click();
    await page.waitForTimeout(2000)
    await page.waitForSelector('#spinner', { state: 'hidden' });
    await withOutNailingFlangeDesign(page)
    test.setTimeout(2 * 60 * 4000);

    // await page.waitForSelector('#spinner', { state: 'hidden' });
    // await page.waitForSelector('.line-item-drawing');
    // await expect(drawings.length).toEqual(2); 
    await page.locator('text=Continue Shopping').click();
    test.setTimeout(2 * 60 * 1000);
    await page.waitForSelector('#spinner', { state: 'hidden' });
    await page.waitForTimeout(2000)
    await navigationToAddWindowWithOutNailingFlange(page);
    await addPreConfiguredProductToDesign(page);
    test.setTimeout(2 * 60 * 4000);
    // await page.waitForSelector('#spinner', { state: 'hidden' });
    // await page.waitForSelector('.line-item-drawing');
    // await expect(drawings.length).toEqual(3); 
  })

  test('Windows-Without-Nailing-Flange-test-verify Print Design button', async ({ page }) => {
    await startQuote(page);
    await navigationToAddWindowWithOutNailingFlange(page);
    // await page.click('text=×Close');
    await withOutNailingFlangeDesign(page)
    test.setTimeout(2 * 60 * 1000);
    await page.click('text=×Close');
    await page.waitForTimeout(2000)
    await page.waitForSelector('#spinner', { state: 'hidden' });
    await summaryTestsSpecs.printDesignBtn(page)

  })


  test('Windows-Without-Nailing-Flange-test-verify Copy Design button', async ({ page }) => {
    await startQuote(page);
    await navigationToAddWindowWithOutNailingFlange(page);
    // await page.click('text=×Close');
    await withOutNailingFlangeDesign(page)
    test.setTimeout(2 * 60 * 1000);
    await page.click('text=×Close');
    await page.waitForTimeout(2000)
    await page.waitForSelector('#spinner', { state: 'hidden' });
    await summaryTestsSpecs.copyDesignBtn(page)
  })

  test('Windows-Without-Nailing-Flange-test-verify Restart Design button	', async ({ page }) => {
    await startQuote(page);
    await navigationToAddWindowWithOutNailingFlange(page);
    // await page.click('text=×Close');
    await withOutNailingFlangeDesign(page)
    test.setTimeout(2 * 60 * 1000);
    await page.click('text=×Close');
    await page.waitForTimeout(2000)
    await page.waitForSelector('#spinner', { state: 'hidden' });
    await summaryTestsSpecs.restartBtn(page)
    await navigationToAddWindowWithOutNailingFlange(page)
    // await page.locator('text=×Close').click();
    //Restart button should be available on the configurator screen (window & door, part configurator, pre-configured unit)
    await summaryTestsSpecs.renameButtonVisibility(page)
    await withOutNailingFlangeDesign(page)
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


  //Access to Purchase Tab
  test('"Access to Purchase Tab",The user should not be allowed to get to the purchase screen', async ({ page }) => {

    await startQuote(page);
    await page.waitForTimeout(2000)
    await page.waitForSelector('#spinner', { state: 'hidden' });
    await purchaseTests.verifyInaccessibilityOfPurchaseTab(page)
  })


  test('Windows Without Nailing Flange-The user should not be allowed to get to the purchase screen', async ({ page }) => {

    await startQuote(page);
    await page.waitForTimeout(2000)
    await navigationToAddWindowWithOutNailingFlange(page);
    // await page.click('text=×Close');
    await withOutNailingFlangeDesign(page)
    test.setTimeout(2 * 60 * 1000);
    await page.waitForSelector('#spinner', { state: 'hidden' });
    await page.click('text=×Close');
    await purchaseTests.verifyPurchase(page);
    await purchaseTests.verifyPrintPurchaseDocsDisclamier(page);
  })

  test('"Add one Windows Without Nailing Flange line to the design" - click on Add to Design in configurator after a product is done configuration	', async ({ page }) => {
    await startQuote(page);
    await navigationToAddWindowWithOutNailingFlange(page)
    // await page.locator('text=×Close').click();
    await withOutNailingFlangeDesign(page)
    test.setTimeout(2 * 60 * 1000);
    await page.click('text=×Close');
    await page.waitForTimeout(2000)
    await page.waitForSelector('#spinner', { state: 'hidden' });
    await summaryTestsSpecs.verifyAccessibilityOfSummaryTab(page)
    //Click on Purchase button on the Summary page	
    await purchaseTests.clickOnPurchaseButton(page)
  })


  test('"Start a new design, add one pre-configured product to the design', async ({ page }) => {
    await startQuote(page);
    await navigationToAddWindowWithOutNailingFlange(page)
    // await page.locator('text=×Close').click();
    await withOutNailingFlangeDesign(page)
    test.setTimeout(2 * 60 * 1000);
    await page.click('text=×Close');
    await page.waitForTimeout(2000)
    await page.waitForSelector('#spinner', { state: 'hidden' });

    await page.locator('text=Continue Shopping').click();

    test.setTimeout(2 * 60 * 1000);
    await page.waitForSelector('#spinner', { state: 'hidden' });

    await navigationToAddWindowWithOutNailingFlange(page);
    await addPreConfiguredProductToDesign(page);
    //Click on Purchase tab at the top	
    await page.waitForSelector('#purchase-link', { timeout: 10000 });
    await page.locator('#purchase-link').click();
    //The purchase tab at the top should be highlighted
    await purchaseTests.purchaseTabHighlightProperty(page)

  })

  //Global change

  test('Windows Without Nailing Flange-If there only one window line in the design, global changes should not be triggered', async ({ page }) => {
    await startQuote(page);
    await navigationToAddWindowWithOutNailingFlangeForBuildersVinyl(page)
    await page.locator('text=×Close').click();
    await withOutNailingFlangeDesignForBuildersVinyl(page)
    test.setTimeout(2 * 60 * 1000);
    await page.click('text=×Close');
    await page.waitForTimeout(2000)
    await page.waitForSelector('#spinner', { state: 'hidden' });

    await page.locator('a:has-text("Edit")').click();
    // Click button:has-text("Design Options")
    await page.locator('button:has-text("Design Options")').click();
    // Click text=Desert Sand
    await page.locator('text=Desert Sand').click();
    await page.locator('button:has-text("Save Line")').first().click()
    await globalChange.verifyGlobalChangeNotTriggered(page)

  })


  // test("Windows Without Nailing Flange-If there're multiple windows lines, but the line you edited is the only one from this catalog, global changes should not be triggered", async ({ page }) => {
  //   await startQuote(page);
  //   await navigationToAddWindowWithOutNailingFlange(page)
  //   await page.locator('text=×Close').click();
  //   await withOutNailingFlangeDesignForBuildersVinyl(page)
  //   test.setTimeout(2 * 60 * 1000);
  //   await page.click('text=×Close');
  //   await page.waitForTimeout(2000)
  //   await page.waitForSelector('#spinner', { state: 'hidden' });
  //   await page.locator('text=Continue Shopping').click();
  //   await page.waitForSelector('#spinner', { state: 'hidden', timeout: 10000 });

  //   await navigationToAddWindowWithOutNailingFlange(page)
  //   test.setTimeout(2 * 60 * 1000);
  //   await page.waitForTimeout(2000)
  //   await page.waitForSelector('#spinner', { state: 'hidden' });
  //   await addPreConfiguredProductToDesign(page)
  //   await page.waitForTimeout(2000)
  //   await page.waitForSelector('#spinner', { state: 'hidden', timeout: 10000 });

  //   await page.locator('text=Edit').first().click();
  //   await page.locator('button:has-text("Design Options")').click();
  //   await page.locator('text=Desert Sand').click();
  //   await page.locator('button:has-text("Save Line")').first().click()
  //   await globalChange.verifyGlobalChangeNotTriggered(page)
  // })

  test("Windows Without Nailing Flange-If there're more than one window line from a same catalog, but the Q&A you edited is not checked off with Include in Global Changes in the Question template, global changes should not be triggered", async ({ page }) => {
    await startQuote(page);
    await navigationToAddWindowWithOutNailingFlangeForBuildersVinyl(page)
    await page.locator('text=×Close').click();
    await withOutNailingFlangeDesignForBuildersVinyl(page)
    test.setTimeout(2 * 60 * 1000);
    await page.click('text=×Close');
    await page.waitForTimeout(2000)
    await page.waitForSelector('#spinner', { state: 'hidden' });
    await page.locator('text=Continue Shopping').click();
    await page.waitForSelector('#spinner', { state: 'hidden', timeout: 10000 });

    await navigationToAddWindowWithOutNailingFlangeForBuildersVinyl(page)
    test.setTimeout(2 * 60 * 1000);
    await page.waitForTimeout(2000)
    await page.waitForSelector('#spinner', { state: 'hidden' });
    await addPreConfiguredProductToDesign(page)
    await page.waitForTimeout(2000)
    await page.waitForSelector('#spinner', { state: 'hidden', timeout: 10000 });
    await page.locator('text=Edit').first().click();
    await page.locator('button:has-text("Design Options")').click();
    await page.locator('text=Desert Sand').click();
    await page.locator('button:has-text("Save Line")').first().click()
    await globalChange.verifyGlobalChangeIsTriggered(page)
    await page.locator('text=Skip All').click();
    await page.locator('text=More Specs >> nth=1').click();
    let newlyAddedItem = page.locator('div:nth-child(2) > .panel-body')
    await expect.soft(newlyAddedItem).not.toHaveText(/Exterior Finish = Desert Sand/)


    await page.locator('text=Edit').first().click();
    await page.locator('button:has-text("Design Options")').click();

    let exteriorFinish = page.locator('.question-answers-wrapper >> nth=0 >> div.selected')
    await expect.soft(exteriorFinish).toHaveText(/Desert Sand/)
    // let lockHardwareType = page.locator('.question-answers-wrapper >> nth=3>> div.selected')
    // await expect.soft(lockHardwareType).toHaveText(/Style Cam Lock(s)/)
    await page.locator('text=Cancel').click();
    await page.waitForTimeout(2000)

    await page.locator('text=Edit >> nth=1').click();
    await page.locator('button:has-text("Design Options")').click();
    await expect.soft(exteriorFinish).not.toHaveText(/Desert Sand/)
    // await expect.soft(lockHardwareType).not.toHaveText(/Style Cam Lock(s)/)
    await page.locator('text=Cancel').click();
    await page.waitForTimeout(2000)

  })

  test("Windows Without Nailing Flange-If there're more than one window line from a same catalog, but the Q&A you edited is checked off with Include in Global Changes in the Question template, global changes should be triggered", async ({ page }) => {
    await startQuote(page);
    await navigationToAddWindowWithOutNailingFlangeForBuildersVinyl(page)
    // await page.locator('text=×Close').click();
    await withOutNailingFlangeDesignForBuildersVinyl(page)
    test.setTimeout(2 * 60 * 1000);
    await page.click('text=×Close');
    await page.waitForTimeout(2000)
    await page.waitForSelector('#spinner', { state: 'hidden' });
    await page.locator('text=Continue Shopping').click();
    await page.waitForSelector('#spinner', { state: 'hidden', timeout: 10000 });

    await navigationToAddWindowWithOutNailingFlangeForBuildersVinyl(page)
    test.setTimeout(2 * 60 * 1000);
    await page.waitForTimeout(2000)
    await page.waitForSelector('#spinner', { state: 'hidden' });
    await addPreConfiguredProductToDesign(page)
    await page.waitForTimeout(2000)
    await page.waitForSelector('#spinner', { state: 'hidden', timeout: 10000 });
    await page.locator('text=Edit').first().click();
    await page.locator('button:has-text("Design Options")').click();
    await page.locator('text=Desert Sand').click();
    await page.locator('button:has-text("Save Line")').first().click()
    await globalChange.verifyGlobalChangeIsTriggered(page)
    await page.locator('text=Apply All').click();
    await page.locator('text=Apply Changes').click();
    await page.locator('text=More Specs >> nth=1').click();
    let newlyAddedItem = page.locator('div:nth-child(2) > .panel-body')
    await expect.soft(newlyAddedItem).toHaveText(/Exterior Finish = Desert Sand/)

  })

  test("Windows Without Nailing Flange-It should take the user to the global changes screen asking user if s/he wants to apply this change to other windows on the design", async ({ page }) => {
    await startQuote(page);
    await navigationToAddWindowWithOutNailingFlangeForBuildersVinyl(page)
    await page.locator('text=×Close').click();
    await withOutNailingFlangeDesignForBuildersVinyl(page)
    test.setTimeout(2 * 60 * 1000);
    await page.click('text=×Close');
    await page.waitForTimeout(2000)
    await page.waitForSelector('#spinner', { state: 'hidden' });
    await page.locator('text=Continue Shopping').click();
    await page.waitForSelector('#spinner', { state: 'hidden', timeout: 10000 });

    await navigationToAddWindowWithOutNailingFlangeForBuildersVinyl(page)
    test.setTimeout(2 * 60 * 1000);
    await page.waitForTimeout(2000)
    await page.waitForSelector('#spinner', { state: 'hidden' });
    await addPreConfiguredProductToDesign(page)
    await page.waitForTimeout(2000)
    await page.waitForSelector('#spinner', { state: 'hidden', timeout: 10000 });
    await page.locator('text=Edit').first().click();
    await page.locator('button:has-text("Design Options")').click();
    await page.locator('text=Desert Sand').click();
    await page.locator('text=Style Cam Lock(s)').click();
    await page.locator('button:has-text("Save Line")').first().click()
    await globalChange.verifyGlobalChangeIsTriggered(page)
    // It should list every change the user made on the questions that're included in global change checking
    // Each change should be a separate section that has the new value and applicable lines
    let newlyAddedItem1 = page.locator('div:nth-child(1) > .panel-body:has-text("Desert Sand)")')
    let newlyAddedItem2 = page.locator('div:nth-child(2) > .panel-body:has-text("Style Cam Lock(s)")')
    await expect.soft(newlyAddedItem1).toBeVisible()
    await expect.soft(newlyAddedItem2).toBeVisible()
    await page.waitForTimeout(2000)

    await page.locator('text=Apply All').first().click();
    await page.locator('text=Apply All >> nth=1').click();
    await page.locator('text=Apply Changes').click();
    await page.locator('text=More Specs >> nth=1').click();
    await expect.soft(newlyAddedItem2).toHaveText(/Exterior Finish = Desert Sand/)


  })


  test("Windows Without Nailing Flange-Apply Global Changes ", async ({ page }) => {
    await startQuote(page);
    await navigationToAddWindowWithOutNailingFlangeForBuildersVinyl(page)
    // await page.locator('text=×Close').click();
    await withOutNailingFlangeDesignForBuildersVinyl(page)
    test.setTimeout(2 * 60 * 1000);
    await page.click('text=×Close');
    await page.waitForTimeout(2000)
    await page.waitForSelector('#spinner', { state: 'hidden' });
    await page.locator('text=Continue Shopping').click();
    await page.waitForSelector('#spinner', { state: 'hidden', timeout: 10000 });

    await navigationToAddWindowWithOutNailingFlangeForBuildersVinyl(page)
    test.setTimeout(2 * 60 * 1000);
    await page.waitForTimeout(2000)
    await page.waitForSelector('#spinner', { state: 'hidden' });
    await addPreConfiguredProductToDesign(page)
    await page.waitForTimeout(2000)
    await page.waitForSelector('#spinner', { state: 'hidden', timeout: 10000 });
    await page.locator('text=Edit').first().click();
    await page.locator('button:has-text("Design Options")').click();
    await page.locator('text=Desert Sand').click();
    await page.locator('text=Style Cam Lock(s)').click();
    await page.locator('button:has-text("Save Line")').first().click()
    await globalChange.verifyGlobalChangeIsTriggered(page)

    // Check off lines with checkboxes	
    // The user should be able to check or uncheck a line item for one change or more changes
    await page.locator('input[type="checkbox"]').first().check();
    await page.locator('input[type="checkbox"]').first().uncheck();
    await page.waitForTimeout(2000)

    // It should list every change the user made on the questions that're included in global change checking
    // Each change should be a separate section that has the new value and applicable lines
    let newlyAddedItem1 = page.locator('div:nth-child(1) > .panel-body:has-text("Desert Sand)")')
    let newlyAddedItem2 = page.locator('div:nth-child(2) > .panel-body:has-text("Style Cam Lock(s)")')
    await expect.soft(newlyAddedItem1).toBeVisible()
    await expect.soft(newlyAddedItem2).toBeVisible()
    await page.waitForTimeout(2000)
    // Click on Apply All button for a change	
    await page.locator('text=Apply All').first().click();
    await page.locator('text=Apply All >> nth=1').click();
    await page.locator('text=Apply Changes').click();
    // await page.locator('text=More Specs >> nth=1').click();  
    // await expect.soft(newlyAddedItem2).toHaveText(/Exterior Finish = Desert Sand/)
    await page.waitForTimeout(2000)
    await page.waitForSelector('#spinner', { state: 'hidden' });
    await page.locator('text=Edit').first().click();
    await page.locator('button:has-text("Design Options")').click();

    let exteriorFinish = page.locator('.question-answers-wrapper >> nth=0 >> div.selected')
    await expect.soft(exteriorFinish).toHaveText(/Desert Sand/)
    let lockHardwareType = page.locator('.question-answers-wrapper >> nth=3>> div.selected')
    await expect.soft(lockHardwareType).toHaveText("Style Cam Lock(s)")
    await page.locator('text=Cancel').click();
    await page.waitForTimeout(2000)

    await page.locator('text=Edit >> nth=1').click();
    await page.locator('button:has-text("Design Options")').click();
    await expect.soft(exteriorFinish).toHaveText(/Desert Sand/)
    await expect.soft(lockHardwareType).toHaveText("Style Cam Lock(s)")
    await page.locator('text=Cancel').click();
    await page.waitForTimeout(2000)


  })

  test("Windows Without Nailing Flange-validating the Estimation Prices", async ({ page }) => {
    await startQuote(page);
    await navigationToAddWindowWithOutNailingFlangeForBuildersVinyl(page)
    // await page.locator('text=×Close').click();
    await withOutNailingFlangeDesignForBuildersVinyl(page)
    test.setTimeout(2 * 60 * 1000);
    await page.click('text=×Close');
    await page.waitForTimeout(2000)
    await page.waitForSelector('#spinner', { state: 'hidden' });
    await page.locator('text=Continue Shopping').click();
    await page.waitForSelector('#spinner', { state: 'hidden', timeout: 10000 });

    await navigationToAddWindowWithOutNailingFlangeForBuildersVinyl(page)
    test.setTimeout(2 * 60 * 1000);
    await page.waitForTimeout(2000)
    await page.waitForSelector('#spinner', { state: 'hidden' });
    await addPreConfiguredProductToDesign(page)
    await page.waitForTimeout(2000)
    await page.waitForSelector('#spinner', { state: 'hidden', timeout: 10000 });
    await summaryTestsSpecs.validatingtheSumOfPrices(page)
  })


})