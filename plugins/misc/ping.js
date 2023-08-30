module.exports = {
    name: "ping",
    category: "misc",
    desc: "Bot response.",
    async exec({ msg, client }) {
    let start = new Date().getTime();        
    let { key } = await msg.reply(`*Ping!*`);
    let end = new Date().getTime();
    var speed = end - start;
    await client.edit(`*_Response in_*\n*_${speed}ms!_*`,key);
    }
}
