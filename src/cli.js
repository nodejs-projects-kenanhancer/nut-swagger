require('dotenv').config();
const nutIoc = require('nut-ioc');
const open = require('open');
const {capitalize} = require('nut-ioc/helpers/string-helper');

const nutIocContainer = nutIoc();

const mainAsync = async () => {

    nutIocContainer.use({dependencyPath: __dirname});

    nutIocContainer.useDependency({
        ServiceName: "appEnv",
        Namespace: undefined,
        Service: {...process.env}
    });

    nutIocContainer.useDependency({
        ServiceName: "capitalize",
        Namespace: undefined,
        Service: ({}) => capitalize
    });

    const {swaggerDefaultControllerCmd, swaggerDefaultControllersFromDirCmd} = await nutIocContainer.build();

    const argv = require('yargs')
        .version()
        .usage('Usage: $0 <command> [options]')
        .command(['generate-default-controller [swagger-file] [destination-dir]', 'generate-controller', 'gc'],
            'Generate JavaScript file from swagger to destination directory',
            swaggerDefaultControllerCmd)
        .command(['generate-default-controllers-from-dir [swagger-dir] [destination-dir]', 'generate-controllers', 'gcs'],
            'Generate JavaScript files from swagger directory to destination directory',
            swaggerDefaultControllersFromDirCmd)
        .option('overwrite', {
            alias: 'o',
            description: 'Overwrite existing file',
            type: 'boolean',
            default: false
        })
        .option('isEmptyFunctionBody', {
            alias: 'iefb',
            description: 'Deciding function body content',
            type: 'boolean',
            default: false
        })
        .option('isShortFunctionBodySyntax', {
            alias: 'isfbs',
            description: 'Deciding function body syntax',
            type: 'boolean',
            default: false
        })
        .demandOption(['destination-dir'])
        .example('$0 generate-js hello-world.yaml ./', 'Generate JavaScript file from swagger in `my-project` directory.')
        .command(['docs'], 'Go to the documentation at https://kenanhancer.com', {}, _ => open('https://kenanhancer.com'))
        .help('h')
        .alias('h', 'help')
        .epilogue('for more information, find the documentation at https://kenanhancer.com')
        .argv;
};

module.exports = {mainAsync};
