// REQUIRES
const Discord = require("discord.js");
const config = require("./config.json");

// TWILIO SETUP

// WEBHOOK SETUP
const webhook = require("webhook-discord");
const { resolve } = require("path");

// Replace with your discord testing server webhook url
const Hook = new webhook.Webhook(
  "https://discordapp.com/api/webhooks/855281016574574672/7e5JRuhbN8URNvw1U1d3MjuqxT4NASaG0bVXbPtJdg5jZf4L0hIoeSyYxQCthriOQMZC"
);

// DISCORD SETUP
const dsc = new Discord.Client();
dsc.login(config.BOT_TOKEN);

// BOT COMMANDS PREFIX
const prefix = "!tch";

dsc.on("message", function (message) {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(" ");
  const command = args.shift().toLowerCase();

  // CLEAR MESSAGES
    if (args[0] == "clear") {
      if (args[1] == undefined) {
        message.channel.send("Usage: !atg clear <number of chats to clear>");  
      } else {
        message.channel.bulkDelete(args[1])
        .then(messages => console.log(`Bulk deleted ` + args[1] + ` messages`))
        .catch(console.error);
        message.channel.send("Chat cleared");    
      }                    
    }

  // HELP COMMAND
  if (args[0] == "help") {
    message.reply(
      "Feature soon to be added"
    );
  }
});