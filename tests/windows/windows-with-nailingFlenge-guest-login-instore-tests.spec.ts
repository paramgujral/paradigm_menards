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

async function withNailingFlengeDesign(page) {
  // Click text=×Close
  await closeCross(page);
  // Click div:nth-child(6) > .panel-body
  test.setTimeout(2 * 60 * 1000);
  // Click .css-1hwfws3 >> nth=0
  await page.locator(".css-1hwfws3").first().click();
  // Click #react-select-2-option-4
  await page.locator("#react-select-2-option-4").click();
  // Click .css-bg1rzq-control > .css-1hwfws3 >> nth=0
  await page.locator(".css-bg1rzq-control > .css-1hwfws3").first().click();
  // Click #react-select-3-option-3
  await page.locator("#react-select-3-option-3").click();
  // Click text=Continue >> nth=1
  await page.locator("text=Continue").nth(1).click();
  // Click text=Almond >> nth=0
  await page.locator("text=Almond").first().click();
  // Click text=No Grilles
  await page.locator("text=No Grilles").click();
  // Click text=Continue >> nth=1
  await page.locator("text=Continue").nth(1).click();
  // Click text=All Options
  await page.locator("text=All Options").click();
  // Click text=SunFlow >> nth=0
  await page.locator("text=SunFlow").first().click();
  // Click text=Rain
  await page.locator("text=Rain").click();
  // Click text=Tempered
  await page.locator("text=Tempered").click();
  // Click text=Continue >> nth=1
  await page.locator("text=Continue").nth(1).click();
  // Go to https://menardsdev.wtsparadigm.com/quotes/66849c1b-6872-4743-829a-8a8bc33d6b0e/line-items
  await page.goto(
    "https://menardsdev.wtsparadigm.com/quotes/66849c1b-6872-4743-829a-8a8bc33d6b0e/line-items"
  );
}


async function windowWithNailingFlenge(page) {
  // Click text=Windows With Nailing FlangeSelect >> button
  await page
    .locator("text=Windows With Nailing FlangeSelect >> button")
    .click();
  await verifyDesignActive(page);
  // Click text=Back
  await page.locator("text=Back").click();
  let projectType = await page.locator(
    "text=Windows With Nailing FlangeSelect >> button"
  );
  await expect.soft(projectType).toBeVisible();
  // Click text=Windows With Nailing FlangeSelect >> button
  await page
    .locator("text=Windows With Nailing FlangeSelect >> button")
    .click();
  // Click text=Vinyl Interior & Vinyl Exterior
  let panelBody = page.locator(".panel-body");
  await expect.soft(panelBody).toHaveText(/Vinyl Interior & Vinyl Exterior/);
  await expect.soft(panelBody).toHaveText(/Wood Interior & Aluminum Exterior/);
  await expect.soft(panelBody).toHaveText(/Wood Interior & Wood Exterior/);
  await page.locator("text=Vinyl Interior & Vinyl Exterior").click();
  // Click text=Back
  await page.locator("text=Back").click();
  let materialType = await page.locator("text=Vinyl Interior & Vinyl Exterior");
  await expect.soft(materialType).toBeVisible();
  // Click text=Vinyl Interior & Vinyl Exterior
  await page.locator("text=Vinyl Interior & Vinyl Exterior").click();
  test.setTimeout(2 * 60 * 1000);
  // Click label:has-text("Double Hung Windows")
  await expect.soft(panelBody).toHaveText(/Single Hung Windows/);
  await expect.soft(panelBody).toHaveText(/Double Hung Windows/);
  await expect.soft(panelBody).toHaveText(/Casement Windows/);
  await expect.soft(panelBody).toHaveText(/Sliding Windows/);
  await expect.soft(panelBody).toHaveText(/Awning Windows/);
  await expect.soft(panelBody).toHaveText(/Picture & Shape Windows/);
  await page.locator('label:has-text("Double Hung Windows")').click();
  // Click text=Back
  await page.locator("text=Back").click();
  let windowType = await page.locator('label:has-text("Double Hung Windows")');
  await expect.soft(windowType).toBeVisible();
  // Click label:has-text("Double Hung Windows")
  await page.locator('label:has-text("Double Hung Windows")').click();
  // Click text=2-Wide
  test.setTimeout(2 * 60 * 1000);
  await expect.soft(panelBody).toHaveText(/1-Wide/);
  await expect.soft(panelBody).toHaveText(/2-Wide/);
  await expect.soft(panelBody).toHaveText(/3/);
  await expect.soft(panelBody).toHaveText(/Bay Window/);
  await expect.soft(panelBody).toHaveText(/3-Wide W/);
  await expect.soft(panelBody).toHaveText(/3-Wide W/);
  await expect.soft(panelBody).toHaveText(/Design Your Own/);
  await expect.soft(panelBody).toHaveText(/Double Hung W/);

  await page.locator("text=2-Wide").click();
  // Click text=Back
  await page.locator("text=Back").click();
  let windowMulled = await page.locator("text=2-Wide");
  await expect.soft(windowMulled).toBeVisible();
  // Click text=2-Wide

  await page.locator("text=2-Wide").click();
  let prevButton = page.locator(".previous");
  await expect.soft(prevButton).toHaveClass(/disabled/);
  let nextButton = page.locator(".next");
  await expect.soft(nextButton).toHaveClass(/disabled/);
  // Click text=Builders With Brickmould Vinyl
  await page.locator("text=Builders With Brickmould Vinyl").click();
  // await page.waitForURL('https://menardsdev.wtsparadigm.com/quotes/66849c1b-6872-4743-829a-8a8bc33d6b0e/configure/');
  await withNailingFlengeDesign(page);
}


