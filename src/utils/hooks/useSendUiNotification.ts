import { NotificationType } from "./useCustomFoundryHooks";


export const useSendUiNotification = (message: string, type: NotificationType): void => {
	if (ui && ui.notifications) {
		if (type === NotificationType.ERROR) {
			ui.notifications.error(message);
		}
		if  (type === NotificationType.INFO) {
			ui.notifications.info(message);
		}
	}
}