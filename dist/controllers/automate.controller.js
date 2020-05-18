"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appendTextToFile = exports.writeFileToServer = void 0;
const fs = require("fs");
exports.writeFileToServer = (data, path) => {
    fs.writeFile(path, data, (err) => {
        if (!err) {
            console.log('Data Written');
        }
        else {
            throw err;
        }
    });
};
exports.appendTextToFile = (path, data) => {
    fs.appendFile(path, data, (err) => {
        if (!err) {
            console.log('Data Appended');
        }
        else {
            throw err;
        }
    });
};
