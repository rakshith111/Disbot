const Discord = require("discord.js");
const client = new Discord.Client();
const { token } = require("./config.json");
const pvtvc = require("./pvtvcgen.js");
const prefix = "!";
client.on("ready", async () => {
  console.log("ready called");
  client.user.setPresence({
    activity: {
      name: "WITH DEEZ NUTS",
      type: "PLAYING",
    },
    status: "dnd",
  });
});

client.on("message", async (msg) => {
  if (msg.author.bot) return;
  if (msg.content.startsWith(prefix)) {
    const args = msg.content.slice(prefix.length).split(/ +/);
    switch (args[0]) {
      case "create":
        if (msg.content === "!create help" || msg.content === "!create") {
          client.channels.cache
            .get(msg.channel.id)
            .send(
              "Description: Private Voice Channel Creater \nType \n !create  <vcname> <user1>  <user2>.....<user 'n'> time(in hrs) Default:30 mins \n Ex !create myvcname @test1  @test2  1.5 "
            );
          return;
        } else {
          pvtvc.sendmsg(msg);
        }
        break;
    }
  }
});

client.login(token);
