// eslint-disable-next-line no-unused-vars
const config = require('../config.json');
const primaryPrefix = config.primary_prefix;

module.exports = {
  kickMember: function(message) {
    if (!message.member.hasPermission('KICK_MEMBERS'))
      return message.reply('You do not have permissions to use that command');

    if (!message.mentions.members.first()) 
      return message.channel.send('You need to mention a user.');

    const memberToBeKicked = message.mentions.members.first();

    memberToBeKicked.kick().then((memberToBeKicked) =>{
      message.channel.send(memberToBeKicked.displayName + ' has been ejected.').catch((error) => {
        console.log(error);
        message.channel.send('I cannot kick that user :\'(');

      });
    });
  },
  banUser: function(message) {
    var args = message.content.slice(primaryPrefix.length).trim().split(' ');
    // Checking if user has permissions
    if (!message.member.hasPermission('BAN_MEMBERS')) {
      return message.reply('You do not have permissions to use that command');
    }
    // Checking if user providing an ID
    if (args.length === 0) {
      return message.reply('Please provide an ID');
    }
    // Checking ID of user to be banned if not found then sends an error
    try {
      const user = message.guild.members.ban(args[0]);
      message.channel.send('User was banned successfully');
    } catch (err) {
      console.log(err);
      message.channel.send(
        'An error occured. Either I do not have permissions or the user was not found'
      );
    }
  },
  clearMessages: function(message) {
    if (!message.member.roles.cache.some(role => role.name === 'developer')) { 
      return message.reply('You do not have permissions to use that command');
    } else {
      var args = message.content.slice(primaryPrefix.length).trim().split(' ');
      if (args[1] == undefined) {
        message.channel.send('Usage: $clear <number of chats to clear>');
      } else {
        message.channel.bulkDelete(args[1]).catch(console.error);
        message.channel.send('Chat cleared');
      }
    }
  },
  test: function (message) {
    message.reply('I\'m here!');
  }
};
