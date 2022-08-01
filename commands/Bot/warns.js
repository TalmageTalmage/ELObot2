const db = require('../../models/index')
const PlayerWarns = db.playerWarns_model
const AsciiTable = require('ascii-table')

module.exports = {
    name: "warns",
    category: "Bot",
    usage: "shows warns for a user",
    description: "warns <MENTION USER> will default to current user if no other user is mentioned",
    run: async (client, message, args) => {
        var table = new AsciiTable('Warns')
        table.setHeading('#', 'Date Received')
        try {
            if (args[0]) {
                const warns = await PlayerWarns.findAll({
                    where: { userId: message.mentions.users.first().id }
                })
                if (warns.length == 0) {
                    message.channel.send('This user has no warns.')
                }
                else {
                    warns.forEach((warn, i) => {
                        var myDate = warn.created_at
                        var day = myDate.getDate();
                        var month = myDate.getMonth() + 1
                        var hour = myDate.getHours();
                        var minute = myDate.getMinutes();
                        var seconds = myDate.getSeconds();
                        table.addRow(i + 1, `${month}/${day} ${hour}:${minute}:${seconds}`)

                    })
                    message.channel.send("```" + table.render() + "```")

                }
            }
            else {
                const warns = await PlayerWarns.findAll({
                    where: { userId: message.author.id }
                })
                if (warns.length == 0) {
                    message.channel.send('You have no warns.')
                }
                else {
                    warns.forEach((warn, i) => {
                        var myDate = warn.created_at
                        var day = myDate.getDate();
                        var month = myDate.getMonth() + 1
                        var hour = myDate.getHours();
                        var minute = myDate.getMinutes();
                        var seconds = myDate.getSeconds();
                        table.addRow(i + 1, `${month}/${day} ${hour}:${minute}:${seconds}`)
                    })
                    message.channel.send("```" + table.render() + "```")

                }
            }

        }
        catch (error) {
            console.log(error)
        }

    }
};
