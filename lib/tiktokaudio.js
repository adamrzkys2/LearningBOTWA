const puppeteer = require ("puppeteer")
const cheerio = require("cheerio")
const axios= require("axios")
const path = require("path")
const fs = require("fs")

async function tiktokAudio(url)
{
  try{
  console.log(url)
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 10; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
const browser = await puppeteer.launch({headless: "new", executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'})
const page = await browser.newPage()
await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
await page.setJavaScriptEnabled(true);
await page.goto("https://ssstik.io/en")
await page.click("#main_page_text")
await page.type('#main_page_text', `${url}`)
await page.click("#submit")
await page.waitForTimeout(15000)
const pages = await page.$eval("#mainpicture > div > div.flex-1.result_overlay_buttons.pure-u-1.pure-u-sm-1-2 > a.pure-button.pure-button-primary.is-center.u-bl.dl-button.download_link.music.vignette_active.notranslate", element => element.href)
await browser.close()
const filePath = `./public/tiktokaudio/${result}.mp3`
const results = await axios.get(pages,{responseType : "stream"})
.then(async response =>{
  
  const write = fs.createWriteStream(filePath)
  await response.data.pipe(write)
  await new Promise(resolve => setTimeout(resolve, 20000));
  return filePath
})
console.log(results)
return results
}catch(error){
  console.log(error)
}
}

tiktokAudio("https://www.tiktok.com/@1_aaaaa2/video/7299128528656715013?is_from_webapp=1&sender_device=pc")
module.exports = {tiktokAudio}