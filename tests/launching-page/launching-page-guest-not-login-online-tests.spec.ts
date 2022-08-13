import { test, expect } from "@playwright/test";
import {
  allLogins,
  buildStateFilePath,
  MenardsAppNames,
} from "../../utils/menards/test-init-constants";

// TODO: When initialization is debugged, remove this line in favor of the above loop.
const state = allLogins[3];
const stateFilePath = buildStateFilePath({
  ...state,
  appName: MenardsAppNames.windows,
});
// Load windows storage state
test.use({ storageState: stateFilePath });

test.describe.configure({ mode: "serial" });
  test("launching page when guest is logged in and instore", async ({
    page,
  }) => {
    await page.goto("/home");
    let launchingPageButtons = page.locator("div.home-actions");
    await expect.soft(launchingPageButtons).toHaveText(/Start Designing/);
    await expect.soft(launchingPageButtons).toHaveText(/Search Saved Designs/);
    let launchingPageFooter = page.locator("footer.text-center > p");
    await expect
      .soft(launchingPageFooter)
      .toHaveText(/  ©2004–2022 Menard, Inc. All Rights Reserved./);
    await expect.soft(launchingPageFooter).toHaveText(/ # 3011/);
  });

