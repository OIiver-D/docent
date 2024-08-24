import Logger from "../Utils/Logger";


export async function initCustomHooks(): Promise<void> {
	Hooks.on<Hooks.GetApplicationHeaderButtons<JournalSheet>>('getJournalSheetHeaderButtons', (sheet, buttons ) => {
		buttons.unshift({
			class: "sync-journal",
			icon: "fas fa-rotate",
			label: "Sync Journal",
			onclick: () => sendJournal(sheet),
		});
	})
}

async function sendJournal(sheet: any): Promise<void> {
	console.log({sheet});
    const pageIndex = sheet.pageIndex;
    const pageData = sheet.pages[pageIndex];
	console.log({pageData});
    // let formData = new FormData();
    // let embeds = [];
    // let msgText = "";
    // switch (pageData.type) {
    //     case "text":
    //         embeds = [{
    //             author: { name: "From Journal " + sheet.title },
    //             title: pageData.name,
    //             description: await messageParser.formatText(await toHTML(pageData.text.content))
    //         }];
    //         break;
    //     case "image":
    //         embeds = [{
    //             author: { name: "From Journal " + sheet.title },
    //             title: pageData.name,
    //             image: {
    //                 url: await generateimglink(pageData.src)
    //             },
    //             footer: {
    //                 text: pageData.image.caption
    //             }
    //         }];
    //         break;
    //     case "video":
    //         if (pageData.src.includes("http")) {
    //             msgText = pageData.src;
    //         } else {
    //             if (getThisModuleSetting('inviteURL') !== "http://") {
    //                 msgText = (getThisModuleSetting('inviteURL') + pageData.src);
    //             }
    //             else {
    //                 ui.notifications.error("foundrytodiscord | Invite URL not set!");
    //             }
    //         }
    //         break;
    //     default:
    //         ui.notifications.warn("Journal page type not supported.");
    //         break;
    // }
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