import { currentLocale } from "./localization"
import { get } from "svelte/store"
import type { SvelteComponent } from "svelte"

export interface Content {
	name: string;
	path: string;
}

/**
 * Loads Markdown Components in the current langauge
 * @param contents 
 * @returns 
 */
export async function loadContents(...contents: Content[]) {
	const l = currentLocale;
	
	let props = {};
	let componentPromises: Array<Promise<SvelteComponent>> = [];
	
	contents.forEach(content => {

		// Workaround for @rollup/plugin-dynamic-import-vars to recognize subdirectories
		if (content.path.includes("/")) {
			const path = content.path.split("/");
			componentPromises.push(import(`../content/${l}/${path[0]}/${path[1]}.md`));
		} else {
			componentPromises.push(import(`../content/${l}/${content.path}.md`));
		}
		
	});
	
	const components = await Promise.all(componentPromises);
	
	contents.forEach((content, i) => {
		props[content.name] = components[i].default;
	});
	
	return props;
}
