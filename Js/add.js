module.exports = function add() {
    

const fs = require('fs');
const prompt = require('prompt-sync')();

let rawdata = fs.readFileSync(__dirname + '/../Dev/accounts.json');
let data = JSON.parse(rawdata);
var countKey = Object.keys(data).length;

let username = prompt('Enter USERNAME:');
let password = prompt('Enter PASSWORD:', {echo: '*'});

let judge = true;

for(let i=0;i<countKey;i++){
    if(data[i].username==username.toLowerCase()){
        judge = false;
        break;
    }
}

if(judge){
    data[countKey]={
        "username": username.toLowerCase().trim(),
        "password": password.trim(),
        "addedon": new Date().toLocaleString()
    };
    fs.writeFile((__dirname + '/../Dev/accounts.json'), JSON.stringify(data, null, 2), (err) => {
        if (err) throw err;
        console.log('Account Successfully Registered!');
    });
} else {
    console.log('Account could not be added because account with same username already exists.');
}

}