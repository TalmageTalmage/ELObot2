module.exports = (client) => {
	console.log(`\n-> Logged in as ${client.user.tag}!\n`);

	client.user.setActivity('Yey', { type: 'WATCHING' });
	client.user.setActivity('Discord-Js-Template by: Vako#8782', { type: 'GAMING' });
	// PLAYING
	// STREAMING
	// LISTENING
	// WATCHING
	// COMPETING
};
