const mongoose = require('mongoose');
const mongodbUrl = process.env.mongodbUrl;

module.exports = {
	once: true,
	name: "ready",
	async execute(client) {
		// Connect to MongoDB
		if(!mongodbUrl) return;
		await mongoose.connect(mongodbUrl || '', {})
		// Check if the bot is connected to MongoDB
		if(mongoose.connect) {
			console.log("Connected to MongoDB...")
		} else {
			console.log("Could not connect to MongoDB...")
		}

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