import { test, expect } from "@playwright/test";
import {
  allLogins,
  buildStateFilePath,
  MenardsAppNames,
} from "../../utils/menards/test-init-constants";
async function guestLoggedInWithoutStoreNumber(page){
  // await page.goto("https://menardsdev.wtsparadigm.com/store-lookup")
  // test.setTimeout(2 * 60 * 1000);
  //   // Click input[name="zipCode"]
  await page.locator('input[name="zipCode"]').click();
  // Fill input[name="zipCode"]
  await page.locator('input[name="zipCode"]').fill('70032');
  // Click text=Search
  await page.locator('text=Search').click();
  await page.waitForURL('https://menardsdev.wtsparadigm.com/store-lookup?zipCode=70032');
  // Click text=POPLAR BLUFF 3105 OAK GROVE RDPOPLAR BLUFF, MO 63901 472.6 miles 573-686-0011 Se >> button[name="storeNbr"]
  await page.locator('text=POPLAR BLUFF 3105 OAK GROVE RDPOPLAR BLUFF, MO 63901 472.6 miles 573-686-0011 Se >> button[name="storeNbr"]').click();
  await page.waitForURL('https://menardsdev.wtsparadigm.com/home')

}
// TODO: When initialization is debugged, remove this line in favor of the above loop.
const state = allLogins[7];
const stateFilePath = buildStateFilePath({
  ...state,
  appName: MenardsAppNames.windows,
});

// Load windows storage state
test.use({ storageState: stateFilePath });

test.describe.configure({ mode: "serial" });

test("launching page when guest is logged in without store number", async ({
  page,
}) => {
  await guestLoggedInWithoutStoreNumber(page)
  await page.goto("/home");
  let launchingPageButtons = page.locator("div.home-actions");
  await expect.soft(launchingPageButtons).toHaveText(/Start Designing/);
  await expect.soft(launchingPageButtons).toHaveText(/Search Saved Designs/);
  await expect.soft(launchingPageButtons).toHaveText(/Exit/);
  let launchingPageFooter = page.locator("footer.text-center > p");
  await expect
    .soft(launchingPageFooter)
    .toHaveText(/  ©2004–2022 Menard, Inc. All Rights Reserved./);
    await expect.soft(launchingPageFooter).toHaveText(/# 3289/);
  
});
