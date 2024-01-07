/** Copyright (C) 2024.
Licensed under the  MIT License;
You may not use this file except in compliance with the License.
* @project_name : CLASH-WA-BOT
* @author : TOXIC-KICHUX
* @credits : @author
* @note : you can copy this codes but atleast give credits!❤️🙏🏼
**/

"use strict";
const {default: makeWASocket, DisconnectReason, makeInMemoryStore, useMultiFileAuthState, generateWAMessageFromContent, getAggregateVotesInPollMessage} = require("@whiskeysockets/baileys")
const figlet = require("figlet");
const fs = require("fs");
const moment = require('moment')
const logg = require('pino')
const config = require("./config.js")
const path = require("path");
const { serialize } = require("./lib/serialize.js");
const time = moment(new Date()).format('HH:mm:ss DD/MM/YYYY')

function title() {
console.clear()
console.log(figlet.textSync('CLASH-WA-BOT', {font: 'Standard', horizontalLayout: 'default', verticalLayout: 'default', width: 80, whitespaceBreak: false}))
}
/**
* Uncache if there is file change;
* @param {string} module Module name or path;
* @param {function} cb <optional> ;
*/
function nocache(module, cb = () => { }) {
console.log(`Module ${module} are being watched for changes`) 
fs.watchFile(require.resolve(module), async () => {
await uncache(require.resolve(module))
cb(module)
})}
/**
* Uncache a module
* @param {string} module Module name or path;
*/
function uncache(module = '.') {
return new Promise((resolve, reject) => {
try {
delete require.cache[require.resolve(module)]
resolve()
} catch (e) {
reject(e)
}})}
const status = `Booting WhatsApp Bot`;
const starting = `Preparing After Connect`;
const reconnect = `Reconnecting WhatsApp Bot`;
const store = makeInMemoryStore({ logger: logg().child({ level: 'fatal', stream: 'store' }) })
async function fanStart() {
const connectToWhatsApp = async () => {
const { state, saveCreds } = await useMultiFileAuthState('session')
const conn = makeWASocket({printQRInTerminal: true, logger: logg({ level: 'fatal' }), auth: state,
browser: ["CLASH-WA-BOT", "Safari", "3.0"], 
getMessage: async key => {
return {
}}})
title()
store.bind(conn.ev)
setInterval(() => {
store.writeToFile("./lib/database/store.json");
}, 30 * 1000);
//Auto Update
require('./lib/serialize.js')
require('./lib/message.js')
nocache('./lib/serialize.js', module => console.log(`[ CLASH-WA-BOT ]  ${time} ${module} has been updated!`))
nocache('./lib/message.js', module => console.log(`[ CLASH-WA-BOT ]  ${time} ${module} has been updated!`))
console.log("Syncing Database...");
config.DATABASE.sync();
console.log("⬇️Installing Plugins...");
fs.readdirSync(__dirname + "/components").forEach((plugin) => {
if (path.extname(plugin).toLowerCase() == ".js") {
require(__dirname + "/components/" + plugin);
}});
console.log("✅Plugins Installed!");
conn.multi = true
conn.nopref = true
conn.prefa = 'clash-wa-bot'
conn.ev.on('messages.upsert', async m => {
if (!m.messages) return;
var msg = m.messages[0]
try { if (msg.message.messageContextInfo) delete msg.message.messageContextInfo } catch { }
msg = serialize(conn, msg)
msg.isBaileys = msg.key.id.startsWith('BAE5')
require('./lib/message.js')(conn, msg, m, store)
})
conn.ev.on('connection.update', (update) => {
if (global.qr !== update.qr) {
global.qr = update.qr
}
const { connection, lastDisconnect } = update
if (connection === 'close') {
lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut ? connectToWhatsApp() : console.log('connection logged out...')
}})
//////////////////////////////////////
async function getMessage(key){
if (store) {
const msg = await store.loadMessage(key.remoteJid, key.id)
return msg?.message
}
return {
conversation: "Txt"
}}
conn.ev.on('messages.update', async chatUpdate => {
for(const { key, update } of chatUpdate) {
if(update.pollUpdates && key.fromMe) {
const pollCreation = await getMessage(key)
if(pollCreation) {
const pollUpdate = await getAggregateVotesInPollMessage({
message: pollCreation,
pollUpdates: update.pollUpdates,
})
var toCmd = pollUpdate.filter(v => v.voters.length !== 0)[0]?.name
if (toCmd == undefined) return
var prefCmd = toCmd
conn.appenTextMessage(prefCmd, chatUpdate)
}}}})
  //////////////////////////////////////
conn.ev.on('creds.update', await saveCreds)
conn.reply = (from, content, msg) => conn.sendMessage(from, { text: content }, { quoted: msg })
conn.sendMessageFromContent = async(jid, message, options = {}) => {
var option = { contextInfo: {}, ...options }
var prepare = await generateWAMessageFromContent(jid, message, option)
await conn.relayMessage(jid, prepare.message, { messageId: prepare.key.id })
return prepare
}
return conn
}
connectToWhatsApp()
.catch(err => console.log(err))
}
fanStart();
