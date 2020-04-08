const path = require('path');

const fs = jest.genMockFromModule('fs');
const _fs = jest.requireActual('fs');

Object.assign(fs, _fs);
const readMock = [];
fs.setReadMock = (path, error, data) => {
    readMock[path] = [error, data];
};

fs.readFile = (path, options, callback) => {
    if (callback === undefined) {
        callback = options;
    }
    if (path in readMock) {
        callback(...readMock[path]);
    } else {
        _fs.readFile(path, options, callback);
    }
};

const writeMock = [];

fs.setWriteMock = (path, fn) => {
    writeMock[path] = fn;
};

fs.writeFile = (file, data, options, callback) => {
    if (file in writeMock) {
        writeMock[file](file, data, options, callback);
    } else {
        _fs.writeFile(file, data, options, callback);
    }
};

module.exports = fs;