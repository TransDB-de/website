<script lang="ts">
	import ImprintContent from "$content/imprint.md"
	import DisclaimerContent from "$content/disclaimer.md"
	import EntryRemovalContent from "$content/entry-removal-policy.md"
</script>

<template lang="pug">
	div.md
		ImprintContent
		DisclaimerContent
		EntryRemovalContent
</template>

<style lang="scss">
	@import "../scss/_markdown.scss";
</style>