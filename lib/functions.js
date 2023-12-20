/** Copyright (C) 2023.
Licensed under the  MIT License;
You may not use this file except in compliance with the License.
* @project_name : CLASH-WA-BOT
* @author : TOXIC-KICHUX
**/

const axios = require("axios");
const fs = require("fs");
const fetch = require("node-fetch");
const jimp = require("jimp");

exports.fetchUrl = async (url, options) => {
    try {
        options ? options : {}
        const res = await axios({
            method: 'GET',
            url: url,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
            },
            ...options
        })
        return res.data
    } catch (err) {
        return err
    }
}

exports.getRandom = (ext) => {
    return `${Math.floor(Math.random() * 10000)}${ext}`
}

exports.getBuffer = async (url, options) => {
        try {
          options ? options : {}
          const res = await axios({
              method: "get",
              url,
              headers: {
                'DNT': 1,
                'Upgrade-Insecure-Request': 1
              },
              ...options,
              responseType: 'arraybuffer'
            })
            return res.data
        } catch (e) {
            console.log(`Error : ${e}`)
        }
}

exports.fetchJson = (url, options) => new Promise(async(resolve, reject) => {
    fetch(url, options)
        .then(response => response.json())
        .then(json => {
            resolve(json)
        })
        .catch((err) => {
            reject(err)
        })
})

exports.fetchText = (url, options) => new Promise(async(resolve, reject) => {
    fetch(url, options)
        .then(response => response.text())
        .then(text => {
            resolve(text)
        })
        .catch((err) => {
            reject(err)
        })
})

exports.getGroupAdmins = function(participants){
    let admins = []
  for (let i of participants) {
    i.admin !== null ? admins.push(i.id) : ''
  }
  return admins
}

exports.runtime = async() => {
  var seconds = Number(`${process.uptime()}`);
  var d = Math.floor(seconds / (3600 * 24));
  var h = Math.floor(seconds % (3600 * 24) / 3600);
  var m = Math.floor(seconds % 3600 / 60);
  var s = Math.floor(seconds % 60);
  var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
  var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
  var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
  var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
  return dDisplay + hDisplay + mDisplay + sDisplay;
    }

exports.url = (url) => {
    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%.+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%+.~#?&/=]*)/, 'gi'))
}

const _0x519cc6=_0x5b9e;function _0x5b9e(_0x1bf25e,_0x54b691){const _0x3e4abc=_0x3e4a();return _0x5b9e=function(_0x5b9eb2,_0x33aefe){_0x5b9eb2=_0x5b9eb2-0x16b;let _0x5b2a69=_0x3e4abc[_0x5b9eb2];return _0x5b2a69;},_0x5b9e(_0x1bf25e,_0x54b691);}function _0x3e4a(){const _0x100097=['50KcPzRJ','read','getBufferAsync','abs','22187290Ouvtlc','getWidth','getTime','6147972LiGmiv','now','1616096uvyZxM','6872rxJkYc','MIME_JPEG','generateProfilePicture','2rbtgTp','4635PCQTUx','7439572QblRmn','AUTO','resize','1974036hCaeOu','197668RXOSgn','getHeight','calculate_age'];_0x3e4a=function(){return _0x100097;};return _0x3e4a();}(function(_0x50e30d,_0x2739c4){const _0x213ad4=_0x5b9e,_0x3f4e72=_0x50e30d();while(!![]){try{const _0x560975=parseInt(_0x213ad4(0x178))/0x1+parseInt(_0x213ad4(0x17c))/0x2*(-parseInt(_0x213ad4(0x16b))/0x3)+parseInt(_0x213ad4(0x16c))/0x4*(parseInt(_0x213ad4(0x16f))/0x5)+parseInt(_0x213ad4(0x176))/0x6+parseInt(_0x213ad4(0x17e))/0x7+parseInt(_0x213ad4(0x179))/0x8*(-parseInt(_0x213ad4(0x17d))/0x9)+-parseInt(_0x213ad4(0x173))/0xa;if(_0x560975===_0x2739c4)break;else _0x3f4e72['push'](_0x3f4e72['shift']());}catch(_0x204728){_0x3f4e72['push'](_0x3f4e72['shift']());}}}(_0x3e4a,0xd6806),exports[_0x519cc6(0x16e)]=_0x4945a2=>{const _0x118d26=_0x519cc6;var _0x8192f8=Date[_0x118d26(0x177)]()-_0x4945a2[_0x118d26(0x175)](),_0x4db6d9=new Date(_0x8192f8);return Math[_0x118d26(0x172)](_0x4db6d9['getUTCFullYear']()-0x7b2);},exports[_0x519cc6(0x17b)]=async _0x3906f8=>{const _0x334712=_0x519cc6,_0x134cc6=await jimp[_0x334712(0x170)](_0x3906f8),_0x5c2ae4=_0x134cc6[_0x334712(0x174)]()>_0x134cc6[_0x334712(0x16d)]()?_0x134cc6[_0x334712(0x180)](0x226,jimp[_0x334712(0x17f)]):_0x134cc6[_0x334712(0x180)](jimp[_0x334712(0x17f)],0x28a),_0x565c5c=await jimp[_0x334712(0x170)](await _0x5c2ae4[_0x334712(0x171)](jimp[_0x334712(0x17a)]));return{'img':await _0x5c2ae4[_0x334712(0x171)](jimp[_0x334712(0x17a)])};});

