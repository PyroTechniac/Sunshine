import { AkairoClient, CommandHandler, InhibitorHandler, ListenerHandler } from 'discord-akairo';
import { join } from 'path';
import { Connection } from 'typeorm';
import database from '../structures/Database';
import TypeORMProvider from '../structures/SettingsProvider';
import { Setting } from '../models/Settings';

declare module 'discord-akairo' {
    interface AkairoClient {
        db: Connection;
        settings: TypeORMProvider;
        commandHandler: CommandHandler;
    }
}

export default class SunshineClient extends AkairoClient {
    public commandHandler: CommandHandler = new CommandHandler(this, {
        directory: join(__dirname, '..', 'commands'),
        commandUtil: true,
        handleEdits: true
    })

    public db!: Connection

    public settings!: TypeORMProvider

    public inhibitorHandler: InhibitorHandler = new InhibitorHandler(this, {
        directory: join(__dirname, '..', 'inhibitors')
    })

    public listenerHandler: ListenerHandler = new ListenerHandler(this, {
        directory: join(__dirname, '..', 'listeners')
    })

    public constructor() {
        super({
            disableEveryone: true,
            disabledEvents: ['TYPING_START']
        });
    }

    private async _init(): Promise<void> {
        this.commandHandler.useInhibitorHandler(this.inhibitorHandler);
        this.commandHandler.useListenerHandler(this.listenerHandler);
        this.listenerHandler.setEmitters({
            commandHandler: this.commandHandler,
            listenerHandler: this.listenerHandler,
            inhibitorHandler: this.inhibitorHandler,
            process: process
        });
        this.commandHandler.loadAll();
        this.inhibitorHandler.loadAll();
        this.listenerHandler.loadAll();

        this.db = database.get('sunshine');
        await this.db.connect();
        this.settings = new TypeORMProvider(this.db.getRepository(Setting));
        await this.settings.init();
    }

    public async start(): Promise<string> {
        await this._init();
        return this.login(process.env.TOKEN);
    }
}
