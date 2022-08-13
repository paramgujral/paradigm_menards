import { test, expect } from "@playwright/test";
import {
  allLogins,
  buildStateFilePath,
  MenardsAppNames,
} from "../../utils/menards/test-init-constants";
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
async function doorCustomDesign(page){
    await closeCross(page)
    // Click text=Narrow >> nth=1
  await page.locator('text=Narrow').nth(1).click();
  // Click text=Actual Size >> nth=0
  await page.locator('text=Actual Size').first().click();
  // Click text=Overall Actual Width Help me chooseSpecify Actual Size for width by using decima >> input
  await page.locator('text=Overall Actual Width Help me chooseSpecify Actual Size for width by using decima >> input').click();
  // Fill text=Overall Actual Width Help me chooseSpecify Actual Size for width by using decima >> input
  await page.locator('text=Overall Actual Width Help me chooseSpecify Actual Size for width by using decima >> input').fill('33');
  // Click text=Overall Actual Height Help me chooseSpecify Actual Size for height by using deci >> input
  await page.locator('text=Overall Actual Height Help me chooseSpecify Actual Size for height by using deci >> input').click();
  await page.waitForTimeout(3000);
  // Fill text=Overall Actual Height Help me chooseSpecify Actual Size for height by using deci >> input
  await page.locator('text=Overall Actual Height Help me chooseSpecify Actual Size for height by using deci >> input').fill('80');
  // Click text=Continue >> nth=1
  await page.waitForTimeout(3000);
  await page.locator('text=Overall Actual Width Help me chooseSpecify Actual Size for width by using decima >> input').click();
  await page.locator('text=Continue').nth(1).click();
  
  // Click text=No Grille(s)
  await page.locator('text=No Grille(s)').click();
  // Click text=Continue >> nth=1
  await page.locator('text=Continue').nth(1).click();
   // Click text=Tempered Clear Insulated
   await page.locator('text=Tempered Clear Insulated').click();
   // Click text=None >> nth=1
   await page.locator('text=None').nth(1).click();
   // Click text=Continue >> nth=1
   await page.locator('text=Continue').nth(1).click();

}

async function configureDoorCustomDesign(page){
  // Click text=Narrow >> nth=1
  await page.locator('text=Narrow').nth(1).click();
  // Click text=Standard Rough OpeningActual SizeVisible Glass Size >> img >> nth=0
  await page.locator('text=Standard Rough OpeningActual SizeVisible Glass Size >> img').first().click();
  // Click text=— Select — >> nth=0
  await page.locator('text=— Select —').first().click();
  // Click #react-select-2-option-0
  await page.locator('#react-select-2-option-0').click();
  await page.waitForSelector('#spinner', { state: 'hidden' }, { timeout: 15000 });

  // Click text=— Select —
  await page.locator('text=— Select —').click();
  // Click #react-select-3-option-0
  await page.locator('#react-select-3-option-0').click();
  await page.waitForSelector('#spinner', { state: 'hidden' }, { timeout: 15000 });

  // Click text=Continue >> nth=1
  await page.locator('text=Continue').nth(1).click();
  // Click text=No Grille(s)
  await page.locator('text=No Grille(s)').click();
  await page.waitForSelector('#spinner', { state: 'hidden' }, { timeout: 15000 });

  // Click text=Continue >> nth=1
  await page.locator('text=Continue').nth(1).click();
  // Click text=Tempered Low E
  await page.locator('text=Tempered Low E').click();
  await page.waitForSelector('#spinner', { state: 'hidden' }, { timeout: 15000 });

  // Click text=Continue >> nth=1
  await page.locator('text=Continue').nth(1).click();
  await page.waitForSelector('#spinner', { state: 'hidden' }, { timeout: 15000 });


  await page.locator('text=Add to Design').first().click();



}

