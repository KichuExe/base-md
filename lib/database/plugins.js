/** Copyright (C) 2024.
Licensed under the  MIT License;
You may not use this file except in compliance with the License.
* @project_name : CLASH-WA-BOT
* @author : TOXIC-KICHUX
* @credits : @author
* @note : you can copy this codes but atleast give credits!❤️🙏🏼
**/

const config = require('../../config');
const { DataTypes } = require('sequelize');

const PluginDB = config.DATABASE.define('Plugin', {
name: {
type: DataTypes.STRING,
allowNull: false
},
url: {
type: DataTypes.TEXT,
allowNull: false
}});

async function installPlugin(adres, file) {
const existingPlugin = await PluginDB.findOne({ where: { url: adres } });
if (existingPlugin) {
return false;
} else {
return await PluginDB.create({ url: adres, name: file });
}}

module.exports = {PluginDB, installPlugin};
