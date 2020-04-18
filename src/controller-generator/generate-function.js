module.exports.Service = ({ }) =>
    ({ functionName, parameters, funcBody }) => `        ${functionName}: async ({ ${parameters} }) => {
            ${funcBody}
        }`;
