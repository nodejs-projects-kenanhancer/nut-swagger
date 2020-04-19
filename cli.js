const nutIoc = require('nut-ioc');
const open = require('open');

const nutIocContainer = nutIoc();

if (require.main === module) {
    // The file is being executed directly (not with require)
    nutIocContainer.use({ dependencyPath: './node_modules/nut-swagger/src' });
} else {
    nutIocContainer.use({ dependencyPath: './src' });
}

const mainAsync = async () => {

    const { swaggerDefaultControllerCmd, swaggerDefaultControllersFromDirCmd } = await nutIocContainer.build();

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
        .option('isEmptyBody', {
            alias: 'ieb',
            description: 'Generating function body',
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

module.exports.default = mainAsync;