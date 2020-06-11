module.exports = function caller() {
    

const fs = require('fs');
const path = require('path');
//var builder = require('./builder');
var exec = require('child_process').exec,
    child;
//
let rawdata = fs.readFileSync(__dirname + '/../Dev/accounts.json');
let data = JSON.parse(rawdata);
var countKey = Object.keys(data).length;


for (let i=0; i<countKey; i++) { 
    task(i); 
} 
//`node \"${path.join(__dirname,"/Js/builder.js" ${user} ${pass})}\"`
function task(i) { 
    setTimeout(async function() { 
    let user = data[i].username;
    let pass = data[i].password;
    child = exec(`node \"${path.join(__dirname,"/builder.js")}\" ${user} ${pass}`,
    function (error, stdout, stderr) {
      console.log('stdout: \n' + stdout);
      //console.log('stderr: ' + stderr);
      if (error !== null) {
        console.log('exec error: ' + error);
      }
    });
    //console.log(`${user}:${pass}`)
   }, 10000 * i); 
} 

//console.log("DONE WORK")

}