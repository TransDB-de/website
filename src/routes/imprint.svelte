<script lang="ts">
	import ImprintContent from "$content/imprint.md"
	import DisclaimerContent from "$content/disclaimer.md"
	import EntryRemovalContent from "$content/entry-removal-policy.md"
</script>

<template lang="pug">
	div.content
		ImprintContent
		DisclaimerContent
		EntryRemovalContent
</template>

<style lang="scss">
	@import "../scss/content.scss";
</style>
