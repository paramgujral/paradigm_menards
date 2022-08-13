const config = require("../playwright.config");
import { FullConfig } from '@playwright/test';
import { adminAuthKeys, dealerAuthKeys } from '../utils/webcp/customer-auth-keys';
import { clearSession as clearUserSession } from '../utils/webcp/authenticate';
import { clearSession } from '../utils/session';
import * as constants from '../utils/menards/test-init-constants';
import { buildStateFilePath } from "../utils/menards/test-init-constants";

async function removeAllTestUserSessions(config: FullConfig) {
  //await clearUserSession(adminAuthKeys);
  //await clearUserSession(config, dealerAuthKeys);
}

async function removeAllMenardsSessions(config: FullConfig) {
  for (let appName of Object.values(constants.MenardsAppNames)) {
    if (appName === constants.MenardsAppNames.milliken) {
      const data = { ...constants.guestInStore, appName: appName }
      await clearSession(buildStateFilePath(data));
    } else {
      for (let login of constants.allLogins) {
        const data = { ...login, appName: appName }
        await clearSession(buildStateFilePath(data));
      };
    }
  }
}

async function globalTeardown(config: FullConfig) {
  //await removeAllTestUserSessions(config);

  await removeAllMenardsSessions(config);
}

export default globalTeardown;
