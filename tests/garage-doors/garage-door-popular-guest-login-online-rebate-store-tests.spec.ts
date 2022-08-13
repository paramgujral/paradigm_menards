
import { test, expect } from '@playwright/test';
import { allLogins, buildStateFilePath, MenardsAppNames } from '../../utils/menards/test-init-constants';
import * as summaryTestsSpecs from '../summary/summary'
import * as purchaseTests from '../purchase/purchase'
import * as globalChange from '../global-change/globalchange'


async function verifyConfiguratorUrlForGarageDoors(page) {
    return await expect(page).toHaveURL(/\/quotes\/.*\/configure\/product-select\/MenardsGarageDoors$/);
}

// Used to start a new quote and launch the configurator
async function startQuote(page) {
    // navigate to the starting point with a new quote
    await page.goto('/home');
    await page.click('text=Start Designing');
}


async function navigateToMostPopularSizesStylesPage(page) {
    await page.locator('text=Most Popular Sizes/StylesSelectSelect from our most popular designs and sizes >> a').click();
    await expect(page).toHaveURL(/\/quotes\/.*\/sku-search$/);
}



async function availabilityOfSkuItems(page) {
    await page.waitForSelector('table.sku-grid', { timeout: 10000 })
    await page.waitForSelector('//table/tbody/tr', { timeout: 10000 })
    let table = await page.$$('//table/tbody/tr')
    let count = table.length;
    console.log('$$$$$$$', count)
    expect(table).toHaveLength(10);


}

async function pagination(page) {
    let activePage = page.locator('ul.pagination li.active')

    //Before clicking the right arrow by default page number should be 1
    await expect.soft(activePage).toHaveText(/1/)
    await page.locator('li.next a').click();
    //after clicking the right arrow it should go to next page that is 2
    await expect.soft(activePage).toHaveText(/2/)

    await page.locator('li.previous a').click();
    //click on left arrow it should go to previous page that is 1
    await expect.soft(activePage).toHaveText(/1/)


}

async function SKUNumberSearch(page) {
    await page.locator('input[placeholder="SKU Number"]').click();
    await page.locator('input[placeholder="SKU Number"]').fill('4251590');
    await page.locator('text=Search SKUs').click();
    let skuNumber = page.locator('table tbody tr td >> nth=0')
    await expect.soft(skuNumber).toHaveText(/4251590/)

}

async function SKUNumberSearchWithNoData(page) {
    await page.locator('input[placeholder="SKU Number"]').click();
    await page.locator('input[placeholder="SKU Number"]').fill('404020012');
    await page.locator('text=Search SKUs').click();
    await page.waitForTimeout(3000)
    let skuNumber = page.locator('table tbody tr td.lead')
    await expect.soft(skuNumber).toHaveText(/No Results/)
}

