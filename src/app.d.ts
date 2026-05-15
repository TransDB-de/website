declare module "*.md" {
	import type { Component } from "svelte";
	const component: Component;
	export default component;
}

declare global {
	namespace App {
		interface Locals {
			preferredLang: string;
			apiToken: string;
		}
		// interface Error {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
