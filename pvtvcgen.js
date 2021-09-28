const prefix = "!";
let role_id;
let alloted_time;
async function sendmsg(messageip) {
  const args = messageip.content.slice(prefix.length).split(/ +/);
  const def_time = 0.5 * 60 * 60 * 1000;
  let alloted_time;
  let member = messageip.mentions.members.array();
  if (!parseFloat(args.at(-1))) {
    alloted_time = def_time; //allots the def time if non is entered
  } else alloted_time = parseFloat(args.at(-1)) * 60 * 60 * 1000; //gets the time if mentioned
  vcname = args[1];
  console.log(vcname);
  console.log(alloted_time);
  const Role = await messageip.guild.roles.create({
    // Creating the role.
    data: {
      name: vcname,
      color: "RANDOM",
      mentionable: 0,
    },
  });
  role_id = Role.id;
  for (mem of member) {
    console.log("added");
    mem.roles.add(role_id).catch(console.error);
  } //vc channel with perms her
  console.log(vcname);

  k = await messageip.guild.roles.cache.find((role) => role.name === vcname);
  console.log(await k.delete());
  // function remover() {
  //   console.log("time up");

  // }
  // setInterval(remover, alloted_time);

  //add a feature to ask if time needs to be increased

  // const channel = await guild.channels.create("yesss", {
  //   type: "voice",
  //   parent: "875333761552777298",
  // });
  // const channel = await guild.channels.create("yesss", {
  //   type: "voice",
  //   parent: "875333761552777298",
  // });
}

module.exports = { sendmsg };
