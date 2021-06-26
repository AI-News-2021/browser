import { launch } from 'puppeteer';

const isDev = process.env.NODE_ENV === 'development' ? true : false;

const openBrowser = async (proxy?: string) => {
  const browser = await launch({
    headless: !!isDev,
    args: [proxy ? `--proxy-server=${proxy}` : ''],
  });

  return browser;
};

export default openBrowser;
