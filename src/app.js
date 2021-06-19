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

dsc.on('ready', () => {
  console.log('Bot has logged in')
})

// BOT COMMANDS PREFIX
const prefix = "$";

// Event listener for when new guild members join
dsc.on('guildMemberAdd', member => {
  const channelId = '855280951293771778' // Welcome channel
  const targetChannelId = '855576662162145310' // Rules and info

  console.log(member)

  const message = `Please welome <@${member.id}> to the server please check out ${member.guild.channels.cache.get(targetChannelId).toString()}`

  const channel = member.guild.channels.cache.get(channel.id)
  channel.send(message)
});

dsc.on("message", async (message) => {
  if (message.author.bot) return;
  if (message.content.startsWith(prefix)) {
    const [CMD_NAME, ...args] = message.content
    .trim()
    .substring(prefix.length)
    .split(/\s+/);

    // KICK COMMAND
    if (CMD_NAME === 'kick') {
      // Checking if user has permissions
      if (!message.member.hasPermission('KICK_MEMBERS'))
        return message.reply('You do not have permissions to use that command')

      // If user didnt give an id or user
      if (args.length === 0) 
        return message.reply('Please provide an ID');

      // Member = the user that was @ or a user id to be kicked
      const member = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])

      // If the member was found in the guild then the bot kicks them...
      if (member) {
        member
        .kick()
        .then((member) => message.channel.send(`${member} was kicked`))
        .catch((err) => message.channel.send('I cannot kick that user :('))
      } else {
        message.channel.send('That member was not found')
      }
    }

    // BAN COMMAND
    if (CMD_NAME === 'ban') {
      // Checking if user has permissions
      if (!message.member.hasPermission('BAN_MEMBERS'))
        return message.reply('You do not have permissions to use that command')
      // Checking if user providing an ID
      if (args.length === 0) return message.reply('Please provide an ID');

      // Checking ID of user to be banned if not found then sends an error
      try {
        const user = await message.guild.members.ban(args[0]);
        message.channel.send('User was banned successfully')
      } catch (err) {
        console.log(err);
        message.channel.send('An error occured. Either I do not have permissions or the user was not found');
      }
    }
  }
});

dsc.login(process.env.BOT_TOKEN);