#!/usr/bin/env node
const {program} = require('commander');
const api = require('./index.js');
const pkg = require('./package.json');

program
    .version(pkg.version);
program
    .command('add')
    .description('add a task')
    .action((...args) => {
        const words = args.slice(1)[0] && args.slice(1)[0].join(' ');
        api.add(words);
    });
program
    .command('clear')
    .description('clear all tasks')
    .action(() => {
        api.clear();
    });
program
    .command('show')
    .description('show all tasks')
    .action(() => {
        api.showAll();
    });

program.parse(process.argv);

