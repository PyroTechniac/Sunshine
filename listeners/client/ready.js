const { Listener } = require('discord-akairo');

class ReadyListener extends Listener {
    constructor() {
        super('ready', {
            emitter: 'client',
            event: 'ready',
            category: 'client'
        });
    }

    async exec() {
        await this.client.fetchApplication();
        this.client.console.log(this.client.application);
    }
}

module.exports = ReadyListener;