const Discord = require("discord.js");
const prefix = "!";
async function sendmsg(messageip) {
  const args = messageip.content.slice(prefix.length).split(/ +/);
  const def_time = 0.5 * 60 * 60 * 1000;
  let alloted_time;
  if (!parseInt(args.at(-1))) {
    alloted_time = def_time; //allots the def time if non is entered
  } else alloted_time = parseInt(args.at(-1)) * 60 * 60 * 1000; //gets the time if mentioned
  const Role = await messageip.guild.roles.create({
    // Creating the role.
    data: {
      name: "asd",
      color: "RANDOM",
      mentionable: 0,
    },
  });
  role_id = Role.id;
  let member = messageip.mentions.members.array();

  for (mem of member) {
    mem.roles.add(role_id).catch(console.error);
  }

  // const channel = await guild.channels.create("yesss", {
  //   type: "voice",
  //   parent: "875333761552777298",
  // });
}

module.exports = { sendmsg };
