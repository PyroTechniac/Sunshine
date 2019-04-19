const { AkairoClient, CommandHandler, InhibitorHandler } = require('discord-akairo');
const { join } = require('path');
require('dotenv').config();

class SunshineClient extends AkairoClient {
    constructor() {
        super({
            ownerID: process.env.OWNER,
            disableEveryone: true
        });

        this.commandHandler = new CommandHandler(this, {
            directory: join(__dirname, '..', 'commands'),
            prefix: 's?'
        });

        this.inhibitorHandler = new InhibitorHandler(this, {
            directory: join(__dirname, '..', 'inhibitors')
        });
    }

    async _init() {
        this.commandHandler.useInhibitorHandler(this.inhibitorHandler);
        this.commandHandler.loadAll();
        this.inhibitorHandler.loadAll();
    }

    async start() {
        await this._init();
        return this.login(process.env.TOKEN);
    }
}

module.exports = SunshineClient;