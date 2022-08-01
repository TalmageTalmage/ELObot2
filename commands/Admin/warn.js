const db = require('../../models/index')
const PlayerWarns = db.playerWarns_model
const Admins = db.admins_model
const moment = require("moment")

module.exports = {
    name: "warn",
    category: "Bot",
    aliases: ['w'],
    usage: "<prefix>warn <MENTION USER> ",
    description: "warns a player",
    run: async (client, message, args) => {
        try {
            const user = await Admins.findOne({
                where: {
                    userId: message.author.id,
                    serverId: message.guild.id
                }
            })
            if (user) {

                await PlayerWarns.create({
                    userId: message.mentions.users.first().id,
                    created_at: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),

                    serverId: message.guild.id
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
