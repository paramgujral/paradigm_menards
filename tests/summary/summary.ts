import { test, expect } from "@playwright/test";



export async function verifyInaccessibilityOfSummaryTab(page) {
  await page.waitForSelector('button:has-text("Summary")', { state: 'visible' }, { timeout: 10000 });
  await page.locator('button:has-text("Summary")').click();
  let popup = await page.locator('text=You must configure one line item before continuing.');
  await expect.soft(popup).toBeVisible()

  await page.locator('text=OK').click();
}


export async function verifyAccessibilityOfSummaryTab(page) {
  await page.locator('a:has-text("Summary")').click();
  await page.waitForSelector('text=Estimated Price:', { timeout: 10000 })
  let estimatedPrice = await page.locator('text=Estimated Price:');
  await expect.soft(estimatedPrice).toBeVisible()

}



export async function verifyLandingOnSummaryPage(page) {

  let estimatedPrice = await page.locator('text=Estimated Price:');

  await expect.soft(estimatedPrice).toBeVisible()

  let summaryTab = page.locator('.menards-summary');
  await expect.soft(summaryTab).toHaveClass(/active/)

}

export async function navigateToPurchaseDesignPageFromSummary(page) {
  // Click #purchase-link
  await page.locator('#purchase-link').click();
  let printPurchaseDoc = await page.locator('text=Print Purchasing Docs');
  expect.soft(printPurchaseDoc).toBeVisible()

  await page.locator('a:has-text("Design")').click();
  await page.waitForSelector('text=Choose your Project Type', { timeout: 10000 })
  let chooseProductType = await page.locator('text=Choose your Project Type');
  expect.soft(chooseProductType).toBeVisible()
  await verifyAccessibilityOfSummaryTab(page)

}

async function verifyConfiguratorUrlForSearchSavedDesigns(page) {
  return await expect(page).toHaveURL(/\/quotes\/designs$/);
}
export async function navigationToSearchSavedDesigns(page) {

  // navigate to the starting point with a new quote
  await page.goto('/home');
  await page.click('text=Search Saved Designs');
  // await verifyConfiguratorUrlForSearchSavedDesigns(page);

}


export async function checkingInfoOnSummaryScreen(page) {
  let designIdText = await page.locator(' text=Design ID: >> nth=1');
  await expect.soft(designIdText).toBeVisible()
  let designNameText = await page.locator(' text=Design Name: >> nth=1');
  await expect.soft(designNameText).toBeVisible()
  let estimatedPrice = await page.locator('text=Estimated Price:');
  await expect.soft(estimatedPrice).toBeVisible()

}

export async function verifyDefaultDesignName(page) {
  let designNameText = await page.locator(' text=Design Name: >> nth=1');
  await expect.soft(designNameText).toBeVisible()
  let defaultDesignName = await page.locator(' text=Unassigned Quote Rename >> nth=1');
  await expect.soft(defaultDesignName).toBeVisible()

}

export async function renameButtonVisibility(page) {
  let renameButton = await page.locator('text=Rename >> nth=1');
  await expect.soft(renameButton).toBeVisible()


}


export async function clickOnRenameButton(page) {
  await page.locator('text=Rename >> nth=1').click();
  let renamebuttonPopup = await page.locator('form div:has-text("Design Name:")')
  await expect.soft(renamebuttonPopup).toBeVisible()

  //The design name should not be longer than 50 characters
  test.setTimeout(2 * 60 * 4000);
  let renameDesignNameInputBox = await page.locator("input[name='TextValue']")
  await expect(renameDesignNameInputBox).toHaveAttribute("maxlength", /50/)

  //The design name should allow numbers, alphabets, space and special characters
  await page.locator('input[name="TextValue"]').fill('Room Mat @ 2 ');

  //It should close the form and apply the new design name to the Summary screen
  await page.locator('text=Save').click();
  await page.locator('text=×Close').click();
  await page.reload();
  test.setTimeout(2 * 60 * 2000);
  let renamedDesignName = await page.locator("text=Room Mat @ 2 Rename >> nth=1")
  await expect.soft(renamedDesignName).toBeVisible()

  await page.locator('button.rename >> nth=1').click();
  await expect.soft(renamebuttonPopup).toBeVisible()
  await page.locator('text=×Close').click();
  await page.reload();
  test.setTimeout(2 * 60 * 2000);
  await expect.soft(renamedDesignName).toBeVisible()

}

