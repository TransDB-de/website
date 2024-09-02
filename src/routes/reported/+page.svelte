<script lang="ts" context="module">
	throw new Error("@migration task: Check code was safely removed (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292722)");

	// import { loadContents } from "$lib/loadContents";
	// 
	// export async function load() {
	// 	const props = await loadContents({
	// 		name: "ReportedContent",
	// 		path: "reported"
	// 	});
	// 	
	// 	return { props };
	// }
</script>

<script lang="ts">
	throw new Error("@migration task: Add data prop (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292707)");

	import { t } from "$lib/localization"

	export let ReportedContent;
</script>

<svelte:head>
	<title>{ t("reported.title") }</title>
	<meta name="robots" content="noindex">
</svelte:head>

<div class="content">
	<svelte:component this={ReportedContent}/>
</div>

<style lang="scss">
	@import "../scss/content";
</style>
