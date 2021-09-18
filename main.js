const Discord = require("discord.js");
const client = new Discord.Client();
const { token } = require("./config.json");
const { orderBy } = require("natural-orderby");
const fs = require("fs");

class Node {
  // constructor
  constructor(element, pvid, pcid) {
    this.name = element; //name of the vc
    this.parentvoice_id = pvid; //parent voiceid
    this.parentcategory_id = pcid; //parent category id
    this.nameset = []; //nameset contains list of creatable vc names
    for (let i = 1; i < 21; i++) {
      this.nameset.push(element + " " + i);
    }
    this.next = null;
  }
}
class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }
  //add(vc name , vcid, ,categoryparentid)
  add(element, pvid, pcid) {
    // creates a new node
    let node = new Node(element, pvid, pcid);
    let current;
    if (this.head == null) this.head = node;
    else {
      current = this.head;
      while (current.next) {
        current = current.next;
      }
      // adds node
      current.next = node;
    }
    this.size++;
    console.log("NODE " + element + " was created");
  }
  //returns the parent category id
  returnpcid(nameof) {
    let current = this.head;
    while (current != null) {
      if (current.name === nameof) return current.parentcategory_id;
      current = current.next;
    }
  }
  //function takes the name and returns its nameset
  returnlist(nameof) {
    let current = this.head;
    try {
      while (current != null) {
        if (current.name === nameof) return current.nameset;
        current = current.next;
      }
    } catch (error) {
      console.log("/" + dat + "/" + "was entered");
    }
  }
  //function takes the name and nameset  and updates its nameset to the latest changes made
  updatedata(name, data) {
    let current = this.head;
    try {
      while (current != null) {
        if (current.name === name) current.nameset = data;
        current = current.next;
      }
    } catch (error) {
      console.log("/" + dat + "/" + "was entered");
    }
  }
  //prints all the nodes
  prnt() {
    let current = this.head;
    console.log(current);
  }
}
let Check_flag = 1; //flag for init data only once need new method
let ll = new LinkedList();
let id_json_data;
let id_keys = []; //keys pushed here are from the parent vc and cant be deleted
let id_name = []; //names pushed here are from the parent vc and cant be changed , used to generate the nameset during init
let activebag_names = []; // this array hold the list of names which are created and is visible to the user
let activebag_id = []; // this array holds the list of names whos id's are valid
const prefix = "!";
var dict = {}; //for reading the ip

//inits data from file  only happens once during startup
let init = function () {
  if (Check_flag) {
    id_json_data = fs.readFileSync("./id.json", "utf8", (err, fileContents) => {
      return fileContents;
    });
    id_json_data = JSON.parse(id_json_data); //string data is converted to JSON OBJS
    id_keys = Object.keys(id_json_data); //keys are extractedd
    for (let id of id_keys) {
      activebag_id.push(id);
      id_name.push(client.channels.cache.get(id).name); // assigns the channel names to the id_name list
    }
    for (var i = 0; i < id_keys.length; i++)
      ll.add(id_name[i], id_keys[i], id_json_data[id_keys[i]]); //creates a linked list (of array) to store the names availabe for setting the vc name
    //ll.prnt() to display the initialized nodes
  }
  Check_flag = false;
  ll.prnt();
};
// checks if the vc's ids are valid this should be  performed whenever the voicestateupdate is called and inits data
function check() {
  console.log("checking");
  let id_json_data_C = fs.readFileSync(
    "./id.json",
    "utf8",
    (err, fileContents) => {
      return fileContents;
    }
  ); // temp var created to check
  id_json_data_C = JSON.parse(id_json_data_C); //string data is converted to JSON OBJS
  id_keys_C = Object.keys(id_json_data_C); // keys extracted
  for (var i of id_keys_C) {
    if (client.channels.cache.get(i) === undefined) {
      console.log(i + "  has been yeeted");
      delete id_json_data_C[i];
      // add a method to delete a node and update other variables
    }
  }

  console.log(id_json_data_C);
  let id_json_write = fs.writeFileSync(
    "id.json",
    JSON.stringify(id_json_data_C),
    (err) => {}
  ); //writing the merged data to the same file
}

let namedata = [];
client.on("ready", async () => {
  console.log("ready called");
  check();
  init();
  client.user.setPresence({
    activity: {
      name: "YOU",
      type: "WATCHING",
    },
    status: "dnd",
  });
});

