module.exports = (commandArgs, message) => {
  console.log("clear!!");
  if (commandArgs[0] == undefined) {
    message.channel.send("Usage: !tch clear <number of chats to clear>");
  } else {
    message.channel
      .bulkDelete(commandArgs[0])
      .then((messages) =>
        console.log(`Bulk deleted ` + commandArgs[0] + ` messages`)
      )
      .catch(console.error);
    message.channel.send("Chat cleared");
  }
};
