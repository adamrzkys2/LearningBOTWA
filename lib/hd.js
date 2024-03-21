const puppeteer = require("puppeteer")
const https = require("https")
const fs = require("fs")
const axios= require("axios")
async function hd(directory){
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let name = '';
    for (let i = 0; i < 10; i++) {
      name += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    const browser = await puppeteer.launch({headless: "new", executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"})
    const page = await browser.newPage()
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    await page.setJavaScriptEnabled(true)
    await page.setDefaultNavigationTimeout(0);
    await page.goto("https://www.img2go.com/upscale-image")
    await page.waitForTimeout(3000)
    const file = await page.$x("/html/body/div[3]/div[2]/div[4]/div/div/div[1]/div/div/div/form/input")
    await file[0].uploadFile(`./upload/${directory}.jpg`)
    await page.waitForTimeout(10000)
    const button = await page.$x("/html/body/div[3]/div[2]/div[4]/div/div/div[1]/div/div/div/div[2]/div[1]/button")
    await button[0].click()
    await page.waitForTimeout(150000)
    const [xpath] = await page.$x("/html/body/div[3]/div[4]/div[1]/div/div/div[1]/div[1]/div[1]/div/a")
    const href = await page.evaluate(element => element.getAttribute('href'), xpath);
      await browser.close()
const result = await axios.get(href, {responseType : "stream"})
.then(async (response) =>{
    const filePath = `./upload/hasil/${name}.jpg`
const stream = await fs.createWriteStream(filePath)
await response.data.pipe(stream)
await new Promise(resolve => setTimeout(resolve, 10000));
return filePath
})
console.log(result)
return result
}

module.exports = {hd}