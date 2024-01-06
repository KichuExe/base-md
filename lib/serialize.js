/** Copyright (C) 2024.
Licensed under the  MIT License;
You may not use this file except in compliance with the License.
* @project_name : CLASH-WA-BOT
* @author : TOXIC-KICHUX
* @credits : @author
* @note : you can copy this codes but atleast give credits!❤️🙏🏼
**/

"use strict";
const {tiny} = require("@toxickichux/fancytext")

exports.serialize = (conn, msg) => {
msg.isGroup = msg.key.remoteJid.endsWith('@g.us')
try{
const berak = Object.keys(msg.message)[0]
msg.type = berak
} catch {
msg.type = null
}
try{
const context = msg.message[msg.type].contextInfo.quotedMessage
if(context["ephemeralMessage"]){
msg.quotedMsg = context.ephemeralMessage.message
}else{
msg.quotedMsg = context
}
msg.isQuotedMsg = true
msg.quotedMsg.sender = msg.message[msg.type].contextInfo.participant
msg.quotedMsg.fromMe = msg.quotedMsg.sender === conn.user.id.split(':')[0]+'@s.whatsapp.net' ? true : false
msg.quotedMsg.type = Object.keys(msg.quotedMsg)[0]
let ane = msg.quotedMsg
msg.quotedMsg.chats = (ane.type === 'conversation' && ane.conversation) ? ane.conversation : (ane.type == 'imageMessage') && ane.imageMessage.caption ? ane.imageMessage.caption : (ane.type == 'documentMessage') && ane.documentMessage.caption ? ane.documentMessage.caption : (ane.type == 'videoMessage') && ane.videoMessage.caption ? ane.videoMessage.caption : (ane.type == 'extendedTextMessage') && ane.extendedTextMessage.text ? ane.extendedTextMessage.text : (ane.type == 'buttonsMessage') && ane.buttonsMessage.contentText ? ane.buttonsMessage.contentText : ""
msg.quotedMsg.id = msg.message[msg.type].contextInfo.stanzaId
msg.quotedMsg.key = { remoteJid: msg.key.remoteJid, fromMe: ane.fromMe, id: ane.id, participant: msg.isGroup ? ane.sender : undefined }
}catch{
msg.quotedMsg = null
msg.isQuotedMsg = false
}
msg.body = msg.message?.conversation ||
msg.message?.[msg.type]?.text ||
msg.message?.[msg.type]?.caption ||
(msg.type === 'listResponseMessage' && msg.message?.[msg.type]?.singleSelectReply?.selectedRowId) ||
(msg.type === 'buttonsResponseMessage' && msg.message?.[msg.type]?.selectedButtonId) ||
(msg.type === 'templateButtonReplyMessage' && msg.message?.[msg.type]?.selectedId) ||
''
try{
const mention = msg.message[msg.type].contextInfo.mentionedJid
msg.mentioned = mention
}catch{
msg.mentioned = []
}
if (msg.isGroup){
msg.sender = msg.participant
}else{
msg.sender = msg.key.remoteJid
}
if (msg.key.fromMe){
msg.sender = conn.user.id.split(':')[0]+'@s.whatsapp.net'
}
msg.from = msg.key.remoteJid
msg.now = msg.messageTimestamp
msg.fromMe = msg.key.fromMe
msg.editmsg = async (teks, keys = {}) => {
let editMessage = {text: teks, edit: keys}
return conn.sendMessage(msg.from, editMessage)
}
msg.reply = async (txt) => conn.sendMessage(msg.from, {text:txt},{quoted:msg})
msg.react = async (emoticon = {}) => {
let reactionMessage = {react:{text: emoticon, key: msg.key}}
return await conn.sendMessage(msg.from, reactionMessage)
} 
msg.tinyreply = async (txt) => conn.sendMessage(msg.from, {text:tiny(txt)},{quoted:msg})
return msg
}
