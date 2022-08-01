const db = require('../../models/index')
const Games = db.games_model
const Servers = db.servers_model

const AsciiTable = require('ascii-table')

module.exports = {
    name: "games",
    category: "Bot",
    aliases: ['g'],
    usage: "games",
    description: "Displays games currently available in a server",
    run: async (client, message, args) => {
        try {
            var table = new AsciiTable('Games')
            table.setHeading('Name', 'Players')

            const avail = await Games.findAll({
                include: {
                    model: Servers,
                    where: { guildId: message.guild.id }
                }
            })
            console.log(avail)
            avail.forEach((game) => {
                table.addRow(game.name, game.players)
            })
            message.channel.send("```" + table.render() + "```")

        }
        catch (error) {
            console.log(error)
        }

    }
};
