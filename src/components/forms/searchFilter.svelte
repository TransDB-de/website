<script lang="ts">
	import ChevronRightIcon from "lucide-icons-svelte/chevronRight.svelte"
	import MapPinIcon from "lucide-icons-svelte/mapPin.svelte"
	import SearchIcon from "lucide-icons-svelte/search.svelte"
	
	import RadioButton from "$formElements/radioButton.svelte"
	import TagCheckbox from "$formElements/tagCheckbox.svelte"
	import Input from "$formElements/input.svelte"
	import Select from "$formElements/select.svelte"
	
	import Button from "$components/elements/button.svelte"
	
	import mouseOverTexts from "$lib/mouseOverTexts"
	import { attributeMapping, offerMapping, typeMapping } from "$lib/entryMappings"
	import { getEntries } from "$lib/utils"
	import { isMobile } from "$lib/store"
	import config from "$lib/config"
	
	import { browser } from "$app/env"
	import { page } from "$app/stores"
	
	let scrollY = 0;
	let expand = true;
	
	let location = null;
	let selectedType = "";
	let selectedOffers = [];
	let selectedAttributes = [];
	let textFilter = "";
	
	function toggleExpand() { expand = !expand }
	
	// change counter
	let changeId = 0;
	
	// Automatic filter change handler
	// Applies filters after a short delay, so that the changes don't stack
	function filtersUpdated() {
		// mobile changes are applied manually to save data
		if ($isMobile) {
			console.log("mobile")
			return;
		}
		
		if (!browser) {
			applyFilters();
		} else {
			console.log(config.client.filterApplyTimeout);
			
			changeId += 1;
			let thisChange = changeId;
			
			setTimeout(() => {
				// if another change occured since the timer was started, do nothing
				if (changeId === thisChange) {
					applyFilters();
				}
			}, config.client.filterApplyTimeout)
		}
	}
	
	function applyFilters() {
		//TODO: implement api call, remove this test
		console.log("Filter Applied");
		console.log(" type: " + selectedType);
		console.log(" offers: " + selectedOffers);
		console.log(" attributes: " + selectedAttributes);
		console.log(" string: " + textFilter)
	}
	
	$: {
		// apply filters when apply button dissapears on desktop
		if (!isMobile) {
			applyFilters()
		}
	}
	
	let hasMeta = false;
	$: hasMeta = offerMapping[selectedType] || attributeMapping[selectedType];
</script>

<svelte:window bind:scrollY={ scrollY }></svelte:window>

