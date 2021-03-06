export class MBError {
    public constructor(public code: string) { }

    public toString(): string {
        return `エラーが発生してしまいました。お手数ですが、管理者の方に問い合わせて頂けませんか？\nコード: ${this.code}`;
    }
};

export const errors = {
    siritoriChannelsNotDefined: new MBError('SIRITORI_CHANNEL_IS_NOT_DEFINED'),
    notTextChannel: new MBError('NOT_TEXT_CHANNEL'),
    useAtTheGuild: new MBError('USE_AT_THE_GUILD'),
};

export default errors;