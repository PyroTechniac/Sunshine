const path = require("path")
const SunshineClient = require("../structures/Client")
const config = require("../config")
const SequelizeProvider = require('../providers/Sequelize')
const client = new SunshineClient({
    commandPrefix: config.bot.prefix,
    owner: config.bot.owners.split(","),
    invite: config.bot.invite,
    disableEveryone: true,
    unknownCommandResponse: false,
    disabledEvents: ['TYPING_START']
})
client.registry
    .registerDefaults

client.setProvider(new SequelizeProvider(client.database)).catch(console.error)
client.dispatcher.addInhibitor((message) => {
    const blacklist = client.provider.get('global', 'blacklist', [])
    if (!blacklist.includes(message.author.id)) return false
    return "Blacklisted."
})
module.exports = client