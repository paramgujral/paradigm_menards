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

 async function navigationToAddWindowWithOutNailingFlange(page) {
  await page.locator('text=Windows Without Nailing FlangeSelect >> button').click();
  test.setTimeout(2 * 60 * 1000);
  await page.locator('text=Vinyl Interior & Vinyl Exterior').click();
  await page.locator('text=Single Hung Windows').click();
  // Click text=1-Wide
  await page.locator('text=1-Wide').click();
  await page.locator('text=One Price Vinyl Program').click();
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

   
  // await page.locator('input[name="TextValue"]').click();

  // await page.locator('input[name="TextValue"]').fill('window');

  // await page.locator('button:has-text("Save")').click();
  // await page.click('text=×Close');


}


const state = allLogins[4];
const stateFilePath = buildStateFilePath({ ...state, appName: MenardsAppNames.windows });
// Load garage door storage statesś
test.use({ storageState: stateFilePath });

test('Windows Without Nailing Flange-Rebate-Verifying Online purchase Tab for Rebate' ,async ({ page }) => {

  await startQuote(page);
  await page.waitForTimeout(2000)
  await navigationToAddWindowWithOutNailingFlange(page);
  await page.click('text=×Close');
  await withOutNailingFlangeDesign(page)
  test.setTimeout(2 * 60 * 1000);
  await page.waitForSelector('#spinner', { state: 'hidden' });
  await page.click('text=×Close');
  await purchaseTests.verifyPurchaseForRebate(page)
})

