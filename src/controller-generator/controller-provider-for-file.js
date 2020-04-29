const YAML = require('yamljs');
const path = require('path');

module.exports.Service = ({swaggerV2JavascriptDefaultControllerGenerator, capitalize, appEnv}) =>
    ({
        generate: async ({swaggerFile, destinationDir, overwrite, isEmptyFunctionBody, isShortFunctionBodySyntax}) => {

            const swaggerDefinition = YAML.load(swaggerFile);

            const swaggerFilePath = path.basename(swaggerFile);

            const fileExtension = path.extname(swaggerFilePath);

            const fileName = path.basename(swaggerFilePath, fileExtension);

            let capitalizedFileName = capitalize(fileName);

            appEnv && Object.entries(appEnv).filter(([key, value]) => key.includes('ds.') || key.includes('cs.')).forEach(([key, value]) => {
                const [group, serviceName, fieldName] = key.split('.');

                if(serviceName === capitalizedFileName){
                    swaggerDefinition[fieldName] = value;
                }
            });

            await swaggerV2JavascriptDefaultControllerGenerator.generate({
                swaggerDefinition,
                destinationDir,
                overwrite,
                isEmptyFunctionBody,
                isShortFunctionBodySyntax
            });
        }
    });