const {clash, API} = require("../lib/");
const axios = require("axios");

clash({pattern: "insta", fromMe: false, desc: "Download posts from Instagram", type: "downloader",},
async ({args, msg, conn}) => {
if(!args) return await msg.tinyreply("*_Enter instagram post url!_*");
let {key} = await msg.tinyreply("*_Downloading..._*");
try{
var res = await axios.get(`${API}/api/insta?url=${args}`)
let response = await res.data
for (let i of response.data) {
var type = i.type
await conn.sendMessage(msg.from,{[type]:{url:i.url}},{quoted:msg});
return await msg.editmsg("*_Uploaded!_*", key);
}
} catch (e) {
msg.editmsg("*_Error!_*", key);
}
});