export async function checkingLineItems(page) {
  let firstItemHeading = await page.locator('text=100 Edit Copy Delete');
  await expect.soft(firstItemHeading).toBeVisible()
  let secondItemHeading = await page.locator('text=200 Edit Copy Delete');
  await expect.soft(secondItemHeading).toBeVisible()
  // let thirdItemHeading = await page.locator('text=300 Edit Copy Delete');
  // await expect.soft(thirdItemHeading).toBeVisible()

  await page.waitForSelector('div.panel-body', { state: 'visible' }, { timeout: 10000 });
  let find_results = ('div.panel-body ')
  // # get the number of elements/tags
  let count = await page.locator(find_results).count()
  console.log("@#$#%%^", count)

  //Any newly added line should be the last line in the design by default
  // let lastItem = await page.locator(`div:nth-child(${count}) > .panel-body span:has-text("4040204") `);
  // await expect.soft(lastItem).toBeVisible()

  let upArrow = await page.locator("div:nth-child(1) >.panel-heading a[title='Move up']")
  await expect.soft(upArrow).toBeVisible()
  let downArrow = await page.locator("div:nth-child(1) >.panel-heading a[title='Move down']")
  await expect.soft(downArrow).toBeVisible()

  let firstItemUpArrow = await page.locator('div:nth-child(1) >.panel-heading a[title="Move up"]')
  await expect.soft(firstItemUpArrow).toHaveClass(/disabled/)
  let lastItemDownArrow = await page.locator(`div:nth-child(${count}) >.panel-heading a[title="Move down"]`)
  await expect.soft(lastItemDownArrow).toHaveClass(/disabled/)
  // Click a:nth-child(2) > .fa >> nth=0
  let firstItemId = ('div:nth-child(1) >.panel-body span:nth-child(1)')

  let firstItemSkuNumber = await page.locator(firstItemId)
  let secondItemId = ('div:nth-child(2) >.panel-body span:nth-child(1)')
  let secondSkuNumber = await page.locator(secondItemId)

  await page.locator('a:nth-child(2) > .fa').first().click();
  await page.waitForSelector('#spinner', { state: 'hidden' });
  // await page.locator('div:nth-child(1) >.panel-body span:nth-child(1)').toHaveText(secondSkuNumber)
  // await page.locator('div:nth-child(2) >.panel-body span:nth-child(1)').toHaveText(firstItemSkuNumber)

  // Click div:nth-child(2) > .panel-heading > .move-line-buttons > a > .fa >> nth=0
  await page.locator('div:nth-child(2) >.panel-heading a[title="Move up"]').click()
  // await page.locator('div:nth-child(1) >.panel-body span:nth-child(1)').toHaveText(firstItemSkuNumber)
  // await page.locator('div:nth-child(2) >.panel-body span:nth-child(1)').toHaveText(secondSkuNumber)


}

//Room
export async function roomFiledVerification(page) {

  //  await page.waitForSelector('#spinner', { state: 'hidden' });/
  test.setTimeout(2 * 60 * 2000);
  await page.waitForSelector('#spinner', { state: 'hidden' });
  await page.waitForSelector('.form-control >> nth=0', { state: 'visible', timeout: 10000 });
  let roomInput = await page.locator('.form-control >> nth=0')
  await expect(roomInput).toHaveAttribute("value", /None Assigned/)
  await page.locator('.form-control').first().click();
  await page.locator('.form-control').first().fill('first Room Line @ 1');
  await page.locator('.form-group > .col-xs-12').first().click();
  await page.waitForSelector('#spinner', { state: 'hidden' });
  await expect(roomInput).toHaveAttribute("value", /first Room Line @ 1/)

}

