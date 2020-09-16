import { Client, Message, TextChannel, UserFlags } from "discord.js";
import errors from "../errors";
import { getSiritoriChannel } from "../misc/env";
import { fetchAllMessages } from "../misc/fetchAllMessages";
import { define } from "./define";

export default define('siritori-vacuum', 'しりとり部をリセットします', async (args: string[], msg: Message, cli: Client) => {
    const id = getSiritoriChannel();
    if (!id) return errors.siritoriChannelsNotDefined.toString();

    const ch = await cli.channels.fetch(id);
    if (!(ch instanceof TextChannel)) return errors.notTextChannel.toString();

    if (!msg.guild) return 'サーバーから呼び出してください。';
    if (msg.guild.ownerID !== msg.author.id) return 'サーバーの管理者のみ許可されています。';

    try {
        await Promise.all((await fetchAllMessages(ch)).map(mes => ch.messages.delete(mes)))
        return '完了しました。';
    } catch(e) {
        console.error(e);
        return '失敗しました。管理者にお問い合わせください';
    }
});