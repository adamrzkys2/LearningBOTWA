const puppeteer = require ("puppeteer")
const cheerio = require("cheerio")
const axios= require("axios")
const path = require("path")
const fs = require("fs")

async function tiktoknowm(url)
{
  try{
    const options = {
      method: 'GET',
      url: 'https://tiktok89.p.rapidapi.com/tiktok',
      params: {
        link: url
      },
      headers: {
        'X-RapidAPI-Key': '93c8aa3791mshc38749411e72077p1c471ejsn911d1ffdabfb',
        'X-RapidAPI-Host': 'tiktok89.p.rapidapi.com'
      }
    };
    
      const response = await axios.request(options);
    return response
}catch(error){
  console.log(error)
}
}
module.exports = {tiktoknowm}