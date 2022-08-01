const db = require('../models/index')
const Lobbies = db.lobbies_model
const Games = db.games_model
const InLobby = db.inLobby_model
const Matches = db.matches_model
const MatchPlayers = db.matchesPlayer_model

let endGame = async (message) => {
    try {

    }
    catch (error) {
        console.log(error)
    }
    return
}

module.exports = endGame