const Discord = require("discord.js");

const dsc = new Discord.Client();
dsc.login(process.env.DISCORD_BOT_TOKEN);

module.exports = dsc;
