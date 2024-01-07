const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("hi")
		.setDescription("Say hi to the bot"),
	async execute(interaction) {
		const { user } = interaction;
		await interaction.reply(`Hello ${user.displayName}!`);
	},
};