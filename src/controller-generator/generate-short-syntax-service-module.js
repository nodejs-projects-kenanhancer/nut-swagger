module.exports.Service = ({ }) =>
    ({ functionsBodies, dependencies }) => `module.exports.ServiceName = ""; //fileName if empty,null or undefined
module.exports.Service = ({ ${dependencies} }) =>
    ({
${functionsBodies}
    });`;
