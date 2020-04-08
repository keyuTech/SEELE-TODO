const db = require('../db.js');
const fs = require('fs');
jest.mock('fs');

describe('db', () => {
    it('can read files', async () => {
        const data = [{title: 'eat', done: true}];
        fs.setReadMock('/mockRead', null, JSON.stringify(data));
        const list = await db.read('/mockRead');
        expect(list).toStrictEqual(data);
    });
    it('can write files', async () => {
        let fakeFile;
        const list = [{title: 'buy', done: false}];
        fs.setWriteMock('./writeMock', (file, data, callback) => {
            fakeFile = data;
            callback(null);
        });
        await db.write(list, './writeMock');
        expect(fakeFile).toBe(JSON.stringify(list) + '\n');
    });
});