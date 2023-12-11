const axios = require("axios")
let express = require("express");
let app = express();
const http = require('http');
let PORT = process.env.PORT || 6838;
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
let i = 0;

async function web() {
console.log("Starting...")
app.get('/', function (req, res) {
res.send({
        status: "Active"
        });
})
const server = http.createServer(app);
server.listen(PORT, () => {
console.log('Connected to Api -- ', PORT);
})
while (true) {
i++;
try {
let response = await axios("web app link") //Add here your webview link(@NOTE:If you are deploying in replit!)
console.log('Connected to CLASH-WA-BOT SEVER -- ', response.status);
await sleep(40000)
} catch {
console.log(chalk.red.bold("Retrying..."));
}
}
}

module.exports = web
