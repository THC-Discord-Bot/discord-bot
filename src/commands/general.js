
const config = require('../config.json');
const {isStringANumber} = require('../functions/functions');

module.exports = {
  kickMember : function (message) {
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

  BanUser :function (message) {
    let potentialId;
    let banByID = false;
    if (!message.member.hasPermission('BAN_MEMBERS'))
      return message.reply('You do not have permissions to use that command');
    if (!message.mentions.members.first()){ 
      potentialId = message.content.String.replace(config.primaryPrefix+'ban', '').trim();
      if (!isStringANumber(potentialId) || potentialId.length < 16){
        return message.reply('Please mention a user or insert a valid UserID');
      } else {
        banByID = true;
      }
    }

    const userToBeBanned = banByID? potentialId: message.mentions.members.first();

    userToBeBanned.ban().then((userToBeBanned) =>{
      message.channel.send(userToBeBanned.displayName + ' has been banished.').catch((error) => {
        console.log(error);
        message.channel.send('Failed to exile user. >:[');
      });
    });
  //   try {
  //     const user = message.guild.members.ban(args[0]);
  //     message.channel.send('User was banned successfully');
  //   } catch (err) {
  //     console.log(err);
  //     message.channel.send(
  //       'An error occured. Either I do not have permissions or the user was not found'
  //     );
  //   }
  // }
  }
};

// function ClearMessages(message) {
//   if (args[1] == undefined) {
//     message.channel.send('Usage: !atg clear <number of chats to clear>');
//   } else {
//     message.channel
//       .bulkDelete(args[1])
//       .then((messages) =>
//         console.log('Bulk deleted ' + args[1] + ' messages')
//       )
//       .catch(console.error);
//     message.channel.send('Chat cleared');
//   }
// }