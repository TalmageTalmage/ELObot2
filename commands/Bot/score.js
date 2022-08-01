const db = require('../../models/index')
const Lobbies = db.lobbies_model
const InLobby = db.inLobby_model
const Games = db.games_model
const { Op } = require("sequelize");
const endGame = require('../../functions/endGame');


module.exports = {
    name: "score",
    category: "Bot",
    aliases: ['s, r'],
    usage: "-score <RED SCORE> <BLUE SCORE>",
    description: "scores the game",
    run: async (client, message, args) => {
        if (!isNaN(args[0]) && !isNaN(args[1])) {
            try {
                const lobby = await Lobbies.findOne({
                    where: { channelId: message.channel.id },
                    include: { model: Games }
                })
                if (lobby.status == 3) {
                    await InLobby.update({
                        redScore: args[0],
                        blueScore: args[1]
                    },
                        { where: { playerId: message.author.id } },
                        {
                            include: [{
                                model: Lobbies,
                                where: { channelId: message.channelId }
                            }]
                        })
                    const scored = await InLobby.findAll({
                        where: { redScore: { [Op.ne]: null }, redScore: { [Op.ne]: null } },
                        include: {
                            model: Lobbies,
                            where: { channelId: message.channel.id },
                            include: { model: Games }
                        }
                    })
                    console.log(scored.length)
                    console.log(scored[0].dataValues.lobbies_model.dataValues.games_model.dataValues.players)
                    if (scored.length >= (scored[0].dataValues.lobbies_model.dataValues.games_model.dataValues.players / 2)) {
                        message.channel.send('Game Over!')
                        endGame(message, lobby)
                    }
                }
                else {
                    message.channel.send(`There is no game to score`)
                }
            }
            catch (error) {
                console.log(error)
            }
        }
        else {
            message.channel.send('Please use numbers for both teams')
        };
    }
};
