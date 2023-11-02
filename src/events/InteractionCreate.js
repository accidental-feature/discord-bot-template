module.exports = {
	name: 'interactionCreate',
	async execute(interaction, client) {
		// If the interaction isn't a command, return
		if (!interaction.isCommand()) return;
		// Get the command from the collection
		const command = client.commands.get(interaction.commandName);
		if (!command) return;

		try{
			await command.execute(interaction, client);
		} catch (error) {
			console.log(error);
			await interaction.reply({
				content: 'There was an error while executing this command.', 
				ephemeral: true
			});
		} 
	},
};