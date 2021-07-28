
import { exec } from 'child_process';
import { Browser } from 'puppeteer';
import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'

const isProd = process.env.NODE_ENV === 'production' ? true : false;

export  const openBrowser = async (proxy?: string) => {
    puppeteer.use(StealthPlugin())
    const browser = await puppeteer.launch({
        // @ts-ignore
        headless: !!isProd,
        args: [
            proxy ? `--proxy-server=${proxy}` : '',
            '--no-sandbox', '--disable-setuid-sandbox',
        ]
    })

  return browser;
};

export const closeBrowser = async (browser: Browser) => {
    browser.disconnect()
    await new Promise((resolve) => setTimeout(resolve, 100))
    exec(`kill -9 ${browser.process().pid}`, async (error, stdout, stder) => {
        if (error) {
            console.log(`Process Kill Error: ${error}`)
        }
        console.log(`Process Kill Success. stdout: ${stdout} stderr:${stder}`);
    })
}