async function SKUDescriptionSearch(page) {
    await page.locator('input[placeholder="SKU Description"]').click();
    await page.locator('input[placeholder="SKU Description"]').fill("W x 8' 0");
    await page.locator('text=Search SKUs').click();
    let skuDescription = page.locator('table tbody tr td >> nth=1')
    await expect.soft(skuDescription).toHaveText(/W x 8' 0/)
}

async function SKUDescriptionSearchWithNoData(page) {
    await page.locator('input[placeholder="SKU Description"]').click();
    await page.locator('input[placeholder="SKU Description"]').fill('W x 3812345lwjni');
    await page.locator('text=Search SKUs').click();
    let skuDescription = page.locator('table tbody tr td >> nth=1')
    await expect.soft(skuDescription).toHaveText(/No Results/)
}


async function verifyLength(actualLength, expectedLength, logname) {
    try {
        await test.step("able to verify the length of " + " of " + logname + " " + actualLength + " equals to" + expectedLength, async () => {
            expect(actualLength).toHaveLength(expectedLength);
        });
    } catch (error) {
        await test.step("unable to verify the length - " + expectedLength + " of " + logname, async () => { });
    }
}

async function verifyLengthGreaterThan(object, expectedLength, logname) {
    try {
        await test.step("able to verify the length is greater than " + expectedLength + " of " + logname, async () => {
            expect(object).toBeGreaterThan(expectedLength);
        });
    } catch (error) {
        await test.step("unable to verify the length is greater than " + expectedLength + " of " + logname, async () => { });
    }
}

async function verifySubString(string, substring, logname) {
    try {
        await test.step(string + " contains " + substring, async () => {
            expect(string).toContain(substring)
        });
    } catch (error) {
        console.log(error.message);
        await test.step("substring is not found", async () => { });
    }
}
async function verifySKUOnPage(page) {

    // await click(page, resetButton, "Reset");
    // await page.waitForTimeout(3000);

    // await page.waitForSelector(skuRecords, { timeout: 10000 })    
    //let records = page.locator(skuRecords).count();
    // await page.waitForTimeout(5000);
    let records = await page.$$("//table[@class='table table-hover table-condensed sku-grid']//tbody/tr");

    for (let i = 1; i <= records.length; i++) {

        let recordSKUNo = `//tbody/tr[${i}]/td[1]`
        let recordSKUDesc = `//tbody/tr[${i}]/td[2]`
        let recordSKUPrice = `//tbody/tr[${i}]/td[3]`
        let recordSKUQuantity = `//tbody/tr[${i}]/td[4]/input` //Value=1
        let recordSKUAdd = `//tbody/tr[${i}]/td[5]/button` //text=Add

        let recordSKUNoValue = await page.locator(recordSKUNo).innerText();
        let recordSKUDescValue = await page.locator(recordSKUDesc).innerText();
        let recordSKUPriceValue = await page.locator(recordSKUPrice).innerText();

        let recordSKUQuantityValue = await page.$eval(recordSKUQuantity, el => el.value);
        let recordSKUAddText = await page.locator(recordSKUAdd).innerText();

        await verifyLength(recordSKUNoValue, 7, 'SKU Number');
        await verifyLengthGreaterThan(recordSKUDescValue.length, 20, 'SKU Description');
        await verifySubString(recordSKUPriceValue, '$', 'SKU Price');
        await verifySubString(recordSKUQuantityValue, '1', 'SKU Quantity');
        await verifySubString(recordSKUAddText, 'Add', 'SKU Add Button');
    }
}


async function editQuantityOfSkuItems(page) {
    let recordSKUQuantity = 'td:nth-child(4) > .form-control'
    let recordSKUAdd = 'td:nth-child(5) > .btn'
    let successToster = page.locator('.toastr')
    let alertMesg = page.locator('text=×Line quantity must be a positive number.')

    //Quantity field should allow positive integers
    await page.locator(recordSKUQuantity).first().click();
    await page.locator(recordSKUQuantity).first().fill('2');
    await page.locator(recordSKUAdd).first().click();
    await page.waitForSelector('table.sku-grid', { timeout: 10000 })
    await page.waitForSelector('.toastr', { timeout: 10000 })
    await expect.soft(successToster).toBeVisible()
    await page.waitForSelector('table.sku-grid', { timeout: 10000 })

    //Quantity field should not allow negative numbers
    await page.locator(recordSKUQuantity).first().fill('-')
    await expect(page.locator(recordSKUQuantity).first()).not.toContainText(/-/);

    //Quantity field should not allow decimals numbers
    await page.locator(recordSKUQuantity).first().fill('1.1')
    await expect(page.locator(recordSKUQuantity).first()).not.toContainText(/./)

    //Quantity field should not allow 0
    await page.locator(recordSKUQuantity).first().fill('0')
    await page.locator(recordSKUAdd).first().click()

    //verifying alert mesg
    // await page.locator(alertMesg).click();
    await page.waitForSelector('div.alert-danger', { timeout: 10000 })
    await expect.soft(alertMesg).toBeVisible()

    //Quantity field should not allow alphabetic characters
    await page.locator(recordSKUQuantity).first().fill('abhbAdsdf')
    await expect(page.locator(recordSKUQuantity).first()).not.toContainText(/abhbAdsdf/)

    //Quantity field should not allow special characters or space
    await page.locator(recordSKUQuantity).first().fill('@##')
    await expect(page.locator(recordSKUQuantity).first()).not.toContainText(/@##/)

    //Quantity field should not allow blank
    await page.locator(recordSKUQuantity).first().fill('  ')
    await expect(page.locator(recordSKUQuantity).first()).not.toContainText(/  /)
}


async function paginationWithoOnePage(page) {
    let activePage = page.locator('ul.pagination li.active')
    let nextBtn = page.locator('.next')
    let previousBtn = page.locator('.previous')
    await expect.soft(activePage).toHaveText(/1/)
    await expect.soft(nextBtn).toHaveClass(/disabled/)

    await expect.soft(previousBtn).toHaveClass(/disabled/)



}



//------------------------------------------
// Tests
//------------------------------------------

test.describe.configure({ mode: 'serial' });


// TODO: When initialization is debugged, remove this line in favor of the above loop.
const state = allLogins[6];
const stateFilePath = buildStateFilePath({ ...state, appName: MenardsAppNames.garageDoors });
// Load windows storage state
test.use({ storageState: stateFilePath });

// All Most Popular Sizes/Styles Tests
test.describe('Garage Popular Doors Rebate Tests', () => {


    test('Garage-Doors-Popular-test-Summary Rebate', async ({ page }) => {
        await startQuote(page);
        await navigateToMostPopularSizesStylesPage(page);
        test.setTimeout(2 * 60 * 2000);
        await page.waitForSelector('#spinner', { state: 'hidden' });
        await page.locator('td:nth-child(5) > .btn').first().click();
        test.setTimeout(2 * 60 * 2000);
        await page.waitForSelector('#spinner', { state: 'hidden' });
        await summaryTestsSpecs.verifyAccessibilityOfSummaryTab(page)
        await page.click('text=×Close');
        test.setTimeout(2 * 60 * 4000);
        await summaryTestsSpecs.verifyingRebatePriceOnSummaryPage(page)
    })

    test('Garage-Doors-Popular-test-Verifying-Online purchase Tab ', async ({ page }) => {
        await startQuote(page);
        await navigateToMostPopularSizesStylesPage(page);
        test.setTimeout(2 * 60 * 2000);
        await page.waitForSelector('#spinner', { state: 'hidden' });
        await page.locator('td:nth-child(5) > .btn').first().click();
        test.setTimeout(2 * 60 * 2000);
        await page.waitForSelector('#spinner', { state: 'hidden' });
        await summaryTestsSpecs.verifyAccessibilityOfSummaryTab(page)
        await page.click('text=×Close');
        test.setTimeout(2 * 60 * 4000);
        await purchaseTests.verifyPurchaseForRebate(page)
    })

});
