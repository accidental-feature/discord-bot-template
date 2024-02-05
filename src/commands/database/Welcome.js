const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField, ChannelType } = require('discord.js');
const welcome = require('../../schemas/welcome');

// Command data
const commandData = new SlashCommandBuilder()
    .setName('welcome')
    .setDescription('Manage the welcome system')
    .addSubcommand(subcommand => 
        subcommand
            .setName('setup')
            .setDescription('Sets up the welcome system')
            .addChannelOption(option => 
                option
                    .setName('channel')
                    .setDescription('Please select a channel for the welcome system')
                    .addChannelTypes(ChannelType.GuildText)
                    .setRequired(true))
            .addStringOption(option => 
                option
                    .setName('message')
                    .setDescription('The message that gonna be sent. Note: use {member} to ping and (member) to show username')
                    .setRequired(true))
            .addStringOption(option => 
                option
                    .setName('reaction')
                    .setDescription('The reaction for your system')
                    .setRequired(false)))
    .addSubcommand(subcommand => 
        subcommand
            .setName('disable')
            .setDescription('Disables the welcome system'));

// Embed builder
function buildEmbed(color, description) {
    return new EmbedBuilder()
        .setColor(color)
        .setDescription(description);
}

// Command execution
async function executeCommand(interaction) {
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
        return await interaction.reply({ content: "You don't have permission to use this command", ephemeral: true });
    }

    const sub = interaction.options.getSubcommand();
    const data = await welcome.findOne({ Guild: interaction.guild.id });

    if (sub === 'setup') {
        await setupCommand(interaction, data);
    } else if (sub === 'disable') {
        await disableCommand(interaction, data);
    }
}

// Setup command
async function setupCommand(interaction, data) {
    if (data) {
        return await interaction.reply({
            content: 'The welcome system has already been setup use **/welcome disable** to disable the welcome system.', 
            ephemeral: true
        });
    }

    const channel = interaction.options.getChannel('channel');
    const message = interaction.options.getString('message');
    const reaction = interaction.options.getString('reaction');

    await welcome.create({
        Guild: interaction.guild.id,
        Channel: channel.id,
        Message: message,
        Reaction: reaction
    });

    const embed = buildEmbed("#f7f7f7", `Your welcome system has been setup with the message: **\`${message}\`** and it will be sent to the ${channel} channel.`);
    await interaction.reply({ embeds: [embed], ephemeral: true });
}

// Disable command
async function disableCommand(interaction, data) {
    if (!data) {
        return await interaction.reply({
            content: 'The welcome system has not been setup please use /welcome setup to setup the system', 
            ephemeral: true
        });
    }

    await welcome.deleteMany({ Guild: interaction.guild.id });
    const embed = buildEmbed("#f7f7f7", `Your welcome system has been Disabled`);
    await interaction.reply({ embeds: [embed], ephemeral: true });
}

// Exporting module
module.exports = {
    data: commandData,
    execute: executeCommand
};
