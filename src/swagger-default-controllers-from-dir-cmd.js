module.exports.ServiceName = ""; //fileName if empty,null or undefined
module.exports.Service = ({controllerProviderForDir}) => ({
    handler: (args) => controllerProviderForDir.generate({...args}),
    builder: _ => _.demandOption(['swagger-dir'])
});
