const fs= require('fs')
const Discord = require('discord.js');	
const { orderBy } = require('natural-orderby')
const { token } = require('./config.json');
const { inherits } = require('util');
const client = new Discord.Client() 

class Node {
    // constructor
    constructor(element,pvid,pcid)
    {   
        this.name=element
        this.parentvoice_id=pvid //parent voiceid
        this.parentcatagory_id=pcid //parent catagory id
        this.nameset =[] //nameset contains list of creatable vc names
        for(let i=0;i<21;i++){
            this.nameset.push(element+" "+i)
        }
        this.nameset.shift();
        this.next = null
    }
}
class LinkedList {
    constructor(){
        this.head = null;
        this.size = 0;
    }
    //add(vc name , vcid, ,catagoryparent id)
    add(element,pvid,pcid){ // function adds a new node     
        // creates a new node
        let node = new Node(element,pvid,pcid);
        // to store current node
        let current;
        // if list is Empty add the
        // element and make it head
        if (this.head == null)
            this.head = node;
        else {
            current = this.head;
            // iterate to the end of the
            // list
            while (current.next) {
                current = current.next;
            }
            // add node
            current.next = node;
        }
        this.size++;
        console.log('NODE '+ element+" was created")
    }
    useradd(vcid,pvid){
        var vcid_name=client.channels.cache.get(vcid).name
        let node = new Node(vcid_name,vcid,pvid);
        // to store current node
        let current;
        // if list is Empty add the
        // element and make it head
        if (this.head == null)
            this.head = node;
        else {
            current = this.head;
            // iterate to the end of the
            // list
            while (current.next) {
                current = current.next;
            }
            // add node
            current.next = node;
        }
        this.size++;
        console.log('NODE '+ vcid_name+" was created")
    
    }
    returnpcid(name){
        let current = this.head;
        while (current != null) {
            if (current.name === name)
               return current.parentcatagory_id
            current = current.next;
        }
    }
    idexists(channel_name){
        let current = this.head;
        console.log(channel_name)
        try {
            while (current != null) {
                if (current.name === channel_name)
                   return false
                current = current.next;
            }
        } catch (error) {
            console.log("/"+dat+"/"+"was entered")
        }        
    }

    returnlist(nameof) {
        let current = this.head;
        try {
            while (current != null) {
                if (current.name === nameof)
                   return current.nameset
                current = current.next;
            }
        } catch (error) {
            console.log("/"+dat+"/"+"was entered")
        }        
    }
    returnname(channel_name){
        let current = this.head;
        try {
            while (current != null) {
                if (current.name === channel_name)
                   return current.name
                current = current.next;
            }
        } catch (error) {
            console.log("/"+dat+"/"+"was entered")
        }        
    }
    updatedata(name,data) {
        let current = this.head;
        try {
            while (current != null) {
                if (current.name === name)
                    current.nameset= data
                current = current.next;
            }
        } catch (error) {
            console.log("/"+dat+"/"+"was entered")
            
        }
    }
    prnt(){
        let current=this.head
        console.log(current)
    }
    printlist(dat){
        let current = this.head
        while (current != null) {
            // compare each element of the list
            // with given element
            if (current.name === dat)
              console.log( current.nameset)
            current = current.next;
        }

    }
}
let Check_flag=1;
let ll = new LinkedList()
let id_json_data
let id_keys=[]
let id_name=[]
let activebag_names=[]
let activebag_id=[]
const prefix="!";
var dict = {};

//inits data from file  only happens once during startup
let init = function(){
    
    if(Check_flag){
        id_json_data= fs.readFileSync('./id.json', 'utf8',(err, fileContents) => {
            return fileContents
      })
    console.log("generating data")
    id_json_data=JSON.parse(id_json_data) //string data is converted to JSON OBJS

    id_keys=Object.keys(id_json_data) //keys are extractedd
    console.log(id_keys)
    console.log(id_json_data)

    for(let id of id_keys){
        activebag_id.push(id)                                   
        id_name.push(client.channels.cache.get(id).name)    // assigns the channel names to the id_name list
    }
    for(var i=0;i<id_keys.length;i++)
         ll.add(id_name[i],id_keys[i],id_json_data[id_keys[i]]) //creates a linked list (of array) to store the names availabe for setting the vc name
    ll.prnt()
}
Check_flag=false
}
// check() checks if the vc's ids are valid this should be  performed whenever the voicestateupdate is called and inits data 
function check(){
    let id_json_data_C= fs.readFileSync('./id.json', 'utf8',(err, fileContents) => {
        return fileContents 
    })
id_json_data_C=JSON.parse(id_json_data_C) //string data is converted to JSON OBJS
id_keys_C=Object.keys(id_json_data_C)
for(var i of id_keys_C){
    if(client.channels.cache.get(i) === undefined){
        console.log(i + "  has been yeeted")
        delete id_json_data_C[i]
    }
}
console.log(id_json_data_C)
let id_json_write =fs.writeFileSync("id.json", JSON.stringify(id_json_data_C), err => { });    //writing the merged data to the same file
    }

