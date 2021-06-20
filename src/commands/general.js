// eslint-disable-next-line no-unused-vars
function kickMember(message) {
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
}
function BanUser(message) {
    if (CMD_NAME === 'ban') {
        // Checking if user has permissions
        if (!message.member.hasPermission('BAN_MEMBERS'))
          return message.reply('You do not have permissions to use that command');
        // Checking if user providing an ID
        if (args.length === 0) return message.reply('Please provide an ID');
  
        // Checking ID of user to be banned if not found then sends an error
        try {
          const user = await message.guild.members.ban(args[0]);
          message.channel.send('User was banned successfully');
        } catch (err) {
          console.log(err);
          message.channel.send(
            'An error occured. Either I do not have permissions or the user was not found'
          );
        }
      }
}

function ClearMessages(message) {
  if (args[1] == undefined) {
    message.channel.send('Usage: !atg clear <number of chats to clear>');
  } else {
    message.channel
      .bulkDelete(args[1])
      .then((messages) =>
        console.log('Bulk deleted ' + args[1] + ' messages')
      )
      .catch(console.error);
    message.channel.send('Chat cleared');
  }
}
