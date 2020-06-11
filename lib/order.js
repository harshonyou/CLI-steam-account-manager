const inquirer = require('inquirer');
const colors = require('colors');
const pad = require('pad');

const add = require('../Js/add');
const remove = require('../Js/remove');
const caller = require('../Js/caller');
const loader = require('../Js/htmlloader');
const status = require('../Js/status');
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const fs = require('fs');


const menuOPTIONS = ["Import","Remove","Update","Status","Preview","Exit"];



function dragoon() {
    console.log(
        chalk.yellow(
          figlet.textSync('Dragoon', { horizontalLayout: 'full' })
        )
      );
}
clear();
dragoon();

const CLI = require('clui');
const Spinner = CLI.Spinner;

function spinner(params) {
    var countdown = new Spinner('Exiting to main menu in 3 seconds...  ', ['⣾','⣽','⣻','⢿','⡿','⣟','⣯','⣷']);
    countdown.start();
    var number = params;
    setInterval(function () {
        number--;
        countdown.message('Exiting to main menu in ' + number + ' seconds...  ');
        if (number === 0) {
            countdown.stop();
        }
    }, 1000);
}

const Ora = require('ora');

function spinter(params,kek) {
    let yikes=""
    if(!kek)
    yikes='Exiting To Main Menu';
    else
    yikes=kek
    const spinnerDiscardingStdin = new Ora({
        text: yikes,
        spinner: process.argv[2]
    });
    
    spinnerDiscardingStdin.start();
    
    setTimeout(() => {
        spinnerDiscardingStdin.succeed();
    }, params* 1000);
}






let order = function () {
    inquirer
        .prompt({ type: 'list', name: 'optionType', message: 'Choose Option To Perform', choices: menuOPTIONS })
        .then(function (answers) {
            //console.log('YOUR ORDER');
            //console.log('------------------');
            //console.log(pad(colors.grey('Option type: '), 30), answers.optionType);
            switch (answers.optionType) {
                case menuOPTIONS[0]:
                    add();
                    setTimeout(function(){
                        spinter(5);
                    }, 300);
                    setTimeout(function(){
                        clear();
                        dragoon();
                        order();
                    }, 5600);
                    break;
                case menuOPTIONS[1]:
                    remove();
                    setTimeout(function(){
                        spinter(5);
                    }, 300);
                    setTimeout(function(){
                        clear();
                        dragoon();
                        order();
                    }, 5600);
                    break;
                case menuOPTIONS[2]:
                    caller();
                    let rawdata = fs.readFileSync(__dirname + '/../Dev/accounts.json');
                    let data = JSON.parse(rawdata);
                    var countKey = Object.keys(data).length;
                    spinter(countKey*10,`Please wait...`);
                    setTimeout(function(){
                        clear();
                        dragoon();
                        order();
                    }, countKey*10000+600);
                    break;
                case menuOPTIONS[3]:
                    spinter(0.7,`Creating Cache File...`);
                    status();
                    setTimeout(() => {
                        console.log("Cache File Successfully Generated!")
                    }, 800);
                    setTimeout(function(){
                        clear();
                        dragoon();
                        order();
                    }, 1800);
                    break;
                case menuOPTIONS[4]:
                    spinter(1,`Opening Preview...`);
                    loader();
                    setTimeout(function(){
                        clear();
                        dragoon();
                        order();
                    }, 1300);
                    break;
                case menuOPTIONS[5]:
                    spinter(1,`Exiting...`);
                    setTimeout(function(){
                        process.exit(0);
                    }, 1000);
                    break;
                default:
                    break;
            }
            
        });
};
module.exports = order;