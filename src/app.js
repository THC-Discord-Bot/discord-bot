require('dotenv').config();
const { Client } = require('discord.js');
const config = require('./config.json');
const { 
  kickMember, 
  BanUser, 
  ClearMessages 
} = require('./commands/general');

// =========== Initialisations ===========
const primaryPrefix = config.primaryPrefix;
const client = new Client();

// =========== Bot Initialisation ===========
client.login(process.env.BOT_TOKEN);
client.on('ready', () => {
  console.log('Bot has logged in');
});

// Event listener for when new guild members join
client.on('guildMemberAdd', (member) => {
  const channel = member.guild.channels.cache.get(config.welcomeChannelId);
  const targetChannelId = member.guild.channels.guild.cache.get('855576662162145310').toString(); // Rules and info
  const message = `Please welome <@${member.id}> to the server please check out ${targetChannelId}`;
  channel.send(message);
});

client.on('message', async (message) => {
  if (message.author.bot) return;
  if (message.content.startsWith(primaryPrefix+'kick ')){
    kickMember(message);
  }
  if (message.content.startsWith(primaryPrefix+'ban ')){
    BanUser(message);
  }
  if (message.content.startsWith(primaryPrefix+'clear ')){
    ClearMessages(message);
  }
}
);
