const YAML = require('yamljs');

async function generate({ swaggerFile, destinationDir, overwrite, isEmptyFunctionBody, isShortFunctionBodySyntax, swaggerV2JavascriptDefaultControllerGenerator }) {
    const swaggerDefinition = YAML.load(swaggerFile);

    await swaggerV2JavascriptDefaultControllerGenerator.generate({ swaggerDefinition, destinationDir, overwrite, isEmptyFunctionBody, isShortFunctionBodySyntax });
}

module.exports.ServiceName = ""; //fileName if empty,null or undefined
module.exports.Service = ({ swaggerV2JavascriptDefaultControllerGenerator }) => ({
    handler: (args) => generate({ ...args, swaggerV2JavascriptDefaultControllerGenerator }),
    builder: _ => _.demandOption(['swagger-file'])
});
