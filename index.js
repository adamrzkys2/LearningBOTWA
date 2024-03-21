const expressStatic = require('express-static');
const SpottyDL = require('spottydl')
const path = require('path');
const {Client, MessageMedia,LocalAuth, GroupChat, Buttons} = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')

//restart script
const { spawn } = require('child_process');
let isRunning = false;
function start(file) {
    if (isRunning) return;
    isRunning = true;
  
    const args = [path.join(__dirname, file), ...process.argv.slice(2)];
    const p = spawn(process.argv[0], args, {
      stdio: ["inherit", "inherit", "inherit", "ipc"],
    });
    const script = process.argv[1];
    spawn('node', [script], {
        detached: true,
        stdio: 'ignore'
    }).unref();
    process.exit();
}
//end
const app = express();
const OpenAI = require('openai')
const fs = require('fs');
const util = require("util");
const scraper = require("insta-scraper")
const FormData = require("form-data")
const data = new FormData();
const group = new GroupChat()
const port = 4000
const currentDate = new Date();

const currentHours = currentDate.getHours();
const currentMinutes = currentDate.getMinutes();

const openai = new OpenAI({
    apiKey: 'your_api_key',
})
const staticPathSpotify = path.join(__dirname, 'public/music');
const staticPathTiktok = path.join(__dirname, 'public/tiktok');
const yt = require("ytdl-core")
const yts = require("yt-search");
const { isRequestOptions } = require('openai/core');
const { pinterestdownloaded } = require('./lib/pinterest.js');
const { count } = require('console');
const registered = fs.readFileSync("./database/registered.json")
const groupLearning = fs.readFileSync("./database/learningbotGroup.json")
const quotes = fs.readFileSync("./database/quotes.json")
const tebakGambar = fs.readFileSync("./database/tebakgambar.json")
const asmaulHusnaFS =fs.readFileSync("./lib/AsmaulHusna.json")
const donasi = fs.readFileSync("./database/donate.json")
const premiumJson = fs.readFileSync("./database/premium.json")
const limitJson = fs.readFileSync("./database/limit.json")
const meme = fs.readFileSync("./lib/meme.json")
//ALERT
const alertFormat = "Masukkan Format dengan benar!"
const alertMedia = "Masukkan media dengan benar!"
const alertLink = "Masukkan link dengan benar!"
const alertRegistered = 
`
GROUP INI BELUM TERDAFTAR, SILAHKAN DAFTAR DAHULU DENGAN OWNER

atau jika ingin mencoba2 trial, silahkan untuk join group kami:
https://chat.whatsapp.com/JfltAVdfWiE2DZPyI4U7bR
`
//END ALERT
app.get('/openai', async (req, res) => {
    try{
    const query = req.query.q || 'Hello';
    const chatcompletions = await openai.chat.completions.create({
      messages: [{ role: "user", content: `${query}` }],
      model: "gpt-3.5-turbo",
  });
    res.json({data: `${chatcompletions.choices[0].message.content}`});
}catch(error){
    console.log(error)
    res.json(error)
}
  });

//static path 
app.use('/files', expressStatic(staticPathSpotify));
app.use('/files', expressStatic(staticPathTiktok));
//end static path


