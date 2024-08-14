import { mdsvex } from "mdsvex"
import mdsvexConfig from "./mdsvex.config.js"
import preprocess from "svelte-preprocess"
import { resolve } from "path"
import adapter from "@sveltejs/adapter-node"
import dotenv from "dotenv"

await dotenv.config();
const prod = process.env["NODE_ENV"] === "production";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: [".svelte", ...mdsvexConfig.extensions],
	
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [preprocess(), mdsvex(mdsvexConfig)],
	
	kit: {
		adapter: adapter({
			out: "build"
		}),
		
		vite: {
			resolve: {
				alias: {
					$assets: resolve("./src/assets"),
					$content: resolve('./src/content'),
					$components: resolve('./src/components'),
					$models: resolve('./src/models'),
					$formElements: resolve('./src/components/forms/elements'),
					$brandIcons: resolve('./src/components/icons/brands')
				},
			},
			envPrefix: "CLIENT_",
			plugins: [
				// Source: https://github.com/sveltejs/kit/issues/3030
				(function LoadSecrets() {
					return {
						name: "load-secrets",
						configureServer: async () => {
							;(await import('dotenv')).config()
						}
					}
				})()
			]
		},
		
		csp: {
			
			
			/** @see hooks `src/hooks/index.ts` for additional directives */
			directives: prod ? {
				"default-src": ["none"],
				"font-src": ["self"],
				"img-src": ["self"],
				"script-src": ["self", process.env["UMAMI_SRC"] ? new URL(process.env["UMAMI_SRC"]).host : ""],
				"style-src": ["self", "unsafe-inline"]
			} : {}
		}
	},
	
	onwarn: (warning, handler) => {
		const { code, message } = warning;
		
		if (code === "css-unused-selector") {
			// ignores this warning
			return;
		} else {
			handler(warning);
		}
	}
};

export default config;
