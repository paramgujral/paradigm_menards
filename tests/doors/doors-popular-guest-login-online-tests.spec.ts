
import { test, expect } from '@playwright/test';
import { allLogins, buildStateFilePath, MenardsAppNames } from '../../utils/menards/test-init-constants';
import * as summaryTestsSpecs from '../summary/summary'
import * as purchaseTests from '../purchase/purchase'
import * as globalChange from '../global-change/globalchange'


let recordSKUAdd = 'td:nth-child(5) > .btn'

async function verifyConfiguratorUrlForDoors(page) {
    return await expect(page).toHaveURL(/\/quotes\/.*\/configure\/product-select\/MenardsPatioDoors$/);
}

// Used to start a new quote and launch the configurator
async function startQuote(page) {
    // navigate to the starting point with a new quote
    await page.goto('/home');
    await page.click('text=Start Designing');
}


async function navigateToMostPopularSizesStylesPage(page) {
    await page.locator('text=Most Popular Sizes/StylesSelectThe most common styles ready to order —- simply e >> a').click();
    await expect(page).toHaveURL(/\/quotes\/.*\/sku-search$/);
}



async function availabilityOfSkuItems(page) {
    await page.waitForSelector('table.sku-grid', { timeout: 10000 })
    await page.waitForSelector('//table/tbody/tr', { timeout: 10000 })
    let table = await page.$$('//table/tbody/tr')
    let count = table.length;
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
    await page.locator('input[placeholder="SKU Number"]').fill('4211970');
    await page.locator('text=Search SKUs').click();
    let skuNumber = page.locator('table tbody tr td >> nth=0')
    await expect.soft(skuNumber).toHaveText(/4211970/)

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
    await page.locator('input[placeholder="SKU Description"]').fill('W x 80" ');
    await page.locator('text=Search SKUs').click();
    let skuDescription = page.locator('table tbody tr td >> nth=1')
    await expect.soft(skuDescription).toHaveText(/W x 80" /)
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
    //Before clicking the right arrow by default page number should be 1
    await expect.soft(activePage).toHaveText(/1/)
    await page.locator('.next > a').click();
    await expect.soft(nextBtn).toHaveClass(/disabled/)

    //after clicking the right arrow it should go to next page that is 2
    await expect.soft(activePage).toHaveText(/1/)

    await page.locator('.previous > a').click();
    await expect.soft(previousBtn).toHaveClass(/disabled/)

    //click on left arrow it should go to previous page that is 1
    await expect.soft(activePage).toHaveText(/1/)


}

//------------------------------------------
// Tests
//------------------------------------------

// TODO: When initialization is debugged, remove this line in favor of the above loop.
const state = allLogins[1];
const stateFilePath = buildStateFilePath({ ...state, appName: MenardsAppNames.doors });
// Load windows storage state
test.use({ storageState: stateFilePath });


test.describe.configure({ mode: 'serial' });

// All Most Popular Sizes/Styles Tests
test.describe('Doors Most Popular Sizes/Styles Tests', () => {


    test('"Start Designing" takes this user to Doors Most Popular Sizes/Styles ', async ({ page }) => {
        //await loginInWindows(page);
        // navigate to the starting point with a new quote
        await startQuote(page); // Contains URL verification/assertion, no assertion needed here.

        await navigateToMostPopularSizesStylesPage(page);
    });

    test('"Verifying" the Current Tab', async ({ page }) => {
        //await loginInWindows(page);
        // navigate to the starting point with a new quote
        await startQuote(page); // Contains URL verification/assertion, no assertion needed here.
        await navigateToMostPopularSizesStylesPage(page);
        let designTab = page.locator('.menards-design');
        await expect.soft(designTab).toHaveClass(/active/)
    });

    test('"Availability" of the SKU items', async ({ page }) => {
        //await loginInWindows(page);
        // navigate to the starting point with a new quote
        await startQuote(page); // Contains URL verification/assertion, no assertion needed here.

        await navigateToMostPopularSizesStylesPage(page);

        await availabilityOfSkuItems(page)
    });

    //    test('"Pagination" ', async ({ page }) => {

    //     //await loginInWindows(page);
    //     // navigate to the starting point with a new quote
    //     await startQuote(page); // Contains URL verification/assertion, no assertion needed here.

    //     await navigateToMostPopularSizesStylesPage(page);

    //     await pagination(page)
    // });

    //If there's only one page of series, the left and right arrows should not work
    test('"Pagination" with only one page ', async ({ page }) => {
        // navigate to the starting point with a new quote
        await startQuote(page); // Contains URL verification/assertion, no assertion needed here.
        await navigateToMostPopularSizesStylesPage(page);
        await page.waitForSelector('input[placeholder="SKU Number"]', { timeout: 10000 })
        await page.locator('input[placeholder="SKU Number"]').click();
        await page.locator('input[placeholder="SKU Number"]').fill('4211970');
        await page.locator('input[placeholder="SKU Number"]').press('Enter');
        await paginationWithoOnePage(page)

    });
    test('"SKU Number Search" ', async ({ page }) => {
        //await loginInWindows(page);
        // navigate to the starting point with a new quote
        await startQuote(page); // Contains URL verification/assertion, no assertion needed here.
        await navigateToMostPopularSizesStylesPage(page);
        await SKUNumberSearch(page)
    });

    test('"SKU Number Search with no data " ', async ({ page }) => {
        //await loginInWindows(page);
        // navigate to the starting point with a new quote
        await startQuote(page); // Contains URL verification/assertion, no assertion needed here.

        await navigateToMostPopularSizesStylesPage(page);

        await SKUNumberSearchWithNoData(page)
    });

    test('"SKU Description Search " ', async ({ page }) => {
        //await loginInWindows(page);
        // navigate to the starting point with a new quote
        await startQuote(page); // Contains URL verification/assertion, no assertion needed here.

        await navigateToMostPopularSizesStylesPage(page);

        await SKUDescriptionSearch(page)
    });

    test('"SKU Description Search with no data " ', async ({ page }) => {
        //await loginInWindows(page);
        // navigate to the starting point with a new quote
        await startQuote(page); // Contains URL verification/assertion, no assertion needed here.

        await navigateToMostPopularSizesStylesPage(page);

        await SKUDescriptionSearchWithNoData(page)
    });

    //   Enter both SKU # and SKU Description and search	
    test('"Enter" Both SKU Number and SKU Description then Search', async ({ page }) => {
        //await loginInWindows(page);
        // navigate to the starting point with a new quote
        await startQuote(page); // Contains URL verification/assertion, no assertion needed here.

        await navigateToMostPopularSizesStylesPage(page);
        await page.locator('input[placeholder="SKU Number"]').fill('404020012');
        await page.locator('input[placeholder="SKU Description"]').fill('W x 80" ');
        let skuNumber = page.locator('table tbody tr td >> nth=0')
        await expect.soft(skuNumber).toHaveText(/4211970/)
        let skuDescription = page.locator('table tbody tr td >> nth=1')
        await expect.soft(skuDescription).toHaveText(/W x 80" /)
    });

    test('"SKU Search Without Entering Anything " ', async ({ page }) => {
        //await loginInWindows(page);
        // navigate to the starting point with a new quote
        await startQuote(page); // Contains URL verification/assertion, no assertion needed here.

        await navigateToMostPopularSizesStylesPage(page);

        await page.locator('text=Search SKUs').click();

        await verifySKUOnPage(page)
    });



    test('"Edit " Quanitity of a SKU Item', async ({ page }) => {
        //await loginInWindows(page);
        // navigate to the starting point with a new quote
        await startQuote(page); // Contains URL verification/assertion, no assertion needed here.
        await navigateToMostPopularSizesStylesPage(page);
        await editQuantityOfSkuItems(page)
    });

    //*Summary Screen 
    //The user should not be allowed to get to the Summary screen
    test('Door-popular-test Verify Summary Click functionality without adding any item ', async ({ page }) => {
        await startQuote(page); // Contains URL verification/assertion, no assertion needed here.
        await summaryTestsSpecs.verifyInaccessibilityOfSummaryTab(page)
    });


    test('Door-Popular Design",  click on rename Button   ', async ({ page }) => {
        await startQuote(page);
        await navigateToMostPopularSizesStylesPage(page);
        await page.locator(recordSKUAdd).first().click()
        test.setTimeout(2 * 60 * 1000);
        await page.waitForSelector('#spinner', { state: 'hidden' });

        await summaryTestsSpecs.verifyAccessibilityOfSummaryTab(page)
        await page.locator('input[name="TextValue"]').click();

        await page.locator('input[name="TextValue"]').fill('window');

        await page.locator('button:has-text("Save")').click();

        // click on the Rename button	
        await summaryTestsSpecs.clickOnRenameButton(page)

    });

    //Line number
    // Check the line items in the design	
    //Line items in the design should display with order numbers like 100, 200, 300…
    test('Door-Popular-test- Check the line items in the design	  ', async ({ page }) => {
        await startQuote(page);
        await navigateToMostPopularSizesStylesPage(page);
        test.setTimeout(2 * 60 * 2000);
        await page.waitForSelector('#spinner', { state: 'hidden' });
        await page.locator('td:nth-child(5) > .btn').first().click();
        test.setTimeout(2 * 60 * 2000);
        await page.waitForSelector('#spinner', { state: 'hidden' });
        await page.locator('tr:nth-child(2) > td:nth-child(5) > .btn').click();
        test.setTimeout(2 * 60 * 2000);
        await page.waitForSelector('#spinner', { state: 'hidden' });
        await summaryTestsSpecs.verifyAccessibilityOfSummaryTab(page)
        await summaryTestsSpecs.checkingLineItems(page)

    });

    test('Door-Popular-test-Verify the Room field on a line item		  ', async ({ page }) => {
        await startQuote(page);
        await navigateToMostPopularSizesStylesPage(page);
        test.setTimeout(2 * 60 * 2000);
        await page.waitForSelector('#spinner', { state: 'hidden' });
        await page.locator('td:nth-child(5) > .btn').first().click();
        test.setTimeout(2 * 60 * 2000);
        await page.waitForSelector('#spinner', { state: 'hidden' });
        await summaryTestsSpecs.verifyAccessibilityOfSummaryTab(page)
        test.setTimeout(2 * 60 * 4000);
        await summaryTestsSpecs.roomFiledVerification(page)
    });
    
    test('Door-Popular-test-The Room should be carried over from the configuration	  ', async ({ page }) => {
        await startQuote(page);
        await navigateToMostPopularSizesStylesPage(page);
        test.setTimeout(2 * 60 * 2000);
        await page.waitForSelector('#spinner', { state: 'hidden' });
        await page.locator('td:nth-child(5) > .btn').first().click();
        test.setTimeout(2 * 60 * 2000);
        await page.waitForSelector('#spinner', { state: 'hidden' });
        await summaryTestsSpecs.verifyAccessibilityOfSummaryTab(page)
        test.setTimeout(2 * 60 * 4000);
        await summaryTestsSpecs.verifyingCarriedOverNameofRoomForDoors(page)
    });


    test('Door-Popular-test- Check line description		  ', async ({ page }) => {
        await startQuote(page);
        await navigateToMostPopularSizesStylesPage(page);
        test.setTimeout(2 * 60 * 2000);
        await page.waitForSelector('#spinner', { state: 'hidden' });
        await page.locator('td:nth-child(5) > .btn').first().click();
        test.setTimeout(2 * 60 * 2000);
        await page.waitForSelector('#spinner', { state: 'hidden' });
        await summaryTestsSpecs.verifyAccessibilityOfSummaryTab(page)
        test.setTimeout(2 * 60 * 4000);
        await summaryTestsSpecs.lineDescriptionVerification(page)
    });

    test('Door-Popular-test- Check Qty and Price	', async ({ page }) => {
        await startQuote(page);
        await navigateToMostPopularSizesStylesPage(page);
        await summaryTestsSpecs.qtyPriceVerification(page)
    });

    test('Door-Popular-test-Edit/Copy/Delete the line item ', async ({ page }) => {
        await startQuote(page);
        await navigateToMostPopularSizesStylesPage(page);
        await page.waitForTimeout(2000)
        await page.waitForSelector('#spinner', { state: 'hidden' });
        await page.waitForSelector('//tbody/tr[1]/td[3]', { state: 'visible', timeout: 10000 });
        await page.locator('td:nth-child(5) > .btn').first().click();
        await page.waitForTimeout(2000)
        await page.waitForSelector('#spinner', { state: 'hidden' });
        await summaryTestsSpecs.verifyAccessibilityOfSummaryTab(page)
        await page.locator('input[name="TextValue"]').click();
        await page.locator('input[name="TextValue"]').fill('window');
        await page.locator('button:has-text("Save")').click();
        await summaryTestsSpecs.editCopyDeleteLineVerification(page)
    });


    test('Door-Popular-test-verify Print Design button', async ({ page }) => {
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
        await summaryTestsSpecs.printDesignBtn(page)

    })


    test('Door-Popular-test-verify Copy Design button', async ({ page }) => {
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
        await summaryTestsSpecs.copyDesignBtn(page)
    })

    test('Door-Popular-test-verify Restart Design button	', async ({ page }) => {
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
        await summaryTestsSpecs.restartBtn(page)
        await navigateToMostPopularSizesStylesPage(page)
        // await page.locator('text=×Close').click();
        //Restart button should be available on the configurator screen (window & door, part configurator, pre-configured unit)
        await summaryTestsSpecs.renameButtonVisibility(page)
        test.setTimeout(2 * 60 * 2000);
        await page.waitForSelector('#spinner', { state: 'hidden' });
        await page.locator('td:nth-child(5) > .btn').first().click(); test.setTimeout(2 * 60 * 1000);
        test.setTimeout(2 * 60 * 2000);
        await page.waitForSelector('#spinner', { state: 'hidden' });
        await summaryTestsSpecs.verifyAccessibilityOfSummaryTab(page)
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


    //purchase

    test('"Online purchase Doors With Popular Size/Style",The user should not be allowed to get to the purchase screen', async ({ page }) => {
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
        await purchaseTests.verifyPurchase(page)
        await purchaseTests.verifyPrintPurchaseDocsDisclamier(page);
    })

    //global change

    test('Doors-Popular-test-If there is only one garage door line in the design, global changes should not be triggered', async ({ page }) => {
        await startQuote(page);
        await navigateToMostPopularSizesStylesPage(page);
        test.setTimeout(2 * 60 * 2000);
        await page.waitForSelector('#spinner', { state: 'hidden' });
        await page.locator('td:nth-child(5) > .btn').first().click();
        test.setTimeout(2 * 60 * 2000);
        await page.waitForSelector('#spinner', { state: 'hidden' });
        await summaryTestsSpecs.verifyAccessibilityOfSummaryTab(page)
        await page.click('text=×Close');

        await page.locator('a:has-text("Edit")').click();
        // Click button:has-text("Design Options")
        await page.locator('button:has-text("Design Options")').click();
        // Click text=Almond
        await page.locator('text=Almond').first().click();
        await page.locator('button:has-text("Save Line")').first().click()
        await globalChange.verifyGlobalChangeNotTriggered(page)

    })

    test("Doors-Popular-test-If there're more than one garage door line from a same catalog, but the Q&A you edited is not checked off with Include in Global Changes in the Question template, global changes should not be triggered", async ({ page }) => {
        await startQuote(page);
        await navigateToMostPopularSizesStylesPage(page);
        test.setTimeout(2 * 60 * 2000);
        await page.waitForSelector('#spinner', { state: 'hidden' });
        await page.locator('td:nth-child(5) > .btn').first().click();
        test.setTimeout(2 * 60 * 2000);
        await page.waitForSelector('#spinner', { state: 'hidden' });
        await page.locator('tr:nth-child(2) > td:nth-child(5) > .btn').click();
        test.setTimeout(2 * 60 * 2000);
        await page.waitForSelector('#spinner', { state: 'hidden' });
        await summaryTestsSpecs.verifyAccessibilityOfSummaryTab(page)
        await page.waitForTimeout(2000)
        await page.waitForSelector('#spinner', { state: 'hidden' });
        await page.locator('text=Edit').first().click();
        await page.locator('button:has-text("Design Options")').click();
        await page.locator('text=Almond').first().click();
        await page.locator('button:has-text("Save Line")').first().click()
        await globalChange.verifyGlobalChangeIsTriggered(page)
        await page.locator('text=Skip All').click();
        await page.waitForTimeout(2000)
        await page.locator('text=Edit').first().click();
        await page.locator('button:has-text("Design Options")').click();
        let exteriorFinish = page.locator('.question-answers-wrapper >> nth=1 >> div.selected')
        await expect.soft(exteriorFinish).toHaveText(/Almond/)
        await page.locator('text=Cancel').click();
        await page.waitForTimeout(2000)
        await page.locator('text=Edit >> nth=1').click();
        await page.locator('button:has-text("Design Options")').click();
        await expect.soft(exteriorFinish).not.toHaveText(/Almond/)
        await page.locator('text=Cancel').click();
        await page.waitForTimeout(2000)

    })

    test("Doors-Popular-test-If there're more than one doors line from a same catalog, but the Q&A you edited is checked off with Include in Global Changes in the Question template, global changes should be triggered", async ({ page }) => {
        await startQuote(page);
        await navigateToMostPopularSizesStylesPage(page);
        test.setTimeout(2 * 60 * 2000);
        await page.waitForSelector('#spinner', { state: 'hidden' });
        await page.locator('td:nth-child(5) > .btn').first().click();
        test.setTimeout(2 * 60 * 2000);
        await page.waitForSelector('#spinner', { state: 'hidden' });
        await page.locator('tr:nth-child(2) > td:nth-child(5) > .btn').click();
        test.setTimeout(2 * 60 * 2000);
        await page.waitForSelector('#spinner', { state: 'hidden' });
        await summaryTestsSpecs.verifyAccessibilityOfSummaryTab(page)
        test.setTimeout(2 * 60 * 1000);
        await page.waitForTimeout(2000)
        await page.waitForSelector('#spinner', { state: 'hidden' });
        await page.locator('text=Edit').first().click();
        await page.locator('button:has-text("Design Options")').click();
        await page.locator('text=Almond').first().click();
        await page.locator('button:has-text("Save Line")').first().click()
        await globalChange.verifyGlobalChangeIsTriggered(page)
        await page.locator('text=Apply All').click();
        await page.locator('text=Apply Changes').click();
        await page.locator('text=More Specs >> nth=1').click();
        let newlyAddedItem = page.locator('div:nth-child(2) > .panel-body')
        await expect.soft(newlyAddedItem).toHaveText(/Exterior Finish = Almond/)

    })

    test("Doors-Popular-test-It should take the user to the global changes screen asking user if s/he wants to apply this change to other garage-doors on the design", async ({ page }) => {
        await startQuote(page);
        await navigateToMostPopularSizesStylesPage(page);
        test.setTimeout(2 * 60 * 2000);
        await page.waitForSelector('#spinner', { state: 'hidden' });
        await page.locator('td:nth-child(5) > .btn').first().click();
        test.setTimeout(2 * 60 * 2000);
        await page.waitForSelector('#spinner', { state: 'hidden' });
        await page.locator('tr:nth-child(2) > td:nth-child(5) > .btn').click();
        test.setTimeout(2 * 60 * 2000);
        await page.waitForSelector('#spinner', { state: 'hidden' });
        await summaryTestsSpecs.verifyAccessibilityOfSummaryTab(page)
        test.setTimeout(2 * 60 * 1000);
        await page.waitForTimeout(2000)
        await page.waitForSelector('#spinner', { state: 'hidden' });
        await page.locator('text=Edit').first().click();
        await page.locator('button:has-text("Design Options")').click();
        await page.locator('text=Almond').first().click();
        await page.locator('text=Keyed').click();
        await page.locator('button:has-text("Save Line")').first().click()
        await globalChange.verifyGlobalChangeIsTriggered(page)
        // It should list every change the user made on the questions that're included in global change checking
        // Each change should be a separate section that has the new value and applicable lines
        let newlyAddedItem1 = page.locator('div:nth-child(1) > .panel-body:has-text("Almond)")')
        let newlyAddedItem2 = page.locator('div:nth-child(2) > .panel-body:has-text("Keyed")')
        await expect.soft(newlyAddedItem1).toBeVisible()
        await expect.soft(newlyAddedItem2).toBeVisible()
        await page.waitForTimeout(2000)

        await page.locator('text=Apply All').first().click();
        await page.locator('text=Apply All >> nth=1').click();
        await page.locator('text=Apply Changes').click();
        await page.locator('text=More Specs >> nth=1').click();
        await expect.soft(newlyAddedItem2).toHaveText(/Exterior Finish = Almond/)


    })


    test("Doors-Popular-test-Apply Global Changes ", async ({ page }) => {
        await startQuote(page);
        await navigateToMostPopularSizesStylesPage(page);
        test.setTimeout(2 * 60 * 2000);
        await page.waitForSelector('#spinner', { state: 'hidden' });
        await page.locator('td:nth-child(5) > .btn').first().click();
        test.setTimeout(2 * 60 * 2000);
        await page.waitForSelector('#spinner', { state: 'hidden' });
        await page.locator('tr:nth-child(2) > td:nth-child(5) > .btn').click();
        test.setTimeout(2 * 60 * 2000);
        await page.waitForSelector('#spinner', { state: 'hidden' });
        await summaryTestsSpecs.verifyAccessibilityOfSummaryTab(page)
        test.setTimeout(2 * 60 * 1000);
        await page.waitForTimeout(2000)
        await page.waitForSelector('#spinner', { state: 'hidden' });
        await page.locator('text=Edit').first().click();
        await page.locator('button:has-text("Design Options")').click();
        await page.locator('text=Almond').first().click();
        await page.locator('text=Keyed').click();
        await page.locator('button:has-text("Save Line")').first().click()
        await globalChange.verifyGlobalChangeIsTriggered(page)

        // Check off lines with checkboxes	
        // The user should be able to check or uncheck a line item for one change or more changes
        await page.locator('input[type="checkbox"]').first().check();
        await page.locator('input[type="checkbox"]').first().uncheck();
        await page.waitForTimeout(2000)

        // It should list every change the user made on the questions that're included in global change checking
        // Each change should be a separate section that has the new value and applicable lines
        let newlyAddedItem1 = page.locator('div:nth-child(1) > .panel-body:has-text("Almond)")')
        let newlyAddedItem2 = page.locator('div:nth-child(2) > .panel-body:has-text("Keyed")')
        await expect.soft(newlyAddedItem1).toBeVisible()
        await expect.soft(newlyAddedItem2).toBeVisible()
        await page.waitForTimeout(2000)
        // Click on Apply All button for a change	
        await page.locator('text=Apply All').first().click();
        await page.locator('text=Apply All >> nth=1').click();
        await page.locator('text=Apply Changes').click();
        // await page.locator('text=More Specs >> nth=1').click();  
        // await expect.soft(newlyAddedItem2).toHaveText(/Exterior Finish = Almond/)
        await page.waitForTimeout(2000)
        await page.waitForSelector('#spinner', { state: 'hidden' });
        await page.locator('text=Edit').first().click();
        await page.locator('button:has-text("Design Options")').click();

        let exteriorFinish = page.locator('.question-answers-wrapper >> nth=1 >> div.selected')
        await expect.soft(exteriorFinish).toHaveText(/Almond/)
        let lockHardwareType = page.locator('.question-answers-wrapper >> nth=3>> div.selected')
        await expect.soft(lockHardwareType).toHaveText("Keyed")
        await page.locator('text=Cancel').click();
        await page.waitForTimeout(2000)

        await page.locator('text=Edit >> nth=1').click();
        await page.locator('button:has-text("Design Options")').click();
        await expect.soft(exteriorFinish).toHaveText(/Almond/)
        await expect.soft(lockHardwareType).toHaveText("Keyed")
        await page.locator('text=Cancel').click();
        await page.waitForTimeout(2000)


    })

});
