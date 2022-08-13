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
async function helpMeChoose(page) {
  let helpMeChooseIcon = page.locator(".btn.btn-xs.btn-primary").click();
  //  return await expect(page).toHaveURL('/([A-Z])\w+/g')
}
async function asterisk(page) {
  let asterisk = page.locator("span.fa-asterisk");
  await expect.soft(asterisk).not.toBeVisible();
}

async function verifyConfiguratorUrlForwindowsGoBack(page) {
  return await expect(page).toHaveURL(
    /\/quotes\/.*\/configure\/product-select\/MenardsParts$/
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
  let closeBtn = await page.$$("text=×Close");
  if (closeBtn) {
    await page.locator("text=×Close").click();
  }
}

async function windowCustomDesign(page) {

  await page.locator('div:nth-child(5) > .panel-body > .question-answers-wrapper > .images-loaded-container > .answers-row > div > .question-answer-image-inner > .question-answer-description').first().click();
  await page.locator('text=— Select —').first().click();
  await page.locator('#react-select-2-option-1').click();
  await page.locator('text=— Select —').first().click();
  await page.locator('#react-select-3-option-0').click();
  await page.locator('text=Continue').nth(1).click();
  await page.locator('text=No Grille(s)').click();
  await page.locator('text=Continue').nth(1).click();
  await page.locator('text=Add to Design').first().click();
}


async function windowCustomConfigure(page) {

  let customButton = page.locator('//h5[text()="Custom Window Parts"]//parent::div/p/a');

  await customButton.click();

  await page.locator('text=Back').click();

  await expect.soft(customButton).toBeVisible()

  await customButton.click();

  test.setTimeout(2 * 60 * 1000);

  await verifyDesignActive(page);

  await page.locator('label:has-text("With Nailing Flange")').click();

  await page.locator('text=Back').click();

  let materialType = page.locator('label:has-text("With Nailing Flange")')

  await expect.soft(materialType).toBeVisible()

  await page.locator('label:has-text("With Nailing Flange")').click();

  let panelBody = page.locator(".panel-body");
  await expect.soft(panelBody).toHaveText(/Vinyl Interior & Vinyl Exterior/);
  await expect.soft(panelBody).toHaveText(/Wood Interior & Vinyl Exterior/);
  await expect.soft(panelBody).toHaveText(/Wood Interior & Aluminum Exterior/);
  await expect.soft(panelBody).toHaveText(/Wood Interior & Wood Exterior/);
  await expect.soft(panelBody).toHaveText(/Wood Interior & Fiberglass Exterior/);

  await page.locator('text=Vinyl Interior & Vinyl Exterior').click();
  await page.locator('text=Back').click();
  let windowType = page.locator('text=Vinyl Interior & Vinyl Exterior')
  await expect.soft(windowType).toBeVisible()
  await page.locator('text=Vinyl Interior & Vinyl Exterior').click();

  let panelBodyConfig = page.locator(".panel-body");
  await expect.soft(panelBodyConfig).toHaveText(/Double Hung Windows/);
  await expect.soft(panelBodyConfig).toHaveText(/Casement Windows/);
  await expect.soft(panelBodyConfig).toHaveText(/Sliding Windows/);
  await expect.soft(panelBodyConfig).toHaveText(/Awning Windows/);
  await page.locator('label:has-text("Single Hung Windows")').click();

  await page.locator('text=Back').click();
  let windowModel = page.locator('label:has-text("Single Hung Windows")')
  await expect.soft(windowModel).toBeVisible()
  await page.locator('label:has-text("Single Hung Windows")').click();
  test.setTimeout(2 * 60 * 1000);
  let panelBodyConfig1 = page.locator(".panel-body");
  await expect.soft(panelBodyConfig1).toHaveText(/1-Wide/);
  // Click text=1-Wide
  await page.locator('text=1-Wide').click();
  // Click text=Back
  await page.locator('text=Back').click();
  let windowSize = page.locator('text=1-Wide')
  await expect.soft(windowSize).toBeVisible()
  // Click text=1-Wide
  await page.locator('text=1-Wide').click();

  let panelBodySeries = page.locator('text=Select 100 >> nth=0' );
  await expect.soft(panelBodySeries).toHaveText(/Select 100/);
  let prevButton = page.locator(".previous");
  await expect.soft(prevButton).toHaveClass(/disabled/);
  let nextButton = page.locator(".next");
  await expect.soft(nextButton).toHaveClass(/disabled/);
  await page.locator('text=Select 100').first().click();
  await page.click('text=×Close');
  await windowCustomDesign(page)
}

async function navigationToWindowCustomConfigure(page) {
  await page.locator('text=Custom Window PartsSelectReplacement glass, sashes, frames, extension jambs and  >> a').click();

  await page.locator('label:has-text("With Nailing Flange")').click();

  await page.locator('text=Vinyl Interior & Vinyl Exterior').click();

  await page.locator('text=Single Hung Windows').click();

  await page.locator('text=1-Wide').click();
  test.setTimeout(2 * 60 * 1000);
  await page.waitForTimeout(2000)

  await page.waitForSelector('#spinner', { state: 'hidden' }, { timeout: 10000 });

  await page.locator('text=Select 100').first().click();
}

async function addNewWindowWithExistingConfiguration(page) {
  await page.locator('text=Yes').click();
  await page.locator('div:nth-child(5) > .panel-body > .question-answers-wrapper > .images-loaded-container > .answers-row > div > .question-answer-image-inner > .question-answer-description').first().click();
  await page.locator('text=— Select —').first().click();
  await page.locator('#react-select-2-option-1').click();
  await page.locator('text=— Select —').first().click();
  await page.locator('#react-select-3-option-0').click();
  await page.locator('text=Continue').nth(1).click();
  await page.locator('text=Add to Design').first().click();

}

const state = allLogins[2];
const stateFilePath = buildStateFilePath({ ...state, appName: MenardsAppNames.windows });
// Load garage door storage state
test.use({ storageState: stateFilePath });

test.describe('Windows-Custom-Part-Tests', () => {

  test("window-custom-guest-not-login-test start designing", async ({ page }) => {
    //await verifyLoginPage(page);
    await startQuote(page);
    let panelBody = page.locator(".panel-body");
    await expect.soft(panelBody).toHaveText(/Windows With Nailing Flange/);
    await expect.soft(panelBody).toHaveText(/Windows Without Nailing Flange/);
    await expect.soft(panelBody).toHaveText(/Most Popular Sizes/);
    await expect.soft(panelBody).toHaveText(/Custom Window Parts/);
    await expect.soft(panelBody).toHaveText(/Standard Window Parts/);
    await windowCustomConfigure(page);
  });

  //*Summary Screen 

  //The user should not be allowed to get to the Summary screen
  test('"Verify Summary" Click functionality without adding any item ', async ({ page }) => {
    await startQuote(page); // Contains URL verification/assertion, no assertion needed here.
    await summaryTestsSpecs.verifyInaccessibilityOfSummaryTab(page)
  });

  test('Custom-window-test-add window, checking the navigation to summary and purchase Tab ', async ({ page }) => {
    await startQuote(page);
    await navigationToWindowCustomConfigure(page);
    await page.click('text=×Close');
    await windowCustomDesign(page)
    await page.click('text=×Close');
    test.setTimeout(2 * 60 * 1000);
    await summaryTestsSpecs.verifyLandingOnSummaryPage(page)
    await summaryTestsSpecs.navigateToPurchaseDesignPageFromSummary(page);
  });

  //Line number
  test('Custom-window-test-Check the line items in the design custom part  ', async ({ page }) => {
    await startQuote(page);
    await navigationToWindowCustomConfigure(page);
    // await page.waitForTimeout(2000)
    // await page.click('text=×Close');
    await windowCustomDesign(page)
    test.setTimeout(2 * 60 * 1000);
    await page.click('text=×Close');
    await page.waitForTimeout(2000)
    await page.waitForSelector('#spinner', { state: 'hidden' });
    await page.locator('text=Continue Shopping').click();
    await page.waitForTimeout(2000)
    await page.waitForSelector('#spinner', { state: 'hidden' });
    console.log("second line adding")
    await navigationToWindowCustomConfigure(page);
    await page.locator('button:has-text("No")').click();
    await page.waitForTimeout(20000)
    await page.waitForSelector('#spinner', { state: 'hidden' });
    await windowCustomDesign(page)
    await page.waitForTimeout(2000)
    await page.waitForSelector('#spinner', { state: 'hidden' });

    await summaryTestsSpecs.checkingLineItems(page)

  });

  test('Custom-window-test-Edit/Copy/Delete line items', async ({ page }) => {
    await startQuote(page);
    await navigationToWindowCustomConfigure(page);
    // await page.waitForTimeout(2000)
    // await page.click('text=×Close');
    await windowCustomDesign(page)
    test.setTimeout(2 * 60 * 1000);
    await page.click('text=×Close');
    await page.waitForTimeout(2000)
    await page.waitForSelector('#spinner', { state: 'hidden' });
    await summaryTestsSpecs.verifyAccessibilityOfSummaryTab(page)
    await summaryTestsSpecs.editCopyDeleteLineVerification(page)
  });

  test('Custom-window-test-It should be able to add a new custom window	', async ({ page }) => {
    await startQuote(page);
    await navigationToWindowCustomConfigure(page);
    // await page.waitForTimeout(2000)

    // await page.click('text=×Close');
    await windowCustomDesign(page)
    test.setTimeout(2 * 60 * 1000);
    await page.click('text=×Close');

    await page.waitForTimeout(2000)
    await page.waitForSelector('#spinner', { state: 'hidden' });
    await page.locator('text=Continue Shopping').click();
    await navigationToWindowCustomConfigure(page);
    await page.locator('button:has-text("No")').click();
    await page.waitForTimeout(2000)
    await page.waitForSelector('#spinner', { state: 'hidden' });
    await windowCustomDesign(page)
  })
  test('Custom-window-test-Verify the Room field on a line item		  ', async ({ page }) => {
    await startQuote(page);
    await navigationToWindowCustomConfigure(page);
    // await page.click('text=×Close');
    await windowCustomDesign(page)
    await page.click('text=×Close');
    test.setTimeout(2 * 60 * 1000);
    await summaryTestsSpecs.roomFiledVerification(page)
  });
  test('Custom-window-test-The Room should be carried over from the configuration	  ', async ({ page }) => {
    await startQuote(page);
    await navigationToWindowCustomConfigure(page);
    // await page.click('text=×Close');
    await windowCustomDesign(page)
    await page.click('text=×Close');
    test.setTimeout(2 * 60 * 1000);
    await summaryTestsSpecs.verifyingCarriedOverNameofRoom(page)
  });

  test('Custom-window-test-Verifying Print Design button', async ({ page }) => {
    await startQuote(page);
    await navigationToWindowCustomConfigure(page);
    await page.waitForTimeout(2000)
    // await page.click('text=×Close');
    // await page.locator("button.close").click();

    // await closeCross(page)
    await windowCustomDesign(page)
    test.setTimeout(2 * 60 * 1000);
    await page.click('text=×Close');
    await page.waitForTimeout(2000)
    await page.waitForSelector('#spinner', { state: 'hidden' });
    await summaryTestsSpecs.printDesignBtn(page)

  })


  test('Custom-window-test-Verifying-Copy Design button', async ({ page }) => {
    await startQuote(page);
    await navigationToWindowCustomConfigure(page);
    await page.waitForTimeout(2000)
    // await closeCross(page)
    await windowCustomDesign(page)
    test.setTimeout(2 * 60 * 1000);
    await page.click('text=×Close');
    await page.waitForTimeout(2000)
    await page.waitForSelector('#spinner', { state: 'hidden' });
    await summaryTestsSpecs.copyDesignBtn(page)
  })


  test('Custom-window-test-Verifying Restart Design button', async ({ page }) => {
    await startQuote(page);
    await navigationToWindowCustomConfigure(page);
    await page.waitForTimeout(2000)
    // await closeCross(page)
    await windowCustomDesign(page)
    test.setTimeout(2 * 60 * 1000);
    await page.click('text=×Close');
    await page.waitForTimeout(2000)
    await page.waitForSelector('#spinner', { state: 'hidden' });
    await summaryTestsSpecs.restartBtn(page)
    await navigationToWindowCustomConfigure(page)
    await windowCustomDesign(page)
    test.setTimeout(2 * 60 * 1000);
    await page.click('text=×Close');
    await page.waitForTimeout(2000)
    await page.waitForSelector('#spinner', { state: 'hidden' });
    await page.waitForSelector('.line-item-drawing');
    const drawings = await page.$$('.line-item-drawing');
    await expect(drawings.length).toEqual(1)
    await page.waitForSelector('a#purchase-link', { timeout: 10000 })
    await page.locator('a#purchase-link').click();
    await page.waitForSelector('#spinner', { state: 'hidden' });
    //Restart button should be available on the purchase screen (and double check)
    await summaryTestsSpecs.restartBtn(page);
  })

  //Access to Purchase Tab
  test('Custom-window-test-verifying accessibilty to Purchase Tab,the user should not be allowed to get to the purchase screen', async ({ page }) => {

    await startQuote(page);
    await page.waitForTimeout(2000)
    await page.waitForSelector('#spinner', { state: 'hidden' });
    await purchaseTests.verifyInaccessibilityOfPurchaseTab(page)
  })

  // Online purchase
  test('Custom-window-test-Verifying-Online purchase Tab', async ({ page }) => {
    await startQuote(page);
    await navigationToWindowCustomConfigure(page);
    await page.waitForTimeout(2000)
    // await page.click('text=×Close');
    // await page.locator("button.close").click();
    // await closeCross(page)
    await windowCustomDesign(page)
    test.setTimeout(2 * 60 * 1000);
    await page.click('text=×Close');
    await page.waitForTimeout(2000)
    await page.waitForSelector('#spinner', { state: 'hidden' });
    await purchaseTests.verifyPurchase(page);
    await purchaseTests.verifyPrintPurchaseDocsDisclamier(page);
  })

  test('"Add one Windows custom part line to the design" - click on Add to Design in configurator after a product is done configuration	', async ({ page }) => {
    await startQuote(page);
    await navigationToWindowCustomConfigure(page);
    await page.waitForTimeout(2000)
    // await page.click('text=×Close');
    // await page.locator("button.close").click();
    // await closeCross(page)
    await windowCustomDesign(page)
    test.setTimeout(2 * 60 * 1000);
    await page.click('text=×Close');
    await page.waitForTimeout(2000)
    await page.waitForSelector('#spinner', { state: 'hidden' });
    //Click on Purchase button on the Summary page	
    await purchaseTests.clickOnPurchaseButton(page)
  })

   //Global change

   test('Custom-window-test-If there only one window line in the design, global changes should not be triggered', async ({ page }) => {
    await startQuote(page);
    await navigationToWindowCustomConfigure(page);
    await page.waitForTimeout(2000)
    // await page.click('text=×Close');
    await windowCustomDesign(page)
    test.setTimeout(2 * 60 * 1000);
    await page.click('text=×Close');
    await page.waitForTimeout(2000)
    await page.waitForSelector('#spinner', { state: 'hidden' });

    await page.locator('a:has-text("Edit")').click();
    // Click button:has-text("Glass Options")
    await page.locator('button:has-text("Glass Options")').click();
    // Click text=Yes
    await page.locator('text=Yes').click();
    await page.locator('button:has-text("Save Line")').first().click()
    await globalChange.verifyGlobalChangeNotTriggered(page)

  })


  // test("If there're multiple windows lines, but the line you edited is the only one from this catalog, global changes should not be triggered", async ({ page }) => {
  //   await startQuote(page);
  //   await navigateToMostPopularSizesStylesPage(page);
  //   test.setTimeout(2 * 60 * 2000);
  //   await page.waitForSelector('#spinner', { state: 'hidden' });
  //   await page.locator('td:nth-child(5) > .btn').first().click();
  //   test.setTimeout(2 * 60 * 2000);
  //   await page.waitForSelector('#spinner', { state: 'hidden' });
  //   await summaryTestsSpecs.verifyAccessibilityOfSummaryTab(page)
  //   await page.click('text=×Close');
  //   await page.locator('text=Continue Shopping').click();
  //   await navigateToStandardPartsPage(page);
  //   await page.locator('.question-answer-image-image > .img-responsive').first().click();
  //   test.setTimeout(2 * 60 * 1000);
  //   await page.waitForSelector('#spinner', { state: 'hidden' });
  //   await page.locator('text=Edit').first().click();
  //   await page.locator('button:has-text("Glass Options")').click();
  //   await page.locator('text=Yes').click();
  //   await page.locator('button:has-text("Save Line")').first().click()
  //   await globalChange.verifyGlobalChangeNotTriggered(page)
  // })

  test("Custom-window-test-If there're more than one window line from a same catalog, but the Q&A you edited is not checked off with Include in Global Changes in the Question template, global changes should not be triggered", async ({ page }) => {
    await startQuote(page);
    await navigationToWindowCustomConfigure(page);
    await page.waitForTimeout(2000)
    // await page.click('text=×Close');
    await windowCustomDesign(page)
    test.setTimeout(2 * 60 * 1000);
    await page.click('text=×Close');
    await page.waitForTimeout(2000)
    await page.waitForSelector('#spinner', { state: 'hidden' });

    await page.locator('text=Continue Shopping').click();
    await page.waitForTimeout(2000)
    await page.waitForSelector('#spinner', { state: 'hidden' });

    await navigationToWindowCustomConfigure(page);
    await page.waitForTimeout(2000)
    await addNewWindowWithExistingConfiguration(page);
    await page.waitForTimeout(2000)
    await page.waitForSelector('#spinner', { state: 'hidden' });

    await page.locator('text=Edit').first().click();
    await page.locator('button:has-text("Glass Options")').click();
    await page.locator('text=Yes').first().click();
    await page.locator('text=Obscure').click();
    await page.locator('button:has-text("Save Line")').first().click()
    await globalChange.verifyGlobalChangeIsTriggered(page)
    await page.locator('text=Skip All').click();
    await page.locator('text=More Specs >> nth=1').click();
    let newlyAddedItem = page.locator('div:nth-child(2) > .panel-body')
    await expect.soft(newlyAddedItem).not.toHaveText(/Tempered Glass = Yes/)

    
    await page.locator('text=Edit').first().click();
    await page.locator('button:has-text("Glass Options")').click();

    let exteriorFinish = page.locator('.question-answers-wrapper >> nth=1 >> div.selected')
    await expect.soft(exteriorFinish).toHaveText(/Yes/)
    // let lockHardwareType = page.locator('.question-answers-wrapper >> nth=3>> div.selected')
    // await expect.soft(lockHardwareType).toHaveText(/Obscure/)
    await page.locator('text=Cancel').click();
    await page.waitForTimeout(2000)

    await page.locator('text=Edit >> nth=1').click();
    await page.locator('button:has-text("Glass Options")').click();
    await expect.soft(exteriorFinish).not.toHaveText(/Yes/)
    // await expect.soft(lockHardwareType).not.toHaveText(/Obscure/)
    await page.locator('text=Cancel').click();
    await page.waitForTimeout(2000)

  })

  test("Custom-window-test-If there're more than one window line from a same catalog, but the Q&A you edited is checked off with Include in Global Changes in the Question template, global changes should be triggered", async ({ page }) => {
    await startQuote(page);
    await navigationToWindowCustomConfigure(page);
    await page.waitForTimeout(2000)
    // await page.click('text=×Close');
    await windowCustomDesign(page)
    test.setTimeout(2 * 60 * 1000);
    await page.click('text=×Close');
    await page.waitForTimeout(2000)
    await page.waitForSelector('#spinner', { state: 'hidden' });

    await page.locator('text=Continue Shopping').click();
    await page.waitForTimeout(2000)
    await page.waitForSelector('#spinner', { state: 'hidden' });

    await navigationToWindowCustomConfigure(page);
    await page.waitForTimeout(2000)
    await addNewWindowWithExistingConfiguration(page);
    await page.waitForTimeout(2000)
    await page.waitForSelector('#spinner', { state: 'hidden' });


    await page.locator('text=Edit').first().click();
    await page.locator('button:has-text("Glass Options")').click();
    await page.locator('text=Yes').click();
    await page.locator('button:has-text("Save Line")').first().click()
    await globalChange.verifyGlobalChangeIsTriggered(page)
    await page.locator('text=Apply All').click();
    await page.locator('text=Apply Changes').click();
    await page.locator('text=More Specs >> nth=1').click();
    let newlyAddedItem = page.locator('div:nth-child(2) > .panel-body')
    await expect.soft(newlyAddedItem).toHaveText(/Tempered Glass = Yes/)

    await page.locator('text=Edit').first().click();
    await page.locator('button:has-text("Glass Options")').click();

    let exteriorFinish = page.locator('.question-answers-wrapper >> nth=1 >> div.selected')
    await expect.soft(exteriorFinish).toHaveText(/Yes/)
    await page.locator('text=Cancel').click();
    await page.waitForTimeout(2000)

    await page.locator('text=Edit >> nth=1').click();
    await page.locator('button:has-text("Glass Options")').click();
    await expect.soft(exteriorFinish).toHaveText(/Yes/)

    await page.waitForTimeout(2000)

  })

  test("Custom-window-test-It should take the user to the global changes screen asking user if s/he wants to apply this change to other windows on the design", async ({ page }) => {
    await startQuote(page);
    await navigationToWindowCustomConfigure(page);
    await page.waitForTimeout(2000)
    // await page.click('text=×Close');
    await windowCustomDesign(page)
    test.setTimeout(2 * 60 * 1000);
    await page.click('text=×Close');
    await page.waitForTimeout(2000)
    await page.waitForSelector('#spinner', { state: 'hidden' });

    await page.locator('text=Continue Shopping').click();
    await page.waitForTimeout(2000)
    await page.waitForSelector('#spinner', { state: 'hidden' });

    await navigationToWindowCustomConfigure(page);
    await page.waitForTimeout(2000)
    await addNewWindowWithExistingConfiguration(page);
    await page.waitForTimeout(2000)
    await page.waitForSelector('#spinner', { state: 'hidden' });

    await page.locator('text=Edit').first().click();
    await page.locator('button:has-text("Glass Options")').click();
    await page.locator('text=Yes').click();
    await page.locator('text=Obscure').click();
    await page.locator('button:has-text("Save Line")').first().click()
    await globalChange.verifyGlobalChangeIsTriggered(page)
    // It should list every change the user made on the questions that're included in global change checking
    // Each change should be a separate section that has the new value and applicable lines
    let newlyAddedItem1 = page.locator('div:nth-child(1) > .panel-body:has-text("Yes")')
    let newlyAddedItem2 = page.locator('div:nth-child(2) > .panel-body:has-text("Obscure")')
    await expect.soft(newlyAddedItem1).toBeVisible()
    await expect.soft(newlyAddedItem2).toBeVisible()
    await page.waitForTimeout(2000)

    await page.locator('text=Apply All').first().click();
    await page.locator('text=Apply All >> nth=1').click();
    await page.locator('text=Apply Changes').click();
    await page.locator('text=More Specs >> nth=1').click();
    await expect.soft(newlyAddedItem2).toHaveText(/Tempered Glass = Yes/)


  })


  test("Custom-window-test-Apply Global Changes: Windows Custom ", async ({ page }) => {
    test.setTimeout(7 * 60 * 1000);
    await startQuote(page);
    await navigationToWindowCustomConfigure(page);
    await page.waitForTimeout(2000)
    await page.click('text=×Close');
    await windowCustomDesign(page)
    await page.click('text=×Close');
    // await page.waitForTimeout(2000)
    await page.waitForSelector('#spinner', { state: 'hidden' });

    await page.locator('text=Continue Shopping').click();
    // await page.waitForTimeout(2000)
    await page.waitForSelector('#spinner', { state: 'hidden' });

    await navigationToWindowCustomConfigure(page);
    await page.waitForTimeout(2000)
    await addNewWindowWithExistingConfiguration(page);
    await page.waitForTimeout(2000)
    await page.waitForSelector('#spinner', { state: 'hidden' });

    await page.locator('text=Edit').first().click();
    await page.locator('button:has-text("Glass Options")').click();
    await page.locator('text=Yes').click();
    await page.locator('text=Obscure').click();
    await page.locator('button:has-text("Save Line")').first().click()
    await globalChange.verifyGlobalChangeIsTriggered(page)

    // Check off lines with checkboxes	
    // The user should be able to check or uncheck a line item for one change or more changes
    await page.locator('input[type="checkbox"]').first().check();
    await page.locator('input[type="checkbox"]').first().uncheck();
    // await page.waitForTimeout(2000)

    // It should list every change the user made on the questions that're included in global change checking
    // Each change should be a separate section that has the new value and applicable lines
    let newlyAddedItem1 = page.locator('div:nth-child(1) > .panel-body:has-text("Yes")')
    let newlyAddedItem2 = page.locator('div:nth-child(2) > .panel-body:has-text("Obscure")')
    await expect.soft(newlyAddedItem1).toBeVisible()
    await expect.soft(newlyAddedItem2).toBeVisible()
    // await page.waitForTimeout(2000)
    // Click on Apply All button for a change	
    await page.locator('text=Apply All').first().click();
    await page.locator('text=Apply All >> nth=1').click();
    await page.locator('text=Apply Changes').click();
    // await page.locator('text=More Specs >> nth=1').click();  
    // await expect.soft(newlyAddedItem2).toHaveText(/Tempered Glass = Yes/)
    // await page.waitForTimeout(2000)
    await page.waitForSelector('#spinner', { state: 'hidden' });
    await page.locator('text=Edit').first().click();
    await page.locator('button:has-text("Glass Options")').click();

    let exteriorFinish = page.locator('.question-answers-wrapper >> nth=1 >> div.selected')
    await expect.soft(exteriorFinish).toHaveText(/Yes/)
    let lockHardwareType = page.locator('.question-answers-wrapper >> nth=3>> div.selected')
    await expect.soft(lockHardwareType).toHaveText("Obscure")
    await page.locator('text=Cancel').click();
    // await page.waitForTimeout(2000)

    await page.locator('text=Edit >> nth=1').click();
    await page.waitForSelector('#spinner', { state: 'hidden' });
    await page.locator('button:has-text("Glass Options")').click();
    await expect.soft(exteriorFinish).toHaveText(/Yes/)
    await expect.soft(lockHardwareType).toHaveText("Obscure")
    await page.locator('text=Cancel').click();


  })
  
  test("Windows Custom: validating the Estimation Prices", async ({ page }) => {
    await startQuote(page);
    await navigationToWindowCustomConfigure(page);
    await page.waitForTimeout(2000)
    // await page.click('text=×Close');
    await windowCustomDesign(page)
    test.setTimeout(2 * 60 * 1000);
    await page.click('text=×Close');
    await page.waitForTimeout(2000)
    await page.waitForSelector('#spinner', { state: 'hidden' });

    await page.locator('text=Continue Shopping').click();
    await page.waitForTimeout(2000)
    await page.waitForSelector('#spinner', { state: 'hidden' });

    await navigationToWindowCustomConfigure(page);
    await page.waitForTimeout(2000)
    await addNewWindowWithExistingConfiguration(page);
    await page.waitForTimeout(2000)
    await page.waitForSelector('#spinner', { state: 'hidden' });
    await summaryTestsSpecs.validatingtheSumOfPrices(page)
  })

})