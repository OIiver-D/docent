import Logger from "./Utils/Logger";
import PreloadTemplates from "./PreloadTemplates";
import { RegisterSettings } from "./Utils/Settings";
import { initCustomHooks } from "./Hooks/hooks";

Hooks.once("init", async () => {
	RegisterSettings();
	initCustomHooks();
	await PreloadTemplates();
});

Hooks.once("setup", () => {
	Logger.Log("Lore Master module is being setup.")
});

Hooks.once("ready", () => {
	Logger.Ok("Lore Master module is now ready.");
});