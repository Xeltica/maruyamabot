import { Message, Client, TextChannel } from 'discord.js';

let lastErrorMessageId = null as string | null;

export default async (msg: Message, cli: Client): Promise<void> => {
    const ch = msg.channel;
    if (ch.id === process.env.SIRITORI_CHANNEL && ch instanceof TextChannel) {
        if (lastErrorMessageId) {
            await ch.messages.delete(lastErrorMessageId);
        }
        // しりとりチャンネルやぞ
        const text = msg.content.trim().toLowerCase();
        
        const words: string[] = [];

        let temp: Message[] = [];
        let id: string | null = null;

        // 過去ログ
        do {
            temp = (await ch.messages.fetch({ limit: 100, before: id ?? undefined }))
                .filter(mes => mes.type === 'DEFAULT' && !!mes.content)
                .array();
            words.push(...temp.map(mes => mes.content.trim().toLocaleLowerCase()));
            if (temp.length > 0) id = temp[temp.length - 1].id;
        } while (temp.length > 0);

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