<script lang="ts" context="module">
	import { loadContents } from "$lib/loadContents";
	
	export async function load() {
		const props = await loadContents({
			name: "SubmittedContent",
			path: "submitted.md"
		});
		
		return { props };
	}
</script>

<script lang="ts">
	import { t } from "$lib/localization"

	export let SubmittedContent;
</script>

<svelte:head>
	<title>{ $t("submitted.title") }</title>
	<meta name="robots" content="noindex">
</svelte:head>

<template lang="pug">
	div.content
		SubmittedContent
</template>

<style lang="scss">
	@import "../scss/content";
</style>
