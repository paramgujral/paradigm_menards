import { test, expect } from "@playwright/test";
import { useSession } from "../utils/session";
import { testInitPageStateFile } from '../utils/menards/test-init-page';
// import * as utils from "../utils";
// import * as luxon from "luxon"; // time and date library
// import faker from "@faker-js/faker"; // input generation

// switch to initalized website session
useSession(test, testInitPageStateFile);

test("basic test", async ({ page }) => {
  await page.goto("/quotes/start-designing");
  await expect(page).toHaveTitle("Create Line |");
});
