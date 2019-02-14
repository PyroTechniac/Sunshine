const { Task } = require('klasa');

module.exports = class extends Task {
    async run({ channel, user, text }) {
        const _channel = this.client.channels.get(channel);
        const _user = this.client.users.get(user);
        if (_channel && _user) await _channel.send(`${_user} You wanted me to remind you: ${text}`);
    }
};