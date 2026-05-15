import type { Component } from "svelte";

export interface Content {
	name: string;
	path: string;
}

export async function loadContents(
	locale: string,
	...contents: Content[]
): Promise<Record<string, Component>> {
	const l = locale;

	let props: Record<string, Component> = {};
	let componentPromises: Array<Promise<{ default: Component }>> = [];

	contents.forEach((content) => {
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
