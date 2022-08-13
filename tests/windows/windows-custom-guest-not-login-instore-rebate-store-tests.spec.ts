import { test, expect } from "@playwright/test";
import {
  allLogins,
  buildStateFilePath,
  MenardsAppNames,
} from "../../utils/menards/test-init-constants";
import * as summaryTestsSpecs from '../summary/summary'
import * as purchaseTests from '../purchase/purchase'

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

async function windowCustomDesignNewConfigure(page) {
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

async function windowCustomDesign(page) {

  // if (await page.$('.modal-header button.close')) {
  //   await page.locator('.modal-header button.close').click();
  // }

  await page.locator('text=Standard Rough Opening >> nth=0').first().click();
  await page.locator('text=— Select —').first().click();
  await page.locator('#react-select-2-option-1').click();
  test.setTimeout(2 * 60 * 1000);
  await page.waitForSelector('#spinner', { state: 'hidden' }, { timeout: 10000 });

  await page.locator('text=— Select —').first().click();
  await page.locator('#react-select-3-option-0').click();

  test.setTimeout(2 * 60 * 1000);
  // await page.waitForSelector('#spinner', { state: 'hidden' },{timeout:10000});
  // await page.locator('text=— Select —').click();
  // await page.locator('#react-select-6-option-1').click();
  await page.waitForSelector('#spinner', { state: 'hidden' }, { timeout: 10000 });
  await page.locator('text=Continue').nth(1).click();
  test.setTimeout(2 * 60 * 1000);
  await page.waitForSelector('#spinner', { state: 'hidden' }, { timeout: 10000 });
  await page.locator('text=White').first().click();
  await page.locator('div:nth-child(4) > .panel-body > .question-answers-wrapper > .images-loaded-container > .answers-row > div > .question-answer-image-inner').first().click();
  await page.locator('text=— Select —').click();
  await page.locator('#react-select-7-option-0').click();
  await page.locator('text=Continue').nth(1).click();
  await page.locator('text=No Low-E').click();
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
  // Click label:has-text("With Nailing Flange")
  await page.locator('label:has-text("With Nailing Flange")').click();
  // Click text=Back
  await page.locator('text=Back').click();
  // Click label:has-text("With Nailing Flange")
  let materialType = page.locator('label:has-text("With Nailing Flange")')
  await expect.soft(materialType).toBeVisible()
  await page.locator('label:has-text("With Nailing Flange")').click();
  let panelBody = page.locator(".panel-body");
  await expect.soft(panelBody).toHaveText(/Vinyl Interior & Vinyl Exterior/);
  await expect.soft(panelBody).toHaveText(/Wood Interior & Vinyl Exterior/);
  await expect.soft(panelBody).toHaveText(/Wood Interior & Aluminum Exterior/);
  await expect.soft(panelBody).toHaveText(/Wood Interior & Wood Exterior/);
  await expect
    .soft(panelBody)
    .toHaveText(/Wood Interior & Fiberglass Exterior/);
  // Click text=Wood Interior & Vinyl Exterior
  await page.locator('text=Wood Interior & Vinyl Exterior').click();
  // Click text=Back
  await page.locator('text=Back').click();
  // Click text=Wood Interior & Vinyl Exterior
  let windowType = page.locator('text=Wood Interior & Vinyl Exterior')
  await expect.soft(windowType).toBeVisible()
  await page.locator('text=Wood Interior & Vinyl Exterior').click();
  // Click label:has-text("Casement Windows")
  let panelBodyConfig = page.locator(".panel-body");
  await expect.soft(panelBodyConfig).toHaveText(/Double Hung Windows/);
  await expect.soft(panelBodyConfig).toHaveText(/Casement Windows/);
  await expect.soft(panelBodyConfig).toHaveText(/Sliding Windows/);
  await expect.soft(panelBodyConfig).toHaveText(/Awning Windows/);
  await page.locator('label:has-text("Casement Windows")').click();


  // Click text=Back
  await page.locator('text=Back').click();
  // Click label:has-text("Casement Windows")
  let windowModel = page.locator('label:has-text("Casement Windows")')
  await expect.soft(windowModel).toBeVisible()
  await page.locator('label:has-text("Casement Windows")').click();
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
  // Click text=Select 500 Wood
  let panelBodySeries = page.locator(
    "div[class='panel panel-default product-select-tile'] div[class='panel-body']"
  );
  await expect.soft(panelBodySeries).toHaveText(/Select 500 Wood/);
  let prevButton = page.locator(".previous");
  await expect.soft(prevButton).toHaveClass(/disabled/);
  let nextButton = page.locator(".next");
  await expect.soft(nextButton).toHaveClass(/disabled/);
  await page.locator('text=Select 500 Wood').click();
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




const state = allLogins[6];
const stateFilePath = buildStateFilePath({ ...state, appName: MenardsAppNames.windows });
// Load garage door storage state
test.use({ storageState: stateFilePath });


// Online purchase
test('Custom-window-test-Verifying-Online purchase Tab for Rebate', async ({ page }) => {
  await startQuote(page);
  await navigationToWindowCustomConfigure(page);
  await page.waitForTimeout(2000)
  await closeCross(page)
  await windowCustomDesignNewConfigure(page)
  test.setTimeout(2 * 60 * 1000);
  await page.click('text=×Close');
  await page.waitForTimeout(2000)
  await page.waitForSelector('#spinner', { state: 'hidden' });
  await purchaseTests.verifyPurchaseForRebate(page)
})


