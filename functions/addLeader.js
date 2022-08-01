const db = require('../models/index')
const Lobbies = db.lobbies_model
const Players = db.players_model
const Leaderboards = db.leaderboards_model
let addLeader = async (message) => {
    try {
        const player = await Players.findOne({ where: { userId: message.author.id } })
        const lobby = await Lobbies.findOne({ where: { channelId: message.channel.id } })

        const [leader, created] = await Leaderboards.findOrCreate({
            where: {
                userId: player.id,
                gameId: lobby.gameId
            },
            defaults: {
                skill: 1000,
                wins: 0,
                losses: 0,
                created_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
                updated_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
            }

        })
        if (created) {
            return 1000
        }
        else {
            return leader.skill
        }
    }
    catch (error) {
    }
    return
}

module.exports = addLeader
