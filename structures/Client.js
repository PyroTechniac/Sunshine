const { CommandoClient } = require("discord.js-commando")
const SQLite = require('./SQLite')
class SunshineClient extends CommandoClient {
    constructor(options) {
        super(options);
        this.database = SQLite.db
        SQLite.start()
    }
}
module.exports = SunshineClient