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
// client.on('voiceStateUpdate',async(oldstate,newstate)=>{
//     const user = await client.users.fetch(newstate.id);
//     const member = newstate.guild.member(user);

//     if(!oldstate.channel && newstate.channel.id === '875331035112566804'){ //voice channel id  ez gotta make a list for this       
//         count = count +1
//         console.log(name+count)
        
//         const channel = await newstate.guild.channels.create(name+count,{
//             type:'voice',
//             parent :newstate.channel.parent,
//         });     
//         member.voice.setChannel(channel);
//         console.log(channel.id)
//         voiceCollection.set(channel.id,user.id); //  creates a map channel id :uid 
//         console.log(voiceCollection)
//     }
//      //else if (!newstate.channel ){
//     //     flag=0
//     //     if(oldstate.channelID===voiceCollection.get(newstate.id) ) 
//     //         count=count-1;
//     //         console.log("delete count " +count)
//     //         return oldstate.channel.delete();  //
//     // }
// });
const mainChannel = '875331035112566804';
const mainCategory = '875292443917037610';
const temporaryChannels = new Set();
client.on('voiceStateUpdate', async (oldVoiceState, newVoiceState) => {
    try {
        const {channelID: oldChannelId, channel: oldChannel} = oldVoiceState;
        const {channelID: newChannelId, guild, member} = newVoiceState;
        if (newChannelId === mainChannel) {

            const channel = await guild.channels.create(
                `${member.user.username}'s channel`,
                {type: 'voice', parent: mainCategory}
            );
            temporaryChannels.add(channel.id);
            await newVoiceState.setChannel(channel);
        }
        if (
            temporaryChannels.has(oldChannelId) &&
            oldChannelId !== newChannelId
        ) {
            await oldChannel.delete();
            temporaryChannels.delete(oldChannelId);
        }
    } catch (error) {
        // Handle any errors
        console.error(error);
    }
});


 client.login(token);
