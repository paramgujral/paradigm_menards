import { test, expect } from "@playwright/test";
//Access to Purchase Tab
//The user should not be allowed to get to the purchase screen

export async function verifyInaccessibilityOfPurchaseTab(page) {
    await page.waitForTimeout(2000)
    await page.waitForSelector('button:has-text("Purchase")', { state: 'visible' }, { timeout: 10000 });
    await page.locator('button:has-text("Purchase")').click();
    let popup = await page.locator('text=You must configure one line item before continuing.');
    await expect.soft(popup).toBeVisible()
    await page.locator('text=OK').click();
}
export async function purchaseTabHighlightProperty(page) {
    let purchaseTab = page.locator('.menards-purchase');
    await expect.soft(purchaseTab).toHaveClass(/active/)
}

export async function clickOnPurchaseButton(page) {
    await page.waitForTimeout(2000)
    await page.waitForSelector('#line-items-app >> text=Purchase', { state: 'visible' }, { timeout: 10000 });
    await page.locator('#line-items-app >> text=Purchase').click();
    await page.waitForTimeout(2000)
    await purchaseTabHighlightProperty(page)
    let estimatedPriceText = await page.locator('text=Estimated Price').first();
    await expect.soft(estimatedPriceText).toBeVisible()
}

// Click on the Purchase button on the summary screen of a design or click on Purchase tab at the top 	

export async function verifyPurchaseForRebate(page) {
    //Purchase screen should open without error

    await page.waitForTimeout(2000)
    let designId = (".col-md-6 > .design-info > div > .col-xs-7 >> nth=0");
    let designIdValue = await page.locator(designId).innerText();
    console.log(designIdValue)

    let estimatedPrice = ("td[class='lead'] strong");
    let estimatedPriceValue = await page.locator(estimatedPrice).innerText();
    console.log(estimatedPriceValue)
    await page.waitForSelector('#purchase-link', { state: 'visible' }, { timeout: 10000 });
    await page.locator('#purchase-link').click();
    //It should display Design ID, Estimated price correctly
    let estimatedPriceText = await page.locator('text=Estimated Price').first();
    await expect.soft(estimatedPriceText).toBeVisible()
    await page.waitForSelector(`text=Design ID: ${designIdValue}`, { state: 'visible' }, { timeout: 10000 });
    await page.waitForSelector(`td:has-text("${estimatedPriceValue}")`, { state: 'visible' }, { timeout: 10000 });

    // If the store has Rebate setup, it should display the Rebate amount (11% Main-In Rebate) as 11% of the estimated price
    let rebateText = await page.locator('text=11% Mail-In Rebate');
    await expect.soft(rebateText).toBeVisible()
    await page.waitForTimeout(2000)

    let rebatePrice = ('td.text-danger >> nth=0')
    let rebatePriceValue = await page.locator(rebatePrice).innerText();
    console.log(rebatePriceValue)

    let finalPrice = ('td.text-danger >> nth=1')
    let finalPriceValue = estimatedPriceValue.replace("$", '').replaceAll(",", "") - rebatePriceValue.replace("$", '').replaceAll(",", "")
    console.log(finalPriceValue)
    let finalPriceText = await page.locator(finalPrice).innerText()
    console.log(finalPriceText)
    await expect.soft(finalPriceText.replace(",", "")).toEqual(`$${finalPriceValue.toFixed(2)}`);
    await page.locator('i[role="button"]').click();

    let popupofRebatePrice = await page.locator('text=1 Pick up your rebate redemption certificate at the service desk or print it onl');
    await expect.soft(popupofRebatePrice).toBeVisible()
    await page.locator('text=× 1 Pick up your rebate redemption certificate at the service desk or print it o >> [aria-label="Close"]').click();


}

export async function verifyPurchase(page) {
    await page.waitForTimeout(2000)
    let designId = (".col-md-6 > .design-info > div > .col-xs-7 >> nth=0");
    let designIdValue = await page.locator(designId).innerText();
    console.log('designIdValue: ', designIdValue)

    let estimatedPrice = ("td[class='lead'] strong");
    let estimatedPriceValue = await page.locator(estimatedPrice).innerText();
    console.log('estimatedPriceValue: ', estimatedPriceValue)
    await page.waitForSelector('#purchase-link', { state: 'visible' }, { timeout: 10000 });
    await page.locator('#purchase-link').click();
    //It should display Design ID, Estimated price correctly
    let estimatedPriceText = await page.locator('text=Estimated Price').first();
    await expect.soft(estimatedPriceText).toBeVisible()
    await page.waitForSelector(`text=Design ID: ${designIdValue}`, { state: 'visible' }, { timeout: 10000 });
    await page.waitForSelector(`td:has-text("${estimatedPriceValue}")`, { state: 'visible' }, { timeout: 10000 });
    
    }

export async function verifyPrintPurchaseDocsDisclamier(page) {
    let printPurchaseDocBtn = await page.locator('text = Print Purchasing Docs');
    await expect.soft(printPurchaseDocBtn).toBeVisible()
    let disclamier = await page.locator('text=*Selecting this option will generate and print a Special Order Contract for your')
    await expect.soft(disclamier).toBeVisible()
    await expect.soft(disclamier).toHaveText('*Selecting this option will generate and print a Special Order Contract for your order which can be taken to the register for purchase.')
}


export async function verifyAddToCartDisclamier(page) {
    await page.waitForSelector('text=Add To Cart', { timeout: 10000 });
    //  await page.locator('text=Add To Cart').click();

    let addToCardDisclamer = page.locator('text=*Selecting this option will place the items in your quote into in the Menards.co')
    //Before clicking the right arrow by default page number should be 1
    await expect.soft(addToCardDisclamer).toHaveText('*Selecting this option will place the items in your quote into in the Menards.com shopping cart. After completing your purchase, store invoices and special order contracts will be generated, if required. Print out all items for your reference. You will receive email updates on the status of any special orders as they ship and arrive at the store. Professional delivery is available and can be arranged by the Delivery Coordinator at your local Menards store or through Menards.com shopping cart. Delivery is extra and is calculated based on the order size.')
}

//If the store has Rebate setup, it should display the Rebate amount (11% Main-In Rebate) as 11% of the estimated price
