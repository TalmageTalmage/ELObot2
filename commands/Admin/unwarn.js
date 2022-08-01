const db = require('../../models/index')
const PlayerWarns = db.playerWarns_model
const Admins = db.admins_model
const moment = require("moment")

module.exports = {
    name: "unwarn",
    category: "Bot",
    usage: "<prefix>unwarn <MENTION USER> ",
    description: "unwarns a player",
    run: async (client, message, args) => {
        try {
            const user = await Admins.findOne({
                where: {
                    userId: message.author.id,
                    serverId: message.guild.id
                }
            })
            if (user) {

                await PlayerWarns.destroy({
                    order: [['created_at', 'ASC']],

                    where: { userId: message.mentions.users.first().id },
                    limit: 1,


                })
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
