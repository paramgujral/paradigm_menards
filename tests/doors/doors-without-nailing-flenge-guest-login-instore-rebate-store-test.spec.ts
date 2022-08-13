import { test, expect } from "@playwright/test";
import {
  allLogins,
  buildStateFilePath,
  MenardsAppNames,
} from "../../utils/menards/test-init-constants";
import * as summaryTestsSpecs from '../summary/summary'
import * as purchaseTests from '../purchase/purchase'

//------------------------------------------
async function verifyConfiguratorUrlForDoors(page) {
  return await expect(page).toHaveURL(
    /\/quotes\/.*\/configure\/product-select\/MenardsPatioDoors$/
  );
}

async function closePopup(page){
  test.setTimeout(2 * 60 * 1000);
  if (await page.$$('text=Close')) {
    await page.locator('text=×Close').click()
  }
}


async function closeCross(page) {

  // const dialogHeader = await page.$(".modal-header");
  // await expect.soft(dialogHeader).toBeVisible()

  if ( await page.locator(".modal-header"))
    {
    await page.waitForSelector('.modal-header > button.close > span:nth-child(2)');
    await page.click('.modal-header > button.close > span:nth-child(2)');
  }   
}
async function verifyDesignActive(page) {
  let design = page.locator(".menards-design");
  await expect.soft(design).toHaveClass(/active/);
}

async function startQuoteDoors(page) {
  // navigate to the starting point with a new quote
  await page.goto("/home");
  await page.click("text=Start Designing");
  await verifyConfiguratorUrlForDoors(page);
}
async function doorsWithoutNailingFlengeDesign(page) {
  // Click text=×Close
  // await page.locator('text=×Close').click();
  // Click .css-1hwfws3 >> nth=0
  await page.waitForTimeout(10000)
  await page.locator('.css-1hwfws3').first().click();
  // Click #react-select-2-option-1
  await page.locator('#react-select-2-option-1').click();
  // Click .css-bg1rzq-control > .css-1hwfws3 >> nth=0
  await page.locator('.css-bg1rzq-control > .css-1hwfws3').first().click();
  // Click #react-select-3-option-1
  await page.locator('#react-select-3-option-1').click();
  // Click text=XO (Left Hand)
  await page.locator('text=XO (Left Hand)').click();
  // Click text=Continue >> nth=1
  await page.locator('text=Continue').nth(1).click();
  // Click text=WhiteDesert SandAlmondFiniShield BronzeFiniShield Black >> img >> nth=0
  await page.locator('text=WhiteDesert SandAlmondFiniShield BronzeFiniShield Black >> img').first().click();
  // Click text=No Grilles
  await page.locator('text=No Grilles').click();
  test.setTimeout(2 * 60 * 2000);
  await page.waitForSelector('#spinner', { state: 'hidden' }, { timeout: 15000 });
  // Click text=Continue >> nth=1
  await page.locator('text=Continue').nth(1).click();
  // Click .form-control >> nth=0
  await page.locator('.form-control').first().click();
  // Fill .form-control >> nth=0
  await page.locator('.form-control').first().fill('12345');
  // Click text=SunStable
  await page.locator('text=SunStable').click();
  // Click text=SunStable
  await page.locator('text=SunStable').click();
  // Click text=Clear >> nth=0
  await page.locator('text=Clear').first().click();
  // Click text=Continue >> nth=1
  await page.locator('text=Continue').nth(1).click();
  // test.setTimeout(2 * 60 * 1000);
  test.setTimeout(2 * 60 * 2000);
  await page.waitForSelector('#spinner', { state: 'hidden' });
  await page.waitForSelector('input[name="question-id-bd692fe4-c92f-4732-b192-c0b3ea8ce2300"] >> nth=0', { state: 'visible' }, { timeout: 10000 });
  await page.locator('input[name="question-id-bd692fe4-c92f-4732-b192-c0b3ea8ce2300"]').first().click();
  await page.locator('text=Add to Design').first().click();

  //  await closeCross(page) 
  // // Click text=Actual Size
  // await page.locator('text=Actual Size').click();
  // // Click .css-1hwfws3 >> nth=0
  // await page.locator('.css-1hwfws3').first().click();
  // // Click #react-select-5-option-4
  // await page.locator('#react-select-5-option-4').click();
  // // Click .css-bg1rzq-control > .css-1hwfws3 >> nth=0
  // await page.locator('.css-bg1rzq-control > .css-1hwfws3').first().click();
  // // Click #react-select-6-option-1
  // await page.locator('#react-select-6-option-1').click();
  // // Click text=XO (Left Hand)
  // await page.locator('text=XO (Left Hand)').click();
  // // Click text=Continue >> nth=1
  // await page.locator('text=Continue').nth(1).click();
  // // Click text=Desert Sand
  // await page.locator('text=Desert Sand').click();
  // // Click text=No Grilles
  // await page.locator('text=No Grilles').click();
  // // Click text=Continue >> nth=1
  // await page.locator('text=Continue').nth(1).click();
  // // Click text=All Options
  // await page.locator('text=All Options').click();
  // // Click text=No Low-E
  // await page.locator('text=No Low-E').click();
  // // Click text=Clear >> nth=0
  // await page.locator('text=Clear').first().click();
  // // Click text=Continue >> nth=1
  // await page.locator('text=Continue').nth(1).click();
  // Go to https://menardsdev.wtsparadigm.com/quotes/8edc2cee-e63f-4b81-bbf6-bf65fb5223aa/line-items
  //   await page.goto('https://menardsdev.wtsparadigm.com/quotes/8edc2cee-e63f-4b81-bbf6-bf65fb5223aa/line-items');
}


