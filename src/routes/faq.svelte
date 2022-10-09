<script lang="ts" context="module">
	import { loadContents } from "$lib/loadContents";
	
	export async function load() {
		const props = await loadContents({
			name: "FAQContent",
			path: "faq.md"
		});
		
		return { props };
	}
</script>

<script lang="ts">
	export let FAQContent;
</script>

<svelte:head>
	<title>FAQ - Trans*DB</title>
	<meta name="description" content="Antworten auf häufig gestellte Fragen rund um unsere Website.">
</svelte:head>

<template lang="pug">
	div.content
		FAQContent
</template>

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
