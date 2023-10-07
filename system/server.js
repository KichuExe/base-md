const axios = require("axios")
const chalk = require('chalk')
let express = require("express");
let app = express();
const http = require('http');
let PORT = process.env.PORT || 6838;
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
let i = 0;
async function web () {
    console.log(chalk.yellowBright.bold("Starting..."))
    app.get('/', function (req, res) {
        res.send({
            status: "Active"
        });
    })
    const server = http.createServer(app);
    server.listen(PORT, () => {
        console.log(chalk.yellowBright.bold('Connected to Api -- ', PORT));
    })
    while (true) {
        i++;
        try {
            //add your server link for run 24×7hours. If you are deploying in replit
            let response = await axios("https://sever.kichuserbot.repl.co")
            console.log(chalk.yellowBright.bold('Connected to CLASH-WA-BOT SEVER -- ', response.status));
            await sleep(40000)
        } catch {
        //console.log(chalk.red.bold("Retrying..."));
        }
    }
}
module.exports = web
