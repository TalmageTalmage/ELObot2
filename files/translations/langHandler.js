
// "handler"
module.exports = {
    langHandler: function (message, guild) {
        let server = (message) ? message.guild : guild;
        if (server.preferredLocale == "pt-BR")
            return require('./pt.json');
        else
            return require('./en.json');
    }
};