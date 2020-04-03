const db = require('./db');

module.exports.add = async (words) => {
    const list = await db.read();
    list.push({title: words, done: false});
    db.write(list);
};