import { mdsvex } from "mdsvex"
import mdsvexConfig from "./mdsvex.config.js"
import preprocess from "svelte-preprocess"
import { resolve } from "path"
import adapter from "@sveltejs/adapter-node"
import dotenv from "dotenv"
import dynamicImportVars from "@rollup/plugin-dynamic-import-vars"

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

		alias: {
			$assets: "./src/assets",
			$content: './src/content',
			$components: './src/components',
			$models: './src/models',
			$formElements: './src/components/forms/elements',
			$brandIcons: './src/components/icons/brands'
		},

		vite: {
			envPrefix: "CLIENT_",
			plugins: [
				// Source: https://github.com/sveltejs/kit/issues/3030
				(function LoadSecrets() {
					return {
						name: "load-secrets",
						configureServer: async () => {
							; (await import('dotenv')).config()
						}
					}
				})(),
				dynamicImportVars({
					include: [
						"./src/lib/loadContents.js"
					]
				})
			]
		},

		csp: {


			/** @see hooks `src/hooks/index.ts` for additional directives */
			directives: prod ? {
				"default-src": ["none"],
				"font-src": ["self"],
				"img-src": ["self"],
				"script-src": ["self", "https://umami.transdb.de", "unsafe-inline"],
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
