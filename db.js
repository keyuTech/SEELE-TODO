const homedir = require('os').homedir();
const home = process.env.HOME || homedir;
const path = require('path');
const fs = require('fs');

const db = {
    read (dbPath = path.join(home, '.todo')) {
        return new Promise((resolve, reject) => {
            fs.readFile(dbPath, {flag: 'a+'}, (err, data) => {
                if (err) return reject(err);
                let list;
                try {
                    list = JSON.parse(data.toString());
                } catch (parseErr) {
                    list = [];
                }
                resolve(list);
            });
        });
    },
    write (list, dbPath = path.join(home, '.todo')) {
        return new Promise((resolve, reject) => {
            const string = JSON.stringify(list);
            fs.writeFile(dbPath, string + '\n', (writeErr) => {
                if (writeErr) return reject(writeErr);
                resolve();
            });
        });
    }
};

module.exports = db;