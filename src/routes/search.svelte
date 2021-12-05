<script lang="ts">
	import SearchFilter from "$components/forms/searchFilter.svelte"
	import EntriesCollection from "$components/entriesCollection.svelte"
</script>

<svelte:head>
	<title>Suche - Trans*DB</title>
	<meta name="robots" content="noindex">
</svelte:head>

<template lang="pug">
	div.search-page
		SearchFilter.filter
		
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
		
		:global(.filter) {
			margin-right: 20px;
		}
		
		@include media-mobile {
			grid-template-columns: 1fr;
			
			:global(.filter) {
				margin-right: 0;
			}
		}
		
		@include media-mobile-small {
			padding: 20px 15px;
		}
	}
</style>

