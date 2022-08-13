
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


const state = allLogins[7];
    const stateFilePath = buildStateFilePath({ ...state, appName: MenardsAppNames.doors });
    // Load windows storage state
    test.use({ storageState: stateFilePath });


// All Standard Parts tests
test.describe('Doors Standard Parts tests', () => {

    test('"Online purchase Door With standard part",The user should not be allowed to get to the purchase screen', async ({ page }) => {
        await startQuote(page);
        await navigateToStandardPartsPage(page);
        await page.locator('.question-answer-image-image > .img-responsive').first().click(); test.setTimeout(2 * 60 * 1000);
        await page.waitForTimeout(2000)
        await page.waitForSelector('#spinner', { state: 'hidden' });
        await purchaseTests.verifyPurchaseForRebate(page)
    })

});
