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
	const l = get(currentLocale);
	
	let props = {};
	let componentPromises: Array<Promise<SvelteComponent>> = [];
	
	contents.forEach(content => {
		componentPromises.push(import(`../content/${l}/${content.path}`));
	});
	
	const components = await Promise.all(componentPromises);
	
	contents.forEach((content, i) => {
		props[content.name] = components[i].default;
	});
	
	return props;
}
