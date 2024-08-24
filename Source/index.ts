import Logger from "./Utils/Logger";
import PreloadTemplates from "./PreloadTemplates";
import { RegisterSettings } from "./Utils/Settings";

Hooks.once("init", async () => {
	RegisterSettings();
	// init hooks
	await PreloadTemplates();
});

Hooks.once("setup", () => {
	Logger.Log("Lore Master module is being setup.")
});

Hooks.once("ready", () => {
	Logger.Ok("Lore Master module is now ready.");
});