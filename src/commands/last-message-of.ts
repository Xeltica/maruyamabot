import { Client, Message, TextChannel } from "discord.js";
import { define } from "./define";
import commands from ".";
import { getCommandPrefix } from "../misc/env";
import { extractChannels } from "../misc/extract";
import { fetchLastMessage } from "../misc/fetchLastMessage";

export default define('last-message-of', '', async (args: string[], _msg: Message, cli: Client) => {
    if (args.length !== 1) {
        return '/channel <channel>';
    }
    const id = extractChannels(args[0])[0];

    const ch = id ? await cli.channels.fetch(id) : null;
    if (!(ch instanceof TextChannel)) return 'Specify the text channel.';

    const last = await fetchLastMessage(ch);

    return last ? `${last.author.username}: ${last.content}` : 'no message';
});