//get function 
app.get('/spotify', (req, res) => {
    const directoryPath = staticPathSpotify;
  
    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        return res.status(500).send(err);
      }
  
      const fileList = files.map(file => ({
        name: file,
        url: `/files/${file}`, // URL to download the file
      }));
  
      const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>File Directory Listing</title>
        </head>
        <body>
          <h1>File Directory Listing</h1>
          <ul>
            ${fileList.map(file => `<li><a href="${file.url}" download>${file.name}</a></li>`).join('')}
          </ul>
          <script>
            // Automatically initiate downloads
            document.querySelectorAll('a').forEach(link => link.click());
          </script>
        </body>
        </html>
      `;
  
      res.send(html);
    });
  });
  
//FILENAME FUNC
  app.get('/spotify/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(staticPathSpotify, filename);

    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
    res.setHeader('Content-Type', 'application/octet-stream');

    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  });

//end function get

  //listen
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
//
//DELAY
const delay20s = (req, res, next) => {
    setTimeout(next, 20000);
  };
//END DELAY


//QUERY
const tiktokVideo = ".tiktok"
const photoai = ".photoai"
const stickerwm = '.stickerwm';
const translate = ".translate";
const searchSticker = ".searchsticker"
const says = ".say"
const enchancer = ".gambarai"
const islamic = ".islam"
const ytmp4 = ".ytmp4"
const reverb = ".reverb"
const openaic = '.ai';
const mtkresolve = ".mtk"
const googleImage = ".gimage"
const ytmp3 = ".ytmp3"
const ytsearch = ".ytsearch"
const antiView = ".sekalilihat"
const spotifySearch = ".spotifysearch"
const donate = ".confirm"
const spotifyDL = ".spotifydl"
const asmaulHusna = ".asmaul"
const tiktokAudioS = ".audiotiktok"
const igdld = ".igdl"
const pinterest = ".pin"
//END QUERY

//PARSE JSON
const groupLearningbot = JSON.parse(groupLearning)
const registeredJson = JSON.parse(registered)
const quotesJson = JSON.parse(quotes)
const premiumParse= JSON.parse(premiumJson)
const limitParse = JSON.parse(limitJson)
const donasiParse = JSON.parse(donasi)
const memeParse = JSON.parse(meme)
//END PARSE JSON
const client = new Client({
    puppeteer: {
        executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      },
    authStrategy: new LocalAuth()
});
client.on("qr", qr =>{
    qrcode.generate(qr, {small: true});
})
client.on("ready", () =>{
    console.log("MULTIBOT READY.")
})
client.on("authenticated", () =>{
    console.log("Authenticated.");
})

//EXPRESS
app.get("/dall-e",delay20s, async (req,res)=>{
    try{
    const query = req.query.q || "aduh"
        const encodedParams = new URLSearchParams();
        encodedParams.set('source_language', 'auto');
        encodedParams.set('target_language', 'en');
        encodedParams.set('text', `${query}`);
        
        const options = {
          method: 'POST',
          url: 'https://text-translator2.p.rapidapi.com/translate',
          headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': '93c8aa3791mshc38749411e72077p1c471ejsn911d1ffdabfb',
            'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
          },
          data: encodedParams,
        };
    const responseTranslate = await axios.request(options);



    const response = await openai.images.generate({
        model: "dall-e-2",
        prompt: `${responseTranslate.data.data.translatedText}`,
        size: "1024x1024",
        quality: "standard"
    }
    )
    const URL = response.data[0].url
   const imageUrl = URL;
   const respon = await axios.get(imageUrl, { responseType: 'arraybuffer' });

   res.setHeader('Content-Disposition', 'attachment; filename="downloaded_image.jpg"');
   res.setHeader('Content-Type', 'image/jpeg');
   res.send(respon.data);
   console.log(Buffer.from(respon.data, 'binary'))





}catch(error){
    console.log(error)
    res.json(error)
}
 })


 //END EXPRESS
client.on("disconnected", (reason)=>{
    console.log(reason)
})
fs.watchFile("./index.js", ()=>{
    fs.unwatchFile("./index.js")
start("index.js")
})
 client.on("group_join", async (group) =>{
    const isGroupLearningBot = groupLearningbot.includes(group.chatId)
    if(isGroupLearningBot){
    try{
    console.log(group)
    const id = group.id.participant.split("@c.us")
await client.sendMessage(group.chatId,
`
Hai sobat Learning ${`@${id}`}
Yang baru bergabung selamat datang di grup kami.
Manfaatkan AI ini dengan hal yang baik" salah
satunyah untuk mempermudah pekerjaan anda.

Untuk semua member tetap memenuhi peraturan grup yang sudah tertera di deskripsi grup yah. 

Dan Kami mohon dukungannya kepada seluruh member untuk bantu subscribe chanel youtube baru kita. 
https://youtube.com/@DigitalbrainIQ?si=rzuUW2BqScLUOnYc  

KETIK:
.menu
(Untuk menampilkan fitur bot)

`
)
    }catch(error){
        console.log(error)
    }
}
})
const delayMiddleware = (message, next) => {
    setTimeout(next, 5000);
  };
  async function resetCount(){
    try {
    fs.readFileSync('./database/limit.json', 'utf8', (err) => {
        if (err) {
            console.log('Error reading file:', err);
            return;
     } })
     const data = limitParse

            data.forEach(obj => {
                obj.count = 0;
            });
    
            fs.writeFile('./database/limit.json', JSON.stringify(data, null, 2), err => {
                if (err) {
                    console.log('Error writing file:', err);
                } else {
                    console.log('Count values have been set to 0 for all objects.');
                }
            });
            await message.reply("Sukses Admin.")
            fs.watchFile("./database/limit.json")
            fs.readFileSync('./database/limit.json', 'utf8', (err) => {
                if (err) {
                    console.log('Error reading file:', err);
                    return;
             } })
        } catch (err) {
            console.log('Error parsing JSON string:', err);
        }
  }
  //function time
  function time(){
  const currentTime = new Date().toLocaleTimeString();
  const local = currentTime.split("am")[0]
  if(local.startsWith("3:00:00")){
resetCount()
console.log("Limit DI RESET!")
  }
}
setInterval(time, 1000)
//end function time
client.on("message", async message =>{

    await delayMiddleware(message, async () => {
const isBOT = message.author === "6287777484154@c.us"
const isOwner = message.author === "6281381005386@c.us" || message.author === "6281933461271@c.us"
const isPremium = premiumParse.includes(message.from)
const isRegistered = registeredJson.includes(message.from);
const chat= await message.getChat();
const { isGroup } = chat
let isGroupMsg = isGroup;
    const isQuoted = message.hasQuotedMsg;

//FEATURES FUNCTION MENU
    if(isGroup){

        //Limit FUNCTION
const isReadLimit = limitParse.some(object => object.nama === message.author && object.grup === message.from) 



const isDonate = donasiParse.some(object => object.nomor === message.author)
function isdonasi(){
    if(isDonate){
        return "ᴾᵉⁿᵍᵍᵘⁿᵃ ᵈᵒⁿᵃˢⁱ"
    }
    if(isOwner){
        return "ᴼʷⁿᵉʳ ᴸᵉᵃʳⁿⁱⁿᵍᵇᵒᵗ"
    }
    if(!isDonate){
        return "ᴾᵉⁿᵍᵍᵘⁿᵃ"
    }
}
function isLimit(){
    if(isDonate || isOwner){
        return "Terdaftar"
    }else{
        return "Tidak terdaftar"
    }
    }
if(!isBOT){
    function watchJSON(){
fs.watch("./database")
fs.readFileSync("./database/limit.json", 'utf8', (err) => {
    if (err) {
        console.log('Error reading file:', err);
        return;
    }
})
    }
    
function countLimit() {
    try{
    if(isDonate){
        console.log("Member donasi")
    }else{
    const filePathLimit = "./database/limit.json"
    const existingObjectIndex = limitParse.findIndex(obj => 
        obj.nama === message.author && obj.grup === 
        message.from)
    ;
    limitParse[existingObjectIndex].count = (limitParse[existingObjectIndex].count || 0) + 1;
    const updatedJsonString = JSON.stringify(limitParse, null, 2);
        fs.writeFile(filePathLimit, updatedJsonString, (writeErr) => {
          if (writeErr) {
            console.error('Keslahan terjadi', writeErr);
          }
        });
        fs.watch(filePathLimit);
    }
        }catch(error){
           console.log(error)
        }

        }

    async function fiturBot() {
        if(message.body === ".meme"){
            if(isRegistered){
                try{
             countLimit()
             const result = memeParse[Math.floor(Math.random() * memeParse.length)]
             const media = await MessageMedia.fromUrl(result)
             await message.reply(media, message.from, {caption : `${isdonasi()}`})
                }catch (error){
                    console.log(error)
         
                }
            }
        }
        if(message.body === ".leaderboard"){
           const data= donasiParse.forEach((object) =>{
             object.nama
            })
            console.log(data)
        }
        if(message.body.startsWith(donate)){
            if(isOwner){
const query = message.body.slice(donate.length).trim()
if(query){
    try{
        if(isReadLimit){
          const limited =  limitParse.filter((object) => object.nama !== message.author)
            const stringify = JSON.stringify(limited, null, 2)
            fs.writeFileSync("./database/limit.json", stringify)
            fs.watchFile("./database/limit.json", (err) =>{
                console.log(err)
            })
        }
const filePathDonasi = "./database/donasi.json"
const data = {
    nama : `${query}`,
    nomor : `${message.from}`,
}
donasiParse.push(data)
const stringify = JSON.stringify(data, null, 2)
fs.writeFile(filePathDonasi, stringify , (err) =>{
    console.log(err)
})
await message.reply("Sukses")
fs.watchFile(filePathDonasi);
    }catch(error){
        console.log(error)
    }
}else{
    await message.reply("masukkan format dgn benar!")
}
            }else{
                await message.reply("bukan owner.")
            }
        }
        if(message.body === ".resetlimit"){
            if(isOwner){
resetCount()
            }else{
                await message.reply("sampeyan Admin?")
            }
        }
        if(message.body === ".ceklimit"){
            if(isRegistered){
                try{
            const existingObjectIndex = limitParse.findIndex(obj =>
                obj.nama === message.author 
                && obj.grup === message.from)
                if(isOwner){
await message.reply(
    `
Lu admin cok, ngapain lu cek limit?
${isdonasi()}
`)
                }else{
                if(isDonate) {
                    const parsed = JSON.parse(fs.readFileSync("./database/donate.json"))
                    const findindex = parsed.findIndex((object) => object.nomor === message.author)
                    const donates = parsed[findindex].nama
                    await message.reply(
`${donates},Kamu sudah donasi, terimakasih , No Limit.
${isdonasi()}
`)
                }else{
                if(existingObjectIndex){
            await message.reply
            (
            `Limit kamu sekarang ${limitParse[existingObjectIndex].count}, Maks 50 Limit perhari
            ${isdonasi()}
            `
            )
                }else{
                    await message.reply("Processing input DB.")
                }
            }
            }
        }
        catch(error){
            console.log(error)
        }
    }
        }
            if(message.body === ".toimg"){
                if(isRegistered){
                if(isQuoted){
                    try{
                const query = await message.getQuotedMessage()
                if(query.type === "sticker"){
                    try{
                    const media = await query.downloadMedia()
                    await client.sendMessage(message.from, media, {caption : `${isdonasi()}`})
                    countLimit();
                    }catch(error){
                        console.log(error)
                    }
                }else{
                    await message.reply("bukan gambarr")
                }
            }catch(error){
                console.log(error)
            }
            }
        }else{
            await message.reply(alertRegistered)
        }
        }
            if(message.body.startsWith(googleImage)){
                if(isRegistered){
                const googleImageQ = message.body.slice(googleImage.length).trim()
                if (googleImageQ){
                    try{
    countLimit();
    const {google} = require("./lib/googlesearch.js")
    await google(googleImageQ)
    .then(async (response) =>{
        const media= await MessageMedia.fromFilePath(response)
        await message.reply(media, message.from, {caption : `${isdonasi()}`})
    })
                }catch(error){
                    console.log(error)
    
                }
                }else{
                    await message.reply(alertFormat)
                }
            }else{
                await message.reply(alertRegistered)
            }
            }
            if(message.body.startsWith(asmaulHusna)){
                if(isRegistered){
                const query = message.body.slice(asmaulHusna.length).trim()
            if(query){
                try{
                const data = JSON.parse(asmaulHusnaFS)
                const result = data.result.find(item => item.latin.toLowerCase().includes(query.toLowerCase()));
                await message.reply(`
                ${result.translate_id}
                ${isdonasi()}
                `)
                countLimit();
                }catch(error){
                    console.log(error)
                    await message.reply("coba singkatin latinnya")
                }
            }
            }else{
                await message.reply(alertRegistered)
            }
        }
            if(message.body.startsWith(spotifySearch)){
                if(isRegistered){
                const spotifySearchQ = message.body.slice(spotifySearch.length).trim()
                if(spotifySearchQ){
                    try{
                        const spotifyApiUrl = 'https://accounts.spotify.com/api/token';
    const clientId = 'd5d6732c5e524a6fa14dac1d605c377f';
    const clientSecret = '5373a7376c5147289df7f51180399949';
    
    const postData = {
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret
    };
    
    axios.post(spotifyApiUrl, null, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      params: postData
    })
      .then(async response => {
        console.log(`Response API Spotify ${response.data.access_token}`)
        const token = response.data.access_token;
        await axios.get(`https://api.spotify.com/v1/search?q=${spotifySearchQ}&type=track`, {headers: {
            Authorization: `Bearer ${token}`,
           }}).then(async (response)=>{
    const media = await MessageMedia.fromUrl(response.data.tracks.items[0].album.images[0].url,{
        unsafeMime: true
    })
    try{
    await client.sendMessage(message.from, media,{
        caption:
    `
    DITEMUKAN LAGU SPOTIFY!
    
    Name:
    ${response.data.tracks.items[0].name}
    URL:
    ${response.data.tracks.items[0].external_urls.spotify}
    ${isdonasi()}
    `})
    countLimit();
    }
    catch(error){
        console.log(error)
    }
     }
     ).catch(async error =>{
            console.log(error)
            await message.reply(error)
           })
      })
      .catch(error => {
        console.error('Error fetching access token:', error.message);
      });
            }catch(error){
                console.log(error)
                await message.reply(error)
            }
        }else{
            await message.reply(alertFormat)
        }
    }else{
        await message.reply(alertRegistered)
    }
        }
    if(message.body.startsWith(spotifyDL)){
        if(isRegistered){
        const spotifyDLQ =message.body.slice(spotifyDL.length).trim()
        if(spotifyDLQ){
            try{
                const results = await SpottyDL.getTrack(`${spotifyDLQ}`)
                let track = await SpottyDL.downloadTrack(results, "./public/music") // Second parameter is optional...
      const linkFile = track[0].filename
      const originalFileName = path.basename(linkFile);
    const { name, ext } = path.parse(originalFileName);
    const newFileName = `${name}${ext}`;
    const media = await MessageMedia.fromUrl(`http://localhost:4000/spotify/${newFileName}`)
await client.sendMessage(message.from, media, {caption : `${isdonasi()}`})
    console.log(media)
                countLimit();
                }
        catch(error){
        console.log(error)
   
    }
    }
        }else{
            await message.reply(alertRegistered)
        }
    }
    if(message.body.includes(igdld)){
        if(isRegistered){
            const igdlQ = message.body.slice(igdld.length).trim()
            if(igdlQ){
                try{
                countLimit()
            const  {igdl} = require("./lib/igdl.js")
            await igdl(igdlQ)
            .then(
            async (response)=>{
                const media = await MessageMedia.fromFilePath(response,{unsafeMime: true})
                await message.reply(media, message.from,{
                    sendMediaAsDocument: true,
                    caption : `${isdonasi()}`
                })
            }
            )
        }catch(error){
            console.log(error)
        }
            }
        }
    }
            if(message.body.includes(antiView)){
                if(isQuoted){
                    try{
                const quoted_msg = await message.getQuotedMessage()
            const media = await quoted_msg.downloadMedia()
           await client.sendMessage(message.from, media,{caption: `${isdonasi()}`})
            countLimit();
                }catch(error){
                    console.log(error)
                }
            }
            }
            if(message.body === '.menu'){
                if(isRegistered){
                    await message.reply(
    `
    STATUS BOT : ON✅
    
    🔰FITUR BOT🔰
    -> .asmaul
        (Dengan Latin)
    -> .quotes
        (Quotes saja)
    -> .google
        (search google)
    -> .pin
        (seacrh pinterest)
    -> .ai
        (Ngobrol dengan AI)
    -> .s
        (pembuatan sticker)
    -> .spotifydl
        (download audio spotify url)
    -> .spotifysearch
        (Mencari lagu spotify)
    -> .tovn
        (File audio ke vn)
    -> .toimg
        (Stiker ke gambar)
    -> .sekalilihat
        (Mengunduh Foto sekali lihat)
    -> .islam
        (gambar random islami)
    -> .tiktok
        _(download tiktok  link) 
    -> .ytmp4 
        (Pencari vidio YT/Download lewat link)
    -> .ytmp3
        (Pencari lagu YT/Download lewat link)
    -> .photoai
        (Pencari foto yang kalian mau)
    -> .translate
        (Menerjemahkan bahasa)
    -> .stickerwm
        (sticker watermark anda)
    -> .ytsearch
         (Pencarian youtube)
    -> .searchsticker
         (Pembuat Sticker yang anda mau)
    
    ⚡CARA PAKAI BOT⚡
    Ketik:  .s (Harus disertai dengan foto)
    Ketik:  .ytsearch (Pencarian Youtube)
    Ketik:  .ytmp3 (nama lagu/music)
    Ketik:  .ytmp4_(judul vidio)_
    Ketik:  .islam 
    Ketik:  .searchsticker (nama yg kalian mau)
    Ketik:  .translate (teks yang ingin diterjemah)
    Ketik:  .stickerwm (wmnyah)
    Ketik:  .photoai (gambar yang ingin dicarj)
    Ketik:  .tiktok (link tiktok)
    
    💢NOTE💢
    1. Harus sesuai dengan cara pakai bot nyh. 
    2. Bila tidak ada  . (Titik) maka bot tidak
        akan berfungsi. 
    3. Tidak boleh spam perintah kebot
        supaya bot tidak low respon/error
        ${isdonasi()}
    `
    )
                }else{
                    await message.reply(alertRegistered)
                }
            }
            
    if(message.body.startsWith(openaic)){
        if(isRegistered){
         const searchAI = message.body.slice(openaic.length).trim();
         if(searchAI){
             try{
       await axios.get(`http://localhost:4000/openai?q=${searchAI}`)
       .then(async response =>{
     await message.reply(`
     ${response.data.data}
     ${isdonasi()}
     `);
     countLimit();
       })
     }catch(error){
         console.log(error);

     }
             }else{
         await message.reply('Masukkan Format dengan benar!');
     }
     }else{
         await message.reply(
     `
     GROUP INI BELUM TERDAFTAR, SILAHKAN DAFTAR DAHULU DENGAN OWNER
     
     atau jika ingin mencoba2 trial, silahkan untuk join group kami:
     https://chat.whatsapp.com/JfltAVdfWiE2DZPyI4U7bR
     ${isdonasi()}
     `
         );
     }
     }
     if(message.body == ".kick"){
        if(isQuoted){
const chat = await message.getQuotedMessage()
console.log(chat)
        }else{
            await message.reply("Mana orgnya?")
        }
     }
        if(message.body.startsWith(ytmp3)){
            if(isRegistered){
            const ytmp3Q = message.body.slice(ytmp3.length).trim()
            if(ytmp3Q){
                try{
                    const query = ytmp3Q
                    const respon = await yts(query)
                    const url = []
                    const pormat = respon.all
                    for (let i = 0; i < pormat.length; i++) {
                        if (pormat[i].type == 'video') {
                            let dapet = pormat[i]
                            url.push(dapet.url)
                        }
                    }
                    const id = yt.getVideoID(url[0])
                    const options = {
                        method: 'GET',
                        url: 'https://youtube-mp36.p.rapidapi.com/dl',
                        params: {id: `${id}`},
                        headers: {
                          'X-RapidAPI-Key': '93c8aa3791mshc38749411e72077p1c471ejsn911d1ffdabfb',
                          'X-RapidAPI-Host': 'youtube-mp36.p.rapidapi.com'
                        }
                      };
                      const response = await axios.request(options)
                    const media = await MessageMedia.fromUrl(response.data.link,{
                        unsafeMime: true
                      })
               await message.reply(media, message.from)
                countLimit();
                }catch(error){
                    console.log(error)
                    await message.reply("AUDIO TIDAK DITEMUKAN");
                }
                }else{
                    await message.reply(alertFormat)
                }
        }else{
            await message.reply(alertRegistered)
        }
    }
    if(message.body.startsWith(photoai)){
        const photoaiQ = message.body.slice(photoai.length).trim()
        if(photoaiQ){
            try{
                    const media = await MessageMedia.fromUrl(`http://localhost:4000/dall-e?q=${photoaiQ}`,{unsafeMime: true})
                    await client.sendMessage(message.from,media, {caption : `${isdonasi()}`})
                    countLimit();
            }catch(error){
                console.log(error)

            }
        }else{
            await message.reply(alertFormat)
        }
    }
        if(message.body.startsWith(ytsearch)){
            if(isRegistered){
            const ytsearchQ = message.body.slice(ytsearch.length).trim()
            if(ytsearchQ){
                try{
                    countLimit();
                const searchQuery = await yts(ytsearchQ)
                .then((data)=>{
                   res = data.all
                    return res
                })
                const media = await MessageMedia.fromUrl(searchQuery[0].image)
            await client.sendMessage(message.from, media,{
                caption: 
    `
    VIDEO TITLE : ${searchQuery[0].title}
    Deskripsi: ${searchQuery[0].description}
    Durasi: ${searchQuery[0].timestamp}
    URL: ${searchQuery[0].url}
    ${isdonasi()}
    `
               })
            }catch(error){
                console.log(error)

            }
            }else{
                await message.reply(alertFormat);
            }
        }else{
            await message.reply(alertRegistered)
        }
    }
    if(message.body === ".siapakahaku"){
        const parsedSiapakahaku = JSON.parse(fs.readFileSync("./lib/siapakahaku.json"))
        const randomPick = parsedSiapakahaku[Math.floor(Math.random() * parsedSiapakahaku.length)]
        await message.reply(
`
TEBAK2AN!
Waktu : 60 detik
Siapa sih gue? 
Clue : 
${randomPick.soal}
${isdonasi()}
`
        )
        let count = 0 
        let capturedLogs = [];

        // Override the default console.log function
        const originalConsoleLog = console.log;
        console.log = function(...args) {
            // Store the log message
            capturedLogs.push(args.join(' '));
            // Call the original console.log function
            originalConsoleLog.apply(console, args);
        };
interval = setInterval(async ()=>{
    if(capturedLogs.includes(randomPick.jawaban.toLowerCase() || randomPick.jawaban)){
        console.log(capturedLogs.slice(20))
       await message.reply(`Jawaban Benar!, jawabannya yaitu ${randomPick.jawaban}`)
         clearInterval(interval)
     }
        count++
        if(count === 60) {
            await message.reply("waktu kamu sudah habis.")
            clearInterval(interval)
        }
    },1000
)
    }
    const newFeature = ".feature"
    if(message.body.startsWith(newFeature)){
        function owners(){
            if(message.author === "6281381005386@c.us"){
                return "Adam"
            }else if(message.author === "6281933461271@c.us"){
                return "Hanan Gifri"
            }
        }
        const query = message.body.slice(newFeature.length).trim()
        if(query){
        if(isOwner){
            await client.sendMessage("120363192787090331@g.us",
`
PENGUMUMAN
FITUR BARU!
Pesan: 
${query}
Dari 
${owners()}
`
            )
        }else{
            await message.reply("Sampeyan owner mas?")
        }
    }else{
        await message.reply("Format tidak benar, contoh .format Pesan")
    }
}
    if(message.body.startsWith(ytmp4)){
        if(isRegistered){
        const ytmp4Q = message.body.slice(ytmp4.length).trim()
        if (ytmp4Q){
            try {
            const respon = await yts(ytmp4Q)
            const url = []
            const pormat = respon.all
            for (let i = 0; i < pormat.length; i++) {
                if (pormat[i].type == 'video') {
                    let dapet = pormat[i]
                    url.push(dapet.url)
                }
            }
            const id = yt.getVideoID(url[0])
            const options = {
                method: 'GET',
                url: 'https://ytstream-download-youtube-videos.p.rapidapi.com/dl',
                params: {id: id},
                headers: {
                  'X-RapidAPI-Key': '93c8aa3791mshc38749411e72077p1c471ejsn911d1ffdabfb',
                  'X-RapidAPI-Host': 'ytstream-download-youtube-videos.p.rapidapi.com'
                }
              };
              

                  const response = await axios.request(options);
                const respond = response.data
                const media = await MessageMedia.fromUrl(respond.formats[0].url, {unsafeMime: true})
                await message.reply(media, message.from,{caption: 
`
Title : ${respond.channelTitle}
Deskripsi : ${respond.description}
Tag :${respond.keywords}                
`})
              } catch (error) {
                  console.error(error);
              }
        }
    }else{
        await message.reply(alertRegistered)
    }
}
    if(message.body.startsWith(reverb)){
        if(isRegistered){
            if(isQuoted){
                const quoted = await message.getQuotedMessage()
            if(quoted.type === "audio"){
                try{
                const {slowed} = require("./lib/slowed.js")
                const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                let name = '';
                for (let i = 0; i < 10; i++) {
                  name += characters.charAt(Math.floor(Math.random() * characters.length));
                }
                const media = await quoted.downloadMedia()
                await fs.writeFile(`./upload/slowed/${name}.mp3`, media.data, "base64",function (err) {
                    if (err) {
                      console.log(err);
                    }
                  })
                await slowed(`./upload/slowed/${name}.mp3`)
                .then(async (response) =>{
                    const media = await MessageMedia.fromUrl(response)
                    await message.reply(media, message.from)
                })
            }catch(error){
                console.log(error)
            }
            }
        }else{
            message.reply("reply audionya dong sayang")
        }
    }
    }
    if(message.body === ".tovn"){
        if(isRegistered){
        if(isQuoted){
            try{
                countLimit();
    const query =await message.getQuotedMessage()
    if(query.type === "audio"){
    const media =await query.downloadMedia()
 await client.sendMessage(message.from, media, {
        sendAudioAsVoice:true,
    })
    }else{
        await message.reply("Bukan audio")
    }
            }catch(error){
    await message.reply(error)
            }
        }else{
            await message.reply("Reply VNNYA WOI")
        }
    }else{
        await message.reply(alertRegistered)
    }
    }
        if(message.body === ".s" || message.body === ".stiker" || message.body === ".sticker" ||message.body === ".stick" ){
            if(isRegistered){
            if(isQuoted){
                try{
                    countLimit();
            const quoted_msg = await message.getQuotedMessage()
        const media = await quoted_msg.downloadMedia()
    await client.sendMessage(message.from, media, {
            sendMediaAsSticker: true,
            stickerAuthor : 
`DIGITAL BRAIN IQ
${isdonasi()}
`,
        })
    }catch (error){
        console.log(error)

    }
    }
            if(message.type === 'image' || message.type === 'video'){
                try{
                    countLimit();
                const media = await message.downloadMedia();
                await client.sendMessage(message.from, media, {
                    sendMediaAsSticker: true,
                    stickerAuthor : 
`DIGITAL BRAIN IQ
${isdonasi()}
`,
                });
            }catch (error){
                console.log(error);
              
            }
        }
        }else{
            await message.reply(alertRegistered)
        }
    }
        if(message.body.startsWith(searchSticker)){
            if(isRegistered){
            const searchStickerQ = message.body.slice(searchSticker.length).trim();
            if(searchStickerQ){
                    try{
                        countLimit();
                            const encodedParams = new URLSearchParams();
                            encodedParams.set('source_language', 'auto');
                            encodedParams.set('target_language', 'en');
                            encodedParams.set('text', `${searchStickerQ}`);
                            
                            const options = {
                              method: 'POST',
                              url: 'https://text-translator2.p.rapidapi.com/translate',
                              headers: {
                                'content-type': 'application/x-www-form-urlencoded',
                                'X-RapidAPI-Key': '93c8aa3791mshc38749411e72077p1c471ejsn911d1ffdabfb',
                                'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
                              },
                              data: encodedParams,
                            };
                        
                                const response = await axios.request(options);
                    const respond = await axios.get(`https://vihangayt.me/search/sticker?q=${response.data.data.translatedText}`)
    const media = await MessageMedia.fromUrl(respond.data.data.sticker_url[0]);
    await client.sendMessage(message.from, media, {
        sendMediaAsSticker : true,
        stickerAuthor : 
`Digital Brain IQ
${isdonasi()}
`,
    })
    console.log(respond.data.data.sticker_url[0])
                }
                    catch (error){
                    console.log(error);
        
                }
                }else{
                    await message.reply(alertFormat);
                }    
        }else{
            await message.reply(alertRegistered)
        }
    }
    
        if(message.body.startsWith(says)){
            if(isRegistered){
            const saysQ = message.body.slice(says.length).trim()
            if(saysQ){
                try{
                    countLimit();
                    const response = await axios.get(`http://localhost:${port}/texttospeech?q=${saysQ}`)
                    const media = await axios.post(response.data.url);
        console.log(media);
                }catch (error) {
                    console.log(error)
            
                }
            }else{
             await message.reply(alertFormat)
            }
        }
        }
        if(message.body.startsWith(islamic)){
            if(isRegistered){
            try{
                countLimit();
          const islamicJSON = fs.readFileSync("./lib/Islamic.json","utf-8");
          const parsedData = JSON.parse(islamicJSON)
          const media = await MessageMedia.fromUrl(parsedData[Math.floor(Math.random() * parsedData.length)])
          await client.sendMessage(message.from, media,{caption: `${isdonasi()}`});
            }catch(error){
                console.log(error)
        }
    }else{
        await message.reply(alertRegistered)
    }
        }
        const removebg = ".removebg"
        if(message.body.startsWith(removebg)){
            if(isRegistered){
                if(message.type === "image"){
try{
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let name = '';
    for (let i = 0; i < 10; i++) {
      name += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    const {remini} = require("./lib/removebg.js")
    const media = await message.downloadMedia()
    await fs.writeFile(`./upload/${name}.jpg`,media.data,"base64", function (err) {
        if (err) {
          console.log(err);
        }
      })
    await remini(name)
    .then(async (response)=>{
        const media = await MessageMedia.fromUrl(response, {unsafeMime: true})
        await message.reply(media,message.from,{caption: isdonasi()})
    })
}catch(error){
    console.log(error)
}
                }else{message.reply("gjls amat si lo mana gambarnya")}
            }else{message.reply(alertRegistered)}
        }
        if(message.body.startsWith(translate)){
            if(isRegistered){
                if(isQuoted){
                    try{
                        countLimit();
                const quoted_msg = await message.getQuotedMessage()
                console.log(quoted_msg)
                }catch(error){
                    console.log(error)
                }
            }
            const translateQuery = message.body.slice(translate.length).trim()
            if(translateQuery){
                
                try {
                    countLimit();
                const encodedParams = new URLSearchParams();
                encodedParams.set('source_language', 'auto');
                encodedParams.set('target_language', 'id');
                encodedParams.set('text', `${translateQuery}`);
                
                const options = {
                  method: 'POST',
                  url: 'https://text-translator2.p.rapidapi.com/translate',
                  headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'X-RapidAPI-Key': '93c8aa3791mshc38749411e72077p1c471ejsn911d1ffdabfb',
                    'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
                  },
                  data: encodedParams,
                };
            
                    const response = await axios.request(options);
                    await message.reply(
        `
        HASIL TRANSLATE
        ${response.data.data.translatedText}
        DETEKSI BAHASA
        ${response.data.data.detectedSourceLanguage.name}
        ${isdonasi()}
        `
        );
                } catch (error) {
                    console.error(error);

                }
            }else{
                await message.reply(alertFormat)
            }
        }
        else{
            await message.reply(alertRegistered)
        }
    }
    if(message.body === ".hd"){
        if(isRegistered){
        if(message.type === 'image'){
            try{
            const {hd} = require("./lib/hd.js")
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let name = '';
            for (let i = 0; i < 10; i++) {
              name += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            const mediafile = await message.downloadMedia()
            await fs.writeFile(
                `./upload/${name}.jpg`,
                mediafile.data,
                "base64",
                function (err) {
                  if (err) {
                    console.log(err);
                  }
                }
              )
            await hd(name)
            .then(async (result) =>{
                const media = await MessageMedia.fromFilePath(result)
                await message.reply(media, message.from, {caption : `${isdonasi()}`})
            })
        }catch(error){
            console.log(error)
        }    
}else{
    await message.reply(alertFormat)
}
        }else{
            await message.reply(alertRegistered)
        }
    }
    if(message.body === ".quotes"){
        const query = 
    `
    ${quotesJson[Math.floor(Math.random() * quotesJson.length)].quote}
    ${quotesJson[Math.floor(Math.random() * quotesJson.length)].author}
    `
    try {
        countLimit();
    const encodedParams = new URLSearchParams();
    encodedParams.set('source_language', 'auto');
    encodedParams.set('target_language', 'id');
    encodedParams.set('text', `${query}`);
    
    const options = {
    method: 'POST',
    url: 'https://text-translator2.p.rapidapi.com/translate',
    headers: {
    'content-type': 'application/x-www-form-urlencoded',
    'X-RapidAPI-Key': '93c8aa3791mshc38749411e72077p1c471ejsn911d1ffdabfb',
    'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
    },
    data: encodedParams,
    };
    
    const response = await axios.request(options);
    await message.reply(`
    ${response.data.data.translatedText}
    ${isdonasi()}
    `

    )
    }catch(error){
    console.log(error)
    await message.reply(error)
    }
    }
           if(message.body.startsWith(stickerwm)){
            if(isRegistered){
            const querys = message.body.slice(stickerwm.length).trim();
            if(message.type === 'image' || message.type === 'video' && querys){
                try{
                    countLimit();
                    const media = await message.downloadMedia();
                    await client.sendMessage(message.from, media,{
                        sendMediaAsSticker: true,
                        stickerAuthor: `${querys}`,
                        stickerName: `${isdonasi()}`,
                    }); 
                }catch (error){
                    console.log(error)
                }
                }else{
                    return await message.reply("Masukkan Format dgn benar!");
                }
    }else{
        await message.reply(alertRegistered)
    }
    }
    if(message.body.startsWith(pinterest)){
        if(isRegistered){
        const pinquery = message.body.slice(pinterest.length).trim()
        if(pinquery) {
            countLimit()
pinterestdownloaded(pinquery)
.then(async (response) =>{
    const media = await MessageMedia.fromUrl(response)
    await message.reply(media, message.from, {caption : `${isdonasi()}`})
})
        }else{
            await message.reply(alertFormat)
        }
    }
}
    if(message.body.startsWith(tiktokAudioS)){
        if(isRegistered){
        const tiktokAudioQ = message.body.slice(tiktokAudioS.length).trim()
        if(tiktokAudioQ){
try{
countLimit()
const {tiktokAudio} = require("./lib/tiktokaudio.js")

await tiktokAudio(tiktokAudioQ)
.then(async (response)=>{
const media = await MessageMedia.fromFilePath(response)
await message.reply(media, message.from)
}
)
}catch(error){
    console.log(error)
}
        }else{
            await message.reply(alertFormat)
        }
    }else{
        await message.reply(alertRegistered)
    }
    }
    if(message.body.startsWith(tiktokVideo)){
        if(isRegistered){
            const tiktokVideoQ = message.body.slice(tiktokVideo.length).trim()
            if(tiktokVideoQ){
                try{
                    countLimit();
                 const { tiktoknowm } = require("./lib/tiktok")
                await tiktoknowm(tiktokVideoQ)
                .then(async (response) =>{
             const parsed = response.data.video.play_addr.url_list[0]

                    const media = await MessageMedia.fromUrl(parsed,{unsafeMime: true})
console.log(media)
                    })
                }catch (error){
                console.log(error);

                }
        }else{
            await message.reply(alertFormat)
        }
        }else{
            await message.reply(alertRegistered)
        }
    }
    if(message.body.startsWith(enchancer)){
        if(isRegistered){
         if(message.type === 'image'){
            try{
                countLimit();
            const mediafile = await message.downloadMedia()
            fs.writeFile(
                "./upload/output.jpg",
                mediafile.data,
                "base64",
                function (err) {
                  if (err) {
                    console.log(err);
                  }
                }
              );
              data.append('image', fs.createReadStream("./upload/output.jpg"));
    data.append('withScratch', 'true');
    
    const options = {
      method: 'POST',
      url: 'https://ai-image-enhancer.p.rapidapi.com/restore-picture',
      headers: {
        'X-RapidAPI-Key': '93c8aa3791mshc38749411e72077p1c471ejsn911d1ffdabfb',
        'X-RapidAPI-Host': 'ai-image-enhancer.p.rapidapi.com',
        ...data.getHeaders(),
      },
      data: data
    };
        const response = await axios.request(options);
        console.log(response.data);
         }catch(error){
             console.log(error)
         }
     }else{
             await message.reply(alertMedia);
         }
     }else{
        await message.reply(alertRegistered)
     }
    }
    }
    if(isDonate || isOwner){
        await fiturBot()        
        console.error(`DARI :${message.author} Grup : ${message.from} ISI PESAN : ${message.body}`);
        console.log(message.body)
    }else{
if(!isReadLimit){
    try{
const dataUser = {
    "nama" : `${message.author}`,
    "grup" : `${message.from}`,
    "count" : 1
}
limitParse.push(dataUser)
const jsonUpdate = JSON.stringify(limitParse, null, 2)
const filePathLimit = "./database/limit.json"
fs.writeFile(filePathLimit, jsonUpdate, (err)=>{
console.log(err)
}
    
)

fs.watch("./database/limit.json")

console.log(dataUser)
await fiturBot()

}catch(error){
    console.log(error)
}
}else{


        const existingObjectIndex = limitParse.findIndex(obj =>
            obj.nama === message.author 
            && obj.grup === message.from)
const isReachedLimit = limitParse[existingObjectIndex].count > 50
//END Limit FUNCTION

if(isReachedLimit){
    await watchJSON()
    await message.reply(
        `
        Limit kamu sudah habis, Silahkan menunggu sampai besok atau bisa berlangganan dengan chat Owner
        ${isdonasi()}
        `);
}else{
    await watchJSON()
       await fiturBot()
       console.error(`DARI :${message.author} Grup : ${message.from} ISI PESAN : ${message.body}`);
       console.log(message.body)
}
}
    }
}
}else{
    await message.reply("BOT INI HANYA SUPPORT DI GRUP")
}
})
}
)

//END FEATURE FUNCTION MENU
client.initialize();
