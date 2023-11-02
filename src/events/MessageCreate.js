module.exports = {
	name: 'messageCreate',
	async execute(message) {
		// Bang command prefix *can be changed*
		const prefix = "!";
		// No response if message doesn't start w/ prefix 
		// or if message is written by a bot
		if (!message.content.startsWith(prefix) || message.author.bot) return;
		// Splits the argument(s) & removes the prefix and trailing whitespace
		const args = message.content.slice(prefix.length).trim().split(/ +/);
		// Gets the command from the args array
		const command = args.shift().toLowerCase();

		if(command === 'blog') {
			return message.reply("https://medium.com/@accidental-feature");
		}
		if(command === 'server') {
			const serverDate = new Date(message.guild.createdAt).getTime();
			const today = new Date().getTime();
			const differenceInDays = Math.ceil((today - serverDate) / (1000 * 3600 * 24));
			(async() => {
				try {
					const owner = await message.guild.fetchOwner()
					message.channel.send(`The server was created ${differenceInDays} days ago.\nThe owner is **<@${owner.id}>**.`);
				} catch(error) {
					console.error(error);
				}
			})();
			return;
		}
	}
}