<div class="search-filter" style="--window-scroll-y: { scrollY }">
	<div class="bar mobile" class:expand on:click={ toggleExpand }>
		<ChevronRightIcon class="chevron" size="24px" />
		
		<span class="title"> Spezifische Filter </span>
	</div>
	
	<div class="filter" class:expand>
		{#if location}
			<p class="sub-title"> Standort </p>
			
			<p class="location" title={ mouseOverTexts[location] }>
				<MapPinIcon />
				<span> { location } </span>
			</p>
		{/if}
		
		<p class="sub-title"> Kategorien </p>
		
		<Select class="mobile" bind:value={ selectedType }>
			{#each Object.entries(typeMapping) as [key, value]}
				<option name="type"
				        value={ key }
				        title={ mouseOverTexts[key] }>
					{ value }
				</option>
			{/each}
		</Select>
		
		<fieldset class="desktop radio-buttons" on:input={ filtersUpdated }>
			{#each Object.entries(typeMapping) as [key, value]}
				<RadioButton name="type"
				             bind:group={ selectedType }
				             value={ key }
				             title={ mouseOverTexts[key] }>
					{ value }
				</RadioButton>
			{/each}
		</fieldset>
		
		{#if hasMeta}
			<p class="sub-title"> Angebote </p>
			
			<fieldset class="tags" on:input={ filtersUpdated }>
				{#each getEntries(offerMapping[selectedType]) as [key, value]}
					<TagCheckbox name="offers"
					             bind:group={ selectedOffers }
					             value={ key }
					             title={ mouseOverTexts[key] }>
						{ value }
					</TagCheckbox>
				{/each}
				
				{#each getEntries(attributeMapping[selectedType]) as [key, value]}
					<TagCheckbox name="attributes"
					             bind:group={ selectedAttributes }
					             value={ key }
					             title={ mouseOverTexts[key] }>
						{ value }
					</TagCheckbox>
				{/each}
			</fieldset>
		{/if}
		
		<p class="sub-title"> Textsuche </p>
		
		<div class="text-filter">
			<Input type="text"
			       bind:value={ textFilter }
			       on:change={ filtersUpdated }
			       placeholder="Suche Namen oder Personen"
			       class="text-input { textFilter ? "has-text" : "" }"/>
			
			<Button light
			        iconOnly
			        on:click={ applyFilters }
			        title={ mouseOverTexts.filter }
			        class="search-button { textFilter ? "" : "collapsed"}">
				
				<SearchIcon />
			</Button>
		</div>
		
		<Button class="mobile filter-button"
		        on:click={ applyFilters }
		        title={ mouseOverTexts.filter }>
			Filtern
		</Button>
		
	</div>
</div>

<style lang="scss">
	@import "../../scss/mixins";
	@import "../../scss/lengths";
	
	.search-filter {
		width: min(300px, 30vw);
		min-width: min-content;
		display: flex;
		flex-direction: column;
		height: auto;
		
		align-self: start;
		position: sticky;
		justify-self: end;
		
		@include media-mobile {
			width: 100%;
			min-width: 0;
			position: relative;
			top: 0;
			justify-self: stretch;
		}
		
		:global(.mobile) {
			@include media-min-width($mobile-width) {
				display: none !important;
			}
		}
		
		:global(.desktop) {
			@include media-mobile {
				display: none !important;
			}
		}
		
		:global(.filter-button) {
			min-width: max-content;
			width: 100%;
			align-self: center;
		}
		
		.title {
			font-weight: 700;
			font-size: 0.9em;
		}
	}
	
	.bar {
		display: flex;
		align-items: flex-start;
		cursor: pointer;
		user-select: none;
		font-family: "Poppins", sans-serif;
		
		:global(.chevron) {
			transition: 0.2s ease transform;
			margin-right: 5px;
		}
		
		&.expand :global(.chevron) {
			transform: rotate(90deg);
		}
	}
	
	.filter {
		display: flex;
		flex-direction: column;
		
		@include media-mobile {
			transition: 0.2s ease all;
			
			&:not(.expand) {
				opacity: 0;
				
				animation: collapse-filters;
				animation-fill-mode: forwards;
				animation-delay: 0.2s;
				
				@keyframes collapse-filters {
					0% {
						height: auto;
					}
					100% {
						height: 0;
					}
				}
			}
		}
		
		.sub-title {
			font-weight: 500;
			font-family: 'Poppins', sans-serif;
			margin: 10px 0 10px 0;
			font-size: 1.1em;
		}
		
		.location{
			:global(.lucide) {
				color: var(--color-edge-highlight);
				stroke-width: 2.5px;
			}
		}
		
		.tags {
			display: flex;
			flex-wrap: wrap;
			justify-content: flex-start;
		}
		
		fieldset {
			margin: 0 0 10px 0;
			padding: 0;
			border: 0;
		}
		
		.text-filter {
			position: relative;
			height: min-content;
			overflow: hidden;
			
			:global(label) {
				margin-bottom: 0;
			}
			
			@include media-mobile {
				margin-bottom: 20px;
			}
			
			:global(.search-button) {
				position: absolute;
				top: 6px;
				right: 6px;
				padding: 5.5px;
				transition: opacity 0.2s ease, right 0.2s ease;
			}
			
			:global(.search-button.collapsed) {
				opacity: 0;
				right: -32px;
				pointer-events: none;
			}
			
			:global(.text-input.has-text) {
				padding-right: 42px;
			}
		}
	}
</style>
