import { Channel, Client, GuildChannel, Message, TextChannel } from "discord.js";
import { extractChannels } from "../misc/extract";
import { define } from "./define";

export default define('channel', '指定したチャンネルを情報を取得します。', async (args: string[], msg: Message, cli: Client) => {
    if (args.length !== 1) {
        return '/channel <channel>';
    }
    const id = extractChannels(args[0])[0];

    const ch = id ? await cli.channels.fetch(id) : null;
    if (!(ch instanceof TextChannel)) return 'Specify the text channel.';

    try {
        return `**${ch.name}**${ch.nsfw ? ' (NSFW)' : ''}
${ch.topic}

作成日:${ch.createdAt.toLocaleString()}`;
    } catch(e) {
        console.error(e);
        return e;
    }
});