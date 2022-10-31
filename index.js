const fs = require('fs');
const express = require('express');
const chalk = require('chalk');
const app = express();

//Config
const config = {
    port: 1000,
    uri: ''
}

async function load() {
    if (!config.port || isNaN(config.port)) return console.log(chalk.red('Invalid port input.'))
    app.listen(config.port, () => console.log(chalk.blue(`Listening on port: ${config.port}`)));
    console.log(chalk.green('Loaded endpoints:'));
    fs.readdirSync('./endpoints').forEach(dir => {
        fs.readdirSync(`./endpoints/${dir}`).forEach(async endpoint => {
            if (!endpoint.endsWith('.js')) return;
            const file = require(`./endpoints/${dir}/${endpoint}`);
            const methods = ['POST', 'PUT', 'PATCH', 'GET', 'DELETE'];
            if (!file?.endpoint || !methods.includes(file?.method)) return;

            const _path = `/${dir}/${file.endpoint}`;
            switch (file.method) {
                case 'POST':
                    app.post(_path, file.run);
                    console.log(chalk.green(`POST: ${_path}`));
                    break;
                case 'PUT':
                    app.put(_path, file.run);
                    console.log(chalk.green(`PUT: ${_path}`));
                    break;
                case 'PATCH':
                    app.patch(_path, file.run);
                    console.log(chalk.green(`PATCH: ${_path}`));
                    break;
                case 'GET':
                    app.get(_path, file.run);
                    console.log(chalk.green(`GET: ${_path}`));
                    break;
                case 'DELETE':
                    app.delete(_path, file.run);
                    console.log(chalk.green(`DELETE: ${_path}`));
                    break;
            }
        });
    });

    //Mongo
    if (config.uri)
        connect(config.uri, () => console.log(chalk.blue(`Connected to database.`)));
}

load();