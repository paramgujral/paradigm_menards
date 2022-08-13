import { test, expect } from "@playwright/test";
//Trigger Global Changes

// If there're multiple windows lines, but the line you edited is the only one from this catalog, global changes should not be triggered
// If there's only one window line in the design, global changes should not be triggered
export async function verifyGlobalChangeNotTriggered(page) {
    let applyChangesText =   await page.locator("text=Do you want to apply the change(s) to other windows in your design?")

    await expect.soft(applyChangesText).not.toBeVisible()
    let globalChangeContainer = await page.locator('#global-changes-app')
    await expect.soft(globalChangeContainer).not.toBeVisible()

}
//If there're more than one window line from a same catalog, but the Q&A you edited is not checked off with "Include in Global Changes" in the Question template, global changes should not be triggered
//If there're more than one window line from a same catalog, but the Q&A you edited is checked off with "Include in Global Changes" in the Question template, global changes should be triggered
export async function verifyGlobalChangeIsTriggered(page) {
    let applyChangesText =   await page.locator("text=Do you want to apply the change(s) to other")
    await expect.soft(applyChangesText).toBeVisible()
    let globalChangeContainer = await page.locator('#global-changes-app')
    await expect.soft(globalChangeContainer).toBeVisible()
}