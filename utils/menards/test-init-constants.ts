/*
This file contains constants and enumerations for the Menards test initialization page.
https://[menards-app-domain]/test-init
*/

// Modes for the Menards app
export enum MenardsAppNames {
  windows = "Windows",
  doors ="Doors",
  garageDoors = "Garage Doors",
  milliken = "Milliken"
}

// Format of the data structures in this file
export interface testInitData {
  appName: MenardsAppNames,
  storeNumber: string,
  guestAccountId?: string,
  firstName?: string,
  isInternal: boolean,
  skuNumber:string,
  designId:string,
  stateFile: string,
}

export const guestInStore: testInitData = {
  appName: MenardsAppNames.garageDoors,
  storeNumber: "3011",
  guestAccountId: "12345",
  firstName: "testUser",
  designId:"",
  isInternal: true,
  skuNumber:"",
  stateFile: "guestInStoreTestInitPageState.json"
}

export const guestOnline: testInitData = {
  appName: MenardsAppNames.garageDoors,
  storeNumber: "3011",
  guestAccountId: "12345",
  firstName: "testUser",
  designId:"",
  isInternal: false,
  skuNumber:"",
  stateFile: "guestOnlineTestInitPageState.json"
}

export const inStore: testInitData = {
  appName: MenardsAppNames.garageDoors,
  storeNumber: "3011",
  firstName: "testUser",
  designId:"",
  isInternal: true,
  skuNumber:"",
  stateFile: "inStoreTestInitPageState.json"
}

export const online: testInitData = {
  appName: MenardsAppNames.garageDoors,
  storeNumber: "3011",
  firstName: "testUser",
  designId:"",
  isInternal: false,
  skuNumber:"",
  stateFile: "onlineTestInitPageState.json"
}

export const rebateGuestInStore: testInitData = {
  appName: MenardsAppNames.garageDoors,
  storeNumber: "3016",
  guestAccountId: "12345",
  firstName: "testUser",
  designId:"",
  isInternal: true,
  skuNumber:"",
  stateFile: "guestInStoreRebateTestInitPageState.json"
}

export const rebateGuestOnline: testInitData = {
  appName: MenardsAppNames.garageDoors,
  storeNumber: "3016",
  guestAccountId: "12345",
  firstName: "testUser",
  designId:"",
  isInternal: false,
  skuNumber:"",
  stateFile: "guestOnlineRebateTestInitPageState.json"
}

export const rebateInStore: testInitData = {
  appName: MenardsAppNames.garageDoors,
  storeNumber: "3016",
  firstName: "testUser",
  designId:"",
  isInternal: true,
  skuNumber:"",
  stateFile: "inStoreRebateTestInitPageState.json"
}

export const rebateOnline: testInitData = {
  appName: MenardsAppNames.garageDoors,
  storeNumber: "3016",
  firstName: "testUser",
  designId:"",
  isInternal: false,
  skuNumber:"",
  stateFile: "onlineRebateTestInitPageState.json"
}

export const guestInStoreWithSku: testInitData = {
  appName: MenardsAppNames.garageDoors,
  storeNumber: "3011",
  guestAccountId: "12345",
  firstName: "testUser",
  designId:"",
  isInternal: true,
  skuNumber:"4211970",
  stateFile: "guestInStoreTestInitPageState.json"
}
export const guestInStoreWithSkuASndDesignId: testInitData = {
  appName: MenardsAppNames.garageDoors,
  storeNumber: "3011",
  guestAccountId: "12345",
  firstName: "testUser",
  designId:"301156819942",
  isInternal: true,
  skuNumber:"4211970",
  stateFile: "guestInStoreTestInitPageState.json"
}
export const rebateStoreGuest: testInitData={
  appName: MenardsAppNames.garageDoors,
  storeNumber: "3016",
  guestAccountId: "12345",
  firstName: "testUser",
  designId:"",
  isInternal: true,
  skuNumber:"",
  stateFile: "guestInStoreTestInitPageState.json"

}
export const guestWithoutStoreNumber:testInitData={
  appName: MenardsAppNames.garageDoors,
  storeNumber: "",
  guestAccountId: "12345",
  firstName: "testUser",
  designId:"",
  isInternal: true,
  skuNumber:"",
  stateFile: "guestInStoreTestInitPageState.json"

}

// Iterable collection of the login data above
export const allLogins = [
  guestInStore,
  guestOnline,
  inStore,
  online,
  rebateGuestInStore,
  rebateGuestOnline,
  rebateInStore,
  rebateOnline,
  guestInStoreWithSku,
  guestInStoreWithSkuASndDesignId,
  rebateStoreGuest,
  guestWithoutStoreNumber
]

// Utility for building a Playwright state-file path from testInitData
export function buildStateFilePath(data:testInitData) {
  return `tests/state/${data.appName.replace(/\s+/g, '-').toLowerCase()}-${data.stateFile}`;
}
