const axios = require("axios")
const fs = require("fs")
const puppeteer = require("puppeteer")

async function pinterestdownloaded(query){
    try{
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let name = '';
    for (let i = 0; i < 10; i++) {
      name += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    const browser = await puppeteer.launch(
{headless : "new", executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'}
    ) 
    const page = await browser.newPage()
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
await page.setJavaScriptEnabled(true)
    await page.goto("https://www.pinterest.com/ideas/")
    await page.type("#searchBoxContainer > div > div > div.ujU.zI7.iyn.Hsu > input[type=text]", query)
    await page.waitForTimeout(5000)
    await page.keyboard.press("Enter")
    await page.waitForTimeout(10000)
    const xpath = "/html/body/div[1]/div/div[1]/div[1]/div[3]/div/div[3]/div/div/div/div/div[1]/div[1]/div/div/div/div/div[1]/a/div/div/div/div/div[1]/img"
  const src = await page.evaluate((xpath) => {
    const element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    if (element && element.hasAttribute('src')) {
      return element.getAttribute('src');
    }
    return null;
  }, xpath);
  await browser.close()
  console.log(src)
return src
    }catch(error){
        console.log(error)        
    }
}
module.exports = {pinterestdownloaded}