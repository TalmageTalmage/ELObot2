var path = require('path')
const db = require('../models/index')
const Lobbies = db.lobbies_model
const InLobby = db.inLobby_model
const printLobby = require(path.resolve(__dirname, "./printLobby"))

let lobbyStart = async (message) => {
    try {
        const lobbySet = await Lobbies.update(
            {
                status: 2
            },
            {
                where: { channelId: message.channelId },
            })
        const lobby = await Lobbies.findOne({
            where: { channelId: message.channel.id }
        })
        const players = await InLobby.findAll({
            where: { lobbyId: lobby.id },
            order: [['skill', 'DESC']]
        })

        for (let i = 0; i < 2; i++) {
            const captain = await InLobby.update({
                capt: true,
                team: (i + 1)
            },
                {
                    where: { id: players[i].id }
                })

        }
        message.channel.send(`<@${players[0].dataValues.playerId}> and <@${players[1].dataValues.playerId}> are captains! <@${players[1].dataValues.playerId}> is first. Please pick a player.`)
        printLobby(message)
    }
    catch (error) {
        console.log(error)
    }

    return
}

module.exports = lobbyStart
