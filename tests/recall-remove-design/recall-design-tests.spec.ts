import { test, expect } from "@playwright/test";
import {
  allLogins,
  buildStateFilePath,
  MenardsAppNames,
} from "../../utils/menards/test-init-constants";


async function guestLoginOnlineWithoutStore(page){
  await page.goto('https://menardsdev.wtsparadigm.com/test-init');
  // Click input[name="guestAccountId"]
  await page.locator('input[name="guestAccountId"]').click();
  // Fill input[name="guestAccountId"]
  await page.locator('input[name="guestAccountId"]').fill('12345');
  // Click input[name="firstName"]
  await page.locator('input[name="firstName"]').click();
  // Fill input[name="firstName"]
  await page.locator('input[name="firstName"]').fill('param');
  // Click text=Submit
  await page.locator('text=Submit').click();
  // assert.equal(page.url(), 'https://menardsdev.wtsparadigm.com/store-lookup');

}

async function guestLoginInstoreWithStore(page){
  await page.goto('https://menardsdev.wtsparadigm.com/test-init');
  await page.locator('input[name="storeNumber"]').click();
  await page.locator('input[name="storeNumber"]').fill('3011');
  // Click input[name="guestAccountId"]
  await page.locator('input[name="guestAccountId"]').click();
  // Fill input[name="guestAccountId"]
  await page.locator('input[name="guestAccountId"]').fill('12345');
  // Click input[name="firstName"]
  await page.locator('input[name="firstName"]').click();
  // Fill input[name="firstName"]
  await page.locator('input[name="firstName"]').fill('param');
  // Fill input[name="isInternal"]
  await page.locator('input[name="isInternal"]').click();
  // Click text=Submit
  await page.locator('text=Submit').click();
  // assert.equal(page.url(), 'https://menardsdev.wtsparadigm.com/store-lookup');
}


async function guestLoginOnlineWithStore(page){
  await page.goto('https://menardsdev.wtsparadigm.com/test-init');
  await page.locator('input[name="storeNumber"]').click();
  await page.locator('input[name="storeNumber"]').fill('3011');
  // Click input[name="guestAccountId"]
  await page.locator('input[name="guestAccountId"]').click();
  // Fill input[name="guestAccountId"]
  await page.locator('input[name="guestAccountId"]').fill('12345');
  // Click input[name="firstName"]
  await page.locator('input[name="firstName"]').click();
  // Fill input[name="firstName"]
  await page.locator('input[name="firstName"]').fill('param');
  // Click text=Submit
  await page.locator('text=Submit').click();
  // assert.equal(page.url(), 'https://menardsdev.wtsparadigm.com/store-lookup');
}

async function guestNotLoginOnline(page){
  await page.goto('https://menardsdev.wtsparadigm.com/test-init');

  await page.locator('input[name="storeNumber"]').click();
  await page.locator('input[name="storeNumber"]').fill('3011');
  // Click input[name="guestAccountId"]
  await page.locator('input[name="guestAccountId"]').click();
  // Click input[name="firstName"]
  await page.locator('input[name="firstName"]').click();
  // Fill input[name="firstName"]
  await page.locator('input[name="firstName"]').fill('Param');
  // Click text=Submit
  await page.locator('text=Submit').click();
  // assert.equal(page.url(), 'https://menardsdev.wtsparadigm.com/store-lookup');
}



async function clearStoreList(page){

  await page.locator('input[name="zipCode"]').click();
  await page.locator('input[name="zipCode"]').fill('26501');
  await page.locator('text=Search').click();

  await expect.soft(page.locator('th:has-text("Store")')).toBeVisible();
  await expect.soft(page.locator('text=Address')).toBeVisible();
  await expect.soft(page.locator('text=Distance')).toBeVisible();
  await expect.soft(page.locator('text=Phone')).toBeVisible();

  await page.locator('input[name="zipCode"]').click();
  await page.locator('input[name="zipCode"]').fill('26501');
  
  await page.locator('text=Clear').click();;

  await expect.soft(page.locator('input[name="zipCode"]')).toBeEmpty();

  await expect.soft(page.locator('th:has-text("Store")')).not.toBeVisible();
  await expect.soft(page.locator('text=Address')).not.toBeVisible();
  await expect.soft(page.locator('text=Distance')).not.toBeVisible();
  await expect.soft(page.locator('text=Phone')).not.toBeVisible();

}




