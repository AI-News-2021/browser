
import { resolve } from 'path';
import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'

const isProd = process.env.NODE_ENV === 'production' ? true : false;

const openBrowser = async (proxy?: string, noCookies?: boolean) => {
    const noCookiesPath = resolve(__dirname, '../chrome-extensions/no-cookies')
    puppeteer.use(StealthPlugin())
    const browser = await puppeteer.launch({
        // @ts-ignore
        headless: !!isProd,
        args: [
            proxy ? `--proxy-server=${proxy}` : '',
            '--no-sandbox', '--disable-setuid-sandbox',
            noCookies ? `--load-extension=${noCookiesPath}` : ''
        ]
    })

  return browser;
};

export default openBrowser;
