const {commands, clash, formatp} = require("../lib/");
const config = require("../config.js");
const os = require("os");
const now = require("performance-now");

clash({pattern: "menu", fromMe: false, desc: "Show all bot commands.", type: "info",},
async ({msg}) => {
const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
const speed = now() - now();
let [date, time] = new Date().toLocaleString("en-IN", {timeZone: "Asia/Kolkata"}).split(",");
let menu = `     *[${config.BOT_NAME.toLowerCase()}]*

*☼︎user:${msg.pushName}*
*☼︎date:${date}*
*☼︎time:${time}*
*☼︎author:${config.OWNER_NAME.toLowerCase()}*
*☼︎total-plugins:${commands.length}*
*☼︎speed:${speed.toFixed(4)}seconds*
*☼︎ram:${formatp(os.totalmem() - os.freemem())}/${formatp(os.totalmem())}*
*☼︎mode:${config.WORK_TYPE.toLowerCase()}*\n${readMore}`
let cmnd = [];
let cmd;
let category = [];
commands.map((clash) => {
if (clash.pattern) {
cmd = clash.pattern.toString().match(/(\W*)([A-Za-züşiğ öç1234567890]*)/)[2];
}
if (!clash.dontAddCommandList && cmd !== undefined) {
let type;
if (!clash.type) {
type = "misc";
} else {
type = clash.type.toLowerCase();
}
cmnd.push({cmd, type: type});
if (!category.includes(type)) category.push(type);
}
});
cmnd.sort();
category.sort().forEach((cmmd) => {
menu += `\n*[${cmmd.toLowerCase()}]*`;
let comad = cmnd.filter(({ type }) => type == cmmd);
comad.forEach(({cmd}, num) => {
menu += `\n*↣${(num += 1)}:${cmd.trim()}*`
});
menu += `\n`;
});
return await msg.tinyreply(menu);
});
