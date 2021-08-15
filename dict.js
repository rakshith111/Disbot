const Discord = require('discord.js');	
const { token } = require('./config.json');
prefix="!";
const client = new Discord.Client()    
client.once('ready', () => {
	console.log('Ready!');
});
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
})
client.login(token);


// `${member.user.username}'s channel`,