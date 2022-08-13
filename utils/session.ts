import { Page, TestType } from "@playwright/test";
import fs from 'fs';

export const storageFileLocation = 'tests/state/';

export function useSession(test:TestType<any,any>, filePath:string){
  if(!filePath.startsWith(storageFileLocation) || filePath.includes('..') || filePath.includes(':')){
    throw new Error('Session storage files must be placed in the standard storage file location.');    
  }
  test.use({storageState: filePath});
}

// Log-in to WebCP and store the session cookie out for re-use.
export async function saveSession(page: Page, filePath:string) {
  await page.context().storageState({ path: filePath });
}

export function clearSession(filePath:string) {
  if(filePath.startsWith(storageFileLocation) && !filePath.includes('..') && !filePath.includes(':')){
    fs.unlinkSync(filePath);
  }
}