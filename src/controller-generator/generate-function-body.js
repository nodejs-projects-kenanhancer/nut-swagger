module.exports.Service = ({ }) =>
    ({ method, schemes, host, basePath, path, parameters }) => {
        const headers = [];
        let payload = undefined;

        for (const prm in parameters) {
            const { name, in: parameterLocation, required, type, maxLength } = parameters[prm];

            if(parameterLocation === 'body'){
                payload = name;
            }
            else{
                headers.push(`"${name}": ${prm} || ''`);
            }
        }

        const scheme = schemes && schemes.length > 0 && schemes[0];
        const isParameterizedPath = path && path.includes('{');
        let requestPath;
        let url;

        if (isParameterizedPath) {
            const replacedPath = path.replace('{', '${');

            requestPath = `\`${replacedPath}\``;
            url = `\`${scheme}://${host}${basePath}${replacedPath}\``;
        } else {
            requestPath = `"${path}"`;
            url = `"${scheme}://${host}${basePath}${path}"`;
        }

        return `const requestArgs = {
                method: "${method.toUpperCase()}",
                schemes: "${scheme}",
                host: "${host}",
                basePath: "${basePath}",
                path: ${requestPath},
                url: ${url},
                payload: ${payload},
                headers: {
                    ${headers.join(',\n\t\t\t\t\t')}
                }
            };
            
            const response = await requestHandler.executeAsync(requestArgs);

            return response;`;
    };
