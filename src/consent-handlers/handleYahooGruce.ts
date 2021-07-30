import type { ElementHandle, Page } from "puppeteer";

export const handleYahooGruce = (page: Page) => new Promise(async (resolve, reject) => {
    // if yahoo consent pops up, accept it
    console.log(`checking for yahoo gruce`)
    if (page.url().split('/')[2] === 'gruce.yahoo.com') {
        console.log(`yahoo consent found`)
        await page.waitForXPath('//a').catch(() => console.log('Wait for button timed out'))
        const yahooAcceptButtons = await page.$x('//a').catch(() => console.log('Getting buttons failed')) as ElementHandle<Element>[]
        await yahooAcceptButtons[0].click().catch(() => console.log('Clicking accept failed'))
        await page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 5000 }).catch(() => console.log('Wait for navigation failed'))

        if(page.url().split('/')[2] === 'gruce.yahoo.com') {
            console.log('Yahoo gruce could not be accepted')
            reject
        }
        console.log(`yahoo gruce accepted`)
    }
    resolve
})