exports.clockString = async(duration) => {
        (seconds = Math.floor((duration / 1000) % 60)),
        (minutes = Math.floor((duration / (1000 * 60)) % 60)),
        (hours = Math.floor((duration / (1000 * 60 * 60)) % 24));

        hours = hours < 10 ? "0" + hours: hours;
        minutes = minutes < 10 ? "0" + minutes: minutes;
        seconds = seconds < 10 ? "0" + seconds: seconds;

        return hours + ":" + minutes + ":" + seconds;
}

exports.UserAgent = () => {
    const UA = [
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/11.1.2 Safari/605.1.15",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/603.3.8 (KHTML, like Gecko) Version/10.1.2 Safari/603.3.8",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36",
  "Mozilla/5.0 (X11; Datanyze; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.88 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.75.14 (KHTML, like Gecko) Version/7.0.3 Safari/E7FBAF",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10; rv:33.0) Gecko/20100101 Firefox/33.0",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36 Edge/15.15063",
  "Mozilla/5.0 (X11; Linux x86_64; rv:45.0) Gecko/20100101 Firefox/45.0",
  "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:47.0) Gecko/20100101 Firefox/47.0",
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36",
  "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:57.0) Gecko/20100101 Firefox/57.0",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/601.2.7 (KHTML, like Gecko) Version/9.0.1 Safari/601.2.7",
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.92 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.104 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36",
  "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:88.0) Gecko/20100101 Firefox/88.0",
  "Mozilla/5.0 (X11; Linux x86_64; rv:68.0) Gecko/20100101 Firefox/68.0",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.11; rv:47.0) Gecko/20100101 Firefox/47.0",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/11.1.2 Safari/605.1.15",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/603.3.8 (KHTML, like Gecko) Version/10.1.2 Safari/603.3.8",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/601.7.7 (KHTML, like Gecko) Version/9.1.2 Safari/601.7.7",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.125 Safari/537.36",
    ];
    const res = UA[~~(Math.random() * UA.length)];
    return res;
};

exports.bytesToSize = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

exports.checkBandwidth = async() => {
    let ind = 0;
    let out = 0;
    for (let i of await require("node-os-utils").netstat.stats()) {
        ind += parseInt(i.inputBytes);
        out += parseInt(i.outputBytes);
    }
    return {
        download: exports.bytesToSize(ind),
        upload: exports.bytesToSize(out),
    };
}

exports.reSize = async(buffer, ukur1, ukur2) => {
     return new Promise(async(resolve, reject) => {
        var baper = await jimp.read(buffer);
        var ab = await baper.resize(ukur1, ukur2).getBufferAsync(jimp.MIME_JPEG)
        resolve(ab)
     })
}

exports.parseMention = (text = '') => {
    return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
}

exports.sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
                  }
