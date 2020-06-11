module.exports = function remove() {
    

const fs = require('fs');
const prompt = require('prompt-sync')();

let rawdata = fs.readFileSync(__dirname + '/../Dev/accounts.json');
let data = JSON.parse(rawdata);
var countKey = Object.keys(data).length;

let username = prompt('Enter USERNAME:');

let counter = -1;

for(let i=0;i<countKey;i++){
    if(data[i].username==username.toLowerCase()){
        counter = i;
        break;
    }
}

if(counter==-1){
    console.log('Account could not be deleted because none with same username was found.');
} else {
    data.splice(counter,1);
    fs.writeFile((__dirname + '/../Dev/accounts.json'), JSON.stringify(data, null, 2), (err) => {
        if (err) throw err;
        console.log('Account Deleted!');
    });
}

}