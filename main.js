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

var count = 0
const mainCategory = '875292443917037610';
const mainChannel = '875331035112566804';
const temporaryChannels = new Set();
var c = new Boolean(false);
//generates a name storage array 
function gen(nam){
    var limit =1 ;
    names = new Array();
    names[0]=nam;
    for(let i=0; i<limit+1 ; i++){
        names[1+i]=nam+" " +(1+i);

    }
    //console.log(names)
    c=false;
}
var temp_main=mainChannel;;
client.on('voiceStateUpdate', async (oldVoiceState, newVoiceState) => {
    try {
        const {channelID: oldChannelId, channel: oldChannel} = oldVoiceState;
        const {channelID: newChannelId, guild, member} = newVoiceState;
        var nam = client.channels.cache.get(mainChannel)
        if (c) gen(nam.name); // generates a name arr once

        if (newChannelId === temp_main) {
            const channel = await guild.channels.create(
                names[1],
                {type: 'voice', parent: mainCategory}
            );
            temporaryChannels.add(channel.id);
            temp_main=channel.id;
            names.splice(names.indexOf(names[1]),1)            
            //await newVoiceState.setChannel(channel); //moves user to new channel
        }
        // Remove empty temporary channels
        if ( temporaryChannels.has(oldChannelId) && oldChannelId !== newChannelId && oldChannel.members.size === 0 ) {
            var n = client.channels.cache.get(oldChannelId);
            names.push(n.name)
            names.sort();
            await oldChannel.delete();
            temporaryChannels.delete(oldChannelId);
        }
    } catch (error) {
        // Handle any errors
        console.error(error);
    }
});


 client.login(token);
