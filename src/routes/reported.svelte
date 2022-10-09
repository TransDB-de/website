<script lang="ts" context="module">
	import { loadContents } from "$lib/loadContents";
	
	export async function load() {
		const props = await loadContents({
			name: "ReportedContent",
			path: "reported.md"
		});
		
		return { props };
	}
</script>

<script lang="ts">
	import { t } from "$lib/localization"

	export let ReportedContent;
</script>

<svelte:head>
	<title>{ $t("reported.title") }</title>
	<meta name="robots" content="noindex">
</svelte:head>

<template lang="pug">
	div.content
		ReportedContent
</template>

<style lang="scss">
	@import "../scss/content";
</style>
