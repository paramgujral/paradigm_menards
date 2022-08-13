import { test, expect } from "@playwright/test";
import {
  allLogins,
  buildStateFilePath,
  MenardsAppNames,
} from "../../utils/menards/test-init-constants";
import * as purchaseTests from '../purchase/purchase'

//------------------------------------------
async function verifyConfiguratorUrlForwindows(page) {
  return await expect(page).toHaveURL(
    /\/quotes\/.*\/configure\/product-select\/MenardsWindows$/
  );
}

async function startQuote(page) {
  // navigate to the starting point with a new quote
  await page.goto("/home");
  await page.click("text=Start Designing");
  
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
async function toAddWindowWithNailingFlange1(page) {
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
  await page.waitForTimeout(2000)
  // await page.locator('text=BackContinue Glass Energy EfficiencyEnergy StarAll Options Installation Zip Code >> input').first().click();
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

const state = allLogins[4];
const stateFilePath = buildStateFilePath({
  ...state,
  appName: MenardsAppNames.windows,
});

// Load garage door storage statesś
test.use({ storageState: stateFilePath });

test('Windows-With-Nailing-Flenge-test-Verifying Online purchase Tab for Rebate' ,async ({ page }) => {
  await startQuote(page);
  await navigationToWindowWithNailingFlange(page)
  await page.locator('text=×Close').click();
  await toAddWindowWithNailingFlange1(page)
  test.setTimeout(2 * 60 * 1000);
  await page.click('text=×Close');
  await page.waitForTimeout(2000)
  await page.waitForSelector('#spinner', { state: 'hidden' });
  await purchaseTests.verifyPurchaseForRebate(page)
})

