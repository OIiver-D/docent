import Globals from "./Globals";

const PreloadTemplates = async (): Promise<Handlebars.TemplateDelegate<any>[]> => {
	const rootPath = `${Globals.IsModule ? "modules" : "systems"}/${Globals.ModuleName}/templates/`;
	const templates: Array<string> = [];
	return loadTemplates(templates);
}

export default PreloadTemplates;