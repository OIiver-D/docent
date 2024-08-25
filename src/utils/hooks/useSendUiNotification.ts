import Logger from "../Logger";
import { NotificationType } from "./useCustomFoundryHooks";


export const useSendUiNotification = (message: string, type: NotificationType): void => {
	if (ui && ui.notifications) {
		if (type === NotificationType.ERROR) {
			Logger.Err(message);
			ui.notifications.error(message);
		}
		if  (type === NotificationType.INFO) {
			Logger.Log(message);
			ui.notifications.info(message);
		}
	}
}