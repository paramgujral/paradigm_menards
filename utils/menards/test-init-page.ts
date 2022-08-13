/*
This file contains helper functions for automating the Menards test initialization page.
Another approach would be to use Playwright fixture and extend the Page Object Model.
https://[menards-app-domain]/test-init
*/

import { chromium, FullConfig, Page} from "@playwright/test";
import fs from 'fs';
import { saveSession } from "../session";
import { buildStateFilePath, testInitData } from "./test-init-constants";

async function setInputs(page:Page, data:testInitData, name:string) {
  switch (name) {
    case 'appName':
      await page.click(`text=${data[name]} >> input[name="appName"]`);
      break;

    case 'isInternal':
      if (data[name]) {
        await page.click('input[name="isInternal"]');
      }
      break;
      
      case 'guestAccountId':
        await page.fill('input[name="guestAccountId"]', "data[name]");
        break;

      case 'firstName':
        await page.fill('input[name="firstName"]',"data[name]");
        break;
        case 'designId':
          await page.fill('input[name="designId"]',data[name]);
          break;
      case 'skuNumber':
        await page.fill('input[name="menardsSku"]',"data[name]");
        break;
      default:
        break;
  }
}

// Initialize Menards-Local by using the /test-init page
export async function initMenardsSite(config: FullConfig, data:testInitData) {
  const { baseURL } = config.projects[0].use;
  const browser = await chromium.launch();
  const page = await browser.newPage();


  await page.goto(`${baseURL}`);

  const promises = await Object.getOwnPropertyNames(data);
  for await (let name of promises) {
    await setInputs(page, data, name);
  }

  await page.click('input[name="storeNumber"]');
  await page.fill('input[name="storeNumber"]', data.storeNumber);
  // await page.click('text=Submit');
  await page.locator('text=Submit').click();
  // await page.waitForSelector('text=Start Designing', { state: 'visible' });

  const file = await buildStateFilePath(data);
  await saveSession(page, file);
  
  await browser.close();
}