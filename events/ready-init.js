const config = require("../config")
const activities = require('../assets/')
const client = require("../server/client")
module.exports = async () => {
    console.log(`[READY] Logged in as ${client.user.tag}! (${client.user.id})`)
    const botUsername = (config.env.substring(0, 5).toLowerCase() === 'prod') ? config.bot.name : `${config.bot.name}DEV`
    if (client.user.username !== botUsername) {
        console.log(`[READY] Changing bot username from ${client.user.username} to  ${botUsername}`)
        client.user.setUsername(botUsername)
    }
    client.myGuild = client.guilds.get(config.server.id) || client.guilds.find(guild => guild.name === config.server.name)
    if (!client.myGuild) throw new Error('Guild Not Found')
    const channelNames = [
        'membership',
        'meta',
        'modmail',
        'public',
        'roster',
        'welcome',
        'voice'
    ]
    const roleNames = [
        'admins',
        'mods',
        'members',
        'newbies',
        'all'
    ]
    client.myChannels = {}
    client.myRoles = {}
    channelNames.forEach((channelName) => {
        const foundChannel = client.myGuild.channels.get(config.server.channels[channelName].id) || client.myGuild.channels.find(channel => channel.name === config.server.channels[channelName].name)
        if (!foundChannel) throw new Error(`Channel ${config.server.channels[channelName].name} not found`)
        console.log(`[READY] Registering channel ${channelName}`)
        client.myChannels[channelName] = foundChannel
    })
    roleNames.forEach((roleName) => {
        const foundRole = client.myGuild.roles.get(config.server.roles[roleName].id) || client.myGuild.roles.find(role => role.name === config.server.roles[roleName].name)
        if (!foundRole) throw new Error(`Channel ${config.server.channels[channelName].name} not found`)
        console.log(`[READY] Registering role ${roleName}`)
        client.myRoles[roleName] = foundRole;
    })
    const firstActivity = activities[Math.floor(Math.random) * activities.length]
    console.log(firstActivity)
}
