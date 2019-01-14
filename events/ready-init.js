const config = require('../config');
const activities = require('../assets/json/activity.json');
const client = require('../server/client');
const SequelizeProvider = require('../providers/Sequelize');

module.exports = async () => {
  console.log(`[READY] Logged in as ${client.user.tag}! (${client.user.id})`);
  await client.setProvider(new SequelizeProvider(client.database)).catch(error => console.error);
  const botUsername = (config.env.substring(0, 5).toLowerCase() === 'prod') ? config.bot.name : `${config.bot.name}DEV`;
  if (client.user.username !== botUsername) {
    console.log(`[READY] Changing bot username from ${client.user.username} to  ${botUsername}`);
    client.user.setUsername(botUsername);
  }
  client.myGuild = client.guilds.get(config.server.id) || client.guilds.find(guild => guild.name === config.server.name);
  if (!client.myGuild) throw new Error('Guild Not Found');
  const channelNames = [
    'membership',
    'meta',
    'modmail',
    'public',
    'roster',
    'welcome',
  ];
  const roleNames = [
    'admins',
    'mods',
    'members',
    'newbies',
    'all',
  ];
  client.myChannels = {};
  client.myRoles = {};
  // channelNames.forEach((channelName) => {
  //     const foundChannel = client.myGuild.channels.get(config.server.channels[channelName].id) || client.myGuild.channels.find(channel => channel.name === config.server.channels[channelName].name)
  //     if (!foundChannel) throw new Error(`Channel ${config.server.channels[channelName].name} not found`)
  //     //console.log(`[READY] Registering channel ${channelName}`)
  //     client.myChannels[channelName] = foundChannel
  // })
  channelNames.forEach(async (channelName) => {
    const foundChannel = await client.myGuild.channels.get(client.provider.get('global', `${channelName}`, config.server.channels[channelName].id)) || client.myGuild.channels.find(channel => channel.name === config.server.channels[channelName].name);
    client.myChannels[channelName] = await foundChannel;
    console.log(`Setting up channel ${foundChannel.name}`);
  });
  roleNames.forEach(async (roleName) => {
    // Look for role in client settings, then search for it in the guild if fails
    const foundRole = await client.myGuild.roles.get(client.provider.get('global', `${roleName}`, config.server.roles[roleName].id)) || client.myGuild.roles.find(role => role.name === config.server.roles[roleName].name);
    client.myRoles[roleName] = await foundRole;
    console.log(`Setting up role ${foundRole.name}`);
  });
  // roleNames.forEach((roleName) => {
  //     const foundRole = client.myGuild.roles.get(config.server.roles[roleName].id) || client.myGuild.roles.find(role => role.name === config.server.roles[roleName].name)
  //     if (!foundRole) throw new Error(`Channel ${config.server.channels[foundRole].name} not found`)
  //     //console.log(`[READY] Registering role ${roleName}`)
  //     client.myRoles[roleName] = foundRole;
  // })
  // console.log(client.myChannels)
  const firstActivity = activities[Math.floor(Math.random() * activities.length)];
  client.user.setActivity(firstActivity.text, { type: firstActivity.type });
  client.setInterval(() => {
    const activity = activities[Math.floor(Math.random() * activities.length)];
    client.user.setActivity(activity.text, { type: activity.type });
  }, 10 * 60 * 1000);
};
