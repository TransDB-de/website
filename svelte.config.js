import { mdsvex } from "mdsvex";
import adapter from "@sveltejs/adapter-node";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	compilerOptions: {
		// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
		runes: ({ filename }) => (filename.split(/[/\\]/).includes("node_modules") ? undefined : true)
	},
	kit: {
		adapter: adapter(),
		alias: {
			$components: "src/components",
			$brandIcons: "src/components/icons/brands",
			$formElements: "src/components/forms/elements",
			$content: "src/content",
			$assets: "src/assets",
			$models: "src/models"
		}
	},
	preprocess: [vitePreprocess(), mdsvex({ extensions: [".svx", ".md"] })],
	extensions: [".svelte", ".svx", ".md"]
};

export default config;
