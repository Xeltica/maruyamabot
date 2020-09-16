import { Client, Message, TextChannel } from "discord.js";
import Enumerable from "linq";
import errors from "../errors";
import { fetchAllMessages } from "../misc/fetchAllMessages";
import { define } from "./define";

export default define('siritori-stats', 'しりとりのスコアを表示します', async (args: string[], _mes: Message, cli: Client) => {
    const id = process.env.SIRITORI_CHANNELS;
    if (!id) return errors.siritoriChannelsNotDefined.toString();

    const ch = await cli.channels.fetch(id);
    if (!(ch instanceof TextChannel)) return errors.notTextChannel.toString();

    const all = Enumerable.from(await fetchAllMessages(ch));

    const allTurns = all.count();
    const startedAt = all.lastOrDefault()?.createdAt.toLocaleString();
    const played = all
        .groupBy(m => m.author)
        .select(g => ({ name: g.key().username, count: g.count() }))
        .orderByDescending(score => score.count)
        .select(g => `${g.name}: ${g.count}回`)
        .toJoinedString('\n ');

    return allTurns == 0 ? 'しりとりは始まっていません。' :
`開始日時: ${startedAt}
ターン数: ${allTurns}

**スコア**
 ${played}
`;    
});