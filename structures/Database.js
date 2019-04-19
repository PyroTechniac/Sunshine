const { ConnectionManager } = require('typeorm');

const connectionManager = new ConnectionManager();
connectionManager.create({
    name: 'sunshine',
    type: 'postgres',
    url: process.env.DB,
    ssl: true
});

module.exports = connectionManager;