//The Room should be carried over from the configuration
export async function verifyingCarriedOverNameofRoom(page) {

  await page.locator('a:has-text("Edit")').click();
  await page.waitForTimeout(2000)
  await page.waitForSelector('#spinner', { state: 'hidden' });
  let designTab = page.locator('.menards-design');
  await expect.soft(designTab).toHaveClass(/active/)
  await page.locator('button:has-text("Window Accessories")').click();
  await page.locator('input[value="None Assigned"]').click();
  await page.locator('input[value="None Assigned"]').fill('Hall');
  await page.locator('text=Room Location').first().click();
  await page.waitForTimeout(2000)
  await page.locator('button:has-text("Save Line")').first().click()
  let roomInput = await page.locator('.form-control >> nth=0')
  await page.waitForSelector('#spinner', { state: 'hidden' });
  await expect(roomInput).toHaveAttribute("value", /Hall/)

}
export async function verifyingCarriedOverNameofRoomForDoors(page) {
  await page.locator('a:has-text("Edit")').click();
  await page.waitForTimeout(2000)
  await page.waitForSelector('#spinner', { state: 'hidden' });
  let designTab = page.locator('.menards-design');
  await expect.soft(designTab).toHaveClass(/active/)
  await page.locator('button:has-text("Patio Door Accessories")').click();
  await page.locator('text=Back Screen OptionsYesNo Screen Select Screen Mesh Type Help me chooseFiberglass >> input').nth(4).click();
  await page.locator('text=Back Screen OptionsYesNo Screen Select Screen Mesh Type Help me chooseFiberglass >> input').nth(4).fill('Hall');
  await page.locator('text=Room Location').first().click();
  await page.waitForTimeout(2000)
  await page.locator('button:has-text("Save Line")').first().click()
  let roomInput = await page.locator('.form-control >> nth=0')
  await page.waitForSelector('#spinner', { state: 'hidden' });
  await expect(roomInput).toHaveAttribute("value", /Hall/)

}

export async function lineDescriptionVerification(page) {
  await page.locator('input[name="TextValue"]').click();
  await page.locator('input[name="TextValue"]').fill('window');
  await page.locator('button:has-text("Save")').click();
  test.setTimeout(2 * 60 * 2000);
  await page.waitForSelector('#spinner', { state: 'hidden' });
  await page.waitForSelector('.form-group > .col-xs-12', { state: 'visible', timeout: 10000 });
  await page.waitForSelector('text=More Specs', { state: 'visible' });

  // Click text=More Specs
  await page.locator('text=More Specs').click();
  // Click text=Less Specs
  await page.waitForTimeout(4000)

  await page.waitForSelector('div.col-xs-12 span', { state: 'visible', timeout: 10000 });

  let countLinedescriptionExpanded = ("div.col-xs-12 span")
  let countofExpandedLines = await page.locator(countLinedescriptionExpanded).count()

  await expect(countofExpandedLines).toBeGreaterThan(10)
  await page.waitForSelector('text=Less Specs', { state: 'visible' });

  await page.locator('text=Less Specs').click();
  await page.waitForSelector('div.col-xs-12 span', { state: 'visible', timeout: 10000 });

  let countLinedescriptionLess = ("div.col-xs-12 span")
  let count = await page.locator(countLinedescriptionLess).count()
  await expect(count).toBeLessThan(10)

  await page.waitForSelector('text=More Specs', { state: 'visible' });

}


