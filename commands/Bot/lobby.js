const lobbyCheck = require('../../functions/lobbyCheck')

module.exports = {
    name: "lobby",
    category: "Bot",
    aliases: ['queue'],
    usage: "lobby",
    run: async (client, message, args) => {
        lobbyCheck(message)
    }


};


