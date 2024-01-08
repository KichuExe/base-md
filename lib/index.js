const {clash, commands} = require("./plugins");
const {fetchUrl, parseMention, sleep, formatp, runtime, getRandom, getBuffer, fetchJson, fetchText, getGroupAdmins, url, calculate_age, generateProfilePicture, clockString, UserAgent, bytesToSize, checkBandwidth, reSize} = require("./functions.js");
const {API ,WORK_TYPE } = require("../config.js");

module.exports = {
clash,
mode : WORK_TYPE.toLowerCase() === "private" ? "public" : true && false,
commands,
API,
runtime,
fetchUrl,
parseMention,
sleep,
getRandom,
getBuffer,
formatp,
fetchJson,
fetchText,
getGroupAdmins,
url,
calculate_age,
generateProfilePicture,
clockString,
UserAgent,
bytesToSize,
checkBandwidth,
reSize
};
