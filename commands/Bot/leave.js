const db = require('../../models/index')
const Lobbies = db.lobbies_model
const InLobby = db.inLobby_model

module.exports = {
    name: "leave",
    category: "Bot",
    aliases: ['leave', 'l'],
    usage: "leave lobby",
    description: "leaves the lobby",
    run: async (client, message, args) => {
        try {
            const leaver = await InLobby.destroy({
                where: { playerId: message.author.id },
                include: {
                    model: Lobbies,
                    where: { status: 0 }
                }
            })
            if (leaver > 0) {
                message.channel.send(`${message.author.username} has left the lobby!`)
            }
            else {
                message.channel.send(`You either aren't in the lobby or the game has already started.`)
            }
        }
        catch (error) {
            console.log(error)
        }

    }
};
