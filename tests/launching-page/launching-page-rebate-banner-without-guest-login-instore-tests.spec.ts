import { test, expect } from "@playwright/test";
import {
  allLogins,
  buildStateFilePath,
  MenardsAppNames,
} from "../../utils/menards/test-init-constants";
async function rebateBanner(page) {
  let rebateImage = page.locator("input.img-responsive");
  await expect.soft(rebateImage).not.toBeVisible();

}
// TODO: When initialization is debugged, remove this line in favor of the above loop.
const state = allLogins[0];
const stateFilePath = buildStateFilePath({
  ...state,
  appName: MenardsAppNames.windows,
});
// Load windows storage state
test.use({ storageState: stateFilePath });
test.describe.configure({ mode: "serial" });
test("launching page when guest is logged in and instore", async ({ page }) => {
  await page.goto("/home");
  await rebateBanner(page);
  let launchingPageButtons = page.locator("div.home-actions");
  await expect.soft(launchingPageButtons).toHaveText(/Start Designing/);
  await expect.soft(launchingPageButtons).toHaveText(/Search Saved Designs/);
  await expect.soft(launchingPageButtons).toHaveText(/Exit/);
  let launchingPageFooter = page.locator("footer.text-center > p");
  await expect
    .soft(launchingPageFooter)
    .toHaveText(/  ©2004–2022 Menard, Inc. All Rights Reserved./);
  await expect.soft(launchingPageFooter).toHaveText(/ # 3011/);
});
