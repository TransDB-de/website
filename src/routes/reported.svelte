<script lang="ts" context="module">
	import { currentLocale } from "$lib/localization"
	import { get } from "svelte/store"

	export async function load() {
		const l = get(currentLocale);

		return {
			props: {
				ReportedContent: (await import(`../content/${l}/submitted.md`)).default
			}
		}
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