export async function qtyPriceVerification(page) {
  await page.waitForTimeout(2000)
  await page.waitForSelector('#spinner', { state: 'hidden' });
  await page.waitForSelector('//tbody/tr[1]/td[3]', { state: 'visible', timeout: 10000 });
  let qtyPrice = ("//tbody/tr[1]/td[3]")
  let priceValue = await page.locator(qtyPrice).innerText();
  console.log(priceValue)
  let quantity = await page.getAttribute("td:nth-child(4) > .form-control", "value")
  console.log("@@$$%$", quantity)
  await page.locator('td:nth-child(5) > .btn').first().click();
  await page.waitForTimeout(2000)
  await page.waitForSelector('#spinner', { state: 'hidden' });
  await verifyAccessibilityOfSummaryTab(page)
  await page.locator('input[name="TextValue"]').click();
  await page.locator('input[name="TextValue"]').fill('window');
  await page.locator('button:has-text("Save")').click();
  await page.waitForTimeout(2000)
  await page.waitForSelector('#spinner', { state: 'hidden' });
  await page.waitForSelector('label:has-text("Price")', { state: 'visible', timeout: 10000 });
  await page.waitForSelector(`span:has-text("${priceValue}")`, { state: 'visible', timeout: 10000 });
  let quantityInputBox = await page.locator('input[type="number"]')
  await expect(quantityInputBox).toHaveAttribute("value", quantity)
  await expect(quantityInputBox).toHaveAttribute("value", /1/)
  // Qty field should allow positive integers
  await page.locator('input[type="number"]').click();
  await page.locator('input[type="number"]').fill('2');
  await page.locator('.panel-body').click();
  await page.waitForSelector('#spinner', { state: 'hidden' }, { timeout: 5000 });
  await expect(quantityInputBox).toHaveAttribute("value", /2/)

  // Qty field should not allow negative numbers
  await page.locator('input[type="number"]').click();
  await page.locator('input[type="number"]').fill('-1');
  await page.locator('.panel-body').click();
  await page.waitForSelector('#spinner', { state: 'hidden' }, { timeout: 5000 });
  await page.waitForSelector('text=×Quantity must be a positive number.', { state: 'visible', timeout: 10000 });
  await page.locator('div[role="alert"] >> text=×').click();

  //Qty field should not allow decimals numbers
  await page.locator('input[type="number"]').click();
  await page.locator('input[type="number"]').fill('2.4');
  await page.locator('.panel-body').click();
  await page.waitForSelector('#spinner', { state: 'hidden' }, { timeout: 5000 });
  await page.waitForSelector('text=×Quantity must be a whole number.', { state: 'visible', timeout: 10000 });
  await page.locator('div[role="alert"] >> text=×').click();

  // Qty field should not allow 0
  await page.locator('input[type="number"]').click();
  await page.locator('input[type="number"]').fill('0');
  await page.locator('.panel-body').click();
  await page.waitForSelector('#spinner', { state: 'hidden' }, { timeout: 5000 });
  await page.waitForSelector('text=×Quantity must be a positive number.', { state: 'visible', timeout: 10000 });
  await page.locator('div[role="alert"] >> text=×').click();

  // Qty field should not allow alphabetic characters
  // Qty field should not allow special characters or space
  // await page.locator('input[type="number"]').click();
  // await page.locator('input[type="number"]').fill('SFK @ #');
  // await page.locator('.panel-body').click();
  // await expect(quantityInputBox).toHaveAttribute("value", /2/)

  // Qty field should not allow blank
  await page.locator('input[type="number"]').click();
  await page.locator('input[type="number"]').fill(' ');
  await page.locator('.panel-body').click();
  await page.waitForSelector('#spinner', { state: 'hidden' }, { timeout: 5000 });
  await page.waitForSelector('text=×Quantity must be a positive number.', { state: 'visible', timeout: 10000 });
  await page.locator('div[role="alert"] >> text=×').click();

  //User should be able to use the up/down arrow to update qty
  await page.locator('input[type="number"]').click();
  await expect(quantityInputBox).toHaveAttribute("value", /2/)
  await page.locator('input[type="number"]').press('ArrowUp');
  await page.locator('.panel-body').click();
  await page.waitForSelector('#spinner', { state: 'hidden' }, { timeout: 5000 });
  await expect(quantityInputBox).toHaveAttribute("value", /3/)

  await page.locator('input[type="number"]').click();
  await page.locator('input[type="number"]').fill('2');
  await page.locator('.panel-body').click();
  await page.waitForSelector('#spinner', { state: 'hidden' }, { timeout: 5000 });
  await expect(quantityInputBox).toHaveAttribute("value", /2/);

  //Price section on the design should be updated correctly as qty is changed on a line
  await page.locator('input[type="number"]').click();
  await page.locator('input[type="number"]').fill('1');
  await page.locator('.panel-body').click();
  await page.waitForSelector('#spinner', { state: 'hidden' }, { timeout: 5000 });
  let price1 = (".form-control-static")
  let price1Value = await page.locator(price1).innerText();
  console.log("$$$$", price1Value)

  await page.locator('input[type="number"]').click();
  await page.locator('input[type="number"]').fill('2');
  await page.locator('.panel-body').click();
  await page.waitForSelector('#spinner', { state: 'hidden' }, { timeout: 5000 });
  await page.waitForTimeout(2000)
  await page.waitForSelector('#spinner', { state: 'hidden' }, { timeout: 5000 });

  let currentQuantity = await page.getAttribute('input[type="number"]', "value")
  let estimatedPriceValue = currentQuantity * price1Value.replace("$", "")
  console.log(estimatedPriceValue)


  let estimatedPrice = ("td[class='lead'] strong");
  let estimatedPriceText = await page.locator(estimatedPrice).innerText();
  estimatedPriceText = estimatedPriceText.replaceAll(",", "")
  await expect.soft(estimatedPriceText).toEqual(`$${estimatedPriceValue}`);


}


