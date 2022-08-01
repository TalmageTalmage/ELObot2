
const { Client, Intents, Collection } = require('discord.js');
const fs = require("fs");
const db = require('./models/index')
const InLobby = db.inLobby_model
const Lobbies = db.lobbies_model
const PlayerWarns = db.playerWarns_model

const moment = require("moment")
const { Op } = require("sequelize");


const client = new Client({
	partials: ["CHANNEL"],
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
		Intents.FLAGS.DIRECT_MESSAGES
	],
});


// Client variables to use everywhere
client.commands = new Collection(); // An collection (like a digital map(database)) for all your commands
client.aliases = new Collection(); // An collection for all your command-aliases
client.events = new Collection();
client.categories = fs.readdirSync("./commands/"); // Categories

// Loading files, with the client variable like Command Handler, Event Handler, ...
["command", "events"].forEach((handler) => {
	require(`./handlers/${handler}`)(client);
});

// Login into the bot
const { TOKEN } = require('./config/config.js');
client.login(TOKEN)


setInterval(async () => {
	let time = moment().subtract(29, 'minutes').toDate()
	let time1 = moment().subtract(25, 'minutes').toDate()
	let time2 = moment().subtract(3, 'days').toDate()

	const kicked = await InLobby.findAll({
		where: {
			updated_at: { [Op.lt]: time }

		},
		include: { model: Lobbies }

	})
	await InLobby.destroy({
		where: {
			updated_at: { [Op.lt]: time }

		}
	})
	kicked.forEach((async kicked => {
		const channel = await client.channels.fetch(kicked.dataValues.lobbies_model.channelId)
		channel.send(`<@${kicked.playerId}> has been kicked from the lobby!`)

	}))

	const players = await InLobby.findAll({
		where: {
			updated_at: { [Op.lt]: time1 }

		},
		include: { model: Lobbies }
	})
	players.forEach((async player => {
		const channel = await client.channels.fetch(player.dataValues.lobbies_model.channelId)
		channel.send(`Are you still here, <@${player.playerId}>? Use the here command to avoid getting kicked.`)

	}))
	PlayerWarns.destroy({
		where: {
			created_at: { [Op.lt]: time2 }
		}
	})

}, 120000)