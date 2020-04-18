const nutIoc = require('nut-ioc');
const open = require('open');

const nutIocContainer = nutIoc();

nutIocContainer.use({ dependencyPath: './src' });

const mainAsync = async () => {

    const { swaggerDefaultControllerCmd } = await nutIocContainer.build();

    const argv = require('yargs')
        .version()
        .usage('Usage: $0 <command> [options]')
        .command(['generate-default-controller [swagger-file] [destination-dir]', 'generate', 'g'],
            'Generate Javascript file from swagger in destination directory',
            swaggerDefaultControllerCmd)
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
        .demandOption(['swagger-file', 'destination-dir'])
        .example('$0 generate-js hello-world.yaml ./', 'Generate Javascript file from swagger in `my-project` directory.')
        .command(['docs'], 'Go to the documentation at https://kenanhancer.com', {}, _ => open('https://kenanhancer.com'))
        .help('h')
        .alias('h', 'help')
        .epilogue('for more information, find the documentation at https://kenanhancer.com')
        .argv;
};

module.exports.default = mainAsync;