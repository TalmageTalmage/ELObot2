const db = require('../../models/index')
const Lobbies = db.lobbies_model
const InLobby = db.inLobby_model
const lobbyCheck = require('../../functions/lobbyCheck')
const addLeader = require('../../functions/addLeader')
const moment = require("moment")
const PlayerWarns = db.playerWarns_model

module.exports = {
    name: "join",
    category: "Bot",
    aliases: ['join', 'j'],
    usage: "join",
    description: "joins the lobby",
    run: async (client, message, args) => {
        const warns = await PlayerWarns.findAll({
            Where: { userId: message.author.id }
        })
        if (warns.length >= 3) {
            message.channel.send('You are currently banned.')
            return
        }
        const lobby = await Lobbies.findOne({
            where: { channelId: message.channel.id }
        })
        try {
            if (lobby.status == 0) {
                try {
                    let leader = await addLeader(message)
                    const [inLobby, created] = await InLobby.findOrCreate({
                        where: {
                            lobbyId: lobby.id,
                            playerId: message.author.id,
                        },
                        defaults: {
                            username: message.author.username,
                            lobbyId: lobby.id,
                            scored: false,
                            skill: leader,
                            created_at: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
                            updated_at: moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
                        }
                    })
                    if (created) {
                        message.channel.send('Welcome to the lobby!')
                    }
                    else {
                        message.channel.send('You are already in the lobby!')
                    }
                    lobbyCheck(message)
                }
                catch (error) {
                    console.log(error)

                }
            }
            else {
                message.channel.send('A game has already started in here!')
            }
        }
        catch {
            message.channel.send('There is no lobby in here')
        }
    }
};


// let lobbyCheck = async (message) => {
//     var table = new AsciiTable()

//     try {
//         const lobby = await Lobbies.findOne({
//             where: { channelId: message.channel.id }
//         })
//         const game = await Games.findOne({
//             where: { id: lobby.gameId }

//         })
//         const count = await InLobby.findAll({
//             where: { lobbyId: lobby.id }

//         })
//         count.forEach((player) => {
//             table.addRow(player.username)

//         })
//         message.channel.send("```" + table.render() + "```")

//         if (count.length == game.players) {
//             message.channel.send('The lobby is starting!')
//         }
//     }
//     catch (error) {
//         console.log(error)
//     }
//     return
// }