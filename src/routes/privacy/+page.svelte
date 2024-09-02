<script lang="ts" context="module">
	throw new Error("@migration task: Check code was safely removed (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292722)");

	// import { loadContents } from "$lib/loadContents";
	// 
	// export async function load() {
	// 	const props = await loadContents({
	// 		name: "PrivacyContent",
	// 		path: "privacy"
	// 	}, {
	// 		name: "DisclaimerContent",
	// 		path: "disclaimer"
	// 	}, {
	// 		name: "EntryRemovalContent",
	// 		path: "entry-removal-policy"
	// 	});
	// 	
	// 	return { props };
	// }
</script>

<script lang="ts">
	throw new Error("@migration task: Add data prop (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292707)");

	import { t } from "$lib/localization"

	export let PrivacyContent;
	export let DisclaimerContent;
	export let EntryRemovalContent;
</script>

<svelte:head>
	<title>{ t("privacy.title") }</title>
	<meta name="description" content={ t("privacy.description") }>
</svelte:head>

<div class="content">
	<svelte:component this={PrivacyContent}/>
	<svelte:component this={DisclaimerContent}/>
	<svelte:component this={EntryRemovalContent}/>
</div>

<style lang="scss">
	@import "../scss/content";
</style>
