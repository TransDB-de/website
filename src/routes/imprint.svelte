<script lang="ts" context="module">
	import { loadContents } from "$lib/loadContents";
	
	export async function load() {
		const props = await loadContents({
			name: "ImprintContent",
			path: "imprint"
		}, {
			name: "DisclaimerContent",
			path: "disclaimer"
		}, {
			name: "EntryRemovalContent",
			path: "entry-removal-policy"
		});
		
		return { props };
	}
</script>

<script lang="ts">
	import { t } from "$lib/localization"

	export let ImprintContent;
	export let DisclaimerContent;
	export let EntryRemovalContent;
</script>

<svelte:head>
	<title>{ t("imprint.title") }</title>
	<meta name="description" content={ t("imprint.description") }>
</svelte:head>

<div class="content">
	<svelte:component this={ImprintContent}/>
	<svelte:component this={DisclaimerContent}/>
	<svelte:component this={EntryRemovalContent}/>
</div>

<style lang="scss">
	@import "../scss/content";
</style>
