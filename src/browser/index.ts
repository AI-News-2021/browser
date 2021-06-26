
import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'

const isDev = process.env.NODE_ENV !== 'production' ? true : false;

const openBrowser = async (proxy?: string) => {
    puppeteer.use(StealthPlugin())
    const browser = await puppeteer.launch({
        // @ts-ignore
        headless: !!isDev,
        args: [
            proxy ? `--proxy-server=${proxy}` : ''
        ]
    })

  return browser;
};

export default openBrowser;
