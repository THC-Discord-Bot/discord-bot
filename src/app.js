require('dotenv').config();
const { Client } = require('discord.js');
const config = require('./config.json');
const commands = require('./commands/general.js');

// =========== Initialisations ===========
const primaryPrefix = config.primary_prefix;
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
  const content = message.content;
  if (!content.startsWith(primaryPrefix) || message.author.bot) return;
  switch (content.substr(0,content.indexOf(' '))) {
  case primaryPrefix+'kick':
    commands.kickMember(message);
    break;

  case primaryPrefix+'ban':
    commands.banUser(client, message);
    break;
  
  case primaryPrefix+'clear':
    commands.clearMessages(message);
    break;
  
  case primaryPrefix+'test':
    commands.test(message);
    break;
  
  case primaryPrefix+'settimezone':
    commands.settimezone(message);
    break;

  case primaryPrefix+'whattime':
    commands.whattime(message);
    break;

  case primaryPrefix+'timeMe':
    commands.timeTest(message);
    break;
              
  default:
    break;
  }
}
);
