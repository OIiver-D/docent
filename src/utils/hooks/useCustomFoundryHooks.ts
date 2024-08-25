import { convert } from "html-to-text";
import {  getSettingValue } from "../Settings";
import { discordRequestQueue } from "../..";
import { JournalContentType, MAX_DISCORD_MESSAGE_LENGTH, ValidSetting } from "../../constants";
import { useSendUiNotification } from "./useSendUiNotification";
import { useSyncJournalPopup } from "./useSyncJournalPopup";

// TODO: 5e Typing
declare class JournalSheet5e extends JournalSheet{
	pageIndex: number;
	_pages: [];
}

export enum NotificationType {
	ERROR = "error",
	INFO = "info",
}

export async function useCustomFoundryHooks(): Promise<void> {
	Hooks.on<Hooks.GetApplicationHeaderButtons<JournalSheet5e>>('getJournalSheetHeaderButtons', (sheet, buttons ) => {
		buttons.unshift({
			class: "sync-journal",
			icon: "fas fa-rotate",
			label: "Sync Journal",
			onclick: () => useSyncJournalPopup(sheet)
		});
		
	})
}


export async function sendJournal(sheet: any, threadId: string ): Promise<void> {
    const pageIndex = sheet.pageIndex;
	const currentPageData = sheet._pages[pageIndex];
	const currentPageContentType = currentPageData.type;
	const currentPageContent = currentPageData.text.content;

	let formattedText = "";
    switch (currentPageContentType) {
        case JournalContentType.TEXT:
			formattedText = convert(currentPageContent);
            break;
        default:
			useSendUiNotification("Docent does not currently know how to format that Journel type.", NotificationType.ERROR);
            break;
    }
	const chunkedContent = chunkContent(formattedText, MAX_DISCORD_MESSAGE_LENGTH);
	const hook = getSettingValue(ValidSetting.WebHookUrl) as string;
	if (!hook) {
		useSendUiNotification("No WebHook URL found. Please set it in the module settings.", NotificationType.ERROR);
		return;
	}

	const webHookWithThread = hook + `?thread_id=${threadId}`;
	for (const chunk of chunkedContent) {
		const formData = new FormData();
		formData.append("payload_json", JSON.stringify({
			content: chunk,
		}));
		await discordRequestQueue.sendMessage(webHookWithThread, formData);
	}

}





// TODO Better chunking (/n closest to 2k)
const chunkContent = (content: string, chunkSize: number): string[] => {
	const chunks = [];
	let i = 0;
	const n = content.length;
	while (i < n) {
		chunks.push(content.slice(i, i += chunkSize));
	}
	return chunks;
}