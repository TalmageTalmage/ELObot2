const { MessageEmbed } = require('discord.js');
const ee = require('../../config/embed.json');
const addServer = require('../../functions/addServer')
const addPlayer = require('../../functions/addPlayer')
const addAdmin = require('../../functions/addAdmin')
const { langHandler } = require('../../files/translations/langHandler.js');

const { whitelistCheck, blacklistCheck } = require("../../files/scripts/memberlist-check.js");
const { prefix, NECESSARY_PERMISSIONS } = require("../../config/config.js"); // loading config file with token and prefix, and settings

function escapeRegex(str) { // Loading all needed functions
	return str.replace(/[.*+?^${}()|[\]\\]/g, `\\$&`);
}

module.exports = async (client, message) => {
	await addPlayer(message)
	await addAdmin(message)
	if (message.author.bot) return; // If the message  author is a bot, return
	if (!message.guild) return; // If the message is not in a guild (aka in dms), return
	if (message.channel.partial) await message.channel.fetch(); // If the channel is on partial fetch it
	if (message.partial) await message.fetch(); // If the message is on partial fetch it



	const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`); // The prefix can be a Mention of the Bot / The defined Prefix of the Bot

	if (!prefixRegex.test(message.content)) return; // If its not that then return

	const [, matchedPrefix] = message.content.match(prefixRegex); // Now define the right prefix either ping or not ping
	const args = message.content.slice(matchedPrefix.length).trim().split(/ +/); // Create the arguments with sliceing of of the rightprefix length
	const cmd = args.shift().toLowerCase(); // Creating the cmd argument by shifting the args by 1


	const LANGUAGE = message.messageCreate; // Get server language

	// If no cmd added return error
	if (cmd.length === 0) {
		if (matchedPrefix.includes(client.user.id))
			return message.channel.send(LANGUAGE.noCmd.replace('$PREFIX', prefix));
		return;
	}

	let command = client.commands.get(cmd); // Get the command from the collection
	if (!command) command = client.commands.get(client.aliases.get(cmd)); // If the command does not exist, try to get it by his alias

	// If the command is now valid
	if (command) {

		for (let i = 0; i < NECESSARY_PERMISSIONS.length; i++) {
			let current = NECESSARY_PERMISSIONS[i];
			// Check Necessary permissions
			if (!message.channel.permissionsFor(client.user.id).has(current))
				return message.channel.send(LANGUAGE.noPermissions.replace('$PERM', current));
		}

		// Check if user is banned again
		if (blacklistCheck(message.author.id)) // Check if user is banned
			return message.reply(LANGUAGE.banned.replace('$REASON', blacklistCheck(message.author.id)).replace('$PREFIX', prefix));

		// Check Whitelist
		if (command.whitelistOnly && !whitelistCheck(message.author.id))
			return;

		// Check if command is admin only use
		if (command.adminOnly) { // Readable
			if (!message.member.permissions.has('ADMINISTRATOR') && !whitelistCheck(message.author.id)) // Checking perms
				return message.reply(LANGUAGE.adminOnly);
		}

		// Check if command is NSFW
		if (command.nsfw && !message.channel.nsfw)
			return message.reply(LANGUAGE.nsfw);


		// Finally, run the command with the parameters: client, message, args
		command.run(client, message, args)
			.catch((err) => {

				message.reply(`ERROR: ${err.message}`);
				console.log(err);

			});
	}
};
