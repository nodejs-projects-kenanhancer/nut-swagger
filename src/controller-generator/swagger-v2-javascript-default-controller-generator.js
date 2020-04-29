module.exports.ServiceName = ""; //fileName if empty,null or undefined
module.exports.Service = ({ saveServiceToFile, capitalize, generateFunctionBody, generateFunction, generateDefaultSyntaxServiceModule, generateShortSyntaxServiceModule }) =>
    ({
        generate: async ({ swaggerDefinition, destinationDir, overwrite = false, isEmptyFunctionBody = false, isShortFunctionBodySyntax = false }) => {

            const serviceFunctionBodies = {};

            const { schemes, host, basePath, paths, parameters, consumes, produces } = swaggerDefinition;

            for (const path in paths) {

                const methods = paths[path];

                for (const method in methods) {

                    const { parameters: methodParameters, operationId } = methods[method];

                    let namespace;
                    let serviceId;
                    let actionFuncName;

                    const parts = operationId && operationId.split('.');

                    if (!parts || (parts && parts.length < 2)) {
                        throw new Error(`${path} in Swagger definition doesn't have a proper operationId. Syntax should be like this "Greeting.sayHello"`)
                    } else if (parts.length === 3) {
                        namespace = parts.slice(0, parts.length - 2).join('.');
                        serviceId = parts[parts.length - 2];
                        actionFuncName = parts[parts.length - 1];
                    } else if (parts.length === 2) {
                        [serviceId, actionFuncName] = parts;
                    }

                    const extraParameters = {};
                    for (const methodParameter of methodParameters) {

                        let prm;
                        let methodParameterObj;

                        if (methodParameter.hasOwnProperty('$ref')) {
                            prm = Object.values(methodParameter)[0];

                            const splitParam = prm.split('/');

                            const methodParameterName = splitParam && splitParam[splitParam.length - 1];

                            prm = methodParameterName;

                            methodParameterObj = parameters[prm];
                        } else {
                            prm = methodParameter.name;

                            methodParameterObj = methodParameter;
                        }

                        const capitalizedPrm = await capitalize(prm);
                        extraParameters[capitalizedPrm] = methodParameterObj;
                    }

                    let funcBody;

                    if (!isEmptyFunctionBody) {
                        funcBody = await generateFunctionBody({
                            method,
                            schemes,
                            host,
                            basePath,
                            path,
                            parameters: extraParameters
                        });
                    } else {
                        funcBody = 'return {};';
                    }

                    const funcHeader = await generateFunction({
                        functionName: actionFuncName,
                        parameters: Object.keys(extraParameters).join(', '),
                        funcBody
                    });

                    if (!serviceFunctionBodies.hasOwnProperty(serviceId)) {
                        serviceFunctionBodies[serviceId] = [];
                    }

                    serviceFunctionBodies[serviceId].push(funcHeader);

                }
            }

            const generatedServices = {};

            for (const serviceName in serviceFunctionBodies) {
                const serviceFunctionBody = serviceFunctionBodies[serviceName];
                let generatedService;

                if(isShortFunctionBodySyntax){
                    generatedService = await generateShortSyntaxServiceModule({
                        functionsBodies: serviceFunctionBody.join(',\n'),
                        dependencies: 'requestHandler'
                    });
                }else{
                    generatedService = await generateDefaultSyntaxServiceModule({
                        functionsBodies: serviceFunctionBody.join(',\n'),
                        dependencies: 'requestHandler'
                    });
                }

                generatedServices[serviceName] = generatedService;
            }

            await saveServiceToFile({ generatedServices, destinationDir, overwrite });
        }
    });
