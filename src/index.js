const { 
    Client, Collection, GatewayIntentBits, Events
} = require('discord.js');
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();

// Initialize Discord client with specific intents for bot functionality
const client = new Client({ intents: [
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMembers, 
    GatewayIntentBits.GuildMessages, 
    GatewayIntentBits.MessageContent, 
    GatewayIntentBits.GuildMessageReactions
]});

// Create a new collection to store bot commands
client.commands = new Collection();

// Retrieve lists of function, event, and command files
const functions = fs.readdirSync('./src/functions').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync('./src/events').filter(file => file.endsWith('.js'));
const commandFolders = fs.readdirSync('./src/commands');
const guildCommandFolders = fs.readdirSync('./src/commands/guild');

// Retrieve client and guild IDs from environment variables
const guildId = process.env.GUILD_ID;
const clientId = process.env.CLIENT_ID;

// Main bot initialization
(async () => {
    // Load and apply all function modules to the client
    for (const file of functions) {
        require(`./functions/${file}`)(client);
    }

    // Set up event handlers and global/guild-specific commands
    client.handleEvents(eventFiles, './src/events');
    client.handleGlobalCommands(commandFolders, './src/commands', clientId);

    // Handle guild-specific commands if a guild ID is provided and folders exist
    if (guildId !== '' && guildCommandFolders.length !== 0) {
        client.handleGuildCommands('./src/commands/guild', clientId, guildId);
    }

    // Log in to Discord with the bot's token
    client.login(process.env.BOT_TOKEN);
})();
