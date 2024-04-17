import { ChannelType, Client, EmbedBuilder, Events, GatewayIntentBits } from 'discord.js';

import { info } from './Logger';
import commands from './commands/commands';
import config from './configs/config';

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ],
});

client.on(Events.ClientReady, async () => {
    info(`Logged in as ${client.user.tag}!`);
});

client.on(Events.MessageCreate, async (message) => {
    console.log('Received messageCreate Event');
    const { author, channel, content, guild, type } = message;

    if (
        author.bot ||
        guild.id === config.guild_id ||
        type !== ChannelType.GuildText ||
        type !== ChannelType.PublicThread ||
        type !== ChannelType.GuildVoice ||
        type !== ChannelType.GuildStageVoice
    )
        return;

    if (content.startsWith(config.prefix)) {
        const args = content.slice(1).split(' ');
        const command = args.shift().toLowerCase();

        if (command in commands) {
            await commands[command](message);
        } else if (command in commands.aliases) {
            await commands[commands.aliases[command]](message);
        }
    }
});

client.login(config.token);