client.on("message", async (msg) => {
  if (msg.author.bot) return;
  if (msg.content.startsWith(prefix)) {
    const args = msg.content.slice(prefix.length).split(/ +/);
    switch (args[0]) {
      case "set":
        if (msg.content === "!set help" || msg.content === "!set") {
          client.channels.cache
            .get(msg.channel.id)
            .send("Type \n !set  <main vc's id>  <vc's category id>");
          return;
        } else if (args.length === 3) {
          if (args[1].length && args[2].length === 18) {
            if (id_keys.includes(args[1])) {
              client.channels.cache
                .get(msg.channel.id)
                .send(
                  client.channels.cache.get(args[1]).name +
                    " already exisis in the  set "
                );
            } else if (client.channels.cache.get(args[1]) !== undefined) {
              // to check for validity of id
              dict[`${args[1]}`] = args[2]; //dict[vcid]= parent id
              client.channels.cache
                .get(msg.channel.id)
                .send(
                  client.channels.cache.get(args[1]).name + "  has been added "
                );
              fs.readFile("./id.json", "utf8", (err, fileContents) => {
                if (err) {
                  console.error(err);
                  return;
                }
                try {
                  var data = JSON.parse(fileContents); // this data contains id from file
                  dat = Object.assign(data, dict); //merging the prev data from file and the data from user
                  fs.writeFile("id.json", JSON.stringify(dat), (err) => {
                    //writing the merged data to the same file
                    if (err) throw err;
                    console.log(" Written"); // Success
                  });
                } catch (err) {
                  console.error(err);
                }
              });
              activebag_id.push(args[1]); //adds it to the list of ids which are supposed to be cloned
              id_name.push(client.channels.cache.get(args[1]).name); //adds name to the permanent non deletable id list
              id_keys.push(args[1]);
              ll.add(client.channels.cache.get(args[1]).name, args[1], args[2]); //adds a new node to the pre existing one or creates one
            } else client.channels.cache.get(msg.channel.id).send("Wrong id");
          } else {
            client.channels.cache
              .get(msg.channel.id)
              .send("Enter the correct id's");
          }
        }
        break;
      case "create":
    }
  }
});

client.on("voiceStateUpdate", async (oldVoiceState, newVoiceState) => {
  const { channelID: oldChannelId, channel: oldChannel } = oldVoiceState;
  const { channelID: newChannelId, guild, channel: newChannel } = newVoiceState;

  if (activebag_id.includes(newVoiceState.channelID)) {
    //to check if the voice change is generated in the stored ids                                                  these checks are performed so that new vc's wont be created if user does any of the following

    if (newChannel.members.size !== 0 && newChannel.members.size === 2) {
      // if newchannel has more than 2 users it creates new vc

      if (
        !(
          (oldVoiceState.selfDeaf === true &&
            newVoiceState.selfDeaf === false) ||
          (oldVoiceState.selfDeaf === false && newVoiceState.selfDeaf === true)
        ) && //checks for selfDeaf
        !(
          (oldVoiceState.selfMute === false &&
            newVoiceState.selfMute === true) ||
          (oldVoiceState.selfMute === true && newVoiceState.selfMute === false)
        ) && //checks for selfMute
        !(
          (oldVoiceState.serverDeaf === false &&
            newVoiceState.serverDeaf === true) ||
          (oldVoiceState.serverDeaf === true &&
            newVoiceState.serverDeaf === false)
        ) && //checks for serverDeaf
        !(
          (oldVoiceState.serverMute === false &&
            newVoiceState.serverMute === true) ||
          (oldVoiceState.serverMute === true &&
            newVoiceState.serverMute === false)
        ) && //checks for serverMute
        !(
          (oldVoiceState.selfVideo === false &&
            newVoiceState.selfVideo === true) ||
          (oldVoiceState.selfVideo === true &&
            newVoiceState.selfVideo === false)
        ) && //checks for selfVideo
        !(
          (oldVoiceState.streaming === false &&
            newVoiceState.streaming === true) ||
          (oldVoiceState.streaming === true &&
            newVoiceState.streaming === false)
        ) //checks for streaming
      ) {
        if (activebag_id.includes(newChannelId)) {
          var channel_name_temp = client.channels.cache
            .get(newChannelId)
            .name.match(/[abcdefghijklmnopqrstuvwxyz]/g)
            .join(""); //gets the name only string ignores numbers
          pcidd = ll.returnpcid(channel_name_temp); //parentcategoryid
          namedata = ll.returnlist(channel_name_temp); //namedata
          namedata = orderBy(namedata); //sorts it
          const channel = await guild.channels.create(namedata[0], {
            type: "voice",
            parent: pcidd,
          });
          activebag_id.push(channel.id);
          activebag_names.push(namedata[0]);
          namedata.splice(namedata.indexOf(namedata[0]), 1); //removes the created vc name from dataset
          ll.updatedata(channel_name_temp, namedata); //updates the dataset to the node
        }
      }
    }
  }
  //delete vc func
  if (oldChannelId !== newChannelId && oldChannelId !== null) {
    if (
      oldChannel.members.size === 0 &&
      !id_keys.includes(oldChannelId) &&
      activebag_id.includes(oldChannelId)
    ) {
      var channel_name_temp = client.channels.cache
        .get(oldChannelId)
        .name.match(/[abcdefghijklmnopqrstuvwxyz]/g)
        .join("");
      var channel_name_temp_ins = client.channels.cache.get(oldChannelId).name;
      namedata = ll.returnlist(channel_name_temp);
      namedata.push(channel_name_temp_ins);
      activebag_names.splice(activebag_names.indexOf(channel_name_temp), 1);
      activebag_id.splice(activebag_id.indexOf(oldChannelId), 1);
      ll.updatedata(channel_name_temp, namedata);
      await oldChannel.delete();
    }
  }
});

client.login(token);
