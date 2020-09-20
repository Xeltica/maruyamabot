/*
 * MaruyamaBot ENTRY POINT
*/

import { Client } from 'discord.js';
import { akaneAA } from "./misc/aa";
import { messageHandlers } from './handlers';
import workers from './workers';
import dotenv from 'dotenv';
import { getAdmins, getBotToken, getSiritoriChannel } from './misc/env';

import meta from '../package.json';
import commands from './commands';

dotenv.config();

if (!getBotToken()) {
    console.error('BOT_TOKEN が未定義です。.env ファイルに記載してください');
    process.exit(-1);
}

if (!getSiritoriChannel()) {
    console.error('SIRITORI_CHANNEL が未定義です。.env ファイルに記載してください');
    process.exit(-1);
}

console.log(akaneAA);

console.log(`Maruyama Bot v${meta.version}`);
console.log("起動中...");
console.log(`loaded ${messageHandlers.length} message handlers`);
console.log(`loaded ${commands.length} commands`);
console.log(`loaded ${workers.length} workers`);

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

    console.log('admin Id: ');
    for (const id of getAdmins()) {
        console.log(' ' + id);
    }
});

cli.on('message', msg => {
    messageHandlers.forEach(handler => handler(msg, cli));
});

setInterval(() => {
    workers.forEach(worker => worker(cli));
}, 1000);

cli.login(getBotToken());