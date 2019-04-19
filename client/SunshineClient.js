const { AkairoClient, CommandHandler, InhibitorHandler, ListenerHandler } = require('discord-akairo');
const { join } = require('path');
const TypeORMProvider = require('../structures/SettingsProvider');
const SunshineConsole = require('../util/SunshineConsole');
const database = require('../structures/Database');

class SunshineClient extends AkairoClient {
    constructor() {
        super({
            ownerID: process.env.OWNER,
            disableEveryone: true
        });

        this.commandHandler = new CommandHandler(this, {
            directory: join(__dirname, '..', 'commands'),
            prefix: 's?',
            allowMention: true,
            commandUtil: true,
            handleEdits: true
        });

        this.inhibitorHandler = new InhibitorHandler(this, {
            directory: join(__dirname, '..', 'inhibitors')
        });

        this.listenerHandler = new ListenerHandler(this, {
            directory: join(__dirname, '..', 'listeners')
        });

        this.console = new SunshineConsole({});

        this.application = null;
    }

    async fetchApplication() {
        this.application = await super.fetchApplication();
        return this.application;
    }

    async _init() {
        this.commandHandler.useInhibitorHandler(this.inhibitorHandler);
        this.commandHandler.useListenerHandler(this.listenerHandler);
        this.listenerHandler.setEmitters({
            commandHandler: this.commandHandler,
            listenerHandler: this.listenerHandler,
            inhibitorHandler: this.inhibitorHandler
        });
        this.commandHandler.loadAll();
        this.inhibitorHandler.loadAll();
        this.listenerHandler.loadAll();

        this.db = database.get('sunshine');
        await this.db.connect();
    }

    async start() {
        await this._init();
        return this.login(process.env.TOKEN);
    }
}

module.exports = SunshineClient;