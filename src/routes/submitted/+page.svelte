<script lang="ts" context="module">
	throw new Error(
		"@migration task: Check code was safely removed (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292722)"
	);

	// import { loadContents } from "$lib/loadContents";
	//
	// export async function load() {
	// 	const props = await loadContents({
	// 		name: "SubmittedContent",
	// 		path: "submitted"
	// 	});
	//
	// 	return { props };
	// }
</script>

<script lang="ts">
	throw new Error(
		"@migration task: Add data prop (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292707)"
	);

	import { t } from "$lib/localization";

	export let SubmittedContent;
</script>

<svelte:head>
	<title>{t("submitted.title")}</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="content">
	<svelte:component this={SubmittedContent} />
</div>

<style lang="scss">
	@import "../scss/content";
</style>
