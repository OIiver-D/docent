import Logger from "../Utils/Logger";


export async function initCustomHooks(): Promise<void> {
	Hooks.on<Hooks.GetApplicationHeaderButtons<JournalSheet>>('getJournalSheetHeaderButtons', (sheet, buttons ) => {
		buttons.unshift({
			class: "sync-journal",
			icon: "fas fa-rotate",
			label: "Sync Journal",
			onclick: () => {Logger.Log(`Sync Journal Entry , ${sheet.object}`, )},
		});
	})
}