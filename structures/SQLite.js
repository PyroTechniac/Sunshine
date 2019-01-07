const Sequelize = require('sequelize')
const config = require('../config')
const db = new Sequelize(config.db.username, config.db.password, config.db.host, {logging: false, operatorsAliases: false, storage: "sunshine.sqlite", dialect: config.db.dialect})
class SQLite {
    static get db() {
        return db;
    }
    static async start() {
        try {
            console.log('[DATABASE] Connecting to database')
            await db.authenticate()
            await db.sync()
        } catch (error) {
            console.error('[DATABASE] Unable to connect to database', error)
            setTimeout(() => SQLite.start(), 5000)
        }
    }
}
module.exports = SQLite