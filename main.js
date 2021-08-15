const Discord = require('discord.js');	
const { token } = require('./config.json');
prefix="!";
const client = new Discord.Client()    
client.once('ready', () => {
	console.log('Ready!');
});
const{Collection}=require('discord.js');
const voiceCollection = new Collection();

var dict = {};
client.on('message',async msg=>{
    if(msg.author.bot) return
    const args = msg.content.slice(prefix.length).split(/ +/);
    if(msg.content.startsWith(prefix))
    switch(args[0]){
        case 'set': dict[`${args[1]}`] =args[2];
                    console.log(dict)
                    break;
    }
});

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
var count = 0
const mainCategory = '875292443917037610';
const mainChannel = '875331035112566804';
const temporaryChannels = new Set();

client.on('voiceStateUpdate', async (oldVoiceState, newVoiceState) => {
    try {
        const {channelID: oldChannelId, channel: oldChannel} = oldVoiceState;
        const {channelID: newChannelId, guild, member} = newVoiceState;
        var nam = client.channels.cache.get(mainChannel)
        
        if (newChannelId === mainChannel) {
            count = count +1
           
            const channel = await guild.channels.create(
                nam.name+count,
                {type: 'voice', parent: mainCategory}
            );
            temporaryChannels.add(channel.id);
            console.log(temporaryChannels)
            await newVoiceState.setChannel(channel);
        }
        // Remove empty temporary channels
        if ( temporaryChannels.has(oldChannelId) && oldChannelId !== newChannelId && oldChannel.members.size === 0 ) {
            // console.log(client.channels.cache.get(oldChannelId))
            // console.log(client.channels.cache.get(oldChannel.id))
            var n = client.channels.cache.get(oldChannelId);

            count=count-1
            await oldChannel.delete();
            temporaryChannels.delete(oldChannelId);
        }
    } catch (error) {
        // Handle any errors
        console.error(error);
    }
});


 client.login(token);
