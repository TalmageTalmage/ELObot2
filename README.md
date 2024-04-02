This is a Discord bot that will draft teams and keep track of ELO for inhouses. It can work for any game with any team size.

This bot uses Node.js with a MySQL database and Sequelize ORM.

Commands

[-AddGame](https://github.com/TalmageTalmage/elobot2/blob/main/commands/Admin/addGame.js)
Adds a new game mode to the current server.
Addgame <GAME NAME> <TEAM SIZE>

[-Start](https://github.com/TalmageTalmage/elobot2/blob/main/commands/Bot/startGame.js)
Starts a lobby for the specified game mdode in the current channel
-Start <Game Name>

[-Join](https://github.com/TalmageTalmage/elobot2/blob/main/commands/Bot/join.js)
Join the lobby in the current channel

[-Leave](https://github.com/TalmageTalmage/elobot2/blob/main/commands/Bot/leave.js)
Leaves the lobby in the current channel

[Lists the game modes in the current channel](https://github.com/TalmageTalmage/elobot2/blob/main/commands/Bot/games.js)

[-Leaders]((https://github.com/TalmageTalmage/elobot2/blob/main/commands/Bot/leaders.js)
Dispalys the leaderboard for the specified game mode
-Leaders <Game name>

[-Draft](https://github.com/TalmageTalmage/elobot2/blob/main/commands/Bot/draft.js)
Lobby must fill up with designated player amount for game mode. Only captain can use
-Draft <Player Username>

[-Score](https://github.com/TalmageTalmage/elobot2/blob/main/commands/Bot/score.js)
For scoring a game after the game has finished. Once over half the players have scored the game, the bot will close the lobby and recalculate ELO + Stats
-Score <Red Team Score> <Blue Team Score>

[-Stats](https://github.com/TalmageTalmage/elobot2/blob/main/commands/Bot/stats.js)
Displays stats of current player or you can name a player to see their stats.
-Stats <Player Name>

[-Lobby](https://github.com/TalmageTalmage/elobot2/blob/main/commands/Bot/lobby.js)
List players in the lobby

