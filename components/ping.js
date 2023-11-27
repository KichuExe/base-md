const {clash} = require("../lib/");
const {tiny} = require("@toxickichux/fancytext")

clash({pattern: "ping", fromMe: false, desc: "To check ping", type: "user",},
async (message, match) => {
      const start = new Date().getTime();
      await message.reply(tiny("*Ping!*"));
      const end = new Date().getTime();
      return await message.reply(tiny(
      "*Pong!*\n " + (end - start) + "*ms*"
      ));
});
