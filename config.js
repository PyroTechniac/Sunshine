require('dotenv').config();
module.exports = {
    token: process.env.TOKEN,
    owners: process.env.OWNERS.split(','),
    prefix: process.env.PREFIX.split(',')
};