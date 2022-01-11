declare module "*.md" {
	import { SvelteComponent } from "svelte";
	const content = SvelteComponent;
	export default content;
}
