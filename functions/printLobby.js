const db = require('../models/index')
const Lobbies = db.lobbies_model
const InLobby = db.inLobby_model

const AsciiTable = require('ascii-table')


let printLobby = async (message) => {

    try {
        var table = new AsciiTable('Lobby')

        const count = await InLobby.findAll({
            where: { team: null },
            attributes: ['username', 'skill'],
            include: [{
                model: Lobbies,
                attributes: ['id',],
                where: { channelId: message.channel.id },
            }
            ]

        })
        if (count.length == 0) {
            message.channel.send('This lobby is empty!')
            return
        }
        count.forEach((player) => {
            table.addRow(player.username, player.skill)

        })
        message.channel.send("```" + table.render() + "```")

    }
    catch (error) {
        console.log(error)
    }
    return
}

module.exports = printLobby