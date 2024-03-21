const puppeteer = require("puppeteer")
const axios = require("axios");
const { format } = require("path");

async function data() {
    const browser = await puppeteer.launch({headless: false, executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
})
    const page = await browser.newPage()
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    await page.setJavaScriptEnabled(true)
    await page.goto("https://www.instagram.com/accounts/emailsignup/")
    const names = `Budi Santoso
Siti Rahayu
Anwar Pratama
Indah Putri
Agus Wibowo
Ratna Dewi
Adi Nugroho
Rini Susanti
Darmawan Utama
Yuni Hartati
Hadi Kusuma
Dewi Lestari
Joko Saputra
Nur Fitriani
Slamet Wijaya
Rina Setiawati
Eko Prasetyo
Yuli Sari
Wahyu Kurniawan
Sari Indriani
Ari Setiawan
Retno Cahyani
Heri Purnomo
Yanti Puspitasari
Dwi Utami
Fajar Nugroho
Susilo Hadi
Novi Purwanti
Hari Setiadi
Lina Cahaya
Wahyudi Santoso
Putri Permata
Imam Kusumo
Maya Wulandari
Supri Santoso
Sinta Anggraini
Didik Prasetyo
Riana Fitriani
Setiawan Wibowo
Eka Pratiwi
Surya Wijaya
Lestari Indah
Andi Rahman
Tri Handayani
Astuti Rahayu
Dian Pratiwi
Taufik Santoso
Yulianti Sari
Arif Kurniawan
Merry Fitria
Sutomo Wijaya
Melati Puspita
Haris Setiawan
Nia Permata
Suharto Wibisono
Wati Rahmawati
Denny Prasetyo
Rini Kartika
Agung Wicaksono
Yuliana Permadi
Nabel trisno
Bondan Prasetyo
Riri ririyana
Dimas Alvero
Alya Putri alvian`;

const namesArray = names.split('\n');

// Format each name as "Firstname Lastname" and split into separate strings
const formattedNamesArray = namesArray.map(name => {
  const [firstname, lastname] = name.toLowerCase().split(' ');
  return `${firstname.charAt(0).toUpperCase() + firstname.slice(1)} ${lastname.charAt(0).toUpperCase() + lastname.slice(1)}`;
});
    const emailX = "/html/body/div[2]/div/div/div[2]/div/div/div[1]/section/main/div/div/div[1]/div[2]/form/div[4]/div/label/input"
    const fullnameX = "/html/body/div[2]/div/div/div[2]/div/div/div[1]/section/main/div/div/div[1]/div[2]/form/div[5]/div/label/input"
    const usernameX = "/html/body/div[2]/div/div/div[2]/div/div/div[1]/section/main/div/div/div[1]/div[2]/form/div[6]/div/label/input"
    const passwordX = "/html/body/div[2]/div/div/div[2]/div/div/div[1]/section/main/div/div/div[1]/div[2]/form/div[7]/div/label/input"
    const randomusernameX = "/html/body/div[2]/div/div/div[2]/div/div/div[1]/section/main/div/div/div[1]/div[2]/form/div[6]/div/div/div/button/span"
    const submitX = "/html/body/div[2]/div/div/div[2]/div/div/div[1]/section/main/div/div/div[1]/div[2]/form/div[8]/div/button"
    try {
            //function login
        await page.waitForTimeout(5000)
        const email = await page.$x(emailX);
          await email[0].type("adamrizkyhidayatullah@gmail.com")
        const fullname = await page.$x(fullnameX)
        await page.waitForTimeout(3000)
        const randomName = formattedNamesArray[Math.floor(Math.random() * formattedNamesArray.length)]
        await fullname[0].type(randomName)
        const username = await page.$x(usernameX)
        await page.waitForTimeout(3000)
   await username[0].type((randomName.substring(0,4) + "_" + Math.floor(Math.random() * 9) + randomName.substring(3,5)))
   await page.waitForTimeout(5000)
   const randomusername = await page.$x(randomusernameX)
   await randomusername[0].click()
   await page.waitForTimeout(3000)
   const password = await page.$x(passwordX)
   await page.waitForTimeout(3000)
   await password[0].type("ism12341234")
   const submit = await page.$x(submitX)
   await page.waitForTimeout(5000)
   await submit[0].click()
   await page.waitForTimeout(5000)
const month = await page.$x("/html/body/div[2]/div/div/div[2]/div/div/div[1]/section/main/div/div/div[1]/div/div[4]/div/div/span/span[1]/select")
await month[0].select(Math.floor(Math.random() * 12).toString())
await page.waitForTimeout(3000)
const day = await page.$x("/html/body/div[2]/div/div/div[2]/div/div/div[1]/section/main/div/div/div[1]/div/div[4]/div/div/span/span[2]/select")
await day[0].select(Math.floor(Math.random() * 28 + 1 ).toString())
await page.waitForTimeout(3000)
const year = await page.$x("/html/body/div[2]/div/div/div[2]/div/div/div[1]/section/main/div/div/div[1]/div/div[4]/div/div/span/span[3]/select"
)
await year[0].select("1992")
const buttonNext = await page.$x("/html/body/div[2]/div/div/div[2]/div/div/div[1]/section/main/div/div/div[1]/div/div[6]/button"
)
await buttonNext[0].click()
//end function login
      } catch (error) {
        console.error('Error occurred:', error);
      }
    }
data()