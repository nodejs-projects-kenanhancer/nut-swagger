const YAML = require('yamljs');
const path = require('path');

async function generate({ swaggerDir, destinationDir, overwrite, isEmptyBody, swaggerV2JavascriptDefaultControllerGenerator, fsAsync: { isDirectoryAsync, readDirAsync } }) {

    if (await isDirectoryAsync(swaggerDir)) {
        const swaggerFiles = (await readDirAsync(swaggerDir)).filter(filePath => {
            const fileExtension = path.extname(filePath);

            return fileExtension === '.yaml' || fileExtension === '.yml' || fileExtension === '.json';
        });

        for (const swaggerFile of swaggerFiles) {
            const swaggerFilePath = path.join(swaggerDir, swaggerFile);

            const swaggerDefinition = YAML.load(swaggerFilePath);

            await swaggerV2JavascriptDefaultControllerGenerator.generate({ swaggerDefinition, destinationDir, overwrite, isEmptyBody });
        }
    }
}

module.exports.ServiceName = ""; //fileName if empty,null or undefined
module.exports.Service = ({ swaggerV2JavascriptDefaultControllerGenerator, fsAsync }) => ({
    handler: (args) => generate({ ...args, swaggerV2JavascriptDefaultControllerGenerator, fsAsync }),
    builder: _ => _.demandOption(['swagger-dir'])
});
