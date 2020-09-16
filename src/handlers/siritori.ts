import { Message, Client, TextChannel } from 'discord.js';
import { getSiritoriChannel } from '../misc/env';
import { fetchAllMessages } from '../misc/fetchAllMessages';

let lastErrorMessageId = null as string | null;

export default async (msg: Message, cli: Client): Promise<void> => {
    const ch = msg.channel;
    if (ch.id === getSiritoriChannel() && ch instanceof TextChannel) {
        if (lastErrorMessageId) {
            await ch.messages.delete(lastErrorMessageId);
        }
        
        const text = msg.content.trim().toLowerCase();
        const words: string[] = (await fetchAllMessages(ch)).map(mes => mes.content.trim().toLocaleLowerCase());
        // 最初に取得したデータは今回の発言なので消す
        words.shift();

        if (words.includes(text)) {
            setTimeout(() => ch.stopTyping(), 500);
            await ch.startTyping();
            try {
                await msg.delete();
            } catch (e) {
                console.error(e);
            }
            lastErrorMessageId = (await ch.send({
                content: `\`${msg.content}\` は過去に使われていますよ`,
            })).id;
        }
        
    }
};