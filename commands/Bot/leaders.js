const db = require('../../models/index')
const Leaderboards = db.leaderboards_model
const Games = db.games_model
const Servers = db.servers_model
const Players = db.players_model

const AsciiTable = require('ascii-table')

module.exports = {
    name: "leaderboards",
    category: "Bot",
    aliases: ['leaders', 'leader'],
    usage: "-leaderboard <GAME NAME>",
    description: "shows the top players for a game",
    run: async (client, message, args) => {
        try {
            var table = new AsciiTable(`${args[0]}`)
            table.setHeading('Rank', 'Name', 'ELO')


            const leaders = await Leaderboards.findAll({
                order: [['skill', 'DESC']]
                ,
                include: [{
                    model: Games,
                    where: {
                        name: args[0],
                    },
                    include: {
                        model: Servers,
                        where: { guildId: message.guild.id }
                    }
                },
                { model: Players }]
            }

            )
            console.log(leaders[0])
            leaders.forEach((leader, i) => {

                table.addRow(i + 1, leader.dataValues.players_model.dataValues.username, leader.dataValues.skill)


            })
            message.channel.send("```" + table.render() + "```")

        }
        catch (error) {
            console.log(error)
        }

    }
};