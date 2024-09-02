import adapter from "@sveltejs/adapter-node";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { mdsvex } from "mdsvex";
import mdsvexConfig from "./mdsvex.config.js";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [vitePreprocess(), mdsvex(mdsvexConfig)],
	extensions: [".svelte", ...mdsvexConfig.extensions],

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter({
			out: "build"
		}),

		alias: {
			$assets: "./src/assets",
			$content: "./src/content",
			$components: "./src/components",
			$models: "./src/models",
			$formElements: "./src/components/forms/elements",
			$brandIcons: "./src/components/icons/brands"
		}
	}
};

export default config;
