<script lang="ts" context="module">
	import { currentLocale } from "$lib/localization"
	import { get } from "svelte/store"

	export async function load() {
		const l = get(currentLocale);

		return {
			props: {
				ImprintContent: (await import(`../content/${l}/imprint.md`)).default,
				DisclaimerContent: (await import(`../content/${l}/disclaimer.md`)).default,
				EntryRemovalContent: (await import(`../content/${l}/entry-removal-policy.md`)).default
			}
		}
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
