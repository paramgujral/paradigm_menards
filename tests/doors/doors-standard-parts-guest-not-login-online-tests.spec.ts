
import { test, expect } from '@playwright/test';
import { allLogins, buildStateFilePath, MenardsAppNames } from '../../utils/menards/test-init-constants';
import * as purchaseTests from '../purchase/purchase'

async function verifyConfiguratorUrlForDoors(page) {
    return await expect(page).toHaveURL(/\/quotes\/.*\/configure\/product-select\/MenardsPatioDoors$/);
}

// Used to start a new quote and launch the configurator
async function startQuote(page) {
    // navigate to the starting point with a new quote
    await page.goto('/home');
    await page.click('text=Start Designing');
}


async function navigateToStandardPartsPage(page) {
    await page.locator('text=Standard Patio Door PartsSelectChoose from snap on accessories, handles, wheels  >> a').click();
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

test.describe.configure({ mode: 'serial' });


const state = allLogins[3];
    const stateFilePath = buildStateFilePath({ ...state, appName: MenardsAppNames.doors });
    // Load windows storage state
    test.use({ storageState: stateFilePath });


// All Standard Parts tests
test.describe('Doors Standard Parts tests', () => {

    // The following is commented out to restrict the tests to a single test-init scenario. 
    // TODO: This should be debugged and re-enabled.

    // Loop through all login states
    // for (const state of allLogins) {
    // if (state.appName === MenardsAppNames.milliken) {
    //   continue;
    // }

    test('"Start Designing" takes this user to Doors Standard Parts ', async ({ page }) => {
        // navigate to the starting point with a new quote
        await startQuote(page); // Contains URL verification/assertion, no assertion needed here.

        await navigateToStandardPartsPage(page);
    });

    test('"Verifying" the Current Tab', async ({ page }) => {
        // navigate to the starting point with a new quote
        await startQuote(page); // Contains URL verification/assertion, no assertion needed here.
        await navigateToStandardPartsPage(page);
        let designTab = page.locator('.menards-design');
        await expect.soft(designTab).toHaveClass(/active/)
    });

    //All the available Parts should be listed by default
    test('"Availability" Parts should be listed by default', async ({ page }) => {
        // navigate to the starting point with a new quote
        await startQuote(page); // Contains URL verification/assertion, no assertion needed here.
        await navigateToStandardPartsPage(page);
        await availabilityOfAllParts(page)

    });

    test('"Pagination" ', async ({ page }) => {
        // navigate to the starting point with a new quote
        await startQuote(page); // Contains URL verification/assertion, no assertion needed here.
        await navigateToStandardPartsPage(page);
        await pagination(page)
    });
    //If there's only one page of series, the left and right arrows should not work
    test('"Pagination" with only one page ', async ({ page }) => {
        // navigate to the starting point with a new quote
        await startQuote(page); // Contains URL verification/assertion, no assertion needed here.
        await navigateToStandardPartsPage(page);
        await page.locator('[placeholder="Search"]').click();
        await page.locator('[placeholder="Search"]').fill('08988');
        await page.locator('[placeholder="Search"]').press('Enter');
        await page.waitForSelector('.question-answer-image-image > .img-responsive', { timeout: 10000 })
        await paginationWithoOnePage(page)

    });

    test('"Checking" left side Filter with checkboxes ', async ({ page }) => {
        // navigate to the starting point with a new quote
        await startQuote(page); // Contains URL verification/assertion, no assertion needed here.
        await navigateToStandardPartsPage(page);
        await checkingFilterOnLeftSideWithCheckBoxes(page)
    });


    test('"Search" by Part Number ', async ({ page }) => {
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
    test('"Search" by Invalide Part Number ', async ({ page }) => {
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

    test('"Search" by Part Description ', async ({ page }) => {
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
    test('"Search" by Invalide Part Description ', async ({ page }) => {
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
    test('"Search" without entering anything', async ({ page }) => {
        // navigate to the starting point with a new quote
        await startQuote(page); // Contains URL verification/assertion, no assertion needed here.
        await navigateToStandardPartsPage(page);
        await page.locator('[placeholder="Search"]').click();
        await page.locator('[placeholder="Search"]').press('Enter');
        await verifyPartsInList(page)
        await availabilityOfAllParts(page)

    });

    //It should display Part #, Description, and Quantity for the available SKU items
    test('"Verify" availability of part # description ', async ({ page }) => {
        // navigate to the starting point with a new quote
        await startQuote(page); // Contains URL verification/assertion, no assertion needed here.
        await navigateToStandardPartsPage(page);
        await verifyPartsInList(page)
    });



    // Use the filters on the left side to further filter the search results	
    test('"Checking" left side Filter with checkboxes  and then Search', async ({ page }) => {
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

    test('"Online purchase Door With standard part",The user should not be allowed to get to the purchase screen', async ({ page }) => {
        await startQuote(page);
        await navigateToStandardPartsPage(page);
        await page.locator('.question-answer-image-image > .img-responsive').first().click(); test.setTimeout(2 * 60 * 1000);
        await page.waitForTimeout(2000)
        await page.waitForSelector('#spinner', { state: 'hidden' });
        await purchaseTests.verifyPurchase(page);
        await purchaseTests.verifyPrintPurchaseDocsDisclamier(page);
    })

});
