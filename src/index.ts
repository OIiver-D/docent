import Logger from "./utils/Logger";
import PreloadTemplates from "./PreloadTemplates";
import { RegisterSettings } from "./utils/Settings";
import { DiscordRequestQueue } from "./objects/DiscordRequestQueue";
import { useCustomFoundryHooks } from "./utils/hooks/useCustomFoundryHooks";

export const discordRequestQueue = new DiscordRequestQueue();

Hooks.once("init", async () => {
	RegisterSettings();
	useCustomFoundryHooks();
	await PreloadTemplates();
});

Hooks.once("setup", () => {
	Logger.Log("Docent module is starting up.")
});

Hooks.once("ready", () => {
	Logger.Ok("Docent module is online.");
});