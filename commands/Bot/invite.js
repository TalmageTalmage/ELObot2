const { MessageEmbed } = require('discord.js');
const ee = require('../../config/embed.json');

module.exports = {
	name: "invite",
	category: "Bot",
	aliases: [],
	usage: "invite",
	run: async (client, message) => {
		const LANGUAGE = langHandler(message).bot.invite;
		let embed = new MessageEmbed()
			.setTitle(LANGUAGE.EMBED.title)
			.setDescription(` [link](https://discord.com/oauth2/authorize/?permissions=YOUR-BOT-PERMISSION&scope=bot&client_id=${client.user.id}) ◄`)
			.setColor(ee.color);
		message.channel.send({ embeds: [embed] });
	}
};
