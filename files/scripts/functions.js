const fs = require('fs');
var timeoutArray = [];


module.exports = {

	getUser: function(client, user, id=false) {
		if(!user) return false;
		var user = user.replace(/[<>@&!']/g, "").replace(/ /g, '');

		if(id)
			return client.users.cache.get(user).id;
		else
			return client.users.cache.get(user);
	},

	findKey: function(obj, check) {
		const keys = Object.keys(obj);

		if(keys.includes(check))
			return true;
		else
			return false;
	},

	timeout: function(delay, id, command, message, text){
		function msToTime(s) {
			var ms = s % 1000;
			s = (s - ms) / 1000;
			var secs = s % 60;
			s = (s - secs) / 60;
			var mins = s % 60;
			var hrs = (s - mins) / 60;

			return hrs + ':' + mins + ':' + secs + '.' + ms;
		}

		const user = id;
		const keys = Object.keys(timeoutArray); // Get user in array

		if(keys.includes(user)) { // If is in array
			if(timeoutArray[user].includes(command)) { // Check if user is in timeout of that command
				return true;
			}
		} else {
			timeoutArray[user] = []; // In case of user isn't in the array
		}

		timeoutArray[user].push(command) // Add command timeout to user
		setTimeout(() => {
			message.channel.send(text); 
			timeoutArray[user].splice(timeoutArray[user].indexOf(command)); // Remove timeout
		}, delay);
		console.log(timeoutArray);

		return false;
	},
};
