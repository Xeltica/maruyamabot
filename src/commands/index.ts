import { define, MBCommandDefinition } from "./define";
import help from "./help";
import isServerAdmin from "./is-server-admin";
import ping from "./ping";
import siritoriStats from "./siritori-stats";
import siritoriVacuum from "./siritori-vacuum";

const commands: readonly MBCommandDefinition[] = [
    ping,
    help,
    siritoriStats,
    siritoriVacuum,
    isServerAdmin
];

export const getCommand = (name: string) => commands.find(c => c.name === name);

export default commands;