declare module "*.md" {
	import type { Component } from "svelte";
	const component: Component;
	export default component;
}

declare global {
	const umami: {
		track: (eventName: string, data?: Record<string, unknown>) => void;
	};

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
