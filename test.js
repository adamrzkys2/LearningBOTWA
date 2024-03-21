const puppeteer = require("puppeteer-extra")
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

async function getdata(query){
    puppeteer.use(StealthPlugin());
const browser = await puppeteer.launch({headless :false, executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"})
const page = await browser.newPage()
await page.setDefaultNavigationTimeout(0)
await page.goto(`https://brainly.com/app/ask?q=${query}`)
}
getdata("apa itu")