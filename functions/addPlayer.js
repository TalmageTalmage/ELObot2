const db = require('../models/index')
const Players = db.players_model

let addPlayer = async (message) => {
    try {
        const [player, created] = await Players.findOrCreate({
            where: { userId: message.author.id },
            defaults: {
                username: message.author.username,
                created_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
                updated_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
            }
        })
    }
    catch (error) {
        console.log(error)
    }
    return
}

module.exports = addPlayer
