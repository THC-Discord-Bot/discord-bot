require("dotenv").config();

// TWILIO SETUP

// WEBHOOK SETUP
const webhook = require("webhook-discord");
const { resolve } = require("path");

// Replace with your discord testing server webhook url
// const Hook = new webhook.Webhook("<PLACE WEBHOOK URL HERE");

// DISCORD SETUP
const dsc = require("./discordClient");

// BOT COMMANDS PREFIX
const PREFIX = "!tch";

dsc.on("message", function (message) {
  if (message.author.bot) return;
  if (!message.content.startsWith(PREFIX)) return;

  const commandBody = message.content.slice(PREFIX.length + 1); // adding 1 to account for the extra space
  const args = commandBody.split(" ");
  const command = args.shift().toLowerCase();

  try {
    // look for the filename (which is also the command) and executes it
    const commandFile = require(`./commands/${command}.js`);
    commandFile(args, message);
  } catch (e) {
    console.log(e);
    message.channel.send(
      "Command doesn't exist or an error has occurred while executing it..."
    );
  }
});
