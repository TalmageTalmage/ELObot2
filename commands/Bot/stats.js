const db = require('../../models/index')
const Leaderboards = db.leaderboards_model
const Players = db.players_model
const Games = db.games_model


module.exports = {
    name: "stats",
    category: "Bot",
    aliases: [],
    usage: "stats <GAME NAME>",
    description: "displays stats for current game",
    run: async (client, message, args) => {
        try {
            const player = await Leaderboards.findOne({
                include: [{
                    model: Players,
                    where: { userId: message.author.id }
                },
                {
                    model: Games,
                    where: { name: args[0] }
                }
                ]
            })
            if (player) {
                message.channel.send(`ELO: ${player.skill}, Wins: ${player.wins}, Losses: ${player.losses}`)
            }
        }
        catch (error) {
            console.log(error)
        }

    }
};
