import { Client, Message, TextChannel, UserFlags } from "discord.js";
import errors from "../errors";
import { getSiritoriChannel } from "../misc/env";
import { fetchAllMessages } from "../misc/fetchAllMessages";
import { isAdmin } from "../misc/isAdmin";
import { define } from "./define";

export default define('vacuum', '指定したチャンネルをリセットします', async (args: string[], msg: Message, cli: Client) => {
    if (args.length !== 1) {
        return '/vacuum <channel>';
    }
    const id = args[0];

    const ch = await cli.channels.fetch(id);
    if (!(ch instanceof TextChannel)) return 'Specify the text channel.';

    if (!msg.guild) return 'サーバーから呼び出してください。';
    if (isAdmin(msg.author.id, msg.guild)) return 'サーバーの管理者および許可されたユーザーにのみ許可されています。';

    try {
        await Promise.all((await fetchAllMessages(ch)).map(mes => ch.messages.delete(mes)))
        return '完了しました。';
    } catch(e) {
        console.error(e);
        return '失敗しました。管理者にお問い合わせください';
    }
});