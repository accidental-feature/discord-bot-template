const { REST, Routes } = require('discord.js');
const fs = require('fs');

module.exports = (client) => {
    /**
     * Handles the setup and registration of guild-specific commands.
     * This function is expected to be called from the main bot file (usually index.js).
     *
     * @param {string} path - The path to the folder containing guild command files.
     * @param {string} clientId - The client ID of the bot.
     * @param {string} guildId - The ID of the guild where commands are being registered.
    */
    client.handleGuildCommands = async (path, clientId, guildId) => {
        client.commandArray = [];

        // Read command files directly from the specified path
        const commandFiles = fs.readdirSync(path).filter(file => file.endsWith('.js'));

        // Load each command file and add it to the client's command collection
        for (const file of commandFiles) {
            const command = require(`../commands/guild/${file}`); // Adjust the path as needed
            client.commands.set(command.data.name, command);
            client.commandArray.push(command.data.toJSON());
        }

        // Initialize REST client for interaction with Discord API
        const rest = new REST({ version: '9' }).setToken(process.env.BOT_TOKEN);

        // Self-invoking function to register commands
        (async () => {
            try {
                console.log('Started refreshing guild (/) commands.');

                // Check for client ID
                if (!clientId) {
                    console.error('No client id provided.');
                    return;
                }

                // Register guild commands using the REST API
                await rest.put(
                    Routes.applicationGuildCommands(clientId, guildId),
                    { body: client.commandArray }
                );

                console.log('Successfully reloaded guild (/) commands.');
            } catch (error) {
                // Log any errors during command registration
                console.error('Failed to reload guild (/) commands:', error);
            }
        })();
    };
};
