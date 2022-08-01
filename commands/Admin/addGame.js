const db = require('../../models/index')
const Games = db.games_model
const Servers = db.servers_model
const Admins = db.admins_model

const addServer = require('../../functions/addServer')

module.exports = {
    name: "add",
    category: "Bot",
    aliases: ['add', "addgame"],
    usage: "-add <gamename> <playercount>",
    description: "adds a game ",
    run: async (client, message, args) => {
        await addServer(message)
        const user = await Admins.findOne({
            where: {
                userId: message.author.id,
                serverId: message.guild.id
            }
        })
        if (user) {
            let server = await getServer(message)
            try {
                const [game, created] = await Games.findOrCreate({
                    where: {
                        serverId: server.id,
                        name: args[0]
                    },
                    defaults: {
                        players: args[1],
                        serverId: server.id,
                        created_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
                        updated_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
                    }
                })
                if (created) {
                    message.channel.send(`${args[0]} created!`)
                }
                else {
                    message.channel.send(`${args[0]} already exists!`)
                }
            }
            catch (error) {
                message.channel.send(`You either did not specify a number for the second argument. -add <GAME NAME> <NUMBER OF PLAYERS>`)
            }
        }
        else {
            message.channel.send('You do not have the privileges to run this command')
        }
    }
};

let getServer = async (message) => {

    const server = await Servers.findOne({
        where: { guildId: message.guildId },
    })
    return server

}