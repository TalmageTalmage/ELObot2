const db = require('../../models/index')
const InLobby = db.inLobby_model
const moment = require("moment")

module.exports = {
    name: "here",
    category: "Bot",
    aliases: ['here', 'h'],
    usage: "refreshes your timer",
    description: "leaves the lobby",
    run: async (client, message, args) => {
        try {
            InLobby.update({
                updated_at: moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
            }, {
                where: { playerId: message.author.id }
            })
            message.channel.send("Timer reset!")
        }
        catch (error) {
            console.log(error)
        }

    }
};
