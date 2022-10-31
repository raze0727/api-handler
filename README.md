# api-handler

## Description

A simple API handler coded by raze.

## Usage

### Installing

Dependencies:

- mongoose
- chalk
- express

### Install dependencies

```
npm i
```

### Configurations

index.js line 6

```js
//Config
const config = {
  port: 1000, //http://localhost:1000
  uri: "", //mongo uri
};
```

### Example directories for endpoints

```
api-server/
|- endpoints/
   |- exampleFolder1/
      |- endpoint.js
   |- exampleFolder2/
      |- endpoint.js
```

### Example endpoint code

/endpoints/exampleFolder1/endpoint.js

```js
const { request, response } = require("express");

module.exports = {
  endpoint: "example", //http://localhost:<port>/exampleFolder1/example
  method: "POST", // ['POST', 'PUT', 'PATCH', 'GET', 'DELETE']
  /**
   * @param {request} req
   * @param {response} res
   */
  run: async (req, res) => {
    //...
  },
};
```
