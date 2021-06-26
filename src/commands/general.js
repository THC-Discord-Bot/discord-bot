const config = require('../config.json');
const primaryPrefix = config.primary_prefix;
const fetch = require('node-fetch');
const { BotMessage } = require('../reusable/functions');
// =========== Database Connection ===========
const mongoose = require('mongoose');
const mongoDB = 'mongodb://mongo:27017/discorddb';

// Protect server from crashing
try {
  //Set up default mongoose connection
  mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
  //Get the default connection
  // const db = mongoose.connection;
} catch (err) {
  console.log(err);
}

module.exports = {
  kickMember: function(message) {
    if (!message.member.hasPermission('KICK_MEMBERS'))
      return message.reply('You do not have permissions to use that command');

    if (!message.mentions.members.first()) 
      return message.channel.send('You need to mention a user.');

    const memberToBeKicked = message.mentions.members.first();

    memberToBeKicked.kick().then((memberToBeKicked) =>{
      BotMessage(
        message,
        `${memberToBeKicked.displayName} has been ejected.`,
        `I cannot kick ${memberToBeKicked.displayName} :'(`
      );
    });
  },

  banUser: function(client, message) {
    let potentialId;
    if (!message.member.hasPermission('BAN_MEMBERS'))
      return message.reply('You do not have permissions to use that command');
    if (!message.mentions.members.first()){ 
      potentialId = message.content.replace(`${primaryPrefix}ban`, '').trim();
      if (!(/^\d{16,}$/.test(potentialId)))
        return message.reply('Please mention a user or insert a valid UserID');
    }
    const userToBeBanned = potentialId? potentialId : message.mentions.members.first().id;

    client.users.fetch(userToBeBanned).then((user) => {
      message.guild.members.ban(userToBeBanned).then(() =>{
        BotMessage(
          message,
          `${user.username} has been exiled.`,
          `Failed to exile ${user.username}. >:[`
        ).send();
      });
    });
  },

  // Highly unstable && INCOMPLETE
  giveUserWarnings: function(client, message) {
    const userWarnModel = require('../models/userWarnModel.js');
    const args = message.content.slice(primaryPrefix.length).trim().split(' ');
    const userID = message.mentions.members.first();

    if (!message.member.hasPermission('BAN_MEMBERS')) {
      return message.reply('You do not have permissions to use that command');
    }
    // Checking if user providing an ID
    if(args[1] == null || args[1] == undefined) {
      return message.reply('Please provide an @<user>');
    }
    // Add data to DB
    const memberid = message.mentions.members.first();
    const username = message.mentions.users.first().username;
    let warnings = 0;

    userWarnModel.userWarnModel.findOne({userID: userID}, function(err, user) {
      if(user) {
        var updatedWarnings = user['warnings']+1;
        userWarnModel.userWarnModel.update({warnings:updatedWarnings}, function (err, result) {
          if (err){
            console.log(err);
          }else{
            console.log('Result :', result);
            if (updatedWarnings == 3); 
            client.users.fetch(memberid).then((user) => {
              message.guild.members.ban(memberid).then(() =>{
                BotMessage(
                  message,
                  `${user.username} has been exiled.`,
                  `Failed to exile ${user.username}. >:[`
                ).send();
              });
            });
          }
        });
      }
    });
    userWarnModel.userWarnModel.create({ userID: memberid, username: username, warnings: warnings + 1 }, function (err) {
      if (err) return (err);
      console.log(message.member['user']);
    });
    // verifying that user was warned
    try {
      user.send(`${userID}, You have been warned for doing ${message} in the server ${message.guild.name}`);
      message.channel.send(`${userID} has been warned for doing ${message} :thumbsdown:`);
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

  whattime: function (message) {
    const timeZoneModel = require('../models/timeZoneModel.js');
    const args = message.content.slice(primaryPrefix.length).trim().split(' ');
    if (args[1] == undefined || null) {
      message.channel.send('Usage: $whattime @user');
    } else {
      const userID = message.mentions.users.first().id;
      console.log(userID);
      // const userID = args[1].replace('<','').replace('>','').replace('!','').replace('@','');
      timeZoneModel.timeZoneModel.findOne({userID: userID}, function(err, user) {
        // fetch('http://worldtimeapi.org/api/timezone/'+ user['timezone'])
        fetch('http://worldclockapi.com/api/json/' + user['timezone'] + '/now')
          .then(res => res.text())
          .then(body => {
            body = JSON.parse(body);
            console.log(body);
            message.reply('@' + user['username'] + '\'s time is: ' + body['currentDateTime'] + ' ' + body['timeZoneName']);
          });
      });
    }
  }
};

