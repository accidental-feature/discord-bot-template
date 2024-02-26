module.exports = (client) => {
    /**
     * Sets up event handlers for the Discord bot. This function dynamically registers
     * each event found in the eventFiles array, attaching them to the client (the bot).
     * This allows for a modular and organized way to handle different types of events
     * such as messages, reactions, etc.
     *
     * @param {string[]} eventFiles - An array containing the filenames of event modules.
     * @param {string} path - The base path to the directory where event modules are located.
     */
    client.handleEvents = async (eventFiles, path) => {
        // Loop through each file in the eventFiles array
        for (const file of eventFiles) {
            // Dynamically require the event module using its filename
            // The actual path is constructed by combining the base path with the filename
            const event = require(`../events/${file}`);

            // Determine how the event should be registered based on its 'once' property
            if (event.once) {
                // Register an event that should only occur once using client.once
                client.once(event.name, async (...args) => {
                    try {
                        // Attempt to execute the event's logic encapsulated in its execute function
                        // Pass through any arguments received from the event trigger, along with the client itself
                        await event.execute(...args, client);
                    } catch (error) {
                        // Catch and log any errors that occur during the execution of the event
                        // This prevents the bot from crashing due to unhandled exceptions
                        console.error(`Error executing event: ${event.name}`, error);
                    }
                });
            } else {
                // Register an event that can occur multiple times using client.on
                client.on(event.name, async (...args) => {
                    try {
                        // Similar to the 'once' case, attempt to execute the event's logic
                        // and handle any errors that may arise
                        await event.execute(...args, client);
                    } catch (error) {
                        console.error(`Error executing event: ${event.name}`, error);
                    }
                });
            }
        }
    };
};
