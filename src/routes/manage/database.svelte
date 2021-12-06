<script lang="ts">
	import DataFilter from "$components/database/dataFilter.svelte"
	import DatabaseEntryCollection from "$components/database/databaseEntryCollection.svelte"
</script>

<template lang="pug">
	div.database
		DataFilter
		DatabaseEntryCollection
</template>

<style lang="scss">
	@import "../../scss/lengths";
	
	.database {
		width: 100%;
		max-width: $conent-max-width;
	}
</style>
