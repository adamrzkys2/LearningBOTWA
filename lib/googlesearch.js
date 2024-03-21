const axios = require("axios")
const puppeteer = require("puppeteer")

const fs = require("fs")

async function google(query){
  try{
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let name = '';
    for (let i = 0; i < 10; i++) {
      name += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    const browser = await puppeteer.launch({headless: false, executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"})
    const page = await browser.newPage()
    await page.setJavaScriptEnabled(true)
    await page.goto("https://www.google.com/imghp?hl=en")
    await page.type("#APjFqb", `${query}`)
    await page.keyboard.press("Enter")
    await page.waitForTimeout(5000)
   const result = await page.$eval("#islrg > div.islrc > div:nth-child(2) > a.FRuiCf.islib.nfEiy > div.fR600b.islir > img", element => element.src)
console.log(result)
await browser.close()
const filePath = `./public/google/${name}.jpg`;
await axios.get(result,{responseType : "arraybuffer"})
.then(async (response) =>{
    console.log(response.data)


    fs.writeFileSync(filePath, response.data);
    await new Promise(resolve => setTimeout(resolve, 10000));
    console.log('Image downloaded successfully:', filePath);
    fs.watch("./public/google");

})
return filePath
}catch(error){
  console.log(error)
}
}

module.exports = {google}