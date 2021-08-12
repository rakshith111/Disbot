const Discord = require('discord.js');	
const { token } = require('./config.json');
prefix="!";
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })    
client.once('ready', () => {
	console.log('Ready!');
});
const{Collection}=require('discord.js');
const voiceCollection = new Collection();

// for user to add new ids 
// client.on('message',async msg=>{
//     if(msg.author.bot) return
//     const args = msg.content.slice(prefix.length).split(/ +/);
//     if(msg.content.startsWith(prefix))
//     {
//         console.log(args);
//     }   
// })



var count = 0
var name = "Voice #"
var flag=0

client.on('voiceStateUpdate',async(oldstate,newstate)=>{
    const user = await client.users.fetch(newstate.id);
    const member = newstate.guild.member(user);

    if(!oldstate.channel && newstate.channel.id === '875331035112566804'){ //voice channel id  ez gotta make a list like this      
        flag=1
        count = count +1
        console.log(name+count)
        
        const channel = await newstate.guild.channels.create(name+count,{
            type:'voice',
            parent :newstate.channel.parent,
        });     
        member.voice.setChannel(channel);
        voiceCollection.set(user.id,channel.id); // map a collection to add users who are moved  proly have to change this method
        console.log(voiceCollection)
    }
    // else if (!newstate.channel && flag === 1){
    //     flag=0
    //     if(oldstate.channelID===voiceCollection.get(newstate.id) ) 
    //         count=count-1;
    //         console.log("delete count " +count)
    //         return oldstate.channel.delete();  //
    // }
});


 client.login(token);
