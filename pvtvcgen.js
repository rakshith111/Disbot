const Discord = require("discord.js");
const { cpuUsage } = require("process");
async function sendmsg(messageip, guid) {
  const def_time = 0.5;
  let alloted_time;
  let pvtusers = [];
  if (!parseInt(messageip.at(-1))) alloted_time = def_time; //allots the def time if non is entered
  alloted_time = parseInt(messageip.at(-1)); //gets the time if mentioned
  pvtusers = messageip.slice(1, -1); //seperates the users
  guid.roles.create({
    data: {
      name: "asd",
      color: "BLURPLE",
      mentionable: 0,
    },
  });

  console.log(idd);
  //   const channel = await guild.channels.create("yesss", {
  //     type: "voice",
  //     parent: "875333761552777298",
  //   });
}

messageip = [
  "create",
  "<@!539445876796424192>",
  "<@!764249448691400704>",
  "<@!764249448691400704>",
];

module.exports = { sendmsg };
