import type { ElementHandle, Page } from "puppeteer";

export const handleYahooConsent = (page: Page) => new Promise(async (resolve, reject) => {
    // if yahoo consent pops up, accept it
    console.log(`checking for yahoo consent`)
    if (page.url().split('/')[2] === 'consent.yahoo.com') {
        console.log(`yahoo consent found`)
        await page.waitForXPath('//button').catch(() => console.log('Wait for button timed out'))
        const yahooAcceptButtons = await page.$x('//button').catch(() => console.log('Getting buttons failed')) as ElementHandle<Element>[]
        await yahooAcceptButtons[0].click().catch(() => console.log('Clicking accept failed'))
        await page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 5000 }).catch(() => console.log('Wait for navigation failed'))

        if(page.url().split('/')[2] === 'consent.yahoo.com') {
            console.log('Yahoo consent could not be accepted')
            reject
        }
        console.log(`yahoo consent accepted`)
    }
    resolve
})