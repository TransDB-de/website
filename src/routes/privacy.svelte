<script lang="ts" context="module">
	import { loadContents } from "$lib/loadContents";
	
	export async function load() {
		const props = await loadContents({
			name: "PrivacyContent",
			path: "privacy.md"
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

	export let PrivacyContent;
	export let DisclaimerContent;
	export let EntryRemovalContent;
</script>

<svelte:head>
	<title>{ $t("privacy.title") }</title>
	<meta name="description" content={ $t("privacy.description") }>
</svelte:head>

<template lang="pug">
	div.content
		PrivacyContent
		DisclaimerContent
		EntryRemovalContent
</template>

<style lang="scss">
	@import "../scss/content";
</style>
