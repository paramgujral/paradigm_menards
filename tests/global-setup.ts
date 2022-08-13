const config = require("../playwright.config");
import { FullConfig } from '@playwright/test';
import { adminAuthKeys, dealerAuthKeys } from '../utils/webcp/customer-auth-keys';
import { authenticateWebCP } from '../utils/webcp/authenticate';
import { initMenardsSite } from '../utils/menards/test-init-page';
import * as constants from '../utils/menards/test-init-constants';

async function loginAllTestUsers(config: FullConfig) {
  // get auth state for all needed test user accounts  
  // await authenticateWebCP(config, adminAuthKeys);
  //await authenticateWebCP(config, dealerAuthKeys); //uncomment this line to also log in a dealer user. Remember to set the credentials in the secret store and uncomment the cleanup line in globalTeardown().
}

async function initAllMenardsTestSessions(config: FullConfig) {

  // TODO: comment these lines for real production tests
  
  var data= { ...constants.guestInStore, appName: constants.MenardsAppNames.windows }
  await initMenardsSite(config, data);

  // var data= { ...constants.guestOnline, appName: constants.MenardsAppNames.windows }
  // await initMenardsSite(config, data);

  // var data= { ...constants.inStore, appName: constants.MenardsAppNames.windows }
  // await initMenardsSite(config, data);

  // var data= { ...constants.online, appName: constants.MenardsAppNames.windows }
  // await initMenardsSite(config, data);
  
  // var data= { ...constants.rebateGuestInStore, appName: constants.MenardsAppNames.windows }
  // await initMenardsSite(config, data);

  // var data= { ...constants.rebateGuestOnline, appName: constants.MenardsAppNames.windows }
  // await initMenardsSite(config, data);

  // var data= { ...constants.rebateInStore, appName: constants.MenardsAppNames.windows }
  // await initMenardsSite(config, data);

  // var data= { ...constants.rebateOnline, appName: constants.MenardsAppNames.windows }
  // await initMenardsSite(config, data);
  

  // var data= { ...constants.guestOnline, appName: constants.MenardsAppNames.doors }
  // await initMenardsSite(config, data);

  // var data= { ...constants.guestInStore, appName: constants.MenardsAppNames.doors }
  // await initMenardsSite(config, data);

  // var data= { ...constants.inStore, appName: constants.MenardsAppNames.doors }
  // await initMenardsSite(config, data);

  // var data= { ...constants.online, appName: constants.MenardsAppNames.doors }
  // await initMenardsSite(config, data);

  // var data= { ...constants.rebateGuestOnline, appName: constants.MenardsAppNames.doors }
  // await initMenardsSite(config, data);

  // var data= { ...constants.rebateGuestInStore, appName: constants.MenardsAppNames.doors }
  // await initMenardsSite(config, data);

  // var data= { ...constants.rebateInStore, appName: constants.MenardsAppNames.doors }
  // await initMenardsSite(config, data);

  // var data= { ...constants.rebateOnline, appName: constants.MenardsAppNames.doors }
  // await initMenardsSite(config, data);

  // var data= { ...constants.guestOnline, appName: constants.MenardsAppNames.garageDoors }
  // await initMenardsSite(config, data);

  // var data= { ...constants.guestInStore, appName: constants.MenardsAppNames.garageDoors }
  // await initMenardsSite(config, data);

  // var data= { ...constants.online, appName: constants.MenardsAppNames.garageDoors }
  // await initMenardsSite(config, data);

  // var data= { ...constants.inStore, appName: constants.MenardsAppNames.garageDoors }
  // await initMenardsSite(config, data);

  // var data= { ...constants.inStore, appName: constants.MenardsAppNames.milliken }
  // await initMenardsSite(config, data);  

  // var data= { ...constants.online, appName: constants.MenardsAppNames.milliken }
  // await initMenardsSite(config, data); 
  
  // var data= { ...constants.guestInStore, appName: constants.MenardsAppNames.milliken }
  // await initMenardsSite(config, data);

  // var data= { ...constants.guestOnline, appName: constants.MenardsAppNames.milliken }
  // await initMenardsSite(config, data);  
  
  
  // TODO: uncomment below block to configure sessions for all app modes.
  /* 
  for await (let appName of Object.values(constants.MenardsAppNames)) {
    if (appName === constants.MenardsAppNames.milliken) {
      const data = { ...constants.guestInStore, appName: appName }
      await initMenardsSite(config, data);
    } else {
      for await (let login of constants.allLogins) {
        const data = { ...login, appName: appName }
        await initMenardsSite(config, data);
      };
    }
  }
  */
}

async function globalSetup(config: FullConfig) {
  //await loginAllTestUsers(config);

  await initAllMenardsTestSessions(config); 
}

export default globalSetup;
