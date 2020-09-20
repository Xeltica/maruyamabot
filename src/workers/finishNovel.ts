import dayjs from 'dayjs';
import { Client, TextChannel } from 'discord.js';
import { getNovelChannel } from '../misc/env';
import { fetchLastMessage } from '../misc/fetchLastMessage';

export default async (cli: Client): Promise<void> => {
    const id = getNovelChannel();
    if (!id) return;

    try {
        const ch = await cli.channels.fetch(id);
        if (!(ch instanceof TextChannel)) return;

        const last = (await fetchLastMessage(ch));
        if (!last) return;

        if (last.author.id !== cli.user?.id && dayjs().diff(dayjs(last.createdAt), 'day') >= 7) {
            await ch.send({ content: '〜終〜' });
        }
    } catch (e: unknown) {
        console.error(e);
    }
};