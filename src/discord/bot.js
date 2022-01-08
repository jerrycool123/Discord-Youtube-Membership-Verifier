import dotenv from 'dotenv-defaults';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { Client, Collection, Intents } from 'discord.js';
import fs from 'fs';

dotenv.config();

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const token = process.env.DISCORD_BOT_TOKEN;
const rest = new REST({ version: '9' }).setToken(token);
const commandFiles = fs.readdirSync(__dirname + '/commands').filter(file => file.endsWith('.js')); 
const commands = [];

client.commands = new Collection();
for (const file of commandFiles) {
  const command = require(`${__dirname}/commands/${file}`);
  client.commands.set(command.data.name, command);
  commands.push(command.data.toJSON());
  console.log(`Command /${command.data.name} loaded.`);
}

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(
			Routes.applicationGuildCommands(process.env.DISCORD_BOT_CLIENT_ID, process.env.DISCORD_BOT_GUILD_ID),
			{ body: commands },
		);

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);
  console.log(command)

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.login(token);

export { client };