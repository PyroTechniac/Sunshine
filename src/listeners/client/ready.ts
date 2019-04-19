import { Listener } from 'discord-akairo';

export default class ReadyListener extends Listener {
    public constructor() {
        super('ready', {
            emitter: 'client',
            event: 'ready',
            category: 'client',
            type: 'once'
        });
    }

    public async exec(): Promise<void> {
        this.client.user.setActivity(`${this.client.user.username}, help`);
    }
}
