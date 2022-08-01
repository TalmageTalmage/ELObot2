const db = require('../../models/index')
const Lobbies = db.lobbies_model
const Admins = db.admins_model

module.exports = {
    name: "close",
    category: "Bot",
    aliases: ['cl'],
    usage: "close",
    description: "closes the lobby in the current channel",
    run: async (client, message, args) => {
        try {

            const user = await Admins.findOne({
                where: {
                    userId: message.author.id,
                    serverId: message.guild.id
                }
            })
            if (user) {
                await Lobbies.destroy({
                    where: { channelId: message.channel.id }
                })
                message.channel.send("This lobby has been closed!")
            }
            else {
                message.channel.send('You do not have permissions to do that.')
            }


        }
        catch (error) {
            console.log(error)
        }

    }
};
