const puppeteer = require("puppeteer")


async function getMeme(){
    const browser = await puppeteer.launch({headless: false, executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"})
    const page = await browser.newPage()
    await page.goto("https://id.pinterest.com/search/pins/?q=meme%20indo%20fb&rs=typed")
    const parentXPath = '//*[@id="mweb-unauth-container"]/div/div[3]/div/div/div/div/div[1]/div[1]'; // Example XPath expression for the parent element
    const childXPath = `${parentXPath}//img[@src]`; // Example XPath expression for child img elements with src attribute
  
    // Extract the src attributes of all child elements within the parent element
    const srcAttributes = await page.$$evalXPath(childXPath, imgs => imgs.map(img => img.getAttribute('src')));
  
    console.log(srcAttributes);
}
getMeme()