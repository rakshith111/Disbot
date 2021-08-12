const Discord = require('discord.js');	
const { token } = require('./config.json');
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })    
client.once('ready', () => {
	console.log('Ready!');
});
const{Collection}=require('discord.js');
const voiceCollection = new Collection();
prefix="!";
// client.on('message',async msg=>{
//     if(msg.author.bot) return
//     const args = msg.content.slice(prefix.length).split(/ +/);
//     if(msg.content.startsWith(prefix))
//     {
//         console.log(args);
//     }   
// })
// general  vc id 875254954342891540
client.on('voiceStateUpdate',async(oldstate,newstate)=>{

    const user = await client.users.fetch(newstate.id);
    const member = newstate.guild.member(user);
    if(user.bot) console.log("aaaaaa")
    if(!oldstate.channel && newstate.channel.id === '875289644365914132'){
        const channel = await newstate.guild.channels.create(user.tag,{
            type:'voice',
            parent :newstate.channel.parent,
        });
        member.voice.setChannel(channel);
        voiceCollection.set(user.id,channel.id);

    }else if (!newstate.channel){
        if(oldstate.channelID===voiceCollection.get(newstate.id)) 
            return oldstate.channel.delete();
    }
});


client.login(token);
