const { downloadContentFromMessage, proto } = require("@whiskeysockets/baileys");
const Bluebird = require("bluebird");
const clc = require("chalk");
const moment = require("moment");


const color = (text, color) => {
	return !color ? clc.green(text) : clc.keyword(color)(text);
}

const calculatePing = function (timestamp, now) {
	return moment.duration(now - moment(timestamp * 1000)).asSeconds();
};

/**
 * downloadMediaMessage
 * @param {proto.IMessage} message
 * @param {string} pathFile
 * @returns
 */
const downloadMedia = (message, pathFile) =>
	new Bluebird(async (resolve, reject) => {
		const type = Object.keys(message)[0];
		let mimeMap = {
			imageMessage: "image",
			videoMessage: "video",
			stickerMessage: "sticker",
			documentMessage: "document",
			audioMessage: "audio",
		};
		try {
			if (pathFile) {
				const stream = await downloadContentFromMessage(message[type], mimeMap[type]);
				let buffer = Buffer.from([]);
				for await (const chunk of stream) {
					buffer = Buffer.concat([buffer, chunk]);
				}
				await fs.promises.writeFile(pathFile, buffer);
				resolve(pathFile);
			} else {
				const stream = await downloadContentFromMessage(message[type], mimeMap[type]);
				let buffer = Buffer.from([]);
				for await (const chunk of stream) {
					buffer = Buffer.concat([buffer, chunk]);
				}
				resolve(buffer);
			}
		} catch (e) {
			reject(e);
		}
	});

module.exports = {
	color,
	calculatePing,
    downloadMedia
};
