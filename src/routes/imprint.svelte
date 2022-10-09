<script lang="ts" context="module">
	import { loadContents } from "$lib/loadContents";
	
	export async function load() {
		const props = await loadContents({
			name: "ImprintContent",
			path: "imprint.md"
		}, {
			name: "DisclaimerContent",
			path: "disclaimer.md"
		}, {
			name: "EntryRemovalContent",
			path: "entry-removal-policy.md"
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
	<title>Impressum - Trans*DB</title>
	<meta name="description" content="Impressumsanschrift für Trans*DB.">
</svelte:head>

<template lang="pug">
	div.content
		ImprintContent
		DisclaimerContent
		EntryRemovalContent
</template>

<style lang="scss">
	@import "../scss/content";
</style>
