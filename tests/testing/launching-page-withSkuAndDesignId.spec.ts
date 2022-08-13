import { test, expect } from "@playwright/test";
import {
  allLogins,
  buildStateFilePath,
  MenardsAppNames,
} from "../../utils/menards/test-init-constants";

async function loginWithSku(page){
    let summary =page.locator("li.menards-summary")
    await expect.soft(summary).toHaveClass(/active/)
}

// TODO: When initialization is debugged, remove this line in favor of the above loop.
const state = allLogins[5];
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
      await loginWithSku(page) 
  });