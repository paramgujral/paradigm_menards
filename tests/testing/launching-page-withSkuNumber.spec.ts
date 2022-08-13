import { test, expect } from "@playwright/test";
import {
  allLogins,
  buildStateFilePath,
  MenardsAppNames,
} from "../../utils/menards/test-init-constants";

async function loginWithSku(page){
    let summary =page.locator("li.menards-summary")
    await expect.soft(summary).toHaveClass(/active/) 
    let skuNumberInSummaryTab= page.locator('text=4211970')
    await expect.soft(skuNumberInSummaryTab).toBeVisible()
}
// TODO: When initialization is debugged, remove this line in favor of the above loop.
const state = allLogins[4];
const stateFilePath = buildStateFilePath({
  ...state,
  appName: MenardsAppNames.windows,
});


// Load windows storage state
test.use({ storageState: stateFilePath });

test.describe.configure({ mode: "serial" });

test("launching page when sku number is entered", async ({
  page,
}) => {
  //await page.goto("https://menardsdev.wtsparadigm.com/quotes/baf3fa4e-4f05-47f1-9e4c-630c9e2cb2fd/line-items")
  await loginWithSku(page) 
});