async function navigationToWindowWithNailingFlange(page) {
  await page.waitForSelector('#spinner', { state: 'hidden' });


  await page.waitForSelector('text=Windows With Nailing FlangeSelect >> button', { timeout: 10000 });
  await page.locator('text=Windows With Nailing FlangeSelect >> button').click();
  await page.locator('text=Vinyl Interior & Vinyl Exterior').click();
  await page.locator('text=Single Hung Windows').click();
  await page.locator('text=1-Wide').click();
  await page.locator('text=Builders Vinyl').click();
}
async function toAddWindowWithNailingFlange(page) {
  test.setTimeout(2 * 60 * 1000);
  // await page.waitForSelector('#spinner', { state: 'hidden' });
  // await page.locator('text=With Nailing Flange').click();
  // test.setTimeout(2 * 60 * 1000);
  await page.waitForSelector('#spinner', { state: 'hidden' });
  await page.locator('.css-1hwfws3').first().click();
  // Click #react-select-2-option-1
  await page.locator('#react-select-2-option-1').click();
  test.setTimeout(2 * 60 * 1000);

  await page.waitForSelector('#spinner', { state: 'hidden' }, { timeout: 10000 });

  // Click .css-bg1rzq-control > .css-1hwfws3 >> nth=0
  await page.locator('.css-bg1rzq-control > .css-1hwfws3').first().click();
  // Click #react-select-3-option-1
  await page.locator('#react-select-3-option-1').click();
  test.setTimeout(2 * 60 * 1000);

  await page.waitForSelector('#spinner', { state: 'hidden' });


  await page.locator('text=Continue').nth(1).click();

  test.setTimeout(2 * 60 * 1000);
  await page.waitForSelector('#spinner', { state: 'hidden' });

  await page.locator('text=White').first().click();
  await page.waitForSelector('#spinner', { state: 'hidden' }, { timeout: 10000 });

  await page.locator('text=No Grilles').click();

  await page.locator('text=Continue').nth(1).click();
  await page.waitForSelector('#spinner', { state: 'hidden' }, { timeout: 10000 });

  await page.locator('.form-control').first().click();

  await page.locator('.form-control').first().fill('50898');

  await page.locator('text=SunFlow').first().click();
  await page.locator('text=SunFlow').first().click();

  await page.locator('text=Clear').click();


  await page.locator('div:nth-child(8) > .panel-body > .question-answers-wrapper > .images-loaded-container > .answers-row > div > .question-answer-image-inner > .question-answer-description >> nth=0 ').click();

  await page.locator('div:nth-child(9) > .panel-body > .question-answers-wrapper > .images-loaded-container > .answers-row > div > .question-answer-image-inner > .question-answer-description').first().click();

  await page.locator('text=Continue').nth(1).click();

  await page.locator('text=Add to Design').first().click();



}
async function addOneWindowWithNailingFlange(page) {
  await page.waitForSelector('#spinner', { state: 'hidden' });


  await page.waitForSelector('text=Windows With Nailing FlangeSelect >> button', { timeout: 10000 });
  await page.locator('text=Windows With Nailing FlangeSelect >> button').click();
  await page.locator('text=Vinyl Interior & Vinyl Exterior').click();
  await page.locator('text=Single Hung Windows').click();
  await page.locator('text=1-Wide').click();
  await page.locator('text=Builders Vinyl').click();
  //   await page.waitForURL('https://menardsdev.wtsparadigm.com/quotes/06f57b27-aa4d-4625-9191-d3156bee6af9/configure/');
  // await page.locator('text=×Close').click();

  // if (await page.$('.modal-header button.close')) {
  //     await page.locator('.modal-header button.close').click();
  // }
  // if (await page.$("span:nth-child(2) button:nth-child(1)")) {
  //     await page.locator("span:nth-child(2) button:nth-child(1)").click();
  // }
  test.setTimeout(2 * 60 * 1000);
  // await page.waitForSelector('#spinner', { state: 'hidden' });
  // await page.locator('text=With Nailing Flange').click();
  // test.setTimeout(2 * 60 * 1000);
  await page.waitForSelector('#spinner', { state: 'hidden' });
  await page.locator('.css-1hwfws3').first().click();
  // Click #react-select-2-option-1
  await page.locator('#react-select-2-option-1').click();
  test.setTimeout(2 * 60 * 1000);

  await page.waitForSelector('#spinner', { state: 'hidden' });

  // Click .css-bg1rzq-control > .css-1hwfws3 >> nth=0
  await page.locator('.css-bg1rzq-control > .css-1hwfws3').first().click();
  // Click #react-select-3-option-1
  await page.locator('#react-select-3-option-1').click();
  test.setTimeout(2 * 60 * 1000);

  await page.waitForSelector('#spinner', { state: 'hidden' });


  await page.locator('text=Continue').nth(1).click();

  test.setTimeout(2 * 60 * 1000);
  await page.waitForSelector('#spinner', { state: 'hidden' });

  await page.locator('text=White').first().click();

  await page.locator('text=No Grilles').click();

  await page.locator('text=Continue').nth(1).click();

  await page.locator('.form-control').first().click();
  await page.locator('.form-control').first().fill('12345');
  await page.waitForTimeout(2000)

  await page.locator('text=SunFlow').first().click();
  await page.waitForTimeout(2000)

  await page.locator('text=SunFlow').first().click();

  await page.locator('text=Clear').click();
  await page.locator('div:nth-child(8) > .panel-body > .question-answers-wrapper > .images-loaded-container > .answers-row > div > .question-answer-image-inner > .question-answer-description >> nth=0 ').click();

  await page.locator('div:nth-child(9) > .panel-body > .question-answers-wrapper > .images-loaded-container > .answers-row > div > .question-answer-image-inner > .question-answer-description').first().click();

  await page.locator('text=Continue').nth(1).click();

  await page.locator('text=Add to Design').first().click();

  await page.locator('input[name="TextValue"]').click();

  await page.locator('input[name="TextValue"]').fill('window');

  await page.locator('button:has-text("Save")').click();

}
async function addPreExistingWindowWithNailingFlange(page) {
  test.setTimeout(2 * 60 * 1000);
  // Click text=Yes
  await page.locator('text=Yes').click();
  await page.waitForSelector('#spinner', { state: 'hidden' });
  await page.locator('.css-1hwfws3').first().click();
  // Click #react-select-2-option-2
  await page.locator('#react-select-2-option-2').click();
  test.setTimeout(2 * 60 * 1000);
  await page.waitForSelector('#spinner', { state: 'hidden' });
  // Click .css-bg1rzq-control > .css-1hwfws3 >> nth=0
  await page.locator('.css-bg1rzq-control > .css-1hwfws3').first().click();
  // Click #react-select-3-option-2
  await page.locator('#react-select-3-option-2').click();
  test.setTimeout(2 * 60 * 2000);
  await page.waitForTimeout(2000)
  await page.waitForSelector('#spinner', { state: 'hidden' });
  await page.waitForSelector('text=Add to Design', { state: 'visible' });
  await page.locator('text=Add to Design').first().click();

}
// test.describe.configure({ mode: 'serial' });

