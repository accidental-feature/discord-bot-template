// Require the necessary discord.js classes
const { Client, GatewayIntentBits, Collection } = require('discord.js');
// Require the file system module
const fs = require('fs');
// Initialize dotenv thus allowing the use of process.env
const dotenv = require('dotenv');
dotenv.config();

// Initializes client and intents (perms)
const client = new Client({ intents: [
	GatewayIntentBits.Guilds, 
	GatewayIntentBits.GuildMessages,
	GatewayIntentBits.MessageContent,
	GatewayIntentBits.GuildMembers,
]});

// Set the client's commands property to a new discord.js collection
client.commands = new Collection();

const functions = fs.readdirSync('./src/functions').filter(file => file.endsWith(".js"));
const eventFiles = fs.readdirSync('./src/events').filter(file => file.endsWith(".js"));
const commandFolders = fs.readdirSync('./src/commands');

(async () => {
	for(file of functions) {
		require(`./functions/${file}`)(client);
	}
	// Handles all events and commands
	client.handleEvents(eventFiles, "./src/events");
	client.handleCommands(commandFolders, "./src/commands");
	client.login(process.env.BOT_TOKEN)
})();