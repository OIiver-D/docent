import { NotificationType, sendJournal } from "./useCustomFoundryHooks";
import { useSendUiNotification } from "./useSendUiNotification";

const ThreadInputHtml =  
`
	<div class="form-group">
		<label for="thread-id">Thread Id</label>
		<input type="text" id="thread-id" name="thread-id">
	</div>
`;

const CheckIcon = '<i class="fas fa-check"></i>';
const CrossIcon = '<i class="fas fa-times"></i>';


function onSyncConfirm(html: JQuery | HTMLElement, sheet: any ): void {
	if(html instanceof HTMLElement) {
		useSendUiNotification("No value found", NotificationType.ERROR);
	} else{
		const threadId = html.find("input#thread-id").val();

		if (!threadId) {
			useSendUiNotification("No thread id provided", NotificationType.ERROR);
			return;
		}
		const threadIdString = threadId.toString();
		useSendUiNotification(`Thread Id: ${threadId}`, NotificationType.INFO);
		sendJournal(sheet, threadIdString);
	}
}

export const useSyncJournalPopup = (sheet: any): void => {
	const dialog = new Dialog({
		title: "Sync Journal",
		content: ThreadInputHtml,
		buttons: {
			confirm: {
				icon: CheckIcon,
				label: "Confirm",
				callback: (html) => onSyncConfirm(html, sheet)
			},
			cancel: {
				icon: CrossIcon,
				label: "Cancel"
			}
		},
		default: "confirm"
	});
	dialog.render(true);
}