const state = allLogins[0];
const stateFilePath = buildStateFilePath({
  ...state,
  appName: MenardsAppNames.windows,
});

// Load garage door storage statesś
test.use({ storageState: stateFilePath });

test.describe('Windows with Nailing Flenge  tests', () => {
  test.only("window-with-nailing-flenge-test start designing", async ({ page }) => {
    // await verifyLoginPage(page);
    await startQuote(page);
    let panelBody = page.locator(".panel-body");
    await expect.soft(panelBody).toHaveText(/Windows With Nailing Flange/);
    await expect.soft(panelBody).toHaveText(/Windows Without Nailing Flange/);
    await expect.soft(panelBody).toHaveText(/Most Popular Sizes/);
    await expect.soft(panelBody).toHaveText(/Custom Window Parts/);
    await expect.soft(panelBody).toHaveText(/Standard Window Parts/);
    await windowWithNailingFlenge(page);
  });

  //*Summary Screen 
  //The user should not be allowed to get to the Summary screen
  test('Window-with-nailing-flenge-test-Verify Summary" Click functionality without adding any item ', async ({ page }) => {
    await startQuote(page); // Contains URL verification/assertion, no assertion needed here.
    await summaryTestsSpecs.verifyInaccessibilityOfSummaryTab(page)
  });

  test('Windows-with-nailing-flenge-test-verify Restart Design button  ', async ({ page }) => {
    await startQuote(page);
    await addOneWindowWithNailingFlange(page);
    test.setTimeout(2 * 60 * 1000);
    await page.waitForSelector('#spinner', { state: 'hidden' });

    await summaryTestsSpecs.verifyAccessibilityOfSummaryTab(page)
    // click on the Rename button	
    await summaryTestsSpecs.clickOnRenameButton(page)

  });

  //Line number
  // Check the line items in the design	
  //Line items in the design should display with order numbers like 100, 200, 300…
  test('Windows-with-nailing-flenge-test- Check the line items in the design	', async ({ page }) => {
    await startQuote(page);
    await navigationToWindowWithNailingFlange(page)
    await page.locator('text=×Close').click();
    await toAddWindowWithNailingFlange(page)
    test.setTimeout(2 * 60 * 1000);
    await page.click('text=×Close');
    await page.waitForTimeout(2000)
    await page.waitForSelector('#spinner', { state: 'hidden' });
    await page.locator('text=Continue Shopping').click();
    await page.waitForSelector('#spinner', { state: 'hidden', timeout: 10000 });

    // await navigationToWindowWithNailingFlange(page)
    // test.setTimeout(2 * 60 * 1000);
    // await page.waitForTimeout(2000)
    // await page.waitForSelector('#spinner', { state: 'hidden' });
    // await addPreExistingWindowWithNailingFlange(page)
    // await page.waitForTimeout(2000)
    // await page.locator('text=Continue Shopping').click();
    // await page.waitForTimeout(2000)
    // await page.waitForSelector('#spinner', { state: 'hidden',timeout:10000});

    await navigationToWindowWithNailingFlange(page)
    test.setTimeout(2 * 60 * 1000);
    await page.waitForTimeout(2000)
    await page.waitForSelector('#spinner', { state: 'hidden' });
    await addPreExistingWindowWithNailingFlange(page)
    await page.waitForTimeout(2000)
    await page.waitForSelector('#spinner', { state: 'hidden', timeout: 10000 });

    await summaryTestsSpecs.checkingLineItems(page)

  });


  test('Windows-with-nailing-flenge-test-Edit/Copy/Delete the line item', async ({ page }) => {
    await startQuote(page);
    await navigationToWindowWithNailingFlange(page)
    await page.waitForTimeout(2000)
    // await page.locator('text=×Close').click();
    await toAddWindowWithNailingFlange(page)
    test.setTimeout(2 * 60 * 1000);
    await page.click('text=×Close');
    await page.waitForTimeout(2000)
    await page.waitForSelector('#spinner', { state: 'hidden' });
    await summaryTestsSpecs.verifyAccessibilityOfSummaryTab(page)
    await summaryTestsSpecs.editCopyDeleteLineVerification(page)
  });

  //Add one Windows With Nailing Flange line to the design - click on Add to Design in configurator after a product is partially partially configuration	
  test('"Add Window" with nailing Flange', async ({ page }) => {
    await startQuote(page); // Contains URL verification/assertion, no assertion needed here.
    await addOneWindowWithNailingFlange(page);
    await summaryTestsSpecs.verifyLandingOnSummaryPage(page)
    await page.waitForSelector('.line-item-drawing');
    const drawings = await page.$$('.line-item-drawing');
    await expect(drawings.length).toEqual(1);
    await summaryTestsSpecs.navigateToPurchaseDesignPageFromSummary(page);
  });

  test('"New Line Item", Add a new Windows With Nailing Flange line	', async ({ page }) => {
    await startQuote(page);
    await navigationToWindowWithNailingFlange(page)
    // await page.locator('text=×Close').click();
    await toAddWindowWithNailingFlange(page)

    test.setTimeout(2 * 60 * 1000);
    await page.click('text=×Close');

    await page.waitForTimeout(2000)
    await page.waitForSelector('#spinner', { state: 'hidden' });
    await page.locator('text=Continue Shopping').click();
    await navigationToWindowWithNailingFlange(page)
    test.setTimeout(2 * 60 * 1000);
    await page.waitForTimeout(2000)
    await page.waitForSelector('#spinner', { state: 'hidden' });
    await page.locator('button:has-text("No")').click();
    await toAddWindowWithNailingFlange(page)
  })

  test('Windows-With-Nailing-Flange-test-verify Print Design button	', async ({ page }) => {
    await startQuote(page);
    await navigationToWindowWithNailingFlange(page)
    // await page.locator('text=×Close').click();
    await toAddWindowWithNailingFlange(page)
    test.setTimeout(2 * 60 * 1000);
    await page.click('text=×Close');
    await page.waitForTimeout(2000)
    await page.waitForSelector('#spinner', { state: 'hidden' });
    await summaryTestsSpecs.printDesignBtn(page)

  })


  test('Windows-With-Nailing-Flange-test-verify Copy Design button', async ({ page }) => {
    await startQuote(page);
    await navigationToWindowWithNailingFlange(page)
    // await page.locator('text=×Close').click();
    await toAddWindowWithNailingFlange(page)
    test.setTimeout(2 * 60 * 1000);
    await page.click('text=×Close');
    await page.waitForTimeout(2000)
    await page.waitForSelector('#spinner', { state: 'hidden' });
    await summaryTestsSpecs.copyDesignBtn(page)
  })


  test('Windows-With-Nailing-Flange-test-verify Restart Design button	', async ({ page }) => {
    await startQuote(page);
    await navigationToWindowWithNailingFlange(page)
    // await page.locator('text=×Close').click();

    await toAddWindowWithNailingFlange(page)
    test.setTimeout(2 * 60 * 1000);
    await page.click('text=×Close');
    await page.waitForTimeout(2000)
    await page.waitForSelector('#spinner', { state: 'hidden' });
    await summaryTestsSpecs.restartBtn(page)
    await navigationToWindowWithNailingFlange(page)
    // await page.locator('text=×Close').click();
    //Restart button should be available on the configurator screen (window & door, part configurator, pre-configured unit)
    await summaryTestsSpecs.renameButtonVisibility(page)
    await toAddWindowWithNailingFlange(page)
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
  test('"Access to Purchase Tab Windows With Nailing Flange",The user should not be allowed to get to the purchase screen', async ({ page }) => {

    await startQuote(page);
    await page.waitForTimeout(2000)
    await page.waitForSelector('#spinner', { state: 'hidden' });
    await purchaseTests.verifyInaccessibilityOfPurchaseTab(page)
  })


  test('Windows With Nailing Flange-The user should not be allowed to get to the purchase screen', async ({ page }) => {
    await startQuote(page);
    await navigationToWindowWithNailingFlange(page)
    // await page.locator('text=×Close').click();
    await toAddWindowWithNailingFlange(page)
    test.setTimeout(2 * 60 * 1000);
    await page.click('text=×Close');
    await page.waitForTimeout(2000)
    await page.waitForSelector('#spinner', { state: 'hidden' });
    await purchaseTests.verifyPurchase(page);
    await purchaseTests.verifyPrintPurchaseDocsDisclamier(page);
  })

  test('"Add one Windows With Nailing Flange line to the design" - click on Add to Design in configurator after a product is done configuration	', async ({ page }) => {
    await startQuote(page);
    await navigationToWindowWithNailingFlange(page)
    // await page.locator('text=×Close').click();
    await toAddWindowWithNailingFlange(page)
    test.setTimeout(2 * 60 * 1000);
    await page.click('text=×Close');
    await page.waitForTimeout(2000)
    await page.waitForSelector('#spinner', { state: 'hidden' });
    await summaryTestsSpecs.verifyAccessibilityOfSummaryTab(page)
    //Click on Purchase button on the Summary page	
    await purchaseTests.clickOnPurchaseButton(page)
  })
  //Global change

  test('Windows With Nailing Flange-If there only one window line in the design, global changes should not be triggered', async ({ page }) => {
    await startQuote(page);
    await navigationToWindowWithNailingFlange(page)
    await page.locator('text=×Close').click();
    await toAddWindowWithNailingFlange(page)
    test.setTimeout(2 * 60 * 1000);
    // await page.click('text=×Close');
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


  // test("Windows With Nailing Flange-If there're multiple windows lines, but the line you edited is the only one from this catalog, global changes should not be triggered", async ({ page }) => {
  //   await startQuote(page);
  //   await navigationToWindowWithNailingFlange(page)
  //   await page.locator('text=×Close').click();
  //   await toAddWindowWithNailingFlange(page)
  //   test.setTimeout(2 * 60 * 1000);
  //   await page.click('text=×Close');
  //   await page.waitForTimeout(2000)
  //   await page.waitForSelector('#spinner', { state: 'hidden' });
  //   await page.locator('text=Continue Shopping').click();
  //   await page.waitForSelector('#spinner', { state: 'hidden', timeout: 10000 });

  //   await navigationToWindowWithNailingFlange(page)
  //   test.setTimeout(2 * 60 * 1000);
  //   await page.waitForTimeout(2000)
  //   await page.waitForSelector('#spinner', { state: 'hidden' });
  //   await addPreExistingWindowWithNailingFlange(page)
  //   await page.waitForTimeout(2000)
  //   await page.waitForSelector('#spinner', { state: 'hidden', timeout: 10000 });

  //   await page.locator('text=Edit').first().click();
  //   await page.locator('button:has-text("Design Options")').click();
  //   await page.locator('text=Desert Sand').click();
  //   await page.locator('button:has-text("Save Line")').first().click()
  //   await globalChange.verifyGlobalChangeNotTriggered(page)
  // })

  test("Windows With Nailing Flange-If there're more than one window line from a same catalog, but the Q&A you edited is not checked off with Include in Global Changes in the Question template, global changes should not be triggered", async ({ page }) => {
    await startQuote(page);
    await navigationToWindowWithNailingFlange(page)
    await page.locator('text=×Close').click();
    await toAddWindowWithNailingFlange(page)
    test.setTimeout(2 * 60 * 1000);
    await page.click('text=×Close');
    await page.waitForTimeout(2000)
    await page.waitForSelector('#spinner', { state: 'hidden' });
    await page.locator('text=Continue Shopping').click();
    await page.waitForSelector('#spinner', { state: 'hidden', timeout: 10000 });

    await navigationToWindowWithNailingFlange(page)
    test.setTimeout(2 * 60 * 1000);
    await page.waitForTimeout(2000)
    await page.waitForSelector('#spinner', { state: 'hidden' });
    await addPreExistingWindowWithNailingFlange(page)
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

  test("Windows With Nailing Flange-If there're more than one window line from a same catalog, but the Q&A you edited is checked off with Include in Global Changes in the Question template, global changes should be triggered", async ({ page }) => {
    await startQuote(page);
    await navigationToWindowWithNailingFlange(page)
    // await page.locator('text=×Close').click();
    await toAddWindowWithNailingFlange(page)
    test.setTimeout(2 * 60 * 1000);
    await page.click('text=×Close');
    await page.waitForTimeout(2000)
    await page.waitForSelector('#spinner', { state: 'hidden' });
    await page.locator('text=Continue Shopping').click();
    await page.waitForSelector('#spinner', { state: 'hidden', timeout: 10000 });

    await navigationToWindowWithNailingFlange(page)
    test.setTimeout(2 * 60 * 1000);
    await page.waitForTimeout(2000)
    await page.waitForSelector('#spinner', { state: 'hidden' });
    await addPreExistingWindowWithNailingFlange(page)
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

  test("Windows With Nailing Flange-It should take the user to the global changes screen asking user if s/he wants to apply this change to other windows on the design", async ({ page }) => {
    await startQuote(page);
    await navigationToWindowWithNailingFlange(page)
    // await page.locator('text=×Close').click();
    await toAddWindowWithNailingFlange(page)
    test.setTimeout(2 * 60 * 1000);
    await page.click('text=×Close');
    await page.waitForTimeout(2000)
    await page.waitForSelector('#spinner', { state: 'hidden' });
    await page.locator('text=Continue Shopping').click();
    await page.waitForSelector('#spinner', { state: 'hidden', timeout: 10000 });

    await navigationToWindowWithNailingFlange(page)
    test.setTimeout(2 * 60 * 1000);
    await page.waitForTimeout(2000)
    await page.waitForSelector('#spinner', { state: 'hidden' });
    await addPreExistingWindowWithNailingFlange(page)
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


  test("Windows With Nailing Flange-Apply Global Changes ", async ({ page }) => {
    await startQuote(page);
    await navigationToWindowWithNailingFlange(page)
    // await page.locator('text=×Close').click();
    await toAddWindowWithNailingFlange(page)
    test.setTimeout(2 * 60 * 1000);
    await page.click('text=×Close');
    await page.waitForTimeout(2000)
    await page.waitForSelector('#spinner', { state: 'hidden' });
    await page.locator('text=Continue Shopping').click();
    await page.waitForSelector('#spinner', { state: 'hidden', timeout: 10000 });

    await navigationToWindowWithNailingFlange(page)
    test.setTimeout(2 * 60 * 1000);
    await page.waitForTimeout(2000)
    await page.waitForSelector('#spinner', { state: 'hidden' });
    await addPreExistingWindowWithNailingFlange(page)
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

  test("Windows With Nailing Flange-validating the Estimation Prices", async ({ page }) => {
    await startQuote(page);
    await navigationToWindowWithNailingFlange(page)
    // await page.locator('text=×Close').click();
    await toAddWindowWithNailingFlange(page)
    test.setTimeout(2 * 60 * 1000);
    await page.click('text=×Close');
    await page.waitForTimeout(2000)
    await page.waitForSelector('#spinner', { state: 'hidden' });
    await page.locator('text=Continue Shopping').click();
    await page.waitForSelector('#spinner', { state: 'hidden', timeout: 10000 });

    await navigationToWindowWithNailingFlange(page)
    test.setTimeout(2 * 60 * 1000);
    await page.waitForTimeout(2000)
    await page.waitForSelector('#spinner', { state: 'hidden' });
    await addPreExistingWindowWithNailingFlange(page)
    await page.waitForTimeout(2000)
    await page.waitForSelector('#spinner', { state: 'hidden', timeout: 10000 });
    await summaryTestsSpecs.validatingtheSumOfPrices(page)
  })


})