export async function editCopyDeleteLineVerification(page) {


  await page.waitForTimeout(2000)
  await page.waitForSelector('#spinner', { state: 'hidden' }, { timeout: 10000 });

  //It should take the user back to the configurator without error
  await page.locator('a:has-text("Edit")').click();
  await page.waitForTimeout(2000)
  await page.waitForSelector('#spinner', { state: 'hidden' });
  let designTab = page.locator('.menards-design');
  await expect.soft(designTab).toHaveClass(/active/)

  // It should take the user back to the summary screen with the updated line
  await page.waitForSelector('input[type="number"]', { state: 'visible', timeout: 10000 });
  await page.locator('input[type="number"]').click();
  await page.locator('input[type="number"]').fill('2');
  await page.locator('text=Quantity').click();
  await page.waitForTimeout(2000)
  await page.locator('button:has-text("Save Line")').first().click()
  await verifyLandingOnSummaryPage(page)
  await page.waitForTimeout(4000)
  let quantityInputBox = await page.locator('input[type="number"]')
  await expect(quantityInputBox).toHaveAttribute("value", /2/)

  //It should take the user back to the summary screen without changes
  await page.locator('a:has-text("Edit")').click();
  await page.waitForTimeout(3000)
  test.setTimeout(2 * 60 * 4000);
  await page.waitForSelector('#spinner', { state: 'hidden' }, { timeout: 20000 });
  await expect.soft(designTab).toHaveClass(/active/)
  await page.waitForSelector('text=Cancel', { timeout: 10000 });
  await page.locator('text=Cancel').click();
  await verifyLandingOnSummaryPage(page)
  await page.waitForSelector('#spinner', { state: 'hidden' }, { timeout: 10000 });

  // await page.waitForTimeout(2000)

  //A new copy of the line should be created
  await page.waitForSelector('#line-items-app >> text=Copy', { timeout: 10000 });
  await page.locator('#line-items-app >> text=Copy').click();
  // await page.waitForTimeout(4000)
  test.setTimeout(2 * 60 * 4000);
  await page.waitForSelector('#spinner', { state: 'hidden' }, { timeout: 20000 });
  await page.waitForSelector('text=Your line item has been copied. The new line item is 200', { state: 'visible' }, { timeout: 10000 });
  //  await page.waitForTimeout(2000)
  await page.waitForSelector('#spinner', { state: 'hidden' }, { timeout: 10000 });
  await page.waitForSelector('div.panel-body', { state: 'visible' });
  const numberOfItems = await page.$$('div.panel-body');
  await expect(numberOfItems.length).toEqual(2);

  await page.waitForSelector('div.panel-body', { state: 'visible' });
  let find_results = ('div.panel-body ')
  // # get the number of elements/tags
  let count = await page.locator(find_results).count()
  console.log("Count: ", count)
  let lastItem = await page.locator(`div:nth-child(${count}) > .panel-body span:has-text("4040204") `);
  //.col-xs-12 span[style]:nth-child(1)
  // const deletebtn =await page.$("(//button[@title='Delete'])[2]")
  // Click text=Delete >> nth=1
  // await page.waitForTimeout(4000)

  await page.waitForSelector('text=Delete >> nth=1', { state: 'visible' }, { timeout: 10000 });

  await page.locator('text=Delete').nth(1).click();
  // await page.waitForTimeout(4000)
  // await page.waitForSelector('#spinner', { state: 'hidden' },{timeout:10000});

  // await page.once('dialog', async dialog => {
  //   console.log(`Dialog message: ${dialog.message()}`);
  //   await dialog.dismiss();

  // });
  page.on('dialog', async dialog => {
    console.log(dialog.message());
    await dialog.dismiss();
  });
  await page.evaluate(() => alert('1'));
  await page.waitForTimeout(4000)
  await page.locator('text=Delete').nth(1).click();


  // await deletebtn?.click();


}

