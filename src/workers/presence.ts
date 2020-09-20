import dayjs from 'dayjs';
import { Client, PresenceData } from 'discord.js';
import { songs } from '../misc/songs';

let lastChanged = dayjs.unix(0);

const playing = (): PresenceData['activity'] => ({
    type: 'PLAYING',
    name: '22/7 音楽の時間',
    url: 'https://227-game.com/',
});

const listening = (): PresenceData['activity'] => ({
    type: 'LISTENING',
    name: songs[Math.floor(Math.random() * songs.length)],
});

export default async (cli: Client): Promise<void> => {
    const now = dayjs();
    if (now.diff(lastChanged, 'hour') >= 1) {
        cli.user?.setPresence({
            status: 'online',
            activity: Math.floor(Math.random() * 10) < 5 ? playing() : listening(),
        });
        lastChanged = now;
    }
};