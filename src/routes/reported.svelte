<script lang="ts" context="module">
	import { loadContents } from "$lib/loadContents";
	
	export async function load() {
		const props = await loadContents({
			name: "ReportedContent",
			path: "reported"
		});
		
		return { props };
	}
</script>

<script lang="ts">
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
