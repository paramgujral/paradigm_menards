
import { test, expect } from '@playwright/test';
import { allLogins, buildStateFilePath, MenardsAppNames } from '../../utils/menards/test-init-constants';
import * as summaryTestsSpecs from '../summary/summary'
import * as purchaseTests from '../purchase/purchase'
import * as globalChange from '../global-change/globalchange'


async function verifyConfiguratorUrlForWindows(page) {
    return await expect(page).toHaveURL(/\/quotes\/.*\/configure\/product-select\/MenardsWindows$/);
}

// Used to start a new quote and launch the configurator
async function startQuote(page) {
    // navigate to the starting point with a new quote
    await page.goto('/home');
    await page.click('text=Start Designing');
    
}


async function navigateToStandardPartsPage(page) {
    await page.locator('text=Standard Window PartsSelectChoose from snap on accessories, locks, hardware and  >> a').click();
    await expect(page).toHaveURL(/\/quotes\/.*\/configure\/product-select\/NEWMenardsParts$/);
}

async function availabilityOfAllParts(page) {
    await page.waitForSelector('.question-answer-image-image > .img-responsive', { timeout: 10000 })
    let parts = await page.$$('.question-answer-image-image > .img-responsive')
    let count = parts.length;
    expect(parts).toHaveLength(25);

}
async function pagination(page) {
    let activePage = page.locator('ul.pagination li.active')
    //Before clicking the right arrow by default page number should be 1
    await expect.soft(activePage).toHaveText(/1/)
    await page.locator('.next > a').click();
    //after clicking the right arrow it should go to next page that is 2
    await expect.soft(activePage).toHaveText(/2/)

    await page.locator('.previous > a').click();
    //click on left arrow it should go to previous page that is 1
    await expect.soft(activePage).toHaveText(/1/)


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
async function checkingFilterOnLeftSideWithCheckBoxes(page) {
    let firstPart = page.locator('text=/.*750299Crestline Select 500 1" Z-Flange White 174".*/')
    await page.locator('label:has-text("Crestline")').click();
    await page.waitForSelector('.question-answer-image-image > .img-responsive', { timeout: 10000 })
    await expect.soft(firstPart).toHaveText(/Crestline/)

}

async function addInResult(page, message, value) {
    try {
        await test.step(message + " " + value, async () => {
        });
    } catch (error) {
        console.log(error.message);
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

async function verifyPartsInList(page) {

    let parts = await page.$$('//div[@class="product-select-tiles"]/div');

    for (let i = 1; i <= parts.length; i++) {

        let partNo = `(//div[@class="product-select-tiles"]/div//h4)[${i}]`
        let partName = `(//div[@class="product-select-tiles"]/div//p)[${i}]`

        let numberOfpart = await page.locator(partNo).innerText();
        let nameOfPart = await page.locator(partName).innerText();

        let value = numberOfpart + " " + nameOfPart;
        await addInResult(page, "Part number are description are: ", value)

        await verifyLengthGreaterThan(numberOfpart.length, 4, 'SKU Number');
        await verifyLengthGreaterThan(nameOfPart.length, 10, 'SKU Description');
    }
}

//------------------------------------------
// Tests
//------------------------------------------


const state = allLogins[3];
const stateFilePath = buildStateFilePath({ ...state, appName: MenardsAppNames.windows });
// Load windows storage state
test.use({ storageState: stateFilePath });


test.describe.configure({ mode: 'serial' });

// All Standard Parts tests
test.describe('Windows Standard Parts tests', () => {

    test('"Start Designing" takes this user to Standard Parts ', async ({ page }) => {
        // navigate to the starting point with a new quote
        await startQuote(page); // Contains URL verification/assertion, no assertion needed here.

        await navigateToStandardPartsPage(page);
    });

    test('Windows-Standard-test-Verifying the Current Tab', async ({ page }) => {
        // navigate to the starting point with a new quote
        await startQuote(page); // Contains URL verification/assertion, no assertion needed here.
        await navigateToStandardPartsPage(page);
        let designTab = page.locator('.menards-design');
        await expect.soft(designTab).toHaveClass(/active/)
    });

    //All the available Parts should be listed by default
    test('Windows-Standard-test-Availability Parts should be listed by default', async ({ page }) => {
        // navigate to the starting point with a new quote
        await startQuote(page); // Contains URL verification/assertion, no assertion needed here.
        await navigateToStandardPartsPage(page);
        await availabilityOfAllParts(page)

    });

    test('Windows-Standard-test-Pagination ', async ({ page }) => {
        // navigate to the starting point with a new quote
        await startQuote(page); // Contains URL verification/assertion, no assertion needed here.
        await navigateToStandardPartsPage(page);
        await pagination(page)
    });

    test('Windows-Standard-test-Checking left side Filter with checkboxes ', async ({ page }) => {
        // navigate to the starting point with a new quote
        await startQuote(page); // Contains URL verification/assertion, no assertion needed here.
        await navigateToStandardPartsPage(page);
        await checkingFilterOnLeftSideWithCheckBoxes(page)
    });


    test('Windows-Standard-test-Search by Part Number ', async ({ page }) => {
        // navigate to the starting point with a new quote
        await startQuote(page); // Contains URL verification/assertion, no assertion needed here.
        await navigateToStandardPartsPage(page);
        await page.locator('[placeholder="Search"]').click();
        await page.locator('[placeholder="Search"]').fill('08988');
        await page.locator('[placeholder="Search"]').press('Enter');
        await page.waitForSelector('.question-answer-image-image > .img-responsive', { timeout: 10000 })
        let filteredPart = page.locator('text=/.*08988Sill drain mat 4" - 100ft roll.*/')
        await expect.soft(filteredPart).toHaveText(/08988/)

    });

    //If no part is found, nothing will return as a result
    test('Windows-Standard-test-Search by Invalide Part Number ', async ({ page }) => {
        // navigate to the starting point with a new quote
        await startQuote(page); // Contains URL verification/assertion, no assertion needed here.
        await navigateToStandardPartsPage(page);
        await page.locator('[placeholder="Search"]').click();
        await page.locator('[placeholder="Search"]').fill('08988289');
        await page.locator('[placeholder="Search"]').press('Enter');
        await page.waitForSelector('text=No products found', { timeout: 10000 })
        let noProductsFoundText = page.locator('text=No products found')
        await expect.soft(noProductsFoundText).toBeVisible()
    });

    test('Windows-Standard-test-Search by Part Description ', async ({ page }) => {
        // navigate to the starting point with a new quote
        await startQuote(page); // Contains URL verification/assertion, no assertion needed here.
        await navigateToStandardPartsPage(page);
        await page.locator('[placeholder="Search"]').click();
        await page.locator('[placeholder="Search"]').fill('Sill drain mat 4"');
        await page.locator('[placeholder="Search"]').press('Enter');
        await page.waitForSelector('.question-answer-image-image > .img-responsive', { timeout: 10000 })
        let filteredPart = page.locator('text=/.*08988Sill drain mat 4" - 100ft roll.*/')
        await expect.soft(filteredPart).toHaveText(/Sill drain mat 4"/)

    });

    //If no part is found, nothing will return as a result
    //Search with numbers, alphabets, space, special characters or long strings	
    test('Windows-Standard-test-Search by Invalide Part Description ', async ({ page }) => {
        // navigate to the starting point with a new quote
        await startQuote(page); // Contains URL verification/assertion, no assertion needed here.
        await navigateToStandardPartsPage(page);
        await page.locator('[placeholder="Search"]').click();
        await page.locator('[placeholder="Search"]').fill('Sill drain mat 4i @ # ');
        await page.locator('[placeholder="Search"]').press('Enter');
        await page.waitForSelector('text=No products found', { timeout: 10000 })
        let noProductsFoundText = page.locator('text=No products found')
        await expect.soft(noProductsFoundText).toBeVisible()
    });

    //Search SKU without entering SKU # or Description	:All the parts should display in the result list
    test('Windows-Standard-test-Search without entering anything', async ({ page }) => {
        // navigate to the starting point with a new quote
        await startQuote(page); // Contains URL verification/assertion, no assertion needed here.
        await navigateToStandardPartsPage(page);
        await page.locator('[placeholder="Search"]').click();
        await page.locator('[placeholder="Search"]').press('Enter');
        await verifyPartsInList(page)
        await availabilityOfAllParts(page)

    });

    //It should display Part #, Description, and Quantity for the available SKU items
    test('Windows-Standard-test-Verify availability of part # description ', async ({ page }) => {
        // navigate to the starting point with a new quote
        await startQuote(page); // Contains URL verification/assertion, no assertion needed here.
        await navigateToStandardPartsPage(page);
        await verifyPartsInList(page)
    });

    //If there's only one page of series, the left and right arrows should not work
    test('Windows-Standard-test-Pagination with only one page ', async ({ page }) => {
        // navigate to the starting point with a new quote
        await startQuote(page); // Contains URL verification/assertion, no assertion needed here.
        await navigateToStandardPartsPage(page);
        await page.locator('[placeholder="Search"]').click();
        await page.locator('[placeholder="Search"]').fill('08988');
        await page.locator('[placeholder="Search"]').press('Enter');
        await page.waitForSelector('.question-answer-image-image > .img-responsive', { timeout: 10000 })
        await paginationWithoOnePage(page)

    });

    // Use the filters on the left side to further filter the search results	
    test('Windows-Standard-test-Checking left side Filter with checkboxes  and then Search', async ({ page }) => {
        // navigate to the starting point with a new quote
        await startQuote(page); // Contains URL verification/assertion, no assertion needed here.
        await navigateToStandardPartsPage(page);
        await checkingFilterOnLeftSideWithCheckBoxes(page)

        await page.locator('[placeholder="Search"]').fill('750299');
        await page.locator('[placeholder="Search"]').press('Enter');
        await page.waitForTimeout(5000);
        await page.waitForSelector('.question-answer-image-image > .img-responsive', { timeout: 10000 })
        let parts = await page.$$('.question-answer-image-image > .img-responsive')
        console.log("$$$DDD", parts.length)
        for (let i = 0; i < parts.length; i++) {
            let partNo = page.locator(`text=750299 >> nth=${i}`)
            expect.soft(partNo).toHaveText(/750299/)
        }
    });

    //*Summary Screen 

    //The user should not be allowed to get to the Summary screen
    test('Windows-Standard-test-Verify Summary Click functionality without adding any item ', async ({ page }) => {
        await startQuote(page); // Contains URL verification/assertion, no assertion needed here.
        await summaryTestsSpecs.verifyInaccessibilityOfSummaryTab(page)
    });

    test('Windows-Standard-test-Check the line items in the design  ', async ({ page }) => {
        await startQuote(page);
        await navigateToStandardPartsPage(page);
        await page.locator('.question-answer-image-image > .img-responsive').first().click();
        test.setTimeout(2 * 60 * 1000);
        await page.waitForSelector('#spinner', { state: 'hidden' });
        await page.locator('text=Continue Shopping').click();
        await navigateToStandardPartsPage(page);
        await page.locator('.question-answer-image-image > .img-responsive').first().click();
        // await page.locator('text=Continue Shopping').click();
        await page.waitForSelector('#spinner', { state: 'hidden' });


        await summaryTestsSpecs.checkingLineItems(page)

    });

    test('Windows-Standard-test-Start a new design  add one standard Windows part to the design and Navigate To Summary tab ', async ({ page }) => {
        await startQuote(page);
        await navigateToStandardPartsPage(page);
        await page.locator('.question-answer-image-image > .img-responsive').first().click();
        test.setTimeout(2 * 60 * 1000);

        await page.waitForSelector('#spinner', { state: 'hidden' });

        let estimatedPrice = await page.locator('text=Estimated Price:');
        await expect.soft(estimatedPrice).toBeVisible()
        let summaryTab = page.locator('.menards-summary');
        await expect.soft(summaryTab).toHaveClass(/active/)
    });

    test('Windows-Standard-test-Open an Existing Design by searching design by designId    ', async ({ page }) => {
        await summaryTestsSpecs.navigationToSearchSavedDesigns(page);
        await page.waitForSelector('#spinner', { state: 'hidden' });

        await page.locator('[placeholder="Design ID"]').click();
        await page.locator('[placeholder="Design ID"]').fill('301156820222');
        await page.locator('input:has-text("Recall Design")').click();
        await summaryTestsSpecs.verifyLandingOnSummaryPage(page)
        let designIdText = await page.locator('text=301156820222 >> nth=1 ');
        await expect.soft(designIdText).toBeVisible()

    });

    test('Windows-Standard-test- Check Qty and Price', async ({ page }) => {
        await startQuote(page);
        await navigateToStandardPartsPage(page);
        await page.locator('.question-answer-image-image > .img-responsive').first().click();
        test.setTimeout(2 * 60 * 1000);
        await page.waitForSelector('#spinner', { state: 'hidden' });
        await page.locator('text=Continue Shopping').click();
        await navigateToStandardPartsPage(page);
        await page.locator('.question-answer-image-image > .img-responsive').first().click();
        await page.locator('text=Continue Shopping').click();
        await page.waitForSelector('#spinner', { state: 'hidden' });
        await summaryTestsSpecs.verifyAccessibilityOfSummaryTab(page)

    })

    // there is access to edit the quantity 
    // test('Windows-Standard-test-Edit/Copy/Delete the line item ', async ({ page }) => {
    //     await startQuote(page);
    //     await navigateToStandardPartsPage(page);
    //     await page.locator('.question-answer-image-image > .img-responsive').first().click();
    //     test.setTimeout(2 * 60 * 1000);
    //     await page.waitForSelector('#spinner', { state: 'hidden' });
    //     await summaryTestsSpecs.verifyAccessibilityOfSummaryTab(page)
    //     await summaryTestsSpecs.editCopyDeleteLineVerification(page)
    // });

    test('Windows-Standard-test-verify Print Design button', async ({ page }) => {
        await startQuote(page);
        await navigateToStandardPartsPage(page);
        await page.locator('.question-answer-image-image > .img-responsive').first().click(); test.setTimeout(2 * 60 * 1000);
        await page.waitForTimeout(2000)
        await page.waitForSelector('#spinner', { state: 'hidden' });
        await summaryTestsSpecs.printDesignBtn(page)

    })

    test('Windows-Standard-test-verify Copy Design button', async ({ page }) => {
        await startQuote(page);
        await navigateToStandardPartsPage(page);
        await page.locator('.question-answer-image-image > .img-responsive').first().click(); test.setTimeout(2 * 60 * 1000);
        await page.waitForTimeout(2000)
        await page.waitForSelector('#spinner', { state: 'hidden' });
        await summaryTestsSpecs.copyDesignBtn(page)
    })

    test('Windows-Standard-test-verify Restart Design button', async ({ page }) => {
        await startQuote(page);
        await navigateToStandardPartsPage(page);
        await page.locator('.question-answer-image-image > .img-responsive').first().click(); test.setTimeout(2 * 60 * 1000);
        await page.waitForTimeout(2000)
        await page.waitForSelector('#spinner', { state: 'hidden' });
        await summaryTestsSpecs.restartBtn(page)
        await navigateToStandardPartsPage(page)
        // await page.locator('text=×Close').click();
        //Restart button should be available on the configurator screen (window & door, part configurator, pre-configured unit)
        await summaryTestsSpecs.renameButtonVisibility(page)
        test.setTimeout(2 * 60 * 2000);
        await page.waitForSelector('#spinner', { state: 'hidden' });
        await page.locator('.question-answer-image-image > .img-responsive').first().click(); test.setTimeout(2 * 60 * 1000);
        // await page.click('text=×Close');
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
    test('"Access to Purchase Tab standard part	",The user should not be allowed to get to the purchase screen', async ({ page }) => {

        await startQuote(page);
        await page.waitForTimeout(2000)
        await page.waitForSelector('#spinner', { state: 'hidden' });
        await purchaseTests.verifyInaccessibilityOfPurchaseTab(page)
    })

    test('Windows-Standard-test-Verifying-Online purchase Tab', async ({ page }) => {
        await startQuote(page);
        await navigateToStandardPartsPage(page);
        await page.locator('.question-answer-image-image > .img-responsive').first().click(); test.setTimeout(2 * 60 * 1000);
        await page.waitForTimeout(2000)
        await page.waitForSelector('#spinner', { state: 'hidden' });
        await purchaseTests.verifyPurchase(page);
        await purchaseTests.verifyPrintPurchaseDocsDisclamier(page);
    })

    test('Windows-Standard-test-Start a new design, add one standard Windows part to the design and Navigate To purchase tab	', async ({ page }) => {
        await startQuote(page);
        await navigateToStandardPartsPage(page);
        await page.locator('.question-answer-image-image > .img-responsive').first().click();
        test.setTimeout(2 * 60 * 1000);
        await page.waitForSelector('#spinner', { state: 'hidden' });
        await page.locator('text=Continue Shopping').click();
        await navigateToStandardPartsPage(page);
        await page.locator('.question-answer-image-image > .img-responsive').first().click();
        // await page.locator('text=Continue Shopping').click();
        await page.waitForSelector('#spinner', { state: 'hidden' });
        //Click on Purchase tab at the top	
        await page.waitForSelector('#purchase-link', { timeout: 10000 });
        await page.locator('#purchase-link').click();
        //The purchase tab at the top should be highlighted
        await purchaseTests.purchaseTabHighlightProperty(page)

    })

    test('Windows-Standard-test-Open an existing design by Search Saved Designs and Navigate To purchase tab', async ({ page }) => {
        await summaryTestsSpecs.navigationToSearchSavedDesigns(page);
        await page.waitForSelector('#spinner', { state: 'hidden' });

        await page.locator('[placeholder="Design ID"]').click();
        await page.locator('[placeholder="Design ID"]').fill('301156820222');
        await page.locator('input:has-text("Recall Design")').click();
        await summaryTestsSpecs.verifyLandingOnSummaryPage(page)
        let designIdText = await page.locator('text=301156820222 >> nth=1 ');
        await expect.soft(designIdText).toBeVisible()
        //Click on Purchase tab at the top	
        await page.waitForSelector('#purchase-link', { timeout: 10000 });
        await page.locator('#purchase-link').click();
        //The purchase tab at the top should be highlighted
        await purchaseTests.purchaseTabHighlightProperty(page)
    });

    test('Windows-Standard-test-Check the disclaimer below the Add To Cart button', async ({ page }) => {
        await startQuote(page);
        await navigateToStandardPartsPage(page);
        await page.locator('.question-answer-image-image > .img-responsive').first().click(); test.setTimeout(2 * 60 * 1000);
        await page.waitForTimeout(2000)
        await page.waitForSelector('#spinner', { state: 'hidden' });
        //Click on Purchase tab at the top	
        await page.waitForSelector('#purchase-link', { timeout: 10000 });
        await page.locator('#purchase-link').click();
        //The purchase tab at the top should be highlighted
        await purchaseTests.purchaseTabHighlightProperty(page)
    });

   
});
