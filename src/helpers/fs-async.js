const fs = require('fs');

function existsAsync(path) {
    return new Promise(function (resolve, reject) {
        if (fs.existsSync(path)) {
            resolve(true);
        }

        resolve(false);
    });
}

function mkdirAsync(path) {
    return new Promise((resolve, reject) => {
        fs.mkdir(path, { recursive: true }, error => {
            if (error) reject(error);

            resolve();
        });
    });
}

const writeFileAsync = (file, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, error => {
            if (error) reject(error);

            // resolve("file created successfully!");
            resolve();
        });
    });
};

const isDirectoryAsync = (path) => {
    return new Promise((resolve, reject) => {
        resolve(fs.statSync(path).isDirectory())
    });
}

const readDirAsync = (path) => {
    return new Promise((resolve, reject) => {
        const loadedDependencies = fs.readdirSync(path);

        resolve(loadedDependencies);
    });
}

module.exports.Service = ({ }) => ({ existsAsync, mkdirAsync, writeFileAsync, isDirectoryAsync, readDirAsync });