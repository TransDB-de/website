<script lang="ts">
	import ImprintContent from "$content/imprint.md"
	import DisclaimerContent from "$content/disclaimer.md"
	import EntryRemovalContent from "$content/entry-removal-policy.md"
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
