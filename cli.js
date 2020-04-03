const {program} = require('commander');
const api = require('./index.js');
program
    .option('-d, --debug', 'output extra debugging');

program
    .command('add')
    .description('add a task')
    .action((...args) => {
        const words = args.slice(1)[0] && args.slice(1)[0].join(' ');
        api.add(words)
    });
program.parse(process.argv);