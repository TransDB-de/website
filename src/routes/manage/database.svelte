<script lang="ts">
	import DatabaseFilter from "$components/database/databaseFilter.svelte"
	import DatabaseEntryCollection from "$components/database/databaseEntryCollection.svelte"
</script>

<template lang="pug">
	div.database
		DatabaseFilter
		DatabaseEntryCollection
</template>

<style lang="scss">
	@import "../../scss/lengths";
	
	.database {
		width: 100%;
		max-width: 1200px;
		display: flex;
		flex-direction: column;
	}
</style>
