<script lang="ts">
	import SearchFilter from "$components/forms/searchFilter.svelte"
	import EntriesCollection from "$components/entriesCollection.svelte"
</script>

<template lang="pug">
	div.search-page
		SearchFilter
		
		div.entries
			EntriesCollection
</template>

<style lang="scss">
	@import "../scss/mixins";
	
	.search-page {
		padding: 20px;
		display: grid;
		width: 100%;
		grid-template-columns: minmax(auto, 1fr) minmax(auto, 860px) 1fr;
		gap: 20px;
		
		@include media-mobile {
			grid-template-columns: 1fr;
		}
	}
</style>

