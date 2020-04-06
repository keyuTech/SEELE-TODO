const db = require('./db');
const inquirer = require('inquirer');

module.exports.add = async (words) => {
    const list = await db.read();
    list.push({title: words, done: false});
    db.write(list);
};

module.exports.clear = async () => {
    db.write([]);
};

module.exports.showAll = async () => {
    const list = await db.read();
    inquirer
        .prompt(
            {
                type: 'list',
                name: 'index',
                message: 'Choose one task you want to operate.',
                choices: [{
                    name: 'Quit',
                    value: '-1'
                }, ...list.map((action, index) => {
                    return {
                        name: `${action.done ? '[√]' : '[_]'} ${index + 1} - ${action.title}`,
                        value: index.toString()
                    };
                }), {name: '+ Create a new Task', value: '-2'}]
            }
        )
        .then(answer => {
            const index = parseInt(answer.index);
            if (index >= 0) {
                // 选中操作
                inquirer.prompt({
                    type: 'list',
                    name: 'operation',
                    message: 'What operation do you want?',
                    choices: [
                        {name: 'Quit', value: 'quit'},
                        {name: 'Done', value: 'done'},
                        {name: 'Undone', value: 'undone'},
                        {name: 'Update', value: 'update'},
                        {name: 'Delete', value: 'delete'},
                    ]
                }).then(option => {
                    switch (option.operation) {
                        case 'done':
                            list[index].done = true;
                            db.write(list);
                            break;
                        case 'undone':
                            list[index].done = false;
                            db.write(list);
                            break;
                        case 'update':
                            inquirer.prompt({
                                type: 'input',
                                name: 'title',
                                message: "New task title"
                            }).then(input => {
                                list[index].title = input.title;
                                db.write(list);
                            });
                            break;
                        case 'delete':
                            list.splice(index, 1);
                            db.write(list);
                            break;
                    }
                });
            } else if (index === -2) {
                inquirer.prompt({
                    type: 'input',
                    name: 'title',
                    message: "What is the title of your new task?"
                }).then(input => {
                    list.push({
                        title: input.title,
                        done: false,
                    });
                    db.write(list);
                });
            }
        });
};
