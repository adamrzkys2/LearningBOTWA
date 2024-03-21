const puppeteer = require("puppeteer")
const axios = require("axios")
const fs = require("fs");
const { resolve } = require("path");

async function igdl(url){
  try{
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let name = '';
    for (let i = 0; i < 10; i++) {
      name += characters.charAt(Math.floor(Math.random() * characters.length));
    }
const browser = await puppeteer.launch({headless: "new", executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',})
const page = await browser.newPage()
await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
await page.setJavaScriptEnabled(true)
await page.goto("https://igdownloader.app/id")
await page.type("#s_input", url)
await page.waitForTimeout(10000);
await page.click("#search-form > div > div > button")
await page.waitForTimeout(10000);
await page.click("#closeModalBtn")
const result = await page.$eval("#download-result > ul > li > div > div.download-items__btn > a", element => element.href)
await browser.close()
const filePath = `./public/igdl/${name}.mp4`
await axios.get(result,{responseType : "stream"})
.then(async (response) =>{
    const write = fs.createWriteStream(filePath)
    await response.data.pipe(write)
    await new Promise(resolve => setTimeout(resolve, 20000));
})

return filePath
}catch(error){
  console.log(error)
}
}
igdl("https://www.instagram.com/reel/C1hhmnlS-Sc/?igsh=ZHFlamF5Znpvb3Jk")
module.exports = {igdl}