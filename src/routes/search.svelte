<script lang="ts">
	import SearchFilter from "$components/forms/searchFilter.svelte"
	import EntryCollection from "$components/entryCollection.svelte"
	import { t } from "$lib/localization"
</script>

<svelte:head>
	<title>{ $t("search.title") }</title>
	<meta name="robots" content="noindex">
</svelte:head>

<template lang="pug">
	div.search-page
		SearchFilter.filter
		
		div.entries
			EntryCollection(type="search")
</template>

<style lang="scss">
	@import "../scss/mixins";
	
	.search-page {
		padding: 20px;
		display: grid;
		width: 100%;
		grid-template-columns: minmax(auto, 1fr) minmax(auto, 860px) 1fr;
		
		:global(.search-filter) {
			margin-right: 20px;
		}
		
		@include media-mobile {
			grid-template-columns: 1fr;
			
			:global(.search-filter) {
				margin-right: 0;
			}
		}
		
		@include media-mobile-small {
			padding: 20px 15px;
		}
	}
</style>
