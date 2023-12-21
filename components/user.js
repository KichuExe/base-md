const {clash, sleep} = require("../lib/");

clash({pattern: "reboot", fromMe: true, desc: "Reboot the bot", type: "user",},
async ({msg}) => {
const { exec } = require("child_process")
msg.tinyreply("*Rebooting...*");
await sleep(2000)
exec('pm2 restart all')
});
