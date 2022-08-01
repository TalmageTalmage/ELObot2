var path = require('path')
const db = require('../models/index')
const Lobbies = db.lobbies_model
const Games = db.games_model
const InLobby = db.inLobby_model

const printLobby = require(path.resolve(__dirname, "./printLobby.js"));

const lobbyStart = require(path.resolve(__dirname, "./lobbyStart.js"));

let lobbyCheck = async (message) => {

    try {
        const game = await Games.findOne({
            include: {
                model: Lobbies,
                where: { channelId: message.channel.id }
            }

        })

        const count = await InLobby.findAll({
            include: [{
                model: Lobbies,
                where: { channelId: message.channel.id }
            },
            ]

        })

        if (!game) {
            message.channel.send('There is no lobby in here!')
        }
        else if (count.length == game.players) {
            message.channel.send('The lobby is starting!')
            lobbyStart(message)
        }
        else {
            printLobby(message)

        }
    }
    catch (error) {
        console.log(error)
    }
    return
}

module.exports = lobbyCheck