const expressStatic = require('express-static');
const SpottyDL = require('spottydl')
const path = require('path');
const {Client, MessageMedia,LocalAuth,  Buttons} = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')
const app = express();
const OpenAI = require('openai')
const fs = require('fs');
const util = require("util");
const scraper = require("insta-scraper")
const FormData = require("form-data")
const data = new FormData();
const port = 4000
const currentDate = new Date();

const currentHours = currentDate.getHours();
const currentMinutes = currentDate.getMinutes();

const openai = new OpenAI({
    apiKey: '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',
})
const staticPathSpotify = path.join(__dirname, 'public/music');
const staticPathTiktok = path.join(__dirname, 'public/tiktok');
console.log(staticPathTiktok)
const yt = require("ytdl-core")
const yts = require("yt-search");
const { isRequestOptions } = require('openai/core');
const registered = fs.readFileSync("./database/registered.json")
const groupLearning = fs.readFileSync("./database/learningbotGroup.json")
const quotes = fs.readFileSync("./database/quotes.json")
const tebakGambar = fs.readFileSync("./database/tebakgambar.json")
const asmaulHusnaFS =fs.readFileSync("./lib/AsmaulHusna.json")
const premiumJson = fs.readFileSync("./database/premium.json")
const limitJson = fs.readFileSync("./database/limit.json")
//ALERT
const alertFormat = "Masukkan Format dengan benar!"
const alertMedia = "Masukkan media dengan benar!"
const alertError = "Ada kesalahan terjadi, Silahan untuk menghubungi owner terkait kesalahan ini."
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
app.get('/tiktok', (req, res) => {
    const directoryPathT = staticPathTiktok;
  
    fs.readdir(directoryPathT, (err, files) => {
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
  app.get('/tiktok/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(staticPathTiktok, filename);
console.log(filePath)
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
const openaic = '.ai';
const mtkresolve = ".mtk"
const googleImage = ".gimage"
const ytmp3 = ".ytmp3"
const ytsearch = ".ytsearch"
const generateImage = ".generateimg"
const antiView = ".sekalilihat"
const spotifySearch = ".spotifysearch"
const spotifyDL = ".spotifydl"
const asmaulHusna = ".asmaul"
//END QUERY

//PARSE JSON
const groupLearningbot = JSON.parse(groupLearning)
const registeredJson = JSON.parse(registered)
const quotesJson = JSON.parse(quotes)
const premiumParse= JSON.parse(premiumJson)
const limitParse = JSON.parse(limitJson)
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
client.on("group_join", async (group) =>{
    const isGroupLearningBot = groupLearningbot.includes(group.chatId)
    if(isGroupLearningBot){
    try{
    console.log(group)
    const id = group.id.participant.split("@c.us")
client.sendMessage(group.chatId,
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
client.on("message", async message =>{

    delayMiddleware(message, async () => {
const isBOT = message.author === "6287769586380@c.us" || message.author === "6287777484154@c.us"
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
console.log(isReadLimit)


if(!isBOT){
    
function countLimit() {
    try{
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
        }catch(error){
            message.reply(alertError)
        }
        }
    async function fiturBot() {
        if(message.body === ".ceklimit"){
            const existingObjectIndex = limitParse.findIndex(obj =>
                obj.nama === message.author 
                && obj.grup === message.from)
                if(existingObjectIndex){
            message.reply
            (
            `Limit kamu sekarang ${limitParse[existingObjectIndex].count}, Maks 50 Limit perhari`
            )
                }else{
                    message.reply("Processing input DB.")
                }
        }
            if(message.body === ".toimg"){
                if(isRegistered){
                if(isQuoted){
                const query = await message.getQuotedMessage()
                if(query.type === "sticker"){
                    const media = await query.downloadMedia()
                    client.sendMessage(message.from, media)
                    countLimit();
                }else{
                    message.reply("bukan gambarr")
                }
            }
        }else{
            message.reply(alertRegistered)
        }
        }
            if(message.body.startsWith(googleImage)){
                const googleImageQ = message.body.slice(googleImage.length).trim()
                if (googleImageQ){
                    try{
                    await axios.get(`https://serpapi.com/search.json?q=${googleImageQ}&location=Indonesia&hl=id&gl=id&google_domain=google.co.id&api_key=241626a62255f84332c876b0d3f75fac384ecafa4e9b621be319a3b09c536a2a`)
                    .then(async (response)=>{
    const media = await MessageMedia.fromUrl(response.data.inline_images[0].thumbnail,{
        unsafeMime: true,
    })
    client.sendMessage(message.from, media)
    countLimit();
                    })
                }catch(error){
                    console.log(error)
                    message.reply(alertError)
                }
                }else{
                    message.reply(alertFormat)
                }
            }
            if(message.body.startsWith(asmaulHusna)){
                if(isRegistered){
                const query = message.body.slice(asmaulHusna.length).trim()
            if(query){
                try{
                const data = JSON.parse(asmaulHusnaFS)
                const result = data.result.find(item => item.latin.toLowerCase().includes(query.toLowerCase()));
                message.reply(result.translate_id)
                countLimit();
                }catch(error){
                    console.log(error)
                    message.reply("coba singkatin latinnya")
                }
            }
            }else{
                message.reply(alertRegistered)
            }
        }
            if(message.body === ".removebg"){
                if(message.type === 'image'){
                    try{
                        const mediafile = await message.downloadMedia();
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
    data.append('image_file', fs.createReadStream("./upload/output.jpg",));
    data.append('get_file', '1')
    const headers = {
        'Rm-Token': "65a678431a5b76.41018284",
        ...data.getHeaders(),
      };
                    await axios.post("https://api.removal.ai/3.0/remove",{ headers, responseType: 'arraybuffer' })
                    .then(response => {
                      fs.writeFileSync('transparent_image.png', Buffer.from(response.data, 'binary'));
                    })
                    .catch(error => {
                      console.error('Error:', error.message);
                    })
                }catch(error){
                    console.log(error)
                }
                }else{
                    message.reply("Gambarnya Mana?")
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
    client.sendMessage(message.from, media,{
        caption:
    `
    DITEMUKAN LAGU SPOTIFY!
    
    Name:
    ${response.data.tracks.items[0].name}
    URL:
    ${response.data.tracks.items[0].external_urls.spotify}
    `})
    countLimit();
     }
     ).catch(error =>{
            console.log(error)
            message.reply(error)
           })
      })
      .catch(error => {
        console.error('Error fetching access token:', error.message);
      });
            }catch(error){
                console.log(error)
                message.reply(error)
            }
        }else{
            message.reply(alertFormat)
        }
    }else{
        message.reply(alertRegistered)
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
    client.sendMessage(message.from, media)
    console.log(media)
                countLimit();
                }
        catch(error){
        console.log(error)
        message.reply(alertError)
    }
    }
        }else{
            message.reply(alertRegistered)
        }
    }
            if(message.body.includes(antiView)){
                if(isQuoted){
                    try{
                const quoted_msg = await message.getQuotedMessage()
            const media = await quoted_msg.downloadMedia()
            client.sendMessage(message.from, media)
            countLimit();
                }catch(error){
                    message.reply(alertError)
                }
            }
            }
            if(message.body === '.menu'){
                if(isRegistered){
                    message.reply(
    `
    STATUS BOT : ON✅
    
    🔰FITUR BOT🔰
    -> .asmaul
        (Dengan Latin)
    -> .quotes
        (Quotes saja)
    -> .ai
        (Ngobrol dengan AI)
    -> .mtk
        (Soal mtk)
    -> .s
        (pembuatan sticker)
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
    `
    )
                }else{
                    message.reply(alertRegistered)
                }
            }
            
    if(message.body.startsWith(openaic)){
        if(isRegistered){
         const searchAI = message.body.slice(openaic.length).trim();
         if(searchAI){
             try{
       await axios.get(`http://localhost:4000/openai?q=${searchAI}`)
       .then( response =>{
     message.reply(response.data.data);
     countLimit();
       })
     }catch(error){
         console.log(error);
         message.reply(alertError);
     }
             }else{
         message.reply('Masukkan Format dengan benar!');
     }
     }else{
         message.reply(
     `
     GROUP INI BELUM TERDAFTAR, SILAHKAN DAFTAR DAHULU DENGAN OWNER
     
     atau jika ingin mencoba2 trial, silahkan untuk join group kami:
     https://chat.whatsapp.com/JfltAVdfWiE2DZPyI4U7bR
     `
         );
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
                client.sendMessage(message.from, media)
                countLimit();
                }catch(error){
                    console.log(error)
                    message.reply("AUDIO TIDAK BOLEH LEBIH DARI 2 JAM.");
                }
                }else{
                    message.reply(alertFormat)
                }
        }else{
            message.reply(alertRegistered)
        }
    }
    if(message.body.startsWith(generateImage)){
        const generateImageQ = message.body.slice(generateImage.length).trim()
        if(generateImageQ){
            try{
                    const media = await MessageMedia.fromUrl(`http://localhost:4000/dall-e?q=${generateImageQ}`,{unsafeMime: true})
                    client.sendMessage(message.from,media)
                    countLimit();
            }catch(error){
                console.log(error)
                message.reply(alertError)
            }
        }else{
            message.reply(alertFormat)
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
               client.sendMessage(message.from, media,{
                caption: 
    `
    VIDEO TITLE : ${searchQuery[0].title}
    Deskripsi: ${searchQuery[0].description}
    Durasi: ${searchQuery[0].timestamp}
    URL: ${searchQuery[0].url}
    `
               })
            }catch(error){
                console.log(error)
                message.reply(alertError)
            }
            }else{
                message.reply(alertFormat);
            }
        }else{
            message.reply(alertRegistered)
        }
    }
        if(message.body.startsWith(ytmp4)){
            if(isRegistered){
            const ytmp4Q = message.body.slice(ytmp4.length).trim()
            if (ytmp4Q){
                try{
                    countLimit();
                    const id = yt.getVideoID(ytmp4Q);
                   await yt.getInfo(`https://www.youtube.com/watch?v=${id}`)
                    .then(async (data) =>{
                        let pormat = data.formats
                        let video = []
                        for (let i = 0; i < pormat.length; i++) {
                            if (pormat[i].container == 'mp4' && pormat[i].hasVideo == true && pormat[i].hasAudio == true) {
                              let vid = pormat[i]
                              video.push(vid.url)
                            }
                          }
                          const title = data.player_response.microformat.playerMicroformatRenderer.title.simpleText
                          const thumb = data.player_response.microformat.playerMicroformatRenderer.thumbnail.thumbnails[0].url
                          const channel = data.player_response.microformat.playerMicroformatRenderer.ownerChannelName
                          const views = data.player_response.microformat.playerMicroformatRenderer.viewCount
                          const published = data.player_response.microformat.playerMicroformatRenderer.publishDate
                          
                          const result = {
                            title: title,
                            thumb: thumb,
                            channel: channel,
                            published: published,
                            views: views,
                            url: video[0]
                          }
                          const media = await MessageMedia.fromUrl(result.url,{
                            unsafeMime: true
                          })
                         client.sendMessage(message.from,media,{
                            caption: 
    `
    TITLE: ${result.title}
    VIEWS: ${result.views}                      
    `
                         }
    );
                    })
                }catch(error){
                    console.log(error);
                    message.reply("Link Tidak tersedia atau kesalahan terjadi.");
                }
            }
        }else{
            message.reply(alertRegistered)
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
    client.sendMessage(message.from, media, {
        sendAudioAsVoice:true
    })
    }else{
        message.reply("Bukan audio")
    }
            }catch(error){
    message.reply(error)
            }
        }else{
            message.reply("Reply VNNYA WOI")
        }
    }else{
        message.reply(alertRegistered)
    }
    }
        if(message.body === ".s" || message.body === ".stiker" || message.body === ".sticker" ||message.body === ".stick" ){
            if(isRegistered){
            if(isQuoted){
                try{
                    countLimit();
            const quoted_msg = await message.getQuotedMessage()
        const media = await quoted_msg.downloadMedia()
        client.sendMessage(message.from, media, {
            sendMediaAsSticker: true,
            stickerAuthor : "DIGITAL BRAIN IQ"
        })
    }catch (error){
        console.log(error)
        message.reply(alertError);
    }
    }
            if(message.type === 'image' || message.type === 'video'){
                try{
                    countLimit();
                const media = await message.downloadMedia();
                client.sendMessage(message.from, media, {
                    sendMediaAsSticker: true,
                    stickerAuthor : "DIGITAL BRAIN IQ"
                });
            }catch (error){
                console.log(error);
                message.reply(alertError);
            }
        }
        }else{
            message.reply(alertRegistered)
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
    client.sendMessage(message.from, media, {
        sendMediaAsSticker : true,
        stickerAuthor : "Digital Brain IQ"
    })
    console.log(respond.data.data.sticker_url[0])
                }
                    catch (error){
                    console.log(error);
                    message.reply(alertError);
                }
                }else{
                    message.reply(alertFormat);
                }    
        }else{
            message.reply(alertRegistered)
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
                    message.reply(alertError);
                }
            }else{
             message.reply(alertFormat)
            }
        }
        }
        if(message.body.startsWith(islamic)){
            if(isRegistered){
            try{
                countLimit();
          const islamicJSON = fs.readFileSync("./lib/Islamic.json","utf-8");
          const parsedData = JSON.parse(islamicJSON)
          const media = await MessageMedia.fromUrl(parsedData[Math.floor(Math.random() * 500)])
          client.sendMessage(message.from, media);
            }catch(error){
                console.log(error)
                message.reply(alertError)
        }
    }else{
        message.reply(alertRegistered)
    }
        }
        if(message.body.startsWith(translate)){
            if(isRegistered){
                if(isQuoted){
                    try{
                        countLimit();
                const quoted_msg = await message.getQuotedMessage()
                console.log(quoted_msg)
                }catch(error){
                    message.reply(alertError)
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
                    message.reply(
        `
        HASIL TRANSLATE
        ${response.data.data.translatedText}
        DETEKSI BAHASA
        ${response.data.data.detectedSourceLanguage.name}
        `
        );
                } catch (error) {
                    console.error(error);
                    message.reply(alertError);
                }
            }else{
                message.reply(alertFormat)
            }
        }
        else{
            message.reply(alertRegistered)
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
    message.reply(response.data.data.translatedText)
    }catch(error){
    console.log(error)
    message.reply(error)
    }
    }
        if(message.body.startsWith(photoai)){
            if(isRegistered){
            const photosai = message.body.slice(photoai.length).trim()
            if(photosai){
    try{
        countLimit();
               const response = await axios.get(`https://vihangayt.me/tools/photoleap?q=${photosai}`)
                   const media = await MessageMedia.fromUrl(response.data.data);
                  client.sendMessage(message.from, media,{
                    caption: "Generated!"   
                   })
                }catch(error){
                    console.log(error)
                    message.reply(alertError)
                }
           }else{
               message.reply(alertFormat)
            }
           }
           else{
            message.reply(alertRegistered)
        }
    }
           if(message.body.startsWith(stickerwm)){
            if(isRegistered){
            const querys = message.body.slice(stickerwm.length).trim();
            if(message.type === 'image' || message.type === 'video' && querys){
                try{
                    countLimit();
                    const media = await message.downloadMedia();
                    client.sendMessage(message.from, media,{
                        sendMediaAsSticker: true,
                        stickerAuthor: `${querys}`,
                        stickerName: `${querys}`,
                    }); 
                }catch (error){
                    console.log(error)
                    message.reply(alertError);
                }
                }else{
                    return message.reply("Masukkan Format dgn benar!");
                }
    }else{
        message.reply(alertRegistered)
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
                    const media = await MessageMedia.fromFilePath(response)
                    client.sendMessage(message.from, media)
                    })
                }catch (error){
                console.log(error);
                message.reply(alertError);
                }
        }else{
            message.reply(alertFormat)
        }
        }else{
            message.reply(alertRegistered)
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
             message.reply(alertError);
         }
     }else{
             message.reply(alertMedia);
         }
     }else{
        message.reply(alertRegistered)
     }
    }
    }
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
    message.reply("Limit kamu sudah habis, Silahkan menunggu sampai besok atau bisa berlangganan dengan chat Owner");
}else{
       await fiturBot()
       console.log(`DARI :${message.author} Grup : ${message.from} ISI PESAN : ${message.body}`);
}
}
}
}else{
    message.reply("BOT INI HANYA SUPPORT DI GRUP")
}
})
}
)

//END FEATURE FUNCTION MENU
client.initialize();