const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("test")
		.setDescription("Test to see if your bot's slash commands are working."),
	async execute(interaction) {
		await interaction.reply(`Your slash commands are working!`);
	},
};