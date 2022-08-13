
import { test, expect } from '@playwright/test';
import { allLogins, buildStateFilePath, MenardsAppNames } from '../../utils/menards/test-init-constants';
import * as purchaseTests from '../purchase/purchase'

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


//------------------------------------------
// Tests
//------------------------------------------


const state = allLogins[7];
const stateFilePath = buildStateFilePath({ ...state, appName: MenardsAppNames.windows });
// Load windows storage state
test.use({ storageState: stateFilePath });


test.describe.configure({ mode: 'serial' });

test.describe('Windows Standard Parts Rebate tests ', () => {


    test('Windows-standard-test-Verifying Online purchase Tab for Rebate', async ({ page }) => {
        await startQuote(page);
        await navigateToStandardPartsPage(page);
        await page.locator('.question-answer-image-image > .img-responsive').first().click(); test.setTimeout(2 * 60 * 1000);
        await page.waitForTimeout(2000)
        await page.waitForSelector('#spinner', { state: 'hidden' });
        await purchaseTests.verifyPurchaseForRebate(page)
    })

})
