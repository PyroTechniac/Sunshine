const { Monitor } = require('klasa');

module.exports = class extends Monitor {
    constructor(...args) {
        super(...args, {
            name: 'invitedetection',
            enabled: true,
            ignoreSelf: true,
            ignoreOthers: false
        });
    }
    async run(message) {
        if (!message.guild || !message.guild.settings.antiinvite) return null;
        if (await message.hasAtLeastPermissionLevel(6)) return null;
        if (!/(https?:\/\/)?(www\.)?(discord\.(gg|li|me|io)|discordapp\.com\/invite)\/.+/.test(message.content)) return null;
        return message.delete()
            .catch(err => this.client.emit('log', err, 'error'));
    }
};