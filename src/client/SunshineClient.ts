import { AkairoClient, CommandHandler, InhibitorHandler, ListenerHandler } from 'discord-akairo';
import { ClientApplication, Message } from 'discord.js';
import { join } from 'path';
import { Connection } from 'typeorm';
import { createLogger, format, Logger, transports } from 'winston';
import { Setting } from '../models/Settings';
import database from '../structures/Database';
import TypeORMProvider from '../structures/SettingsProvider';

declare module 'discord-akairo' {
    interface AkairoClient {
        db: Connection;
        settings: TypeORMProvider;
        commandHandler: CommandHandler;
        logger: Logger;
        application: ClientApplication;
        cachedCases: Set<string>;
    }
}

export default class SunshineClient extends AkairoClient {
    public logger = createLogger({
        format: format.combine(
            format.colorize({ level: true }),
            format.timestamp({ format: 'YYYY/MM/DD HH:mm:ss' }),
            format.printf((info: any): string => {
                const { timestamp, level, message, ...rest } = info;
                return `[${timestamp}] ${level}: ${message}${Object.keys(rest).length ? `\n${JSON.stringify(rest, null, 2)}` : ''}`;
            })
        ),
        transports: [
            new transports.Console({ level: process.env.NODE_ENV === 'production' ? 'info' : 'debug' })
        ]
    })

    public commandHandler: CommandHandler = new CommandHandler(this, {
        directory: join(__dirname, '..', 'commands'),
        commandUtil: true,
        handleEdits: true,
        commandUtilLifetime: 3e5,
        defaultCooldown: 3000,
        argumentDefaults: {
            prompt: {
                modifyStart: (_, str): string => `${str}\n\nType \`cancel\` to cancel the command`,
                modifyRetry: (_, str): string => `${str}\n\nType \`cancel\` to cancel the command`,
                timeout: 'Command timed out, please try again',
                ended: 'Command cancelled due to too many tries',
                cancel: 'Command has been cancelled',
                retries: 3,
                time: 30000
            },
            otherwise: ''
        },
        aliasReplacement: /-/g,
        prefix: async (message: Message): Promise<string> => this.settings.get(message.guild!, 'prefix', 's$')
    })

    public application!: ClientApplication;

    public db!: Connection

    public settings!: TypeORMProvider

    public cachedCases = new Set();

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

        this.db = database.get('botpyro-sunshine-db');
        await this.db.connect();
        this.settings = new TypeORMProvider(this.db.getRepository(Setting));
        await this.settings.init();
    }

    public async start(): Promise<string> {
        await this._init();
        return this.login(process.env.TOKEN);
    }

    public async fetchApplication(): Promise<ClientApplication> {
        this.application = await super.fetchApplication();
        return this.application;
    }
}
