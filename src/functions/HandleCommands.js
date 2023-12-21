const { REST, Routes } = require('discord.js');
const fs = require('fs');

const guildId = ""; // Your guild id
const clientId = ""; // Your bot's client id

module.exports = (client) => {
// Function to handle command arrays
	client.handleCommandsArray = async (commandFolders, path) => {
		client.commandArray = [];
		// Loop through all the folders in the commands folder
		// Loop through each command folder
		for (commandFolder of commandFolders) {
			const commandFiles = fs.readdirSync(`${path}/${folder}`).filter(file => file.endsWith('.js'));
		// Process each command file
			for (commandFile of commandFiles) {
				const command = require(`../commands/${folder}/${file}`);
				client.commands.set(command.data.name, command);
				client.commandArray.push(command.data.toJSON());
			}
		}
	};


		const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);
	// Event listener for client
	(async() => {
		// Attempt to register commands
		try {
			console.log('Started refreshing (/) commands.');
			if (!clientId) {
				console.error('No client id provided.');
				return;
			}
		
			// Remove all global commands
			// await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: [] });
		
			// Remove all guild commands
			// await rest.put(Routes.applicationCommands(clientId), { body: [] });
			
			if (guildId) {
				await rest.put(
					Routes.applicationGuildCommands(clientId, guildId), { body: client.commandArray }
				);
			} else {
				await rest.put(
						Routes.applicationCommands(clientId), { body: client.commandArray }
					);
				}

				console.log('Successfully reloaded (/) commands.');
		} catch (error) {
			console.error(error);
		}
	})();
}