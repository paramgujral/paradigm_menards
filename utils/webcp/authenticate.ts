import { chromium, FullConfig, TestFixture, TestType } from "@playwright/test";
import { SecretManager } from "../secrets-manager";
import { IAuthKeys } from "../auth/AuthKeys";
import * as StringUtils from "../string.utils";
import * as sessionUtils from '../session';
import fs from 'fs';

export function useUser(test:TestType<any,any>, userKeys:IAuthKeys){
  sessionUtils.useSession(test, buildStorageFilePath(userKeys));
}

export function buildStorageFilePath(userKeys:IAuthKeys){
  const file = StringUtils.ensureDoesNotStartWith(userKeys.storageStateFile, '/');
  return sessionUtils.storageFileLocation + file;
}

// Log-in to WebCP and store the session cookie out for re-use.
export async function authenticateWebCP(config: FullConfig, userKeys: IAuthKeys) {
  const { baseURL } = config.projects[0].use;
  const userName = SecretManager.getSecret(userKeys.username);
  const password = SecretManager.getSecret(userKeys.password);
  const storageStatePath = buildStorageFilePath(userKeys);

  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto(`${baseURL}/login`);
  await page.fill('#username', userName);
  await page.click(".login-email__next .btn.btn-primary"); 
  await page.waitForNavigation();
  await page.fill('input#password', password);
  await page.click('.login-password__action .btn.btn-primary'); 

  await sessionUtils.saveSession(page, storageStatePath);

  await browser.close();
}

export async function clearSession(userKeys: IAuthKeys) {
  const storageStatePath = buildStorageFilePath(userKeys);
  sessionUtils.clearSession(storageStatePath);
}