async function doorCustomConfigure(page) {
   // Click text=Custom Patio Door PartsSelectReplacement glass, panels, frames, screens and more >> a
  await page.locator('//h5[text()="Custom Patio Door Parts"]//parent::div/p/a').click();
  test.setTimeout(2 * 60 * 1000);
  await verifyDesignActive(page)
  //With Nailing Flange
  // Click text=Back
  await page.locator('text=Back').click();
  // Click text=Custom Patio Door PartsSelectReplacement glass, panels, frames, screens and more >> a
  let projectType=  await page.locator('text=Custom Patio Door PartsSelectReplacement glass, panels, frames, screens and more >> a')
  await expect.soft(projectType).toBeVisible()
  await page.locator('//h5[text()="Custom Patio Door Parts"]//parent::div/p/a').click();
  // await page.waitForURL('https://menardsdev.wtsparadigm.com/quotes/cf69d19b-da00-4839-8e87-0c59924d0e93/configure/product-select/MenardsPatioDoorParts');
  let panelBody = page.locator(".panel-body");
await expect.soft(panelBody).toHaveText(/With Nailing Flange/);
await expect.soft(panelBody).toHaveText(/Without Nailing Flange/);
  // Click label:has-text("With Nailing Flange")
  await page.locator('label:has-text("With Nailing Flange")').click();
  // Click text=Back
  await page.locator('text=Back').click();
  let projectDoorType= await page.locator('label:has-text("With Nailing Flange")')
  await expect.soft(projectDoorType).toBeVisible()
  // Click label:has-text("With Nailing Flange")
  await page.locator('label:has-text("With Nailing Flange")').click();
  await expect.soft(panelBody).toHaveText(/Vinyl Interior & Vinyl Exterior/);
  await expect.soft(panelBody).toHaveText(/Wood Interior & Vinyl Exterior/);
  await expect.soft(panelBody).toHaveText(/Wood Interior & Aluminum Exterior/);
  await expect.soft(panelBody).toHaveText(/Wood Interior & Wood Exterior/); 
  await expect.soft(panelBody).toHaveText(/Wood Interior & Fiberglass Exterior/);
  // Click text=Vinyl Interior & Vinyl Exterior
  await page.locator('text=Vinyl Interior & Vinyl Exterior').click();
  // Click text=Back
  await page.locator('text=Back').click();
  let materialType=await page.locator('text=Vinyl Interior & Vinyl Exterior')
  await expect.soft(materialType).toBeVisible()
  // Click text=Vinyl Interior & Vinyl Exterior
  await page.locator('text=Vinyl Interior & Vinyl Exterior').click();
  await expect.soft(panelBody).toHaveText(/Sliding Patio Doors/);
  await expect.soft(panelBody).toHaveText(/Sidelites & Transoms/);
  // Click text=Sliding Patio Doors
  await page.locator('text=Sliding Patio Doors').click();
  // Click text=Back
  await page.locator('text=Back').click();
  let doorOperationType=await page.locator('text=Sliding Patio Doors')
  await expect.soft(doorOperationType).toBeVisible()
  // Click text=Sliding Patio Doors
  await page.locator('text=Sliding Patio Doors').click();
  await expect.soft(panelBody).toHaveText(/1 Panel Sliding Door/);
  await expect.soft(panelBody).toHaveText(/2 Panel Sliding Door/);
  await expect.soft(panelBody).toHaveText(/2 Panel Sliding Door W/);
  await expect.soft(panelBody).toHaveText(/3 Panel Sliding Door/);
  await expect.soft(panelBody).toHaveText(/4 Panel Sliding Door/);
  // Click text=1 Panel Sliding Door
  await page.locator('text=1 Panel Sliding Door').click();
  // Click text=Select 300
  let prevButton = page.locator(".previous");
  await expect.soft(prevButton).toHaveClass(/disabled/);
  let nextButton = page.locator(".next");
  await expect.soft(nextButton).toHaveClass(/disabled/);
  // await expect.soft(panelBody).toHaveText(/Select 300/);
  // await expect.soft(panelBody).toHaveText(/Select 250 Vinyl/);
  // await expect.soft(panelBody).toHaveText(/Select 350 Vinyl/);
  await page.locator('text=Select 300').click();
  // await page.waitForURL('https://menardsdev.wtsparadigm.com/quotes/cf69d19b-da00-4839-8e87-0c59924d0e93/configure/');
  await doorCustomDesign(page)
}

async function navigationToDoorCustomConfigure(page) {
 await page.locator('text=Custom Patio Door PartsSelectReplacement glass, panels, frames, screens and more >> a').click();
 await page.locator('label:has-text("With Nailing Flange")').click();
 await page.locator('text=Vinyl Interior & Vinyl Exterior').click();
 await page.locator('text=Sliding Patio Doors').click();
 await page.locator('text=1 Panel Sliding Door').click();
 await page.locator('text=Select 300').click();

}


const state = allLogins[6];
const stateFilePath = buildStateFilePath({
  ...state,
  appName: MenardsAppNames.doors,
});
// Load door storage statesś
test.use({ storageState: stateFilePath });

test("door - custom test start designing", async ({ page }) => {
  // await verifyLoginPage(page);
  await startQuote(page);
  let panelBody = page.locator(".panel-body");
  await expect.soft(panelBody).toHaveText(/Patio Doors With Nailing Flange/);
  await expect.soft(panelBody).toHaveText(/Patio Doors Without Nailing Flange/);
  await expect.soft(panelBody).toHaveText(/Most Popular Sizes/);
  await expect.soft(panelBody).toHaveText(/Custom Patio Door Parts/);
  await expect.soft(panelBody).toHaveText(/Standard Patio Door Parts/);
  await doorCustomConfigure(page);
});

test('"Online purchase Doors With custom part",The user should not be allowed to get to the purchase screen' ,async ({ page }) => {
  await startQuote(page);
  await navigationToDoorCustomConfigure(page)
  await page.click('text=×Close');
  await configureDoorCustomDesign(page);
  await page.click('text=×Close');
  await page.waitForTimeout(2000)
  await page.waitForSelector('#spinner', { state: 'hidden' });
  await purchaseTests.verifyPurchaseForRebate(page);
})
