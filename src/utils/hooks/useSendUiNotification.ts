import { NotificationType } from "../../Globals";
import Logger from "../Logger";


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