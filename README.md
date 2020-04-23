# nut-swagger
It generates Controller JavaScript file from you swagger file

## Installing nut-ioc with npm

```shell script
npm i nut-swagger
```

## Demo GitHub Repository

You can find **nut-swagger** usage in the following repository in **nut-swagger-usage** branch.

Check **package.json** Script block in the following repository.

https://github.com/nodejs-projects-kenanhancer/nut-ioc-basic-demo.git


## Usage

Assume that you have the following swagger definition file.

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
  /sayHello:
    get:
      summary: Say Hello Message
      operationId: greetingService.sayHello
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
      summary: Say Goodbye Message
      operationId: greetingService.sayGoodbye
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

### Creating Controller JavaScript file

Run the following code to create file.
If **--isEmptyBody** value is **true**, then probably you need to write your business logic.
If **--isEmptyBody** value is **false**, then probably you will call a downstream service. So, nut-swagger will write method body for you.

```shell script
nut-swagger generate-default-controller ./swagger-definitions/greeting-definition.yaml ./services/controllers --overwrite true --isEmptyBody false
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
nut-swagger generate-default-controller ./swagger-definitions/greeting-definition.yaml ./services/controllers --overwrite true --isEmptyBody true
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
nut-swagger generate-default-controllers-from-dir ./swagger-downstream-definitions ./services/repositories --overwrite true --isEmptyBody false
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
      operationId: greetingEnglishService.sayHello
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
      operationId: greetingEnglishService.sayGoodbye
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
      operationId: greetingTurkishService.sayHello
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
      operationId: greetingTurkishService.sayGoodbye
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
      operationId: greetingHelperService.getFullName
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