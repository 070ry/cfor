const { EmbedBuilder } = require('discord.js');

const { checkPermission } = require('../utils');

export default {
    ping: async (message) => {
        message.channel.send({ embeds: [new EmbedBuilder().setTitle('Pong!')] });
        await message.delete();
    },
    pong: async (message) => {
        message.channel.send({ embeds: [new EmbedBuilder().setTitle('Ping!')] });
        await message.delete();
    },
    stop: async (message) => {
        if (await checkPermission(message.member, 'Administrator')) {
            await message.channel.send({ embeds: [new EmbedBuilder().setTitle('Stopping...')] });
            message.client.destroy();
            process.exit(0);
        } else {
            message.channel.send({
                embeds: [new EmbedBuilder().setTitle('You do not have permission to use this command!')],
            });
        }
    },
    aliases: {
        p: 'ping',
        po: 'pong',
        // ここに他のエイリアスを追加
    },
};