async function navigateToDoorsWithoutNailingFlenge(page) {
  // await page.waitForSelector('text=Patio Doors Without Nailing FlangeSelect >> button"', { state: 'visible' },{timeout:10000});  
  await page.locator("text=Patio Doors Without Nailing FlangeSelect >> button")
    .click();
  await verifyDesignActive(page);
  test.setTimeout(2 * 60 * 1000);
  await page.waitForSelector('#spinner', { state: 'hidden' }, { timeout: 15000 });
  await page.locator("text=Vinyl Interior & Vinyl Exterior").click();
  test.setTimeout(2 * 60 * 1000);
  await page.waitForSelector('#spinner', { state: 'hidden' }, { timeout: 15000 });
  await page.locator("text=Sliding Patio Doors").click();
  await page.waitForSelector('#spinner', { state: 'hidden' }, { timeout: 15000 });
  test.setTimeout(2 * 60 * 1000);
  await page.locator("text=2 Panel Sliding Door").first().click();
  // await page.locator("text=Sliding Patio Doors").first().click();
  test.setTimeout(2 * 60 * 1000);
  await page.waitForSelector('#spinner', { state: 'hidden' }, { timeout: 15000 });
  await page.waitForSelector('#spinner', { state: 'hidden' }, { timeout: 15000 });
  await page.locator("text=Builders Vinyl").click();
  // closePopup(page);

}

