const db = require('../models/index')
const Servers = db.servers_model

let addServer = async (message) => {
    try {
        const [server, created] = await Servers.findOrCreate({
            where: { guildId: message.guild.id },
            defaults: {
                serverName: message.guild.name,
                guildId: message.guild.id,
                created_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
                updated_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
            }
        })
    }
    catch (error) {
        console.log(error)
    }
    return
}

module.exports = addServer
