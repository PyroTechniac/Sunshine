const { Command } = require("../../structures/Structures")
const client = require('../../server/client')
module.exports = class EmitCommand extends Command {
    constructor(client) {
        super(client, {
            name: "emit",
            group: "admin",
            ownerOnly: true,
            guildOnly: true,
            memberName: "emit",
            description: "For emitting events to the client for testing"
        })
    }
    async run(message) {
        this.client.emit("guildMemberAdd", message.guild.member(message.author))
    }
}