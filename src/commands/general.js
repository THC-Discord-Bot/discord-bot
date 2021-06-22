// eslint-disable-next-line no-unused-vars
const config = require('../config.json');
const primaryPrefix = config.primary_prefix;
const fetch = require('node-fetch');

// =========== Database Connection ===========
const mongoose = require('mongoose');
//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/discorddb';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

//Get the default connection
var db = mongoose.connection;

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
  },
  settimezone: function (message) {
    var timezoneModel = require('../models/timezoneModel.js');

    var args = message.content.slice(primaryPrefix.length).trim().split(' ');
    if (args[1] == undefined || null) {
      message.channel.send('Usage: $settimezone <timezone example: EST>');
    } else {
      var timezone = args[1];
      var memberid = message.member['user']['id'];
      var username = message.member['user']['username'];
      timezoneModel.timezoneModel.create({ userID: memberid, username: username, timezone: timezone }, function (err) {
        if (err) return (err);
        console.log(message.member['user']);
      });
    }
  },
  whattime: function (message) {
    var timezoneModel = require('../models/timezoneModel.js');
    var args = message.content.slice(primaryPrefix.length).trim().split(' ');
    if (args[1] == undefined || null) {
      message.channel.send('Usage: $whattime @user');
    } else {
      var userID = args[1].replace('<','').replace('>','').replace('!','').replace('@','');
      timezoneModel.timezoneModel.findOne({userID: userID}, function(err, user) {
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
