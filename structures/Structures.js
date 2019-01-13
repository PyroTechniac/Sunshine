const { Command, CommandoClient } = require('discord.js-commando')
const Sequelize = require("sequelize")

const config = require("../config")
const options = {
    logging: false,
    operatorAliases: false,
    storage: "sunshine.sqlite",
    dialect: config.db.dialect
}
const db = new Sequelize(config.db.username, config.db.password, config.db.host, options)
class SunshineCommand extends Command {
    constructor(client, info) {
        if (typeof info.argsPromptLimit === 'undefined') info.argsPromptLimit = 1
        super(client, info)
        this.argsSingleQuotes = info.argsSingleQuotes || false
        this.throttling = info.throttling || { usages: 1, duration: 2 }
    }
}
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
            setTimeout(() => {
                SQLite.start()
            }, 5000)
        }
    }
}

class SunshineClient extends CommandoClient {
    constructor(options) {
        super(options)
        this.database = SQLite.db
        SQLite.start()
    }
}
module.exports = {
    Command: SunshineCommand,
    Client: SunshineClient
}