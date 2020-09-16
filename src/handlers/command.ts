import { Client, DMChannel, Message, TextChannel } from "discord.js";
import { getCommand } from "../commands";
import { fetchAllMessages } from "../misc/fetchAllMessages";

export default async (msg: Message, cli: Client): Promise<void> => {
    const prefix = process.env.COMMAND_PREFIX ?? '!!';
    const text = msg.content;
    const ch = msg.channel;
    if (text.startsWith(prefix)) {
        const args = text.substring(prefix.length).split(' ');
        const name = args.shift()?.toLowerCase();
        if (!name) return;

        const cmd = getCommand(name);
        if (!cmd) return;

        const result = cmd.command(args, msg, cli);
        const content = typeof result === 'string' ? result : await result;
        ch.send({ content });

    }
}