async function navigatetoSavedDesignedViaSelectAStore(page){

  // validate No store found
  await page.locator('input[name="zipCode"]').click();
  await page.locator('input[name="zipCode"]').fill('00000');
  await page.locator('text=Search').click();

  await expect.soft(page.locator('text=No stores found')).toBeVisible();

  // validate search store
  await page.locator('input[name="zipCode"]').click();
  await page.locator('input[name="zipCode"]').fill('26501');
  await page.locator('text=Search').click();

  await expect.soft(page.locator('th:has-text("Store")')).toBeVisible();
  await expect.soft(page.locator('text=Address')).toBeVisible();
  await expect.soft(page.locator('text=Distance')).toBeVisible();
  await expect.soft(page.locator('text=Phone')).toBeVisible();

  await expect.soft(page.locator('text=WESTOVER').first()).toBeVisible();
  await expect.soft(page.locator('text=351 BRATTICE DRWESTOVER, WV 26501')).toBeVisible();
  await expect.soft(page.locator('text=4.6 miles')).toBeVisible();
  await expect.soft(page.locator('text=304-983-7400')).toBeVisible();
  
  // Click text=WARREN 2015 WAL MART DR NEWARREN, OH 44483 362.3 miles 330-372-5511 Select This  >> button[name="storeNbr"]
  await page.locator('text=Select This Store').first().click();
  await expect.soft(page.locator('text=Start Designing')).toBeVisible();
  await expect.soft(page.locator('text=Search Saved Designs')).toBeVisible();

  await page.locator('text=Search Saved Designs').click();

  await expect.soft(page.locator('input:has-text("Recall Design")')).toBeVisible();

}

async function navigatetoSavedDesigned(page){
  await page.goto("/home");
  await page.locator('text=Search Saved Designs').click();
  await expect.soft(page.locator('input:has-text("Recall Design")')).toBeVisible();
}

async function clickQuestionMark(page){
  await page.locator('text=Login to retrieve your designs, or search by Design ID: × Recall Design Please e >> button').first().click();
  await expect.soft(page.locator('text=Please enter your 12-digit design ID and then press Recall Design, or login usin')).toBeVisible();
  await page.locator('[aria-label="Close"]').click();
}

async function validateSavedDesignGuestLogin(page){
  
  await navigatetoSavedDesigned(page);
  await expect.soft(page.locator('text=Below are the designs you have been hard at work on! Designs will be saved up to')).toBeVisible();

  let records = await page.$$('//div[@class="row"]').length;
  let continueDesigning = await page.$$('//a[contains(text(),"Continue Designing")]').length;
  let remove = await page.$$('//button[contains(text(),"Remove")]').length;

  let projectCount = await page.$$('text=Project Name').length;
  let designIDCount = await page.$$('text=Design ID').length;
  let createdDateCount = await page.$$('text=Created Date').length;
  let lastModifiedCount = await page.$$('text=Last Modified').length;

  expect.soft(records).toEqual(continueDesigning);
  expect.soft(continueDesigning).toEqual(remove);
  expect.soft(remove).toEqual(projectCount);
  expect.soft(projectCount).toEqual(designIDCount);
  expect.soft(designIDCount).toEqual(createdDateCount);
  expect.soft(createdDateCount).toEqual(lastModifiedCount);

}

async function recallDesign(page){
  let firstDesignID = await page.locator('(//dl/dd)[2]').innerText()
  await page.locator('[placeholder="Design\\ ID"]').click();
  await page.locator('[placeholder="Design\\ ID"]').fill(firstDesignID);
  await page.locator('input:has-text("Recall Design")').click();
  await expect.soft(page.locator(`(//p[contains(text(),"${firstDesignID}")])[2]`)).toBeVisible();
}

async function designNotFound(page){
  await page.locator('[placeholder="Design\\ ID"]').click();
  await page.locator('[placeholder="Design\\ ID"]').fill('123456789456');
  await page.locator('input:has-text("Recall Design")').click();
  await expect.soft(page.locator('text=× Error Quote not found with Design ID')).toBeVisible();
}

async function validateMinLength(page){
  const designID = await page.locator('[placeholder="Design\\ ID"]');
  let maxLength = await designID.evaluate(e => (e as HTMLInputElement).maxLength);
  expect.soft(maxLength).toEqual(12);
}

async function continueDesign(page){
  await page.locator('text=Continue Designing').first().click();
  await expect.soft(page.locator('text=Estimated Price:')).toBeVisible();
  await expect.soft(page.locator('a:has-text("Summary")')).toBeVisible();
}

