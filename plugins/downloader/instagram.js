const { sendIGDL } = require("wa-bot-functions");

module.exports = {
    name: "insta",
    category: "downloader",
    desc: "Downloading posts from instagram.",
    async exec({ msg, client, args }) {
    await sendIGDL(msg, client, args);
    }
}