// export async function addNewLineItemWindowWithNailingFlange(page) {
//   await page.waitForTimeout(2000)
//   await page.waitForSelector('#spinner', { state: 'hidden' });
//   await page.waitForSelector('//tbody/tr[1]/td[3]', { state: 'visible', timeout: 10000 });
//   await page.locator('td:nth-child(5) > .btn').first().click();
//   await page.waitForTimeout(2000)
//   await page.waitForSelector('#spinner', { state: 'hidden' });
//   await verifyAccessibilityOfSummaryTab(page)
//   await page.locator('input[name="TextValue"]').click();
//   await page.locator('input[name="TextValue"]').fill('window');
//   await page.locator('button:has-text("Save")').click();
//   await page.waitForTimeout(2000)
//   await page.waitForSelector('#spinner', { state: 'hidden' });

//   await page.locator('text=Continue Shopping').click();
//   await windowWithNailingFlenge.addOneWindowWithNailingFlange(page)
//   await page.locator('text=Continue Shopping').click();
//   await windowWithoutNailingFlenge.withOutNailingFlangeDesign(page)


// }

export async function printDesignBtn(page) {

  // Click a:has-text("Print Design")
  await page.locator('a:has-text("Print Design")').click();
  await page.waitForTimeout(2000)
  await page.waitForSelector('h4:has-text("Print Design")', { state: 'visible' }, { timeout: 10000 });
  // let reportBtn = await page.$$("form > .panel > .panel-heading ");

  //   for (let i = 1; i <= reportBtn.length; i++) {
  //     await page.waitForSelector(`form > .panel > .panel-heading >> nth=${i}`, { state: 'visible'});
  //   }
  // Click text=× Print Design >> [aria-label="Close"]
  await page.locator('text=× Print Design >> [aria-label="Close"]').click();

  await page.locator('a:has-text("Print Design")').click();
  await page.waitForTimeout(2000)
  await page.waitForSelector('h4:has-text("Print Design")', { state: 'visible' }, { timeout: 10000 });

  const [page10] = await Promise.all([
    page.waitForEvent('popup'),
    page.locator('text=Cost Margin Report Print Email >> a').first().click()
  ]);
  await page10.close();

}

export async function copyDesignBtn(page) {
  await page.waitForSelector('text=Copy Design', { state: 'visible' }, { timeout: 10000 });
  await page.locator('text=Copy Design').click();
  await page.waitForSelector('text=×CloseCopy your design', { state: 'visible' }, { timeout: 10000 });
  await page.locator('input[name="quoteName"]').click();
  //The design name should allow numbers, alphabets, space and special characters
  await page.locator('input[name="quoteName"]').fill('test Design @ 123');
  //The design name should not be longer than 50 characters
  let copyDesignNameInputBox = await page.locator('input[name="quoteName"]')
  await expect(copyDesignNameInputBox).toHaveAttribute("maxlength", /50/)

  //Click on cancel button on the form: It should return to the summary screen without copying the design
  await page.locator('text=Cancel').click();
  let item = ("div:nth-child(1).col-xs-12>span:nth-child(1)")
  let itemName = await page.locator(item).innerText();
  console.log('itemName: ', itemName)

  await page.locator('text=Copy Design').click();
  await page.waitForSelector('text=×CloseCopy your design', { state: 'visible' }, { timeout: 10000 });
  await page.locator('input[name="quoteName"]').click();
  await page.locator('input[name="quoteName"]').fill('test Design @ 123');
  await page.locator('button:has-text("Save")').click();
  await page.waitForTimeout(4000)
  await page.waitForSelector('#spinner', { state: 'hidden' }, { timeout: 10000 });
  let copiedDesignName = await page.locator('text= test Design Name @ 123 >> nth=1');
  await expect.soft(copiedDesignName).toBeVisible()
  let productName = page.locator("div:nth-child(1).col-xs-12>span:nth-child(1)")
  await expect.soft(productName).toHaveText(itemName);

}
export async function restartBtnAvailability(page) {
  let restartBtn = page.locator("text=Restart")
  await expect.soft(restartBtn).toBeVisible()
}

