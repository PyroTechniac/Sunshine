require('dotenv').config();
module.exports = {
    token: process.env.TOKEN,
    owner: process.env.OWNER,
    prefix: process.env.PREFIX || '/',
    database: {
        name: process.env.DB_NAME,
        port: process.env.DB_PORT,
        host: process.env.DB_HOST,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD
    }
};