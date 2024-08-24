import { JournalEntryData } from "@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/module.mjs";
import { convert } from "html-to-text";

import Logger from "../utils/Logger";

// TODO: 5e Typing
declare class JournalSheet5e extends JournalSheet{
	pageIndex: number;
	_pages: [];
}



export async function initCustomHooks(): Promise<void> {
	Hooks.on<Hooks.GetApplicationHeaderButtons<JournalSheet5e>>('getJournalSheetHeaderButtons', (sheet, buttons ) => {
		buttons.unshift({
			class: "sync-journal",
			icon: "fas fa-rotate",
			label: "Sync Journal",
			onclick: () => sendJournal(sheet),
		});
	})
}

const enum ContentType {
	TEXT = "text",
}

async function sendJournal(sheet: any ): Promise<void> {
    const pageIndex = sheet.pageIndex;
	const currentPageData = sheet._pages[pageIndex];
	const currentPageContentType = currentPageData.type;
	const currentPageContent = currentPageData.text.content;


	const pageTitle = currentPageData.name;
	let formattedText = "";
    switch (currentPageContentType) {
        case ContentType.TEXT:
			formattedText = convert(currentPageContent);
			Logger.Ok(`${pageTitle}`);
			Logger.Ok(`${formattedText}`);
			// Discord Step
            break;
        default:
			Logger.Err("Journal page type not supported.");
            break;
    }
    // if (embeds.length > 0 || msgText !== "") {
        // const user = game.user;
        // const username = user.name;
        // const imgurl = await generateimglink(game.user.avatar);
        // let allRequests = await addEmbedsToRequests([{
        //     hook: undefined,
        //     params: {
        //         username: username,
        //         avatar_url: imgurl,
        //         content: msgText,
        //         embeds: []
        //     }
        // }], undefined, username, imgurl, embeds, user);
        // for (const request of allRequests) {
        //     const { waitHook, formData } = await postParse(undefined, request, hookOverride);
        //     const { response, message } = await api.sendMessage(formData, false, game.user.viewedScene, waitHook)
        //         .catch(error => {
        //             ui.notifications.error("An error occurred while trying to send to Discord. Check F12 for logs.");
        //         });

        //     if (response.ok) {
        //         ui.notifications.info("Successfully sent to Discord.");
        //     }
        //     else {
        //         throw new Error("An error occurred.");
        //     }
        // }
}