module.exports = {
	name: "ready",
	once: true,
	async execute(client) {
		console.log(`${client.user.displayName} is online!`);

		// The array of activities for the bot to cycle through
		const activities = [
			"",
		];
		
		setInterval(() => {
			// Randomize the activity
			const status = activities[Math.floor(Math.random() * activities.length)];
			/**
			 * Bot Status Types:
			 * 0 = Playing
			 * 1 = Streaming
			 * 2 = Listening
			 * 3 = Watching
			 * 4 = Custom
			 * 5 = Competing
			*/
			client.user.setPresence({ activities: [{ type: 0, name: `${status}`}]})
		}, 10000) // 10 seconds
	}
}