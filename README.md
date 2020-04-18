# nut-swagger
It generates Controller JavaScript file from you swagger file

## Installing nut-ioc with npm

```shell script
npm i nut-swagger
```



## Usage

Assume that you have the following swagger definition file.

**`swagger-definitions/greeting-definition-yaml.yaml`**
```yaml
swagger: '2.0'
info:
  description: English Greeting API
  version: 1.0.0
  title: English Greeting API
basePath: /greeting-api/v1
schemes:
  - http
paths:
  /sayHello:
    get:
      summary: Say English Hello Message
      operationId: greetingService.sayHello
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
      operationId: greetingService.sayGoodbye
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

### Creating Controller JavaScript file

Run the following code to create file.

```shell script
nut-swagger generate-default-controller ./swagger-definitions/greeting-definition-yaml.yaml ./services/controllers --overwrite true --isEmptyBody false
```

**Output**
```js
module.exports.ServiceName = ""; //fileName if empty,null or undefined
module.exports.Service = ({ requestHandler }) => {

    return {
        sayHello: async ({ firstName,lastName }) => {
            const requestArgs = {
                method: "GET",
                schemes: "http",
                host: "api.lbg.xyz",
                basePath: "/greeting-api/v1",
                path: "/sayHello",
                url: "http://api.lbg.xyz/greeting-api/v1/sayHello",
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
                host: "api.lbg.xyz",
                basePath: "/greeting-api/v1",
                path: "/sayGoodbye",
                url: "http://api.lbg.xyz/greeting-api/v1/sayGoodbye",
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

### Creating Controller JavaScript file without body

Run the following code to create file.

```shell script
nut-swagger generate-default-controller ./swagger-definitions/greeting-definition-yaml.yaml ./services/controllers --overwrite true --isEmptyBody true
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