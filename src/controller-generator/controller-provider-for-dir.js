const YAML = require('yamljs');
const path = require('path');

module.exports.Service = ({controllerProviderForFile, fsAsync: {isDirectoryAsync, readDirAsync}}) =>
    ({
        generate: async ({swaggerDir, destinationDir, overwrite, isEmptyFunctionBody, isShortFunctionBodySyntax}) => {

            if (await isDirectoryAsync(swaggerDir)) {
                const swaggerFiles = (await readDirAsync(swaggerDir)).filter(filePath => {
                    const fileExtension = path.extname(filePath);

                    return fileExtension === '.yaml' || fileExtension === '.yml' || fileExtension === '.json';
                });

                for (const swaggerFilePath of swaggerFiles) {
                    const swaggerFile = path.join(swaggerDir, swaggerFilePath);

                    await controllerProviderForFile.generate({
                        swaggerFile,
                        destinationDir,
                        overwrite,
                        isEmptyFunctionBody,
                        isShortFunctionBodySyntax
                    });
                }
            }
        }
    });