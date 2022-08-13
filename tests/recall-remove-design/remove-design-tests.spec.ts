import { test, expect } from '@playwright/test';
import { allLogins, buildStateFilePath, MenardsAppNames } from '../../utils/menards/test-init-constants';


async function guestLoginOnline(page){
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
  await page.locator('input[name="firstName"]').fill('Param');
  // Click text=Submit
  await page.locator('text=Submit').click();
  // assert.equal(page.url(), 'https://menardsdev.wtsparadigm.com/store-lookup');
}

async function guestLoginInStore(page){
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
  await page.locator('input[name="firstName"]').fill('Param');
  // Click text=Submit
  await page.locator('input[name="isInternal"]').click();
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

async function navigatetoSavedDesigned(page){
  await page.goto('/home');
  await page.locator('text=Search Saved Designs').click();
  await expect.soft(page.locator('input:has-text("Recall Design")')).toBeVisible();
}

async function validateRemoveDesign(page){

  await navigatetoSavedDesigned(page);

  //there should be remove button for each design
  let records = await page.$$('//div[@class="row"]').length;
  let remove = await page.$$('//button[contains(text(),"Remove")]').length;
  expect.soft(records).toEqual(remove);
  
  let firstDesignID = await page.locator('(//dl/dd)[2]').innerText();  
  
  //click on remove design for first record
  await page.locator('(//button[contains(text(), "Remove")])[1]').click();

  await expect.soft(page.locator(`text=${firstDesignID}`)).not.toBeVisible();

  await page.reload();

  await expect.soft(page.locator(`text=${firstDesignID}`)).not.toBeVisible();

  await page.locator('[placeholder="Design\\ ID"]').click();
  await page.locator('[placeholder="Design\\ ID"]').fill(firstDesignID);
  await page.locator('input:has-text("Recall Design")').click();
  await expect.soft(page.locator(`text=Error The Design ID "${firstDesignID}" could not be found.`)).toBeVisible();

  await guestNotLoginOnline(page);

  await navigatetoSavedDesigned(page);

  await page.locator('[placeholder="Design\\ ID"]').click();
  await page.locator('[placeholder="Design\\ ID"]').fill(firstDesignID);
  await page.locator('input:has-text("Recall Design")').click();
  await expect.soft(page.locator(`text=Error The Design ID "${firstDesignID}" could not be found.`)).toBeVisible();


} 

async function cancelRemoveDesign(page){

  let firstDesignID = await page.locator('(//dl/dd)[2]').innerText();  
  
  //click on remove design for first record
  await page.locator('(//button[contains(text(), "Remove")])[1]').click();
  
  //press cancel
  await page.keyboard.type('ArrowRight');
  await page.keyboard.type('Enter');

  await expect.soft(page.locator(`text=${firstDesignID}`)).toBeVisible();

  //click on remove design for first record
  await page.locator('(//button[contains(text(), "Remove")])[1]').click();

  //press Ok
  page.keyboard.type('Enter');

  //return to list of design
  await expect.soft(page.locator('input:has-text("Recall Design")')).toBeVisible();
}


test.describe.configure({ mode: 'serial' });

const state = allLogins[0];
const stateFilePath = buildStateFilePath({ ...state, appName: MenardsAppNames.windows });
// Load garage door storage state
test.use({ storageState: stateFilePath });

test.describe('Remove Design Test Case', () => {
  test('Validate Remove Design for Guest login Online', async ({ page }) => {
    await guestLoginOnline(page);
    await validateRemoveDesign(page);
  });
  
  test('Validate Remove Design for Guest login InStore', async ({ page }) => {
    await guestLoginInStore(page);
    await validateRemoveDesign(page);
  });
});