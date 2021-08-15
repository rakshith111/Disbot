// var readline = require("readline");
// var rl = readline.createInterface(process.stdin, process.stdout);
// var obj = {}
// obj.key1=new Array();
// obj.key2=new Array();
// obj.key2.push("asd")
// console.log(obj)
var limit =5 ;
var nam = "Hindi"

names = new Array();
names[0]=nam;
for(let i=0; i<limit+1 ; i++){
    names[1+i]=nam+" " +(1+i);

}
names.push("Hindi 83")
names.push("Hindi 12")
names.push("Hindi 82")
names.push("Hindi 86")
names.push("Hindi 23")
names.push("Hindi 8")
names.sort()
console.log(names)
names.splice(names.indexOf("Hindi 8"),1)
console.log(names)