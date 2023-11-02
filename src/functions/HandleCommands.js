const { REST, Routes } = require('discord.js');
const fs = require('fs');

const guildId = "your guild id";
const clientId = "your client id"

module.exports = (client) => {
	client.handleCommands = async (commandFolders, path) => {
		client.commandArray = [];
		for(folder of commandFolders) {
			const commandFiles = fs.readdirSync(`${path}/${folder}`).filter(file => file.endsWith('.js'));
			for(file of commandFiles) {
				const command = require(`../commands/${folder}/${file}`);
				client.commands.set(command.data.name, command);
				client.commandArray.push(command.data.toJSON());
			}
		}

		const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);

		(async() => {
			try {
				console.log('Started refreshing (/) commands.');

				await rest.put(
					// Clears global commands
					// Routes.applicationCommands(clientId), { body: []},
					
					// Adds commands to global scope (all servers)
					// Routes.applicationCommands(clientId), { body: client.commandArray},
					
					// Adds commands to guild scope (only your server)
					Routes.applicationGuildCommands(clientId, guildId), {
						body: client.commandArray
					},
				);

				console.log('Successfully reloaded (/) commands.');
			} catch (error) {
				console.error(error);
			}
		})();
	}
}