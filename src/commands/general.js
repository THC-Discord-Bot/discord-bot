// eslint-disable-next-line no-unused-vars
const config = require('../config.json');
const primaryPrefix = config.primary_prefix;
const fetch = require('node-fetch');

// =========== Database Connection ===========
const mongoose = require('mongoose');
const mongoDB = 'mongodb://mongo:27017/discorddb';

// Protect server from crashing
try {
  //Set up default mongoose connection
  mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
  //Get the default connection
  const db = mongoose.connection;
} catch (err) {
  console.log(err)
}

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
    const args = message.content.slice(primaryPrefix.length).trim().split(' ');
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
  // Highly unstable && INCOMPLETE
  //giveUserWarnings: function(message) {
  //  const args = message.content.slice(primaryPrefix.length).trim().split(' ');
  //  const userID = message.mentions.members.first()

//    if (!message.member.hasPermission('BAN_MEMBERS')) {
//      return message.reply('You do not have permissions to use that command');
//    }
    // Checking if user providing an ID
//    if (args.length === 0) {
//      return message.reply('Please provide an @<user>');
//    }
    // verifying that user was warned
//    try {
//      user.send(`${userID}, You have been warned for doing ${message} in the server ${message.guild.name}`)
//      message.channel.send(`${userID} has been warned for doing ${message} :thumbsdown:`)
//    } catch (err) {
//      console.log(err);
//      message.channel.send(
//        'An error occured. Either I do not have permissions or the user was not found'
//      );
//    }
//  
//},
// ===========================================================================================================
  clearMessages: function(message) {
    if (!message.member.roles.cache.some(role => role.name === 'developer')) { 
      return message.reply('You do not have permissions to use that command');
    } else {
      const args = message.content.slice(primaryPrefix.length).trim().split(' ');
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
  },

  // INCOMPLETE 
  settimezone: function (message) {
    const timeZoneModel = require('../models/timeZoneModel.js');

    const args = message.content.slice(primaryPrefix.length).trim().split(' ');
    if (args[1] == undefined || null) {
      message.channel.send('Usage: $settimezone <timezone example: EST>');
    } else {
      const timezone = args[1];
      const memberid = message.member['user']['id'];
      const username = message.member['user']['username'];
      timeZoneModel.timeZoneModel.create({ userID: memberid, username: username, timezone: timezone }, function (err) {
        if (err) return (err);
        console.log(message.member['user']);
      });
    }
  },

  // INCOMPLETE
  whattime: function (message) {
    const timeZoneModel = require('../models/timeZoneModel.js');
    const args = message.content.slice(primaryPrefix.length).trim().split(' ');
    if (args[1] == undefined || null) {
      message.channel.send('Usage: $whattime @user');
    } else {
      const userID = args[1].replace('<','').replace('>','').replace('!','').replace('@','');
      timeZoneModel.timeZoneModel.findOne({userID: userID}, function(err, user) {
        fetch('http://worldtimeapi.org/api/timezone/'+ user['timezone'])
          .then(res => res.text())
          .then(body => {
            body = JSON.parse(body);
            message.reply('@' + user['username'] + '\'s time is: ' + body['datetime'] + ' ' + body['abbreviation']);
          });
      });
    }
  }
};

