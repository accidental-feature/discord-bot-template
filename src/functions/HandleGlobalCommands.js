const { REST, Routes } = require('discord.js');
const fs = require('fs');

module.exports = (client) => {
    /**
     * Handles the setup and registration of global commands.
     * This function should be called from the main bot file.
     *
     * @param {string[]} commandFolders - The directories containing command files.
     * @param {string} path - The base path for the command files.
     * @param {string} clientId - The client ID of the bot.
    */
    client.handleGlobalCommands = async (commandFolders, path, clientId) => {
        client.commandArray = [];

        // Process each folder and load command files, skipping 'guild' specific commands
        for (const folder of commandFolders) {
            if (folder === "guild") continue;

            const commandFiles = fs.readdirSync(`${path}/${folder}`).filter(file => file.endsWith('.js'));
            for (const file of commandFiles) {
                const command = require(`../commands/${folder}/${file}`);
                client.commands.set(command.data.name, command);
                client.commandArray.push(command.data.toJSON());
            }
        }

        // Initialize REST client for interaction with Discord API
        const rest = new REST({ version: '9' }).setToken(process.env.BOT_TOKEN);

        // Self-invoking function to register global commands
        (async () => {
            try {
                console.log('Started refreshing (/) commands.');

                // Check for client ID
                if (!clientId) {
                    console.error('No client id provided.');
                    return;
                }

                // Register global commands using the REST API
                await rest.put(
                    Routes.applicationCommands(clientId), { body: client.commandArray }
                );

                console.log(`Successfully reloaded (/) commands globally. ${client.commandArray.length} commands loaded.`);
            } catch (error) {
                // Log any errors during command registration
                console.error('Failed to reload (/) commands globally:', error);
            }
        })();
    };
};