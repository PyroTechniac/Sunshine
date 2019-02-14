const { Event, Colors } = require('klasa');

const HEADER = new Colors({ text: 'red' }).format('[RATELIMIT]');

module.exports = class extends Event {
    constructor(...args) {
        super(...args, {
            enabled: false
        });
    }
    run({ timeout, limit, method, route }) {
        this.client.emit('verbose', [
            HEADER,
            `Timeout: ${timeout}ms`,
            `Limit: ${limit} requests`,
            `Method: ${method.toUpperCase()}`,
            `Route: ${route}`
        ].join('\n'));
    }
};