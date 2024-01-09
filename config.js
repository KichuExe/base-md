const { Sequelize } = require("sequelize");
const DATABASE_URL = process.env.DATABASE_URL || "./lib/database.db";
const toBool = (x) => x === "true";

module.exports = {
  LOGS: toBool(process.env.LOGS) || true, //false for if you don't want show the logs
  HANDLERS:
    process.env.HANDLER === "false" || process.env.HANDLER === "null"
      ? "^[.]" // forfor null just "^" add this
      : "^[.]",
  BRANCH: "master",
  OWNER_NUMBER: ["919961857267@s.whatsapp.net", "0@s.whatsapp.net"],
  STICKER_DATA: process.env.STICKER_DATA || "CLASH-WA-BOT;TOXIC-KICHUX",
  SUDO: process.env.SUDO || "919961857267,0",
  API: process.env.API || "https://api-viper.onrender.com", //don't change this link. If you change then some commands will not work!.
  HEROKU_APP_NAME: process.env.HEROKU_APP_NAME || "",
  HEROKU_API_KEY: process.env.HEROKU_API_KEY || "",
  OWNER_NAME: process.env.OWNER_NAME || "TOXIC-KICHU",
  BOT_NAME: process.env.BOT_NAME || "CLASH-WA-BOT",
  WORK_TYPE: process.env.WORK_TYPE || "public",
  DATABASE_URL: DATABASE_URL,
  DATABASE:
    DATABASE_URL === "./lib/database.db"
      ? new Sequelize({
          dialect: "sqlite",
          storage: DATABASE_URL,
          logging: false,
        })
      : new Sequelize(DATABASE_URL, {
          dialect: "postgres",
          ssl: true,
          protocol: "postgres",
          dialectOptions: {
            native: true,
            ssl: { require: true, rejectUnauthorized: false },
          },
          logging: false,
        }),
};
