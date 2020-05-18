const fs = require("fs");

export const writeFileToServer = (data: any, path: string) => {

    fs.writeFile(path, data, (err: any) => {
        if (!err) {
            console.log('Data Written');
        } else {
            throw err;
        }
    })
}

export const appendTextToFile = (path: string, data: any) => {

    fs.appendFile(path, data, (err :any) => {
        if (!err) {
            console.log('Data Appended');
        } else {
            throw err;
        }
    });
}