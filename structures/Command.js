const { Command } = require('discord.js-commando')
class SunshineCommand extends Command {
    constructor(client, info) {
        if (typeof info.argsPromptLimit === 'undefined') info.argsPromptLimit = 1
        super(client, info)
        this.argsSingleQuotes = info.argsSingleQuotes || false
        this.throttling = info.throttling || { usages: 1, duration: 2 }
    }
}
module.exports = SunshineCommand