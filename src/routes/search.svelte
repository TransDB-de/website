<script lang="ts">
	import SearchFilter from "$components/forms/searchFilter.svelte"
</script>

<template lang="pug">
	div.search-page
		SearchFilter
		
		div.entries
</template>

<style lang="scss">
	@import "../scss/mixins";
	
	.search-page {
		padding: 20px;
		display: grid;
		width: 100%;
		grid-template-columns: minmax(auto, 1fr) minmax(auto, 860px) 1fr;
		
		@include media-mobile {
			grid-template-columns: 1fr;
		}
	}
</style>

