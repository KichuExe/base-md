const { clash } = require("../lib/");
const googleTTS = require('google-tts-api');

clash({pattern: "tts", fromMe: false, desc: "A text it will convert to audio message", type: "converter",},
async ({args, msg, conn}) => {
if(!args) return msg.reply("*_Example:.tts Hello World,en_*\n_You can check language codes from here:https://cloud.google.com/speech/docs/languages_")
var text = args.split(",")[0];
var language = args.split(",")[1];
const audiourl = googleTTS.getAudioUrl(text, {lang: language, slow: false, host: 'https://translate.google.com',});
await conn.sendMessage(msg.from,{audio:{url:audiourl},mimetype: 'audio/mpeg'},{quoted:msg});
});
