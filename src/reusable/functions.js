class BotMessage {
  constructor(messageInstance, messageContent, errorMessage){
    this.messageInstance = messageInstance;
    this.messageContent = messageContent;
    this.errorMessage = errorMessage;
    this.send = ()=>{
      this.messageInstance.channel.send(messageContent).catch(e => {
        console.log(e),
        this.messageInstance.channel.send(errorMessage);
      });
    };
  }
}

module.exports ={
  BotMessage
};