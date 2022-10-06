<script lang="ts" context="module">
	import { currentLocale } from "$lib/localization"
	import { get } from "svelte/store"

	export async function load() {
		const l = get(currentLocale);

		return {
			props: {
				PrivacyContent: (await import(`../content/${l}/privacy.md`)).default,
				DisclaimerContent: (await import(`../content/${l}/disclaimer.md`)).default,
				EntryRemovalContent: (await import(`../content/${l}/entry-removal-policy.md`)).default
			}
		}
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
	<meta name="description" content="Unsere Datenschutzerklärung.">
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
