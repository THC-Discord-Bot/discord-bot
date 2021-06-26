const luxon = require('luxon');
const { BotMessage } = require('../reusable/functions');
const userRegions = [];
const {primary_prefix} = require('../config.json');
class UserRegion {
  constructor(userId, region){
    this.userId = userId;
    this.region = region;
  }
}

function luxTimezoneSet(message) {
  const region = message.content.replace(`${primary_prefix}luxTZSet`, '').trim();
  const timezone = luxon.DateTime.local().setZone(region);
  const user = message.author;
  if (!timezone.isValid) {
    message.reply(`Invalid timezone entry ${region} \n Reason: ${timezone.invalidReason}`);
    return;
  }
  if (userRegions.find(({userId}) => userId === user.id)) {
    const i = userRegions.findIndex(x => x.userId === user.id);
    userRegions[i] = new UserRegion(
      message.author.id,
      region
    );
  }
  userRegions.push(new UserRegion(
    message.author.id,
    region
  ));
  new BotMessage(
    message,
    `${message.author} timezone set to ${region} \n ${timezone.toString()}`,
    'Could not send message.'
  ).send();
}

function luxTime(message) {
  message.reply(`${luxon.DateTime.now()}`);
}

function luxUserTime(message) {
  const user = message.mentions.members.first();
  const regionObject = userRegions.find(({userId}) => userId === user.id);
  new BotMessage(
    message,
    `${user}'s time is ${luxon.DateTime.local().setZone(regionObject.region).toString()}`
  ).send();
}

module.exports ={
  luxTimezoneSet,
  luxTime,
  luxUserTime
};