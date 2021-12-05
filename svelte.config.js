import { mdsvex } from "mdsvex"
import mdsvexConfig from "./mdsvex.config.js"
//import adapter from "@sveltejs/adapter-auto"
import preprocess from "svelte-preprocess"
import { resolve } from "path"
import adapter from '@sveltejs/adapter-node'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: [".svelte", ...mdsvexConfig.extensions],
	
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [preprocess(), mdsvex(mdsvexConfig)],
	
	kit: {
		adapter: adapter({
			out: "build-deno"
		}),
		
		// hydrate the <div id="svelte"> element in src/app.html
		target: "#svelte",
		
		vite: {
			resolve: {
				alias: {
					$assets: resolve("./src/assets"),
					$content: resolve('./src/content'),
					$components: resolve('./src/components'),
					$models: resolve('./src/models'),
					$formElements: resolve('./src/components/forms/elements'),
					$brandIcons: resolve('./src/components/icons/brands')
				}
			},
			envPrefix: "CLIENT_"
		}
	},
};

export default config;