export async function restartBtn(page) {
  //Click on Restart button at the top of the summary page	
  await page.locator('text=Restart').click();
  //It should lead the user to the landing page
  let startDesignBtn = page.locator("text=Start Designing")
  await expect.soft(startDesignBtn).toBeVisible()
  await page.click("text=Start Designing");
  await page.waitForSelector('#spinner', { state: 'hidden' }, { timeout: 10000 });

  //*Start designing, before adding at least one line, click on Summary and Purchase tab at the top	
  // It should not allow the user to access the tab since the previous design is closed
  await verifyInaccessibilityOfSummaryTab(page)
  await page.waitForTimeout(2000)
  await page.waitForSelector('button:has-text("Purchase")', { state: 'visible' }, { timeout: 10000 });
  await page.locator('button:has-text("Purchase")').click();
  let popup = await page.locator('text=You must configure one line item before continuing.');
  await expect.soft(popup).toBeVisible()
  await page.locator('text=OK').click();



}

export async function validatingtheSumOfPrices(page) {
  //The estimated price should be a total of prices of all the lines in the design
  let prices = await page.$$("(//span[@class='form-control-static'])");
  let sumOfPrices = 0
  for (let i = 1; i <= prices.length; i++) {
    let individualPrices = `(//span[@class='form-control-static'])[${i}]`
    let individualPricesText = await page.locator(individualPrices).innerText()
    let individualPricesvalue = individualPricesText.replace("$", "").replaceAll(",", "");
    console.log("price", individualPricesvalue)
    sumOfPrices = sumOfPrices + parseFloat(individualPricesvalue)
    console.log('sumOfPrices: ',sumOfPrices)
  }

  console.log('sumOfPrices: ', sumOfPrices)
  let estimatedPrice = ("td[class='lead'] strong");
  let estimatedPriceValue = await page.locator(estimatedPrice).innerText();
  console.log('estimatedPriceValue', estimatedPriceValue)

  await expect.soft(estimatedPriceValue.replace("$", "").replaceAll(",", "")).toEqual(sumOfPrices.toFixed(2).toString())

}

//If the store doesn’t have Rebate setup, it should only display the Estimated price
export async function visibilityofEstimatedPrice(page) {
  await page.waitForTimeout(2000)
  let estimatedPrice = await page.locator('td[class="lead"] strong');
  await expect.soft(estimatedPrice).toBeVisible()
}

//If the store has Rebate setup, it should display the Rebate amount as 11% of the estimated price
export async function verifyingRebatePriceOnSummaryPage(page) {
  let estimatedPrice = ("td[class='lead'] strong");
  let estimatedPriceValue = await page.locator(estimatedPrice).innerText();
  console.log('estimatedPriceValue', estimatedPriceValue)

  let calculatedRebatePrice = parseFloat(estimatedPriceValue.replace("$", "").replaceAll(",", "")) * 0.11

  let rebatePriceLocator = ("td[class='lead text-danger'] strong")
  let rebatePriceValue = await page.locator(rebatePriceLocator).innerText();

  let rebatePrice = rebatePriceValue.replace("$", "").replaceAll(",", "")
  await expect.soft(calculatedRebatePrice.toFixed(2)).toEqual(rebatePrice)

  //The final price should be a result of subtracting 11% Main-in Rebate from estimated price

  let finalPrice = ('td.text-danger >> nth=1')
  let finalPriceValue = estimatedPriceValue.replace("$", '').replaceAll(",", "") - rebatePriceValue.replace("$", '').replaceAll(",", "")
  console.log('finalPriceValue', finalPriceValue)
  let finalPriceText = await page.locator(finalPrice).innerText()
  console.log('finalPriceValue', finalPriceText)
  await expect.soft(finalPriceText.replace(",", "")).toEqual(`$${finalPriceValue.toFixed(2)}`);

  // Click on the info icon beside 11% Main-In Rebate label	
  await page.locator('i[role="button"]').click();
  //It should pop up the window with Rebate information
  let popupofRebatePrice = await page.locator('#promoModal div:has-text("1 Pick up your rebate redemption certificate at the service desk or print it onl")>>nth(2)')
  await expect.soft(popupofRebatePrice).toBeVisible()
  // Click on OK or X icon	
  await page.locator('text=× 1 Pick up your rebate redemption certificate at the service desk or print it o >> [aria-label="Close"]').click();


}



