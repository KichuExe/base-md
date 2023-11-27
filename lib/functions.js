/** Copyright (C) 2023.
Licensed under the  MIT License;
You may not use this file except in compliance with the License.
* @project_name : CLASH-WA-BOT
* @author : TOXIC-KICHUX
**/

const axios = require("axios");
const {jidDecode, delay} = require("@whiskeysockets/baileys");
const id3 = require("browser-id3-writer");
const fs = require("node-webpmux/io");
const {readFile, unlink} = require("fs/promises");
const {fromBuffer} = require("file-type");

/**
*
* @param {*} url
* @param {*} options
* @returns
*
**/
exports.getBuffer = async(url, options) => {
    try {
        options ? options: {};
        const res = await require("axios")({
        method: "get",
                url,
                headers: {
                DNT: 1,
               "Upgrade-Insecure-Request": 1,
               },
               ...options,
               responseType: "arraybuffer",
               });
               return res.data;
    } catch (e) {
        console.log(`Error : ${e}`);
    }
}

/**
*
* @param {*} jid
* @returns
*
**/
exports.decodeJid = async(jid) => {
    if (!jid) return jid;
    if (/:\d+@/gi.test(jid)) {
        const decode = jidDecode(jid) || {};
        return decode.user && decode.server
        ? `${decode.user}@${decode.server}`: jid;
    } else {
        return jid;
    }
}

/**
*
* @param {*} url
* @returns
*
**/
exports.FiletypeFromUrl = async(url) => {
    const buffer = await getBuffer(url);
    const out = await fromBuffer(buffer);
    let type
    if (out) {
        type = out.mime.split('/')[0]
    }
    return {
        type,
        buffer
    }
}

/**
*
* @param {*} message
* @returns
*
**/
exports.extractUrlFromMessage = async(message) => {
    const urlRegex = /(https?:\/\/[^\s]+)/gi;
    const match = urlRegex.exec(message);
    return match ? match[0]: null;
}

/**
*
* @param {*} jid
* @param {*} user
* @param {*} client
* @returns
*
**/
exports.isAdmin = async(jid, user, client) => {
        const groupMetadata = await client.groupMetadata(jid);
        const groupAdmins = groupMetadata.participants
        .filter((participant) => participant.admin !== null)
        .map((participant) => participant.id);

        return groupAdmins.includes(decodeJid(user));
    }

/**
*
* @param {*} text
* @returns
*
**/
exports.parseJid = async(text = "") => {
        return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(
            (v) => v[1] + "@s.whatsapp.net"
        );
    }

/**
*
* @param {*} text
* @returns
*
**/
exports.parsedJid = async(text = "") => {
        return [...text.matchAll(/([0-9]{5,16}|0)/g)].map(
            (v) => v[1] + "@s.whatsapp.net"
        );
}

/**
*
* @param {*} url
* @param {*} options
* @returns
*
**/
exports.getJson = async(url, options) => {
        try {
            options ? options: {};
            const res = await axios({
                method: "GET",
                url: url,
                headers: {
                    "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36",
                },
                ...options,
            });
            return res.data;
        } catch (err) {
            return err;
        }
    }

/**
*
* @param {*} url
* @returns
*
**/
exports.isIgUrl = async(url) => {
        /(?:(?:http|https):\/\/)?(?:www.)?(?:instagram.com|instagr.am|instagr.com)\/(\w+)/gim.test(
            url
        );
    }

/**
*
* @param {*} url
* @returns
*
**/
exports.isUrl = async(url) => {
        return new RegExp(
            /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/,
            "gi"
        ).test(url);
    }

/**
*
* @param {*} url
* @returns
*
**/
exports.getUrl = async(url) => {
        return url.match(
            new RegExp(
                /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/,
                "gi"
            )
        );
    }

/**
*
* @param {*} string
* @returns
*
**/
exports.qrcode = async(string) => {
        const {
            toBuffer
        } = require("qrcode");
        let buff = await toBuffer(string);
        return buff;
    }

/**
*
* @param {*} seconds
* @returns
*
**/
exports.secondsToDHMS = async(seconds) => {
        seconds = Number(seconds);
        var d = Math.floor(seconds / (3600 * 24));
        var h = Math.floor((seconds % (3600 * 24)) / 3600);
        var m = Math.floor((seconds % 3600) / 60);
        var s = Math.floor(seconds % 60);
        var dDisplay = d > 0 ? d + (d == 1 ? " D, ": " D, "): "";
        var hDisplay = h > 0 ? h + (h == 1 ? " H, ": " H, "): "";
        var mDisplay = m > 0 ? m + (m == 1 ? " M, ": " M, "): "";
        var sDisplay = s > 0 ? s + (s == 1 ? " S": " S"): "";
        return dDisplay + hDisplay + mDisplay + sDisplay;
    }

