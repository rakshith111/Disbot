async function sendmsg(vaar, guild) {
  console.log(vaar);
  console.log("yess im in ");

  const channel = await guild.channels.create("yesss", {
    type: "voice",
    parent: "875333761552777298",
  });
}
module.exports = { sendmsg };
