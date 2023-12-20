const {clash, commands} = require("./plugins");
const {fetchUrl, parseMention, sleep, runtime, getRandom, getBuffer, fetchJson, fetchText, getGroupAdmins, url, calculate_age, generateProfilePicture, clockString, UserAgent, bytesToSize, checkBandwidth, reSize} = require("./functions.js");
const {BASE_API, API_KEY ,WORK_TYPE } = require("../config.js");

module.exports = {
clash,
mode : WORK_TYPE.toLowerCase() === "private" ? "public" : true && false,
commands,
BASE_API,
runtime,
API_KEY,
fetchUrl,
parseMention,
sleep,
getRandom,
getBuffer,
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
