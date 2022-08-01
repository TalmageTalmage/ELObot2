const db = require('../models/index')
const Lobbies = db.lobbies_model
const InLobby = db.inLobby_model

const AsciiTable = require('ascii-table')

let endDraft = async (message) => {
    var table = new AsciiTable('Lobby')
    table.setHeading('Red', 'Blue')
    try {

        await Lobbies.update({
            status: 3
        }, {
            where: { channelId: message.channel.id },
        })


        const red = await InLobby.findAll({
            where: { team: 1 },
            attributes: ['username'],
            include: [{
                model: Lobbies,
                attributes: ['id',],
                where: { channelId: message.channel.id },
            }]
        })

        const blue = await InLobby.findAll({
            where: { team: 2 },
            attributes: ['username'],
            include: [{
                model: Lobbies,
                attributes: ['id',],
                where: { channelId: message.channel.id },
            }]

        })
        red.forEach((red, i) => {
            table.addRow(red.username, blue[i].username)

        })
        message.channel.send("```" + table.render() + "```")


    }

    catch (error) {
        console.log(error)
    }
    return
}

module.exports = endDraft
