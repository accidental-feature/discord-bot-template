module.exports = {
	name: "ready",
	once: true,
	async execute(client) {
		console.log(`${client.user.displayName} is online!`);
		// Array of activities for the bot to cycle through
		const activities = [
			"time go by.",
			"Netflix.",
			"you, sleep."
		]
		// Changes Bot status every 10 seconds
		setInterval(() => {
			const status = activities[Math.floor(Math.random() * activities.length)];
			client.user.setPresence({ activities: [{ type: 3, name: `${status}`}]})
		}, 10000)
	}
}