<script lang="ts">
	import EntriesCollection from "$components/entriesCollection.svelte";
</script>

<template lang="pug">
	div
		EntriesCollection(unapproved)
</template>

<style lang="scss">
	@import "../../scss/lengths";
	
	div {
		display: flex;
		flex-direction: column;
		max-width: $conent-max-width;
		width: 100%;
		padding: 20px 10px;
	}
</style>
