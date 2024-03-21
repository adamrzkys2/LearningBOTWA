const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');



async function gemini(query){
    puppeteer.use(StealthPlugin());
    const browser = await puppeteer.launch({ headless: false,executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe" })
    const page = await browser.newPage()
    await page.setDefaultNavigationTimeout(0);
    await page.goto("http://gemini.google.com")    
    await page.waitForTimeout(5000)
    const click = await page.$x("/html/body/div[1]/div/div/div/a/span")
    await click[0].click()
    await page.waitForTimeout(7000)
    const email = await page.$x("/html/body/div[1]/div[1]/div[2]/div/c-wiz/div/div[2]/div/div[1]/div/form/span/section/div/div/div[1]/div/div[1]/div/div[1]/input")
    email[0].type("eldam2023@gmail.com")
    await page.waitForTimeout(5000)
    const submitEmail = await page.$x("/html/body/div[1]/div[1]/div[2]/div/c-wiz/div/div[2]/div/div[2]/div/div[1]/div/div/button/div[3]")
    submitEmail[0].click()
    await page.waitForTimeout(5000)
    const password = await page.$x("/html/body/div[1]/div[1]/div[2]/div/c-wiz/div/div[2]/div/div[1]/div/form/span/section[2]/div/div/div[1]/div[1]/div/div/div/div/div[1]/div/div[1]/input")
    await password[0].type("adam555656")
    await page.waitForTimeout(3000)
    const passwordClick = await page.$x("/html/body/div[1]/div[1]/div[2]/div/c-wiz/div/div[2]/div/div[2]/div/div[1]/div/div/button/div[3]")
    passwordClick[0].click()
    await page.waitForTimeout(20000)
    const button = await page.$x("/html/body/chat-app/main/side-navigation-v2/mat-sidenav-container/mat-sidenav-content/div/div[2]/chat-window/div[1]/div[2]/div[1]/input-area-v2/div/div/div[1]/div/div/rich-textarea/div[1]/p")
// await  button[0].click()
// await page.waitForTimeout(2000)
// await page.keyboard.type(`Give me the sample pictures of ${query}`);
        // const inputFile = await page.$x("/html/body/chat-app/main/side-navigation-v2/mat-sidenav-container/mat-sidenav-content/div/div[2]/chat-window/div[1]/div[2]/div[1]/input-area-v2/div/div/div[3]/div/uploader/div/input")
    // await inputFile[0].uploadFile("./upload/output.jpg")
}
gemini("koala")