let namedata=[]
client.on("ready", async () => {
    console.log("ready called")
    check()
    init()
    client.user.setPresence({
        activity: { 
            name: 'WITH DEEZ NUTS',
            type: 'PLAYING'
        },
        status: 'dnd'
    })
})
client.on('message',async msg=>{
    if(msg.author.bot) return
    if(msg.content === '!set help'){
         client.channels.cache.get(msg.channel.id).send("Type \n !set  <main vc's id>  <vc's catagory id>")
            ll.prnt()
          return
    }
    const args = msg.content.slice(prefix.length).split(/ +/);
    if(msg.content.startsWith(prefix))
    console.log(args.length)
    switch(args[0]){
        case 'set': if(args.length === 3){

                            if(args[1].length  && args[2].length === 18 ){
                                console.log(id_keys)
                                if(id_keys.includes(args[1])){
                                    client.channels.cache.get(msg.channel.id).send(client.channels.cache.get(args[1]).name+" already exisis in the  set ")
                                }
                                else if(client.channels.cache.get(args[1]) !== undefined){         // to check for validity of id 
                                    dict[`${args[1]}`] =args[2];                               //dict[vcid]= parent id
                                    client.channels.cache.get(msg.channel.id).send(client.channels.cache.get(args[1]).name+"  has been added ")
                                    fs.readFile('./id.json', 'utf8', (err, fileContents) => {
                                        if (err){
                                            console.error(err) 
                                            return
                                        }
                                        try {   
                                        var data = JSON.parse(fileContents)                        // this data contains id from file
                                        dat=Object.assign(data,dict)                               //merging the prev data from file and the data from user                                  
                                        fs.writeFile("id.json", JSON.stringify(dat), err => {     //writing the merged data to the same file
                                            if (err) throw err; 
                                            console.log(" Written"); // Success
                                        });
                                        } catch(err) {
                                        console.error(err)
                                        }
                                    })
                                    activebag_id.push(args[1])                                //adds it to the list of ids which are supposed to be cloned
                                    id_name.push(client.channels.cache.get(args[1]).name)   //adds name to the permanent non deletable id list
                                    id_keys.push(args[1])
                                    ll.useradd(args[1],args[2])                                 //adds a new node to the pre existing one or creates one 
                                }
                            else
                            client.channels.cache.get(msg.channel.id).send("Wrong id")
                        }
                        else{
                            client.channels.cache.get(msg.channel.id).send("Enter the correct id's")
                        }
                }
                    

                    break;
    }
})

client.on('voiceStateUpdate', async (oldVoiceState, newVoiceState) => {
    const {channelID: oldChannelId, channel: oldChannel} = oldVoiceState;
    const {channelID: newChannelId, guild } = newVoiceState;
    console.log("activebagids "+   activebag_id)
    // console.log(id_keys)
    // ll.prnt()
    // create vc function 
    console.log(newChannelId)
    if(activebag_id.includes(newChannelId) ){

        var channel_name_temp=client.channels.cache.get(newChannelId).name.match(/[abcdefghijklmnopqrstuvwxyz]/g).join('')   //gets the name only string ignores numbers                                     
        pcidd=ll.returnpcid(channel_name_temp)                          //parentcatagoryid
        namedata=ll.returnlist(channel_name_temp)                      //namedata 
        namedata=orderBy(namedata)
        const channel = await guild.channels.create(
            namedata[0],
            {type: 'voice', parent: pcidd}
        );
        activebag_id.push(channel.id)
        activebag_names.push(namedata[0])
        namedata.splice(namedata.indexOf(namedata[0]),1)
        ll.updatedata(channel_name_temp,namedata) 
        console.log("current data availabe for naming \n")
        namedata=ll.returnlist(channel_name_temp) 
        console.log(namedata)  
        console.log("----------------------------------------------------------------------")  
    }
    //delete vc func
     if ( oldChannelId !== newChannelId && oldChannelId !== newChannelId && oldChannelId !== null  ){
        if(oldChannel.members.size === 0 && !id_keys.includes(oldChannelId) && activebag_id.includes(oldChannelId)){
            console.log('in del call')
            var channel_name_temp=client.channels.cache.get(oldChannelId).name.match(/[abcdefghijklmnopqrstuvwxyz]/g).join('')   
            var channel_name_temp_ins=client.channels.cache.get(oldChannelId).name
            namedata=ll.returnlist(channel_name_temp)
            namedata.push(channel_name_temp_ins) 
            activebag_names.splice(activebag_names.indexOf(channel_name_temp),1)
            activebag_id.splice(activebag_id.indexOf(oldChannelId),1)
            ll.updatedata(channel_name_temp,namedata) 
            await oldChannel.delete();
            console.log("channel "+ channel_name_temp_ins+ " is deleted")
            console.log("name added back\n")
            namedata=ll.returnlist(channel_name_temp) 
            console.log(namedata)
            console.log('***********************************************************************')
        }
}
})
client.login(token);