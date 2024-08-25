import assert from "assert"

export default {
	ModuleName: "docent",
	IsModule: true, 
}

export type Pair<T> = [string, T];
export const Assert = (value: unknown): void => assert(value);

export const MAX_DISCORD_MESSAGE_LENGTH = 2000;

export const enum JournalContentType {
	TEXT = "text",
}

export enum ValidSetting {
	WebHookUrl = "webHookURL",
	AutoSyncJournal = "autoSyncJournal"
}

export enum NotificationType {
	ERROR = "error",
	INFO = "info",
}
