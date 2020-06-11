#!/usr/bin/env node

const program = require('commander');
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
// import function to list coffeee menu
//const list = require('./lib/list');

// import function to order a coffee
const order = require('./lib/order');

/******************************************
clear();

console.log(
  chalk.yellow(
    figlet.textSync('Ginit', { horizontalLayout: 'full' })
  )
);*/
// Print coffee drinks menu
// $ coffee-shop list
// $ coffee-shop ls
/*
program
    .command('list') // sub-command name
    .alias('ls') // alternative sub-command is `al`
    .description('List coffee menu') // command description

    // function to execute when command is uses
    .action(function () {
        list();
    });

*/
// Order a coffee
// $ coffee-shop order
// $ coffee-shop o
program
    .command('order') // sub-command name
    .alias('o') // alternative sub-command is `o`
    .description('Execute the Program') // command description

    // function to execute when command is uses
    .action(async function () {
        await order();
        /*await order();
        (function task() { 
            setTimeout(function() { 
                // Add tasks to do 
                order();
            }, 5000); 
         })()
         */
    });


// allow commander to parse `process.argv`
program.parse(process.argv);
program.exitOverride();