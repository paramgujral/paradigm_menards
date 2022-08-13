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
async function closeCross(page) {
  await page.locator("button.close").click();
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

async function doorsWithNailingFlengeDesign(page) {
  await closeCross(page);
  // Click .css-1hwfws3 >> nth=0
  await page.locator(".css-1hwfws3").first().click();
  // Click #react-select-2-option-3
  await page.locator("#react-select-2-option-3").click();
  // Click .css-bg1rzq-control > .css-1hwfws3 >> nth=0
  await page.locator(".css-bg1rzq-control > .css-1hwfws3").first().click();
  // Click #react-select-3-option-1
  await page.locator("#react-select-3-option-1").click();
  // Click text=OX (Right Hand)
  await page.locator("text=OX (Right Hand)").click();
  // Click text=Continue >> nth=1
  await page.locator("text=Continue").nth(1).click();
  // Click text=Desert Sand
  await page.locator("text=Desert Sand").click();
  // Click text=No Grilles
  await page.locator("text=No Grilles").click();
  // Click text=Continue >> nth=1
  await page.locator("text=Continue").nth(1).click();
  // Click text=All Options
  await page.locator("text=All Options").click();
  // Click text=SunStable >> nth=0
  await page.locator("text=SunStable").first().click();
  // Click text=Bronze
  await page.locator("text=Bronze").click();
  // Click text=Continue >> nth=1
  await page.locator("text=Continue").nth(1).click();
  // Go to https://menardsdev.wtsparadigm.com/quotes/e95cfa4b-6e55-455c-9aec-71e104ec71fe/line-items
  await page.goto(
    "https://menardsdev.wtsparadigm.com/quotes/e95cfa4b-6e55-455c-9aec-71e104ec71fe/line-items"
  );
}
async function doorsWithNailingFlenge(page) {
  // Click text=Patio Doors With Nailing FlangeSelect >> button
  await page
    .locator("text=Patio Doors With Nailing FlangeSelect >> button")
    .click();
  // Click text=Back
  await page.locator("text=Back").click();
  let projectType = await page.locator(
    "text=Patio Doors With Nailing FlangeSelect >> button"
  );
  await expect.soft(projectType).toBeVisible();
  // Click text=Patio Doors With Nailing FlangeSelect >> button
  await page
    .locator("text=Patio Doors With Nailing FlangeSelect >> button")
    .click();
  await verifyDesignActive(page);
  let panelBody = page.locator(".panel-body");
  await expect.soft(panelBody).toHaveText(/Vinyl Interior & Vinyl Exterior/);
  await expect.soft(panelBody).toHaveText(/Wood Interior & Aluminum Exterior/);
  await expect.soft(panelBody).toHaveText(/Wood Interior & Wood Exterior/);
  // Click text=Vinyl Interior & Vinyl Exterior
  await page.locator("text=Vinyl Interior & Vinyl Exterior").click();
  // Click text=Back
  await page.locator("text=Back").click();
  let materialType = await page.locator("text=Vinyl Interior & Vinyl Exterior");
  await expect.soft(materialType).toBeVisible();
  // Click text=Vinyl Interior & Vinyl Exterior
  await page.locator("text=Vinyl Interior & Vinyl Exterior").click();
  await expect.soft(panelBody).toHaveText(/Sliding Patio Doors/);
  await expect.soft(panelBody).toHaveText(/Sidelites & Transoms/);
  // Click text=Sliding Patio Doors
  await page.locator("text=Sliding Patio Doors").click();
  // Click text=Back
  await page.locator("text=Back").click();
  let doorType = await page.locator("text=Sliding Patio Doors");
  await expect.soft(doorType).toBeVisible();
  test.setTimeout(2 * 60 * 1000);
  // Click text=Sliding Patio Doors
  await page.locator("text=Sliding Patio Doors").click();
  await expect.soft(panelBody).toHaveText(/2 Panel Sliding Door/);
  await expect.soft(panelBody).toHaveText(/2 Panel Sliding Door W/);
  await expect.soft(panelBody).toHaveText(/3 Panel Sliding Door/);
  await expect.soft(panelBody).toHaveText(/4 Panel Sliding Door/);
  // Click text=2 Panel Sliding Door >> nth=0
  await page.locator("text=2 Panel Sliding Door").first().click();
  // Click text=Back
  await page.locator("text=Back").click();
  let configuration = await page.locator("text=2 Panel Sliding Door").first();
  await expect.soft(configuration).toBeVisible();
  // Click text=2 Panel Sliding Door >> nth=0
  await page.locator("text=2 Panel Sliding Door").first().click();
  let prevButton = page.locator(".previous");
  await expect.soft(prevButton).toHaveClass(/disabled/);
  let nextButton = page.locator(".next");
  await expect.soft(nextButton).toHaveClass(/disabled/);
  // Click text=Builders Vinyl
  await page.locator("text=Builders Vinyl").click();
  await doorsWithNailingFlengeDesign(page);
}
const state = allLogins[0];
const stateFilePath = buildStateFilePath({
  ...state,
  appName: MenardsAppNames.doors,
});
// Load door storage statesś
test.use({ storageState: stateFilePath });

test("door -with-nailing-flenge- test start designing", async ({ page }) => {
  // await verifyLoginPage(page);
  await startQuote(page);
  let panelBody = page.locator(".panel-body");
  await expect.soft(panelBody).toHaveText(/Patio Doors With Nailing Flange/);
  await expect.soft(panelBody).toHaveText(/Patio Doors Without Nailing Flange/);
  await expect.soft(panelBody).toHaveText(/Most Popular Sizes/);
  await expect.soft(panelBody).toHaveText(/Custom Patio Door Parts/);
  await expect.soft(panelBody).toHaveText(/Standard Patio Door Parts/);
  await doorsWithNailingFlenge(page);
});

test('"Edit/Copy/Delete line", doors with nailing flenge ', async ({ page }) => {
  await startQuote(page);
  await doorsWithNailingFlenge(page);
  await page.waitForTimeout(2000)

  await page.waitForSelector('#spinner', { state: 'hidden' });
  await summaryTestsSpecs.verifyAccessibilityOfSummaryTab(page)
  await summaryTestsSpecs.editCopyDeleteLineVerification(page)
});

test('Doors-The user should not be allowed to get to the purchase screen' ,async ({ page }) => {
  await startQuote(page);
  await doorsWithNailingFlenge(page)
  await page.waitForTimeout(2000)
  await page.waitForSelector('#spinner', { state: 'hidden' });
  await purchaseTests.verifyPurchase(page);
  await purchaseTests.verifyPrintPurchaseDocsDisclamier(page);
})