async function doorsWithoutNailingFlenge(page) {
  // Click text=Patio Doors Without Nailing FlangeSelect >> button
  await page
    .locator("text=Patio Doors Without Nailing FlangeSelect >> button")
    .click();
  // Click text=Back
  await page.locator("text=Back").click();
  let projectType = await page
    .locator("text=Patio Doors Without Nailing FlangeSelect >> button")
  await expect.soft(projectType).toBeVisible()
  // Click text=Patio Doors Without Nailing FlangeSelect >> button
  await page
    .locator("text=Patio Doors Without Nailing FlangeSelect >> button")
    .click();
  await verifyDesignActive(page);
  let panelBody = page.locator(".panel-body");
  await expect.soft(panelBody).toHaveText(/Vinyl Interior & Vinyl Exterior/);
  await expect.soft(panelBody).toHaveText(/Wood Interior & Aluminum Exterior/);
  
  // Click text=Vinyl Interior & Vinyl Exterior
  await page.locator("text=Vinyl Interior & Vinyl Exterior").click();
  
  // Click text=Back
  await page.locator("text=Back").click();
  
  let materialType = await page.locator("text=Vinyl Interior & Vinyl Exterior")
  await expect.soft(materialType).toBeVisible()
  
  // Click text=Vinyl Interior & Vinyl Exterior
  await page.locator("text=Vinyl Interior & Vinyl Exterior").click();
  
  test.setTimeout(2 * 60 * 1000);
  await expect.soft(panelBody).toHaveText(/Sliding Patio Doors/);
  await expect.soft(panelBody).toHaveText(/Sidelites & Transoms/);
  
  // Click text=Sliding Patio Doors
  await page.locator("text=Sliding Patio Doors").click();
  
  // Click text=Back
  await page.locator("text=Back").click();
  
  let doorType = await page.locator("text=Sliding Patio Doors")
  await expect.soft(doorType).toBeVisible()
  
  // Click text=Sliding Patio Doors
  await page.locator("text=Sliding Patio Doors").click();
  
  test.setTimeout(2 * 60 * 1000);
  await expect.soft(panelBody).toHaveText(/2 Panel Sliding Door/);
  await expect.soft(panelBody).toHaveText(/2 Panel Sliding Door W/);
  await expect.soft(panelBody).toHaveText(/3 Panel Sliding Door/);
  await expect.soft(panelBody).toHaveText(/4 Panel Sliding Door/);
  
  // Click text=2 Panel Sliding Door >> nth=0
  await page.locator("text=2 Panel Sliding Door").first().click();
  
  // Click text=Back
  await page.locator("text=Back").click();
  
  let doorConfiguration = await page.locator("text=2 Panel Sliding Door").first()
  await expect.soft(doorConfiguration).toBeVisible()
  
  // Click text=2 Panel Sliding Door >> nth=0
  await page.locator("text=2 Panel Sliding Door").first().click();
  
  let prevButton = page.locator(".previous");
  await expect.soft(prevButton).toHaveClass(/disabled/);
  
  let nextButton = page.locator(".next");
  await expect.soft(nextButton).toHaveClass(/disabled/);
  await page.locator("text=Builders Vinyl").click();
  closePopup(page);
  await doorsWithoutNailingFlengeDesign(page)
}

async function addPreConfiguredProductToDesign(page) {
  test.setTimeout(2 * 60 * 1000);
  await page.waitForSelector('#spinner', { state: 'hidden' }, { timeout: 15000 });
  await page.locator('text=Yes').click();
  // Click .css-1hwfws3 >> nth=0
  await page.waitForSelector('#spinner', { state: 'hidden' }, { timeout: 15000 });
  await page.locator('.css-1hwfws3').first().click();
  // Click #react-select-2-option-1
  test.setTimeout(2 * 60 * 2000);

  await page.locator('#react-select-2-option-1').click();
  // Click .css-bg1rzq-control > .css-1hwfws3 >> nth=0
  await page.locator('.css-bg1rzq-control > .css-1hwfws3').first().click();
  // Click #react-select-3-option-1
  await page.locator('#react-select-3-option-1').click();

  await page.locator('text=Continue').nth(1).click();

  test.setTimeout(2 * 60 * 2000);
  await page.waitForSelector('#spinner', { state: 'hidden' });
  await page.locator('text=Continue').nth(1).click();

  test.setTimeout(2 * 60 * 2000);
  await page.waitForSelector('#spinner', { state: 'hidden' });
  await page.locator('text=Continue').nth(1).click();

  test.setTimeout(2 * 60 * 2000);
  await page.waitForSelector('#spinner', { state: 'hidden' });
  await page.waitForSelector('input[name="question-id-bd692fe4-c92f-4732-b192-c0b3ea8ce2300"] >> nth=0', { state: 'visible' }, { timeout: 10000 });
  await page.locator('input[name="question-id-bd692fe4-c92f-4732-b192-c0b3ea8ce2300"]').first().click();
  test.setTimeout(2 * 60 * 2000);
  await page.waitForSelector('#spinner', { state: 'hidden' });
  await page.waitForSelector('text=Add to Design', { state: 'visible' });

  await page.locator('text=Add to Design').first().click();


}
const state = allLogins[4];
const stateFilePath = buildStateFilePath({
  ...state,
  appName: MenardsAppNames.doors,
});

