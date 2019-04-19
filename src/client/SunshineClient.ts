import { AkairoClient, CommandHandler, InhibitorHandler, ListenerHandler } from 'discord-akairo';
import { join } from 'path';
import database from '../structures/Database';
import { Connection } from 'typeorm';
import TypeORMProvider from '../structures/SettingsProvider';
import { Setting } from '../models/Settings';

export default class SunshineClient extends AkairoClient {
    public db!: Connection;

    public settings!: TypeORMProvider;

    public commandHandler: CommandHandler = new CommandHandler(this, {
        directory: join(__dirname, '..', 'commands')
    })

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
        // this.settings = new TypeORMProvider(this.db.getRepository(Setting));
        // await this.settings.init();
    }

    public async start(): Promise<string> {
        await this._init();
        return this.login(process.env.TOKEN);
    }
}
