const db = require('../../models/index')
const Lobbies = db.lobbies_model
const Servers = db.servers_model
const Games = db.games_model



module.exports = {
    name: "start",
    category: "Bot",
    aliases: ['s'],
    usage: "-start <game name>",
    description: "starts a lobby in this channel",
    run: async (client, message, args) => {

        const game = await getGame(message, args)

        try {
            const [lobby, created] = await Lobbies.findOrCreate({
                where: { channelId: message.channel.id },
                defaults: {
                    gameId: game.id,
                    status: 0,
                    created_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
                    updated_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
                }
            })
            if (created) {
                message.channel.send(`${args[0]} has been started!`)
            }
            else {
                message.channel.send('There is already an ongoing lobby in this channel!')
            }

        }
        catch (error) {
            message.channel.send(`${args[0]} does not seem to exist in this server.`)
        }
    }
};

let getGame = async (message, args) => {
    const game = await Games.findOne({
        where: {
            name: args[0]
        },
        include: {
            model: Servers,
            where: { guildId: message.guild.id }
        }
    })
    return game

}