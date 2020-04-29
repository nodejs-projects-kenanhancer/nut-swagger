# nut-swagger
It generates Controller JavaScript file from you swagger file.

[nut-swagger](https://www.npmjs.com/package/nut-swagger) npm package generates [nut-ioc](https://www.npmjs.com/package/nut-ioc) specific JavaScript files.

To learn more information about **nut-ioc**, click [nut-ioc](https://www.npmjs.com/package/nut-ioc) link.

## Demo GitHub Repository

You can find [nut-swagger](https://www.npmjs.com/package/nut-swagger) and [nut-ioc](https://www.npmjs.com/package/nut-ioc) usage in the following repository in **nut-swagger-usage** branch.

Check **package.json** Script block in the following repository.

https://github.com/nodejs-projects-kenanhancer/nut-ioc-basic-demo.git


## Installing nut-ioc with npm

```shell script
npm i nut-swagger
```

## Usage

Assume that you have the following swagger definition file.

**NOT:**
Notice that operationID is controllers.greetingService.sayHello and there are three parts on it.
nut-swagger assumes that sayHello is a function name, greetingService is a JavaScript file name and rest of it namespace name.

**Example**
com.kenanhancer.controllers.greetingService.sayHello

Namespace: "com.kenanhancer.controllers"  
ServiceName: "greetingService"  
FunctionName: "sayHello"


**`./swagger-definitions/greeting-definition.yaml`**
```yaml
swagger: '2.0'
info:
  description: Greeting API
  version: 1.0.0
  title: Greeting API
host: localhost:8080
basePath: /greeting-api/v1
schemes:
  - http
paths:
  /sayHello/{firstName}:
    get:
      summary: Say Hello Message
      operationId: controllers.greetingService.sayHello
      produces:
        - application/json
      parameters:
        - name: language
          in: header
          type: string
          enum:
            - EN
            - TR
          required: true
          description: Greeting Language.
        - name: firstName
          in: path
          type: string
          maxLength: 100
          required: true
          description: Person First Name.
        - name: lastName
          in: query
          type: string
          maxLength: 100
          required: true
          description: Person Last Name.
      responses:
        '200':
          description: success
  /sayGoodbye:
    get:
      summary: Say Goodbye Message
      operationId: controllers.greetingService.sayGoodbye
      produces:
        - application/json
      parameters:
        - name: language
          in: header
          type: string
          enum:
            - EN
            - TR
          required: true
          description: Greeting Language.
        - name: firstName
          in: query
          type: string
          maxLength: 100
          required: true
          description: Person First Name.
        - name: lastName
          in: query
          type: string
          maxLength: 100
          required: true
          description: Person Last Name.
      responses:
        '200':
          description: success
```

### Creating Controller JavaScript file

Run the following code to create file.
If **--isEmptyFunctionBody** value is **true**, then probably you need to write your business logic.
If **--isEmptyFunctionBody** value is **false**, then probably you will call a downstream service. So, nut-swagger will write method body for you.

```shell script
nut-swagger generate-default-controller ./swagger-definitions/greeting-definition.yaml ./services/controllers --overwrite true --isEmptyFunctionBody false
```

**Output**
```js
module.exports.ServiceName = ""; //fileName if empty,null or undefined
module.exports.Service = ({ requestHandler }) => {

    return {
        sayHello: async ({ language, firstName, lastName }) => {
            const requestArgs = {
                method: "GET",
                schemes: "http",
                host: "localhost:8080",
                basePath: "/greeting-api/v1",
                path: "/sayHello",
                url: "http://localhost:8080/greeting-api/v1/sayHello",
                payload: undefined,
                headers: {
                    "language": language || '',
                    "firstName": firstName || '',
                    "lastName": lastName || ''
                }
            };

            const response = await requestHandler.executeAsync(requestArgs);

            return response;
        },
        sayGoodbye: async ({ language, firstName, lastName }) => {
            const requestArgs = {
                method: "GET",
                schemes: "http",
                host: "localhost:8080",
                basePath: "/greeting-api/v1",
                path: "/sayGoodbye",
                url: "http://localhost:8080/greeting-api/v1/sayGoodbye",
                payload: undefined,
                headers: {
                    "language": language || '',
                    "firstName": firstName || '',
                    "lastName": lastName || ''
                }
            };

            const response = await requestHandler.executeAsync(requestArgs);

            return response;
        }
    };

};
```

### Creating Controller JavaScript file without body

Run the following code to create file.

```shell script
nut-swagger generate-default-controller ./swagger-definitions/greeting-definition.yaml ./services/controllers --overwrite true --isEmptyFunctionBody true
```

**Output**
```js
module.exports.ServiceName = ""; //fileName if empty,null or undefined
module.exports.Service = ({ requestHandler }) => {

    return {
        sayHello: async ({ firstName,lastName }) => {
            return {};
        },
        sayGoodbye: async ({ firstName,lastName }) => {
            return {};
        }
    };

};
```


### Creating Controller JavaScript files from directory

Run the following code to create files from directory. We need this options for repositories(Downstream service calls). Assume that you have **swagger-downstream-definitions** folder and there are three downstream service swagger definition files. In this case, you just run the following command then three JavaScript controller files will be created.

```shell script
nut-swagger generate-default-controllers-from-dir ./swagger-downstream-definitions ./services/repositories --overwrite true --isEmptyFunctionBody false
```

**Swagger Definition Files**

All Swagger definition files are listed below;

**`./swagger-downstream-definitions/greeting-english-definition.yaml`**
```yaml
swagger: '2.0'
info:
  description: English Greeting API
  version: 1.0.0
  title: English Greeting API
host: localhost:8080
basePath: /greeting-english-api/v1
schemes:
  - http
paths:
  /sayHello:
    get:
      summary: Say English Hello Message
      operationId: controllers.greetingEnglishService.sayHello
      produces:
        - application/json
      parameters:
        - name: firstName
          in: header
          type: string
          maxLength: 100
          required: true
          description: Person First Name.
        - name: lastName
          in: header
          type: string
          maxLength: 100
          required: true
          description: Person Last Name.
      responses:
        '200':
          description: success
  /sayGoodbye:
    get:
      summary: Say English Goodbye Message
      operationId: controllers.greetingEnglishService.sayGoodbye
      produces:
        - application/json
      parameters:
        - name: firstName
          in: header
          type: string
          maxLength: 100
          required: true
          description: Person First Name.
        - name: lastName
          in: header
          type: string
          maxLength: 100
          required: true
          description: Person Last Name.
      responses:
        '200':
          description: success
```

**`./swagger-downstream-definitions/greeting-turkish-definition.yaml`**
```yaml
swagger: '2.0'
info:
  description: Turkish Greeting API
  version: 1.0.0
  title: Turkish Greeting API
host: localhost:8080
basePath: /greeting-turkish-api/v1
schemes:
  - http
paths:
  /sayHello:
    get:
      summary: Say Turkish Hello Message
      operationId: controllers.greetingTurkishService.sayHello
      produces:
        - application/json
      parameters:
        - name: firstName
          in: header
          type: string
          maxLength: 100
          required: true
          description: Person First Name.
        - name: lastName
          in: header
          type: string
          maxLength: 100
          required: true
          description: Person Last Name.
      responses:
        '200':
          description: success
  /sayGoodbye:
    get:
      summary: Say Turkish Goodbye Message
      operationId: controllers.greetingTurkishService.sayGoodbye
      produces:
        - application/json
      parameters:
        - name: firstName
          in: header
          type: string
          maxLength: 100
          required: true
          description: Person First Name.
        - name: lastName
          in: header
          type: string
          maxLength: 100
          required: true
          description: Person Last Name.
      responses:
        '200':
          description: success
```

**`./swagger-downstream-definitions/greeting-helper-definition.yaml`**
```yaml
swagger: '2.0'
info:
  description: Greeting Helper API
  version: 1.0.0
  title: Greeting Helper API
host: localhost
basePath: /greeting-helper-api/v1
schemes:
  - http
paths:
  /getFullName:
    get:
      summary: Get Full Name
      operationId: controllers.greetingHelperService.getFullName
      produces:
        - application/json
      parameters:
        - name: firstName
          in: header
          type: string
          maxLength: 100
          required: true
          description: Person First Name.
        - name: lastName
          in: header
          type: string
          maxLength: 100
          required: true
          description: Person Last Name.
      responses:
        '200':
          description: success
```

**Outputs**

**`greetingEnglishService.js`**
```js
module.exports.ServiceName = ""; //fileName if empty,null or undefined
module.exports.Service = ({ requestHandler }) => {

    return {
        sayHello: async ({ firstName,lastName }) => {
            const requestArgs = {
                method: "GET",
                schemes: "http",
                host: "localhost:8080",
                basePath: "/greeting-english-api/v1",
                path: "/sayHello",
                url: "http://localhost:8080/greeting-english-api/v1/sayHello",
                payload: undefined,
                headers: {
                    "firstName": firstName || '',
					"lastName": lastName || ''
                }
            };
            
            const response = await requestHandler.executeAsync(requestArgs);

            return response;
        },
        sayGoodbye: async ({ firstName,lastName }) => {
            const requestArgs = {
                method: "GET",
                schemes: "http",
                host: "localhost:8080",
                basePath: "/greeting-english-api/v1",
                path: "/sayGoodbye",
                url: "http://localhost:8080/greeting-english-api/v1/sayGoodbye",
                payload: undefined,
                headers: {
                    "firstName": firstName || '',
					"lastName": lastName || ''
                }
            };
            
            const response = await requestHandler.executeAsync(requestArgs);

            return response;
        }
    };

};
```

**`greetingTurkishService.js`**
```js
module.exports.ServiceName = ""; //fileName if empty,null or undefined
module.exports.Service = ({ requestHandler }) => {

    return {
        sayHello: async ({ firstName,lastName }) => {
            const requestArgs = {
                method: "GET",
                schemes: "http",
                host: "localhost:8080",
                basePath: "/greeting-turkish-api/v1",
                path: "/sayHello",
                url: "http://localhost:8080/greeting-turkish-api/v1/sayHello",
                payload: undefined,
                headers: {
                    "firstName": firstName || '',
					"lastName": lastName || ''
                }
            };
            
            const response = await requestHandler.executeAsync(requestArgs);

            return response;
        },
        sayGoodbye: async ({ firstName,lastName }) => {
            const requestArgs = {
                method: "GET",
                schemes: "http",
                host: "localhost:8080",
                basePath: "/greeting-turkish-api/v1",
                path: "/sayGoodbye",
                url: "http://localhost:8080/greeting-turkish-api/v1/sayGoodbye",
                payload: undefined,
                headers: {
                    "firstName": firstName || '',
					"lastName": lastName || ''
                }
            };
            
            const response = await requestHandler.executeAsync(requestArgs);

            return response;
        }
    };

};
```

**`greetingHelperService.js`**
```js
module.exports.ServiceName = ""; //fileName if empty,null or undefined
module.exports.Service = ({ requestHandler }) => {

    return {
        getFullName: async ({ firstName,lastName }) => {
            const requestArgs = {
                method: "GET",
                schemes: "http",
                host: "localhost",
                basePath: "/greeting-helper-api/v1",
                path: "/getFullName",
                url: "http://localhost/greeting-helper-api/v1/getFullName",
                payload: undefined,
                headers: {
                    "firstName": firstName || '',
					"lastName": lastName || ''
                }
            };
            
            const response = await requestHandler.executeAsync(requestArgs);

            return response;
        }
    };

};
```


### Parameterizing Swagger Definition Files

Assume that there is a downstream swagger documents, and you need to update host field for every environment like dev, test, prod, etc.

To do that you need to define a **.env** file in project root directory.

```shell script
nut-swagger generate-default-controllers-from-dir ./swagger-definitions ./services/controllers --overwrite true --isEmptyFunctionBody true --isShortFunctionBodySyntax true
```

```shell script
nut-swagger generate-default-repositories-from-dir ./swagger-downstream-definitions ./services/repositories --overwrite true --isEmptyFunctionBody false --isShortFunctionBodySyntax true
```

**Swagger Definition Files**

All Swagger definition files are listed below;

**`.env`**

In order to specify swagger document variables, put **ds.** or **cs.** prefix as below.

```
# Downstream-service(ds) urls
ds.greetingEnglishDefinition.host="localhost:1080"
ds.greetingTurkishDefinition.host="localhost:1080"
ds.greetingHelperDefinition.host="localhost:1080"

# Current-service(cs) urls
cs.greetingDefinition.host="localhost:8080"
cs.greetingDefinitionV2.host="localhost:8080"
```

**`swagger-downstream-definitions/__metadata__.js`**
```js
module.exports = {
    Namespace: "",
    ServiceName: "", //fileName if empty,null or undefine
    Service: ({ }) => {
    }
};
```

**`./swagger-definitions/greeting-definition.yaml`**
```yaml
swagger: '2.0'
info:
  description: Greeting API
  version: 1.0.0
  title: Greeting API
host: localhost:9080
basePath: /greeting-api/v1
schemes:
  - http
paths:
  /sayHello/{firstName}:
    get:
      summary: Say Hello Message
      operationId: controllers.greetingService.sayHello
      produces:
        - application/json
      parameters:
        - name: language
          in: header
          type: string
          enum:
            - EN
            - TR
          required: true
          description: Greeting Language.
        - name: firstName
          in: path
          type: string
          maxLength: 100
          required: true
          description: Person First Name.
        - name: lastName
          in: query
          type: string
          maxLength: 100
          required: true
          description: Person Last Name.
      responses:
        '200':
          description: success
  /sayGoodbye:
    get:
      summary: Say Goodbye Message
      operationId: controllers.greetingService.sayGoodbye
      produces:
        - application/json
      parameters:
        - name: language
          in: header
          type: string
          enum:
            - EN
            - TR
          required: true
          description: Greeting Language.
        - name: firstName
          in: query
          type: string
          maxLength: 100
          required: true
          description: Person First Name.
        - name: lastName
          in: query
          type: string
          maxLength: 100
          required: true
          description: Person Last Name.
      responses:
        '200':
          description: success
```

**`./swagger-definitions/greeting-definition-v2.yaml`**
```yaml
swagger: '2.0'
info:
  description: Greeting API v2
  version: 1.0.0
  title: Greeting API v2
host: localhost:9080
basePath: /greeting-api/v2
schemes:
  - http
paths:
  /sayHello/{firstName}:
    get:
      summary: Say Hello Message
      operationId: controllers.greetingServiceV2.sayHello
      produces:
        - application/json
      parameters:
        - name: language
          in: header
          type: string
          enum:
            - EN
            - TR
          required: true
          description: Greeting Language.
        - name: firstName
          in: path
          type: string
          maxLength: 100
          required: true
          description: Person First Name.
        - name: lastName
          in: query
          type: string
          maxLength: 100
          required: true
          description: Person Last Name.
      responses:
        '200':
          description: success
  /sayGoodbye:
    get:
      summary: Say Goodbye Message
      operationId: controllers.greetingServiceV2.sayGoodbye
      produces:
        - application/json
      parameters:
        - name: language
          in: header
          type: string
          enum:
            - EN
            - TR
          required: true
          description: Greeting Language.
        - name: firstName
          in: query
          type: string
          maxLength: 100
          required: true
          description: Person First Name.
        - name: lastName
          in: query
          type: string
          maxLength: 100
          required: true
          description: Person Last Name.
      responses:
        '200':
          description: success
```

**`./swagger-downstream-definitions/greeting-english-definition.yaml`**
```yaml
swagger: '2.0'
info:
  description: English Greeting API
  version: 1.0.0
  title: English Greeting API
host: localhost:9090
basePath: /greeting-english-api/v1
schemes:
  - http
paths:
  /sayHello:
    get:
      summary: Say English Hello Message
      operationId: controllers.greetingEnglishService.sayHello
      produces:
        - application/json
      parameters:
        - name: firstName
          in: header
          type: string
          maxLength: 100
          required: true
          description: Person First Name.
        - name: lastName
          in: header
          type: string
          maxLength: 100
          required: true
          description: Person Last Name.
      responses:
        '200':
          description: success
  /sayGoodbye:
    get:
      summary: Say English Goodbye Message
      operationId: controllers.greetingEnglishService.sayGoodbye
      produces:
        - application/json
      parameters:
        - name: firstName
          in: header
          type: string
          maxLength: 100
          required: true
          description: Person First Name.
        - name: lastName
          in: header
          type: string
          maxLength: 100
          required: true
          description: Person Last Name.
      responses:
        '200':
          description: success
```

**`./swagger-downstream-definitions/greeting-turkish-definition.yaml`**
```yaml
swagger: '2.0'
info:
  description: Turkish Greeting API
  version: 1.0.0
  title: Turkish Greeting API
host: localhost:9090
basePath: /greeting-turkish-api/v1
schemes:
  - http
paths:
  /sayHello:
    get:
      summary: Say Turkish Hello Message
      operationId: controllers.greetingTurkishService.sayHello
      produces:
        - application/json
      parameters:
        - name: firstName
          in: header
          type: string
          maxLength: 100
          required: true
          description: Person First Name.
        - name: lastName
          in: header
          type: string
          maxLength: 100
          required: true
          description: Person Last Name.
      responses:
        '200':
          description: success
  /sayGoodbye:
    get:
      summary: Say Turkish Goodbye Message
      operationId: controllers.greetingTurkishService.sayGoodbye
      produces:
        - application/json
      parameters:
        - name: firstName
          in: header
          type: string
          maxLength: 100
          required: true
          description: Person First Name.
        - name: lastName
          in: header
          type: string
          maxLength: 100
          required: true
          description: Person Last Name.
      responses:
        '200':
          description: success
```

**`./swagger-downstream-definitions/greeting-helper-definition.yaml`**
```yaml
swagger: '2.0'
info:
  description: Greeting Helper API
  version: 1.0.0
  title: Greeting Helper API
host: localhost:9090
basePath: /greeting-helper-api/v1
schemes:
  - http
paths:
  /getFullName:
    get:
      summary: Get Full Name
      operationId: controllers.greetingHelperService.getFullName
      produces:
        - application/json
      parameters:
        - name: firstName
          in: header
          type: string
          maxLength: 100
          required: true
          description: Person First Name.
        - name: lastName
          in: header
          type: string
          maxLength: 100
          required: true
          description: Person Last Name.
      responses:
        '200':
          description: success
```

**Outputs**

Below two JavaScript files are controllers of your microservice. So, bodies of methods are empty so that you can write your business logic.

**`./services/controllers/greetingService.js`**
```js
module.exports.ServiceName = ""; //fileName if empty,null or undefined
module.exports.Service = ({ requestHandler }) => {

    return {
        sayHello: async ({ language, firstName, lastName }) => {
            return {};
        },
        sayGoodbye: async ({ language, firstName, lastName }) => {
            return {};
        }
    };

};
```

**`./services/controllers/greetingServiceV2.js`**
```js
module.exports.ServiceName = ""; //fileName if empty,null or undefined
module.exports.Service = ({ requestHandler }) => {

    return {
        sayHello: async ({ language, firstName, lastName }) => {
            return {};
        },
        sayGoodbye: async ({ language, firstName, lastName }) => {
            return {};
        }
    };

};
```

**`./services/repositories/greetingEnglishService.js`**
```js
module.exports.ServiceName = ""; //fileName if empty,null or undefined
module.exports.Service = ({ requestHandler }) =>
    ({
        sayHello: async ({ firstName, lastName }) => {
            const requestArgs = {
                method: "GET",
                schemes: "http",
                host: "localhost:1080",
                basePath: "/greeting-english-api/v1",
                path: "/sayHello",
                url: "http://localhost:1080/greeting-english-api/v1/sayHello",
                payload: undefined,
                headers: {
                    "firstName": firstName || '',
					"lastName": lastName || ''
                }
            };
            
            const response = await requestHandler.executeAsync(requestArgs);

            return response;
        },
        sayGoodbye: async ({ firstName, lastName }) => {
            const requestArgs = {
                method: "GET",
                schemes: "http",
                host: "localhost:1080",
                basePath: "/greeting-english-api/v1",
                path: "/sayGoodbye",
                url: "http://localhost:1080/greeting-english-api/v1/sayGoodbye",
                payload: undefined,
                headers: {
                    "firstName": firstName || '',
					"lastName": lastName || ''
                }
            };
            
            const response = await requestHandler.executeAsync(requestArgs);

            return response;
        }
    });
```

**`./services/repositories/greetingTurkishService.js`**
```js
module.exports.ServiceName = ""; //fileName if empty,null or undefined
module.exports.Service = ({ requestHandler }) =>
    ({
        sayHello: async ({ firstName, lastName }) => {
            const requestArgs = {
                method: "GET",
                schemes: "http",
                host: "localhost:1080",
                basePath: "/greeting-turkish-api/v1",
                path: "/sayHello",
                url: "http://localhost:1080/greeting-turkish-api/v1/sayHello",
                payload: undefined,
                headers: {
                    "firstName": firstName || '',
					"lastName": lastName || ''
                }
            };
            
            const response = await requestHandler.executeAsync(requestArgs);

            return response;
        },
        sayGoodbye: async ({ firstName, lastName }) => {
            const requestArgs = {
                method: "GET",
                schemes: "http",
                host: "localhost:1080",
                basePath: "/greeting-turkish-api/v1",
                path: "/sayGoodbye",
                url: "http://localhost:1080/greeting-turkish-api/v1/sayGoodbye",
                payload: undefined,
                headers: {
                    "firstName": firstName || '',
					"lastName": lastName || ''
                }
            };
            
            const response = await requestHandler.executeAsync(requestArgs);

            return response;
        }
    });
```

**`./services/repositories/greetingHelperService.js`**
```js
module.exports.ServiceName = ""; //fileName if empty,null or undefined
module.exports.Service = ({ requestHandler }) =>
    ({
        getFullName: async ({ firstName, lastName }) => {
            const requestArgs = {
                method: "GET",
                schemes: "http",
                host: "localhost:1080",
                basePath: "/greeting-helper-api/v1",
                path: "/getFullName",
                url: "http://localhost:1080/greeting-helper-api/v1/getFullName",
                payload: undefined,
                headers: {
                    "firstName": firstName || '',
					"lastName": lastName || ''
                }
            };
            
            const response = await requestHandler.executeAsync(requestArgs);

            return response;
        }
    });
```