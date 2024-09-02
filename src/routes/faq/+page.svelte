<script lang="ts" context="module">
	import { loadContents } from "$lib/loadContents";
	
	export async function load() {
		const props = await loadContents({
			name: "FAQContent",
			path: "faq"
		});
		
		return { props };
	}
</script>

<script lang="ts">
	export let FAQContent;
	import { t } from "$lib/localization"
</script>

<svelte:head>
	<title>FAQ - Trans*DB</title>
	<meta name="description" content={ t("faq.description") }>
</svelte:head>

<div class="content">
	<svelte:component this={FAQContent} />
</div>

<style lang="scss">
	@import "../scss/content";
	
	.content {
		:global(h2) {
			font-size: 1.2em;
			margin-top: 0;
			border-bottom: none;
		}
	}
</style>
