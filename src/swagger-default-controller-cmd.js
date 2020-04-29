module.exports.ServiceName = ""; //fileName if empty,null or undefined
module.exports.Service = ({controllerProviderForFile}) => ({
    handler: (args) => controllerProviderForFile.generate({...args}),
    builder: _ => _.demandOption(['swagger-file'])
});
