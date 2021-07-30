import type { ElementHandle, Page } from "puppeteer";

export const handleGoogleConsent = (page: Page) => new Promise(async (resolve, reject) => {
    // if google consent pops up, accept it
    console.log(`checking for google consent`)
    if(page.url().split('/')[2] === 'consent.google.com') {
        console.log(`google consent found`)
        
        await page.waitForXPath('//button').catch(() => console.log('Wait for button timed out'))
        const buttons = await page.$x('//button').catch(() => console.log('getting xpaths failed')) as ElementHandle<Element>[]
        await buttons[1].click().catch(() => console.log('clicking accept failed'))
        
        await page.waitForNavigation({ waitUntil: 'domcontentloaded' }).catch(() => console.log('waiting for navigation timedout'))

        if(page.url().split('/')[2] === 'consent.google.com') {
            console.log('Google consent could not be accepted')
            reject
        }
        console.log(`google consent accepted`)
    }

    resolve
})