/**
*
* @param {*} bytes
* @param {*} decimals = 2
* @returns
*
**/
exports.formatBytes = async(bytes, decimals = 2) => {
        if (!+bytes) return "0 Bytes";
        const k = 1024;
        const dm = decimals < 0 ? 0: decimals;
        const sizes = ["Bytes",
            "KB",
            "MB",
            "GB",
            "TB",
            "PB",
            "EB",
            "ZB",
            "YB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
    }

/**
*
* @param {*} null
* @returns
*
**/
exports.sleep = async() => {
delay
}

/**
*
* @param {*} duration
* @returns
*
**/
exports.clockString = async(duration) => {
        (seconds = Math.floor((duration / 1000) % 60)),
        (minutes = Math.floor((duration / (1000 * 60)) % 60)),
        (hours = Math.floor((duration / (1000 * 60 * 60)) % 24));

        hours = hours < 10 ? "0" + hours: hours;
        minutes = minutes < 10 ? "0" + minutes: minutes;
        seconds = seconds < 10 ? "0" + seconds: seconds;

        return hours + ":" + minutes + ":" + seconds;
    }

/**
*
* @param {*} null
* @returns
*
**/
exports.runtime = async() => {
        const duration = process.uptime();
        const seconds = Math.floor(duration % 60);
        const minutes = Math.floor((duration / 60) % 60);
        const hours = Math.floor((duration / (60 * 60)) % 24);

        const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

        return formattedTime;
    }

/**
*
* @param {*} songbuffer
* @param {*} coverBuffer
* @param {*} options
* @returns
*
**/
exports.AddMp3Meta = async(songbuffer, coverBuffer, options = {title: "CLASH-WA-BOT", artist: ["TOXIC-KICHUX"]}) => {
        if (!Buffer.isBuffer(songbuffer)) {
            songbuffer = await getBuffer(songbuffer);
        }
        if (!Buffer.isBuffer(coverBuffer)) {
            coverBuffer = await getBuffer(coverBuffer);
        }
        const writer = new id3(songbuffer);
        writer
        .setFrame("TIT2", options.title)
        .setFrame("TPE1", ["CLASH-WA-BOT"])
        .setFrame("APIC", {
            type: 3,
            data: coverBuffer,
            description: "Simple whatsapp bot",
        });
        writer.addTag();
        return Buffer.from(writer.arrayBuffer);
    }

/**
*
* @param {*} buffer
* @param {*} start
* @param {*} end
* @returns
*
**/
exports.Mp3Cutter = async(buffer, start, end) => {
        return new Promise(async (resolve) => {
            const MP3Cutter = require("./Media/cutter");
            let src = "mp3cut";
            fs.writeFileSync(src, buffer);
            let target = `mp3cutf`;
            var q = parseInt(start);
            if (q === 0) q = 1;
            MP3Cutter.cut({
                src: src,
                target: target,
                start: q,
                end: end,
            });
            let buff = await readFile(target);
            resolve(buff);
            await unlink(target);
            return await unlink(src);
        });
    }

/**
*
* @param {*} url
* @returns
*
**/
exports.Bitly = async(url) => {
        return new Promise((resolve, reject) => {
            const BitlyClient = require("bitly").BitlyClient;
            const bitly = new BitlyClient("6e7f70590d87253af9359ed38ef81b1e26af70fd");
            bitly
            .shorten(url)
            .then((a) => {
                resolve(a);
            })
            .catch((A) => reject(A));
            return;
        });
    }

/**
*
* @param {*} null
* @returns
*
**/
exports.isNumber = async() => {
        const int = parseInt(this);
        return typeof int === "number" && !isNaN(int);
    }

/**
*
* @param {*} null
* @returns
*
**/
exports.getRandom = async() => {
        if (Array.isArray(this) || this instanceof String)
            return this[Math.floor(Math.random() * this.length)];
        return Math.floor(Math.random() * this);
    }

/**
*
* @param {*} buffer
* @returns
*
**/
exports.findMusic = async(buffer) => {
        let acr = new acrcloud({
            host: "identify-eu-west-1.acrcloud.com",
            access_key: "4dcedd3dc6d911b38c988b872afa7e0d",
            access_secret: "U0PEUg2y6yGVh6NwJra2fJkiE1R5sCfiT6COLXuk",
        });
        let res = await acr.identify(buffer);
        let {code, msg} = res.status;
        if (code !== 0) return msg;
        let {title, artists, album, genres, release_date, external_metadata} = res.metadata.music[0];
        let {youtube, spotify} = external_metadata;
        return {
            status: 200,
            title: title,
            artists:
            artists !== undefined ? artists.map((v) => v.name).join(", "): "",
            album: album.name || "",
            genres: genres !== undefined ? genres.map((v) => v.name).join(", "): "",
            release_date: release_date,
            youtube: `https://www.youtube.com/watch?v=${youtube?.vid}`,
            spotify: `https://open.spotify.com/track/` + spotify?.track?.id,
        };
    }
