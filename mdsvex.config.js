import rehypeExternalLinks from "rehype-external-links"

const config = {
	extensions: [".svelte.md", ".md", ".svx"],

	smartypants: {
		dashes: "oldschool",
	},

	remarkPlugins: [],
	rehypePlugins: [
		[rehypeExternalLinks, { rel: ["noopener"] }]
	],
};

export default config;
