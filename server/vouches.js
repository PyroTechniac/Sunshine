const client = require('./client');
const { STRING, TEXT } = require('sequelize');
const members = require('./members');
const vouches = client.database.define('vouches', {
    voucherId: STRING,
    voucheeId: STRING,
    reason: TEXT
});