async function accessDesignCreatedByGuestWihtoutLogin(page){
  
  //Create a desing with Guest Not Login
  await page.goto('https://menardsdev.wtsparadigm.com/test-init');
  await page.locator('input[name="storeNumber"]').click();
  await page.locator('input[name="storeNumber"]').fill('3011');
  await page.locator('input[name="firstName"]').click();
  await page.locator('input[name="firstName"]').fill('Param');
  await page.locator('text=Submit').click();
  
  await page.locator('text=Start Designing').click();
  await page.locator('text=Most Popular Sizes/StylesSelectThe most common styles ready to order —- simply e >> a').click();
  await page.locator('.btn.btn-sm').first().click();
  await page.locator('a:has-text("Summary")').click();
  await page.locator('text=×Close').click();
  
  let designID = await page.locator('(//p[contains(text(),"3011")])[2]').innerText();

  //Login with guest and search for the design Id previously created
  await page.goto('https://menardsdev.wtsparadigm.com/test-init');
  await page.locator('input[name="storeNumber"]').click();
  await page.locator('input[name="storeNumber"]').fill('3011');
  await page.locator('input[name="guestAccountId"]').click();
  await page.locator('input[name="guestAccountId"]').fill('12345');
  await page.locator('input[name="firstName"]').click();
  await page.locator('input[name="firstName"]').fill('Param');
  await page.locator('text=Submit').click();
  await page.locator('text=Search Saved Designs').click();

  //previously created design Id shouldn't be available
  await expect.soft(page.locator(`text=${designID}`)).not.toBeVisible();
  await page.locator('[placeholder="Design\\ ID"]').click();
  await page.locator('[placeholder="Design\\ ID"]').fill(designID);
  await page.locator('[value="Recall Design"]').click();

  await page.locator('[title=Copy]').click();
  
  // goto search saved designs page
  await page.goto('https://menardsdev.wtsparadigm.com/quotes/designs');

  await page.reload();
  
  //previously created design Id is available now
  await expect.soft(page.locator(`text=${designID}`)).toBeVisible();

}

async function accessDesignFromOtherShop(page){
  //create a design for shop 3016
  await page.goto('https://menardsdev.wtsparadigm.com/test-init');
  await page.locator('input[name="storeNumber"]').click();
  await page.locator('input[name="storeNumber"]').fill('3016');
  await page.locator('input[name="guestAccountId"]').click();
  await page.locator('input[name="guestAccountId"]').fill('12345');
  await page.locator('input[name="firstName"]').click();
  await page.locator('input[name="firstName"]').fill('Param');
  await page.locator('text=Submit').click();
  await page.locator('text=Start Designing').click();
  await page.locator('text=Most Popular Sizes/StylesSelectThe most common styles ready to order —- simply e >> a').click();
  await page.locator('.btn.btn-sm').first().click();
  await page.locator('a:has-text("Summary")').click();
  await page.locator('text=×Close').click();
  
  //get design number
  let designID = await page.locator('(//p[contains(text(),"3016")])[2]').innerText();

  //search for the design in new page
  await page.goto('https://menardsdev.wtsparadigm.com/test-init');
  await page.locator('input[name="storeNumber"]').click();
  await page.locator('input[name="storeNumber"]').fill('3011');
  await page.locator('input[name="guestAccountId"]').click();
  await page.locator('input[name="guestAccountId"]').fill('12345');
  await page.locator('input[name="firstName"]').click();
  await page.locator('input[name="firstName"]').fill('Param');
  await page.locator('text=Submit').click();
  await page.locator('text=Search Saved Designs').click();
  
  //design Id for another store is available now
  await expect.soft(page.locator(`text=${designID}`)).toBeVisible();
}



// test.describe.configure({ mode: 'serial' });

// TODO: When initialization is debugged, remove this line in favor of the above loop.

const state = allLogins[0];
const stateFilePath = buildStateFilePath({ ...state, appName: MenardsAppNames.windows });
// Load garage door storage state
test.use({ storageState: stateFilePath });

test.describe('Recall Design', () => {
  test('Select a store and validate page', async ({ page }) => {
    await guestLoginOnlineWithoutStore(page);
    await clearStoreList(page);
    await navigatetoSavedDesignedViaSelectAStore(page); 
  });
});

test.describe('Recall Design', () => {

  test('Recall Design - Guest Login Instore', async ({ page }) => {
    await guestLoginInstoreWithStore(page);
    await navigatetoSavedDesigned(page);
    await clickQuestionMark(page);
    await validateSavedDesignGuestLogin(page);
    await designNotFound(page);
    await validateMinLength(page);
    await recallDesign(page);
    // await continueDesign(page);
  });

  test('Recall Design - Guest Login Online', async ({ page }) => {
    await guestLoginOnlineWithStore(page);
    await navigatetoSavedDesigned(page);
    await clickQuestionMark(page);
    await validateSavedDesignGuestLogin(page);
    await designNotFound(page);
    await validateMinLength(page);
    await recallDesign(page);
    // await continueDesign(page);
  });

  test('Continue Design - Guest Login Online', async ({ page }) => {
    await guestLoginOnlineWithStore(page);
    await navigatetoSavedDesigned(page);
    await continueDesign(page);
  });

  test('Continue Design - Guest Login Instore', async ({ page }) => {
    await guestLoginInstoreWithStore(page);
    await navigatetoSavedDesigned(page);
    await continueDesign(page);
  });


  test('Recall Design - Access Design created by Guest not login', async ({ page }) => {
    await accessDesignCreatedByGuestWihtoutLogin(page);
  });

  test('Recall Design - Access Design created for another shop', async ({ page }) => {
    await accessDesignFromOtherShop(page);
  });

});


