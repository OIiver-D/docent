import Globals, {Assert, Pair} from "../Globals";
import Logger from "./Logger";

class Settings {
	private constructor() {
		Logger.Ok("Loading configuration settings.")
		this.SettingsList = [
			// Add settings items here
			[ValidSetting.WebHookUrl, {
				name: "Webhook URL",
				scope: "world",
				type: String,
				hint: "This should be the Webhook's URL from the discord channel you want to send chat messages to. Leave it blank to have Foundry to Discord ignore regular chat messages.",
				config: true,
				default: "",
				requiredReaload: true,
			} as ClientSettings.PartialSetting],
			[ValidSetting.AutoSyncJournal, {
				name: "Auto Sync Journal Entries",
				scope: "world",
				type: Boolean,
				hint: "Automatically sync journal entries to discord when they are created or updated.",
				config: true,
				default: true,
				requiredReaload: true,
			} as ClientSettings.PartialSetting]
		];
	}

	private static instance: Settings;

	public static Get(): Settings {
		if (Settings.instance)
			return Settings.instance;

		Settings.instance = new Settings();
		return Settings.instance;
	}

	private SettingsInit = false;
	public RegisterSettings(): void {
		if (this.SettingsInit)
			return;

		Assert(game instanceof Game);
		const g = game as Game;
		this.SettingsList.forEach((item) => {
			g.settings.register(Globals.ModuleName, item[0], item[1]);
		});

		this.SettingsInit = true;
	}

	readonly SettingsList: ReadonlyArray<Pair<ClientSettings.PartialSetting>>;
}

export const RegisterSettings = (): void => Settings.Get().RegisterSettings();

export enum ValidSetting {
	WebHookUrl = "webHookURL",
	AutoSyncJournal = "autoSyncJournal"
}

export const GetSetting = <T>(setting: ValidSetting): T | null => {
	const found = Settings.Get().SettingsList.find(x => x[0] === setting);
	return found ? found[1] as unknown as T : null;
}