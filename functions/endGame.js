const db = require('../models/index')
const Leaderboards = db.leaderboards_model
const Lobbies = db.lobbies_model
const Games = db.games_model
const InLobby = db.inLobby_model
const Matches = db.matches_model
const MatchPlayers = db.matchPlayer_model
const Players = db.players_model
const sequelize = db.sequelize
trueskill = require("trueskill");

let endGame = async (message, lobby) => {
    let team = []
    let redTeam = []
    let blueTeam = []
    try {

        let winner
        const players = await InLobby.findAll({
            include: {
                model: Lobbies,
                where: { channelId: message.channel.id }
            }
        })
        let red = 0
        let blue = 0
        players.forEach((player) => {
            red += player.redScore
            blue += player.blueScore
            if (player.team == 1) {
                redTeam.push(player)
            }
            else {
                blueTeam.push(player)
            }

        })
        if (red > blue) {
            winner = 1
        }
        else { winner = 0 }
        const match = await Matches.create({
            gameId: lobby.gameId,
            winner: winner,
            created_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
        })




        players.forEach(async (player) => {
            console.log(player.dataValues)
            if (player.dataValues.team == 1) {
                if (winner == 1) {
                    player.dataValues.rank = 1
                }
                else {
                    player.dataValues.rank = 2
                }

            }
            else {
                if (winner == 0) {
                    player.dataValues.rank = 1
                }
                else {
                    player.dataValues.rank = 2
                }
            }
            player.dataValues.skill = [player.dataValues.skill, 25.0 / 3.0]

            team.push(player)

            MatchPlayers.create({
                playerId: player.id,
                matchId: match.id,
                team: player.team
            })


        })
        trueskill.AdjustPlayers(team)
        team.forEach(async (gamer) => {
            const mp = await Players.findOne({
                where: { userId: gamer.playerId }
            })
            console.log(gamer.dataValues.rank)
            console.log('hi')
            if (gamer.dataValues.rank == 1) {
                await Leaderboards.update({
                    skill: gamer.skill[0],
                    wins: sequelize.literal('wins + 1')
                }, {
                    where: {
                        id: gamer.id,
                        gameId: lobby.gameId
                    }
                })
            }
            else {
                await Leaderboards.update({
                    skill: gamer.skill[0],
                    losses: sequelize.literal('losses + 1')
                }, {
                    where: {
                        id: gamer.id,
                        gameId: lobby.gameId
                    }
                })
            }
        })
        await Lobbies.destroy({
            where: { channelId: message.channel.id }
        })
    }
    catch (error) {
        console.log(error)
    }
    return
}

module.exports = endGame