import { Message, TextChannel } from 'discord.js';

export async function fetchAllMessages(ch: TextChannel) {
    const res: Message[] = [];

    let temp: Message[] = [];
    let id: string | null = null;

    // 過去ログ
    do {
        temp = (await ch.messages.fetch({ limit: 100, before: id ?? undefined }))
            .filter(mes => mes.type === 'DEFAULT' && !!mes.content)
            .array();
        res.push(...temp);
        if (temp.length > 0)
            id = temp[temp.length - 1].id;
    } while (temp.length > 0);
    return res;
}
