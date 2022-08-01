const whitelist = [
	"123",
	"321"
];

const blacklist = {
	"123": "Ban reason"
};

module.exports = {
	blacklistCheck: function(user) {
		return blacklist[user] // Reason
			? (Object.keys(blacklist).includes(user)) : false
	},
	whitelistCheck: function(user) {
		return true ? (whitelist.includes(user)) : false;
	}
}