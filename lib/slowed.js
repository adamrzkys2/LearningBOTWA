const puppeteer = require("puppeteer")


async function slowed(name){
    const browser = await puppeteer.launch({headless: 'new', executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"})
    const page = await browser.newPage()
    await page.setDefaultNavigationTimeout(0)
    await page.goto("https://www.voicify.ai/presets/slowed-and-reverb")
    await page.waitForTimeout(5000)
    const button = await page.$x("/html/body/div/div/div[2]/main/div/header/div/button")
    await button[0].click()
    await page.waitForTimeout(3000)
    const inputUsername = await page.$x("/html/body/div[2]/div/div[2]/section/div[2]/div/form/div[1]/div/div[1]/label/input")
    inputUsername[0].type("your_email")
    await page.waitForTimeout(5000)
    const inputPassword= await page.$x("/html/body/div[2]/div/div[2]/section/div[2]/div/form/div[2]/div/div[1]/label/input")
    inputPassword[0].type("your_password")
    await page.waitForTimeout(5000)
    const buttonSubmit = await page.$x("/html/body/div[2]/div/div[2]/section/div[2]/div/form/button")
    await buttonSubmit[0].click()
    await page.waitForTimeout(30000)
    const buttonUpload = await page.$x("/html/body/div[1]/div/div[2]/main/div/header/div/button")
    buttonUpload[0].click()
    console.log("button upload clicked")
    await page.waitForTimeout(10000)
    const buttonFile = await page.$x("/html/body/div[4]/div/div/section/div[2]/div[2]")
    await buttonFile[0].click()
    await page.waitForTimeout(3000)
    const input = await page.$x("/html/body/div[4]/div/div/section/div[2]/div[2]/input")
    await input[0].uploadFile(name)
    await page.waitForTimeout(5000)
    const buttonSubmitFile = await page.$x("/html/body/div[4]/div/div/section/button")
    await buttonSubmitFile[0].click()
    await page.waitForTimeout(80000)
    const xpath = "/html/body/div[4]/div/div/section/div/a"
  const src = await page.evaluate((xpath) => {
    const element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    if (element && element.hasAttribute('href')) {
      return element.getAttribute('href');
    }
    return null;
  }, xpath);
  await browser.close()
  console.log(src)
  return src
}
slowed("./upload/slowed/test.mp3")
module.exports = { slowed }
