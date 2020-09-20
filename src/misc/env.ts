export const getBotToken = () => process.env.BOT_TOKEN;
export const getSiritoriChannel = () => process.env.SIRITORI_CHANNEL
export const getCommandPrefix = () => process.env.COMMAND_PREFIX ?? '!!';
export const getAdmins = () => (process.env.ADMINS ?? '').split(',');