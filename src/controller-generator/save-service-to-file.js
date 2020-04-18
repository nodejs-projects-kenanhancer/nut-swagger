const fs = require('fs');
const path = require('path');

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

module.exports.Service = ({ }) =>
    async ({ generatedServices, destinationDir, overwrite }) => {

        for (const serviceName in generatedServices) {
            const generatedServiceCode = generatedServices[serviceName];

            const filePath = path.join(destinationDir, `${serviceName}.js`);

            if (await existsAsync(filePath) && !overwrite) {
                console.error(`${filePath} file exists and overwrite option is false. So it is not created.`);
            } else {
                if (!(await existsAsync(destinationDir))) {
                    await mkdirAsync(destinationDir);
                }

                await writeFileAsync(filePath, generatedServiceCode);
            }
        }
    };