/*
 * MaruyamaBot ENTRY POINT
*/

import { Client, TextChannel, Message } from 'discord.js';
import { akaneAA } from "./misc/aa";
import { messageHandlers } from './handlers';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.BOT_TOKEN) {
    console.error('BOT_TOKEN が未定義です。.env ファイルに記載してください');
    process.exit(-1);
}

if (!process.env.SIRITORI_CHANNEL) {
    console.error('SIRITORI_CHANNEL が未定義です。.env ファイルに記載してください');
    process.exit(-1);
}

console.log(akaneAA);

console.log('Maruyama Bot v1.0.0');
console.log("起動中...");

const cli = new Client();

cli.on('ready', async () => {
    console.log(`${cli.user?.username ?? 'NULL'} というアカウントでログインしました。`);

    await cli.user?.setPresence({
        status: 'online',
        activity: {
            name: '22/7 音楽の時間',
            type: 'PLAYING',
            url: 'https://227-game.com/',
        }
    });
});

cli.on('message', msg => {
    messageHandlers.forEach(handler => handler(msg, cli));
});

cli.login(process.env.BOT_TOKEN);