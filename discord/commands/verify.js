import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageActionRow, MessageSelectMenu } from 'discord.js';
import config from '../utils/config';
import { generateOAuth2URL } from '../utils/youtube';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('verify')
    .setDescription('Verify YouTube membership'),
  async execute(interaction) {
    const { channels } = config;
    const row = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('membership')
					.setPlaceholder('Select a YouTube channel ...')
          .addOptions(channels.map(channel => ({
            label: channel.alias,
            description: `https://www.youtube.com/c/${channel.channelId}`,
            value: channel.alias,
            emoji: channel.emoji
          }))),
			);

    await interaction.reply({ content: 'Pong!', components: [row], ephemeral: true });
    const message = await interaction.fetchReply();
    
    const filter = (newInteraction) =>
      newInteraction.isSelectMenu() &&
      interaction.user.id === newInteraction.user.id &&
      message.id === newInteraction.message.id;
    
    const collector = interaction.channel.createMessageComponentCollector({
      filter,
      componentType: 'SELECT_MENU',
      time: 60000
    })

    collector.on('collect', async(newInteraction) => {
      const value = newInteraction.values[0];
      const channel = channels.find(channel => channel.alias === value);
      if (channel) {
        const url = generateOAuth2URL({
          userId: newInteraction.user.id, 
          guildId: newInteraction.guildId,
          ytChannelAlias: channel.alias,
        });
        await newInteraction.reply({ 
          content: `Please use Google OAuth2 to verify your membership.\n${url}`, 
          ephemeral: true 
        });
      }
    });
  },
};