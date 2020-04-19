const path = require('path');

module.exports.Service = ({ fsAsync: { existsAsync, mkdirAsync, writeFileAsync } }) =>
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