const puppeteer = require("puppeteer")

const axios = require("axios")

async function remini(name){
const browser = await puppeteer.launch({headless: "new", executablePath:"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"})
const page = await browser.newPage()
await page.setDefaultNavigationTimeout(0)
await page.goto("https://www.img2go.com/remove-background")
await page.waitForTimeout(10000)
const file = await page.$x("/html/body/div[3]/div[2]/div[4]/div/div/div[1]/div/div/div/form/input")
await file[0].uploadFile(`./upload/${name}.jpg`)
await page.waitForTimeout(20000)
const buttonstart = await page.$x("/html/body/div[3]/div[2]/div[4]/div/div/div[1]/div/div/div/div[2]/div[1]/button")
await buttonstart[0].click()
await page.waitForTimeout(50000)
const xpath = "/html/body/div[3]/div[4]/div[1]/div/div/div[1]/div[1]/div[1]/div/a"
const src = await page.evaluate((xpath) => {
    const element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    if (element && element.hasAttribute('href')) {
      return element.getAttribute('href');
    }
    return null;
  }, xpath);
return src
}

module.exports= {remini}