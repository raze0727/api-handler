const { readdirSync } = require('fs');
const express = require('express');
const { connect } = require('mongoose');
const config = require('../config.json');

async function load() {
  //Express
  const app = express();
  app.use(express.json());
  app.listen(config.port, () =>
    console.log(`Listening on Port ${config.port}`)
  );

  //Database
  if (config.uri)
    connect(config.uri).then(console.log('Connected to database'));

  //Load Endpoints
  readdirSync('./endpoints').forEach((category) => {
    readdirSync(`./endpoints/${category}`).forEach((endpoint) => {
      if (!endpoint.endsWith('.js')) return;
      const file = require(`../endpoints/${category}/${endpoint}`);
      if (file.enabled && file?.method)
        switch (file.method) {
          case 'get':
            app.get(`/${category}${file.endpoint}`, file.run);
            break;
          case 'post':
            app.post(`/${category}${file.endpoint}`, file.run);
            break;
          case 'put':
            app.put(`/${category}${file.endpoint}`, file.run);
            break;
          case 'delete':
            app.delete(`/${category}${file.endpoint}`, file.run);
            break;
          case 'patch':
            app.patch(`/${category}${file.endpoint}`, file.run);
            break;
        }
    });
  });
}

load();