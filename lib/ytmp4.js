const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

async function ytmp4Dl(url){
 puppeteer.use(StealthPlugin());
const browser = await puppeteer.launch({headless: false, executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"})
const page = await browser.newPage()
await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
await page.goto("https://www.y2mate.com/en919")
await page.waitForTimeout(10000)
const input = await page.$x("/html/body/div[1]/div/div/div/div[1]/div/div/div/div[1]/form/input")
const buttonStart = await page.$x("/html/body/div[1]/div/div/div/div[1]/div/div/div/div[1]/form/button")
await input[0].type(url)
await page.waitForTimeout(5000)
await buttonStart[0].click()
await page.waitForTimeout(5000)
const button = await page.$x("/html/body/div[1]/div/div/div/div[1]/div/div/div/div[4]/div[1]/div[2]/div/div[1]/table/tbody/tr[6]/td[3]/button")
await button[0].click()
await page.waitForTimeout(9000)
const xpath = "/html/body/div[1]/div/div/div/div[1]/div/div/div/div[3]/div[2]/div/div[2]/div[2]/div/a"
const src = await page.evaluate((xpath) => {
        const element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (element && element.hasAttribute('href')) {
          return element.getAttribute('href');
        }
        return null;
      }, xpath);
      console.log(src)
return src
    }
module.exports = {ytmp4Dl}