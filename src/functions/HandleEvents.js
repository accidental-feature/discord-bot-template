module.exports = (client) => {
    /**
     * Sets up event handlers for the Discord bot.
     * This function should be called from the main bot file.
     *
     * @param {string[]} eventFiles - Array of event file names.
     * @param {string} path - Base path to the events directory.
     */
    client.handleEvents = async (eventFiles, path) => {
        for (const file of eventFiles) {
            // Require the event module from its file
            const event = require(`../events/${file}`);

            // Check if the event should be registered with 'once' or 'on'
            if (event.once) {
                // Register an event that will be triggered only once
                client.once(event.name, (...args) => event.execute(...args, client));
            } else {
                // Register an event that can be triggered multiple times
                client.on(event.name, (...args) => event.execute(...args, client));
            }
        }
    };
};