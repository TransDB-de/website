<script lang="ts">
	import PrivacyContent from "$content/privacy.md";
	import DisclaimerContent from "$content/disclaimer.md";
	import EntryRemovalContent from "$content/entry-removal-policy.md";
</script>

<svelte:head>
	<title>Datenschutz - Trans*DB</title>
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
