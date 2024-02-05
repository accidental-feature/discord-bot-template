// Import necessary discord.js classes, fs for file system operations, and dotenv for environment variables
const { 
    Client, Collection, GatewayIntentBits, Events
} = require('discord.js');
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config(); // Load environment variables from .env file

// Initialize Discord client with intents required for the bot to function properly
const client = new Client({ intents: [
    GatewayIntentBits.Guilds, // Necessary for interaction within guilds
    GatewayIntentBits.GuildMembers, // Access guild member related events and properties
    GatewayIntentBits.GuildMessages, // Access messages in guilds
    GatewayIntentBits.MessageContent, // Necessary to read message content
    GatewayIntentBits.GuildMessageReactions // Access to message reactions in guilds
]});

// Initialize a collection to hold the bot's commands
client.commands = new Collection();

// Dynamically read the files for functions, events, and commands
const functions = fs.readdirSync('./src/functions').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync('./src/events').filter(file => file.endsWith('.js'));
const commandFolders = fs.readdirSync('./src/commands');

// Retrieve necessary IDs and token from environment variables
const isDev = process.env.DEVELOPMENT; // Check if running in development mode
const clientId = process.env.CLIENT_ID; // Client ID for the bot
const botToken = process.env.BOT_TOKEN; // Token for the bot

// Additional testing environment variables
const testToken = process.env.TEST_TOKEN; // Token for testing
const testClientId = process.env.TEST_CLIENT_ID; // Client ID for testing
const guildId = process.env.GUILD_ID; // Specific guild ID for testing or guild-specific commands

// Main bot initialization logic wrapped in an async function
(async () => {
    // Load and apply all function modules to the client
    for (const file of functions) {
        require(`./functions/${file}`)(client);
    }
	
	// Load and handle events
    client.handleEvents(eventFiles, './src/events');

    // Check if running in development mode
	if (isDev === 'true') {
		console.log("Running in development mode");
		// Load guild-specific commands if in development mode
		client.handleCommands(testToken, commandFolders, './src/commands', testClientId, guildId);
		client.login(testToken); // Log in using the test token
	} else {
		console.log("Running in production mode");
		// Load global commands if in production mode
		client.handleCommands(botToken, commandFolders, './src/commands', clientId);
		client.login(botToken); // Log in using the production bot token
	}
})();