// Load door storage statesś
test.use({ storageState: stateFilePath });
test.describe('doors without Nailing Flenge', () => {

  test("door-without-nailing-flenge-test start designing", async ({ page }) => {
    // await verifyLoginPage(page);
    await startQuoteDoors(page);
    let panelBody = page.locator(".panel-body");
    await expect.soft(panelBody).toHaveText(/Patio Doors With Nailing Flange/);
    await expect.soft(panelBody).toHaveText(/Patio Doors Without Nailing Flange/);
    await expect.soft(panelBody).toHaveText(/Most Popular Sizes/);
    await expect.soft(panelBody).toHaveText(/Custom Patio Door Parts/);
    await expect.soft(panelBody).toHaveText(/Standard Patio Door Parts/);
    await doorsWithoutNailingFlenge(page);
  });


  //*Summary Screen 

  test('"Rename Design",  click on rename Button of Window WithOut Nailing Flange  ', async ({ page }) => {
    await startQuoteDoors(page);
    await navigateToDoorsWithoutNailingFlenge(page);
    // await page.locator('text=×Close').click();
    await doorsWithoutNailingFlengeDesign(page)
    test.setTimeout(2 * 60 * 1000);
    await page.waitForSelector('#spinner', { state: 'hidden' });
    await summaryTestsSpecs.verifyAccessibilityOfSummaryTab(page)
    // click on the Rename button	
    await summaryTestsSpecs.clickOnRenameButton(page)

  });

  //Line number
  // Check the line items in the design	
  //Line items in the design should display with order numbers like 100, 200, 300…
  test('"Line number", Check the line items in the design	Window" without nailing Flange  ', async ({ page }) => {
    await startQuoteDoors(page);
    await navigateToDoorsWithoutNailingFlenge(page);
    //await page.locator('text=×Close').click();
    await doorsWithoutNailingFlengeDesign(page)
    test.setTimeout(2 * 60 * 1000);
    await page.click('text=×Close');
    await page.waitForTimeout(2000)
    await page.waitForSelector('#spinner', { state: 'hidden' });
    await page.locator('text=Continue Shopping').click();

    // await navigateToDoorsWithoutNailingFlenge(page);
    //   test.setTimeout(2 * 60 * 1000);
    // await page.waitForTimeout(2000)
    // await page.waitForSelector('#spinner', { state: 'hidden' });
    // await addPreConfiguredProductToDesign(page);
    // await page.waitForTimeout(2000)
    // await page.waitForSelector('#spinner', { state: 'hidden' });
    // await page.locator('text=Continue Shopping').click();
    // await page.waitForTimeout(2000)
    // await page.waitForSelector('#spinner', { state: 'hidden' });
    await page.waitForSelector('#spinner', { state: 'hidden', timeout: 10000 });

    await navigateToDoorsWithoutNailingFlenge(page)
    test.setTimeout(2 * 60 * 1000);
    await page.waitForTimeout(2000)
    await page.waitForSelector('#spinner', { state: 'hidden' });
    await addPreConfiguredProductToDesign(page)
    await page.waitForTimeout(2000)
    await page.waitForSelector('#spinner', { state: 'hidden' });


    await summaryTestsSpecs.checkingLineItems(page)

  });

  test('"Edit/Copy/Delete line", without Nailing flange', async ({ page }) => {
    await startQuoteDoors(page);
    await navigateToDoorsWithoutNailingFlenge(page);
    // closePopup(page);
    // await page.locator('text=×Close').click();
    await doorsWithoutNailingFlengeDesign(page)
    test.setTimeout(2 * 60 * 1000);
    await page.waitForSelector('#spinner', { state: 'hidden' });
    await summaryTestsSpecs.verifyAccessibilityOfSummaryTab(page)
    await summaryTestsSpecs.editCopyDeleteLineVerification(page)
  });

  test('"Add Window" without nailing Flange', async ({ page }) => {
    await startQuoteDoors(page);
    await navigateToDoorsWithoutNailingFlenge(page);
    // closePopup(page);
    // await page.locator('text=×Close').click();
    await doorsWithoutNailingFlengeDesign(page)
    await summaryTestsSpecs.verifyLandingOnSummaryPage(page)
    await summaryTestsSpecs.navigateToPurchaseDesignPageFromSummary(page);
    await page.waitForSelector('#spinner', { state: 'hidden' });

    await page.locator('text=Continue Shopping').click();

    test.setTimeout(2 * 60 * 1000);
    await page.waitForSelector('#spinner', { state: 'hidden' });

    await navigateToDoorsWithoutNailingFlenge(page);
    await addPreConfiguredProductToDesign(page);

    test.setTimeout(2 * 60 * 1000);

    await page.waitForSelector('.line-item-drawing');
    const drawings = await page.$$('.line-item-drawing');
    await expect(drawings.length).toEqual(2);


  });

  test('"New Line Item",Add a new Windows Without Nailing Flange line	 ', async ({ page }) => {
    await startQuoteDoors(page);
    await page.waitForTimeout(2000)
    test.setTimeout(2 * 60 * 4000);
    await page.waitForSelector('#spinner', { state: 'hidden', timeout: 10000 });
    await navigateToDoorsWithoutNailingFlenge(page);
    await doorsWithoutNailingFlengeDesign(page)
    test.setTimeout(2 * 60 * 1000);
    await page.waitForTimeout(2000)
    await page.waitForSelector('#spinner', { state: 'hidden' });
    await page.waitForSelector('.line-item-drawing');
    const drawings = await page.$$('.line-item-drawing');
    await expect(drawings.length).toEqual(1);
    await page.click('text=×Close');

    await page.locator('text=Continue Shopping').click();
    test.setTimeout(2 * 60 * 4000);
    await page.waitForSelector('#spinner', { state: 'hidden', timeout: 10000 });
    await navigateToDoorsWithoutNailingFlenge(page);
    await page.locator('button:has-text("No")').click();
    await page.waitForTimeout(2000)
    await page.waitForSelector('#spinner', { state: 'hidden' });

    await doorsWithoutNailingFlengeDesign(page)
    test.setTimeout(2 * 60 * 4000);

    // await page.waitForSelector('#spinner', { state: 'hidden' });
    // await page.waitForSelector('.line-item-drawing');
    // await expect(drawings.length).toEqual(2); 
    await page.locator('text=Continue Shopping').click();
    test.setTimeout(2 * 60 * 4000);
    await page.waitForSelector('#spinner', { state: 'hidden', timeout: 10000 });
    // await page.waitForTimeout(2000)
    await navigateToDoorsWithoutNailingFlenge(page);
    await addPreConfiguredProductToDesign(page);
    test.setTimeout(2 * 60 * 4000);
    // await page.waitForSelector('#spinner', { state: 'hidden' });
    // await page.waitForSelector('.line-item-drawing');
    // await expect(drawings.length).toEqual(3); 
  })

  test('"Print Design", Windows Without Nailing Flange	', async ({ page }) => {
    await startQuoteDoors(page);
    await navigateToDoorsWithoutNailingFlenge(page);
    // await page.click('text=×Close');
    await doorsWithoutNailingFlengeDesign(page)
    test.setTimeout(2 * 60 * 1000);
    await page.click('text=×Close');
    await page.waitForTimeout(2000)
    await page.waitForSelector('#spinner', { state: 'hidden' });
    await summaryTestsSpecs.printDesignBtn(page)

  })

  test('"Copy Design", Windows Without Nailing Flange	', async ({ page }) => {
    await startQuoteDoors(page);
    await navigateToDoorsWithoutNailingFlenge(page);
    // await page.click('text=×Close');
    await doorsWithoutNailingFlengeDesign(page)
    test.setTimeout(2 * 60 * 1000);
    await page.click('text=×Close');
    await page.waitForTimeout(2000)
    await page.waitForSelector('#spinner', { state: 'hidden' });
    await summaryTestsSpecs.copyDesignBtn(page)
  })

  test('"Restart Design", Windows Without Nailing Flange	', async ({ page }) => {
    await startQuoteDoors(page);
    await navigateToDoorsWithoutNailingFlenge(page);
    // await page.click('text=×Close');
    await doorsWithoutNailingFlengeDesign(page)
    test.setTimeout(2 * 60 * 1000);
    await page.click('text=×Close');
    await page.waitForTimeout(2000)
    await page.waitForSelector('#spinner', { state: 'hidden' });
    await summaryTestsSpecs.restartBtn(page)
    await navigateToDoorsWithoutNailingFlenge(page)
    // await page.locator('text=×Close').click();
    //Restart button should be available on the configurator screen (window & door, part configurator, pre-configured unit)
    await summaryTestsSpecs.renameButtonVisibility(page)
    await doorsWithoutNailingFlengeDesign(page)
    await page.waitForTimeout(5000)
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
  test('"Access to Purchase Tab in Doors Without Nailing Flange ",The user should not be allowed to get to the purchase screen', async ({ page }) => {

    await startQuoteDoors(page);
    await page.waitForTimeout(2000)
    await page.waitForSelector('#spinner', { state: 'hidden' });
    await purchaseTests.verifyInaccessibilityOfPurchaseTab(page)
  })


  test('"Online purchase Doors Without Nailing Flange",The user should not be allowed to get to the purchase screen', async ({ page }) => {

    await startQuoteDoors(page);
    await navigateToDoorsWithoutNailingFlenge(page);
    // await page.click('text=×Close');
    await closeCross(page)
    await doorsWithoutNailingFlengeDesign(page)
    test.setTimeout(2 * 60 * 1000);
    // await page.click('text=×Close');
    await closeCross(page)
    await page.waitForTimeout(2000)
    await page.waitForSelector('#spinner', { state: 'hidden' });
    await purchaseTests.verifyPurchaseForRebate(page)
  })

  test('"Add one Doors Without Nailing Flange line to the design" - click on Add to Design in configurator after a product is done configuration	', async ({ page }) => {
    await startQuoteDoors(page);
    await navigateToDoorsWithoutNailingFlenge(page);
    await page.click('text=×Close');
    await doorsWithoutNailingFlengeDesign(page)
    test.setTimeout(2 * 60 * 1000);
    await page.click('text=×Close');
    await page.waitForTimeout(2000)
    await page.waitForSelector('#spinner', { state: 'hidden' });
    await summaryTestsSpecs.verifyAccessibilityOfSummaryTab(page)
    //Click on Purchase button on the Summary page	
    await purchaseTests.clickOnPurchaseButton(page)
  })


  test('"Start a new design in  Doors Without Nailing Flange, add one pre-configured product to the design', async ({ page }) => {
    await startQuoteDoors(page);
    await navigateToDoorsWithoutNailingFlenge(page);
    // await page.locator('text=×Close').click();
    // await closeCross(page)
    await doorsWithoutNailingFlengeDesign(page)
    test.setTimeout(2 * 60 * 1000);
    await page.click('text=×Close');
    await page.waitForTimeout(2000)
    await page.waitForSelector('#spinner', { state: 'hidden' });
    await page.locator('text=Continue Shopping').click();
    await page.waitForSelector('#spinner', { state: 'hidden', timeout: 10000 });

    await navigateToDoorsWithoutNailingFlenge(page)
    test.setTimeout(2 * 60 * 1000);
    await page.waitForTimeout(2000)
    await page.waitForSelector('#spinner', { state: 'hidden' });
    await addPreConfiguredProductToDesign(page)
    await page.waitForTimeout(2000)
    await page.waitForSelector('#spinner', { state: 'hidden' });


    //Click on Purchase tab at the top	
    await page.waitForSelector('#purchase-link', { timeout: 10000 });
    await page.locator('#purchase-link').click();
    //The purchase tab at the top should be highlighted
    await purchaseTests.purchaseTabHighlightProperty(page)

  })

})