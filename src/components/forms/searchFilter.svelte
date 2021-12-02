<script lang="ts">
	import ChevronRightIcon from "lucide-icons-svelte/chevronRight.svelte"
	import MapPinIcon from "lucide-icons-svelte/mapPin.svelte"
	
	import RadioButton from "$formElements/radioButton.svelte"
	import TagCheckbox from "$formElements/tagCheckbox.svelte"
	import Input from "$formElements/input.svelte"
	
	import mouseOverTexts from "$lib/mouseOverTexts"
	import { attributeMapping, offerMapping, typeMapping } from "$lib/entryMappings"
	import { getEntries } from "$lib/utils"
	
	let scrollY = 0;
	let expand = false;
	
	let location = null;
	let selectedType = "";
	let selectedOffers = [];
	let selectedAttributes = [];
	let filterString = "";
	
	let hasMeta = false;
	
	function toggleExpand() { expand = !expand }
	
	function filtersUpdated() {}
	
	$: hasMeta = offerMapping[selectedType] || attributeMapping[selectedType];
</script>

<svelte:window bind:scrollY={ scrollY }></svelte:window>

<div class="search-filter" class:expand style="--window-scroll-y: { scrollY }">
	<div class="bar" on:click={ toggleExpand }>
		<span>
			<ChevronRightIcon class="chevron" size="21px" />
		</span>
		
		<span class="title"> Spezifische Filter </span>
	</div>
	
	<div class="filter" class:expand>
		{#if location}
			<span class="sub-title"> Standort </span>
			
			<p class="location" title={ mouseOverTexts[location] }>
				<MapPinIcon />
				<span> { location } </span>
			</p>
		{/if}
		
		<span class="sub-title"> Kategorien </span>
		
		<select class="mobile" on:click={ filtersUpdated } bind:value={ selectedType }>
			{#each Object.entries(typeMapping) as [key, value]}
				<option name="type"
				        value={ key }
				        title={ mouseOverTexts[key] }>
					{ value }
				</option>
			{/each}
		</select>
		
		<fieldset class="desktop radio-buttons" on:click={ filtersUpdated }>
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
			<span class="sub-title"> Angebote </span>
			
			<fieldset class="tags" on:click={ filtersUpdated }>
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
		
		<span class="sub-title"> Textsuche </span>
		
		<Input type="text"
		       bind:value={ filterString }
		       placeholder="Suche Namen oder Personen"/>
		
	</div>
</div>

<style lang="scss">
	@import "../../scss/mixins";
	
	.mobile {
		display: none;
		
		@include media-mobile {
			display: unset;
		}
	}
	
	.desktop {
		@include media-mobile {
			display: none;
		}
	}
	
	.title {
		font-weight: 700;
		font-size: 0.9em;
	}
	
	.sub-title {
		font-weight: 500;
		font-family: 'Poppins', sans-serif;
		margin: 10px 0 10px 0;
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
	
	.search-filter {
		padding: 16px 0;
		width: min(320px, 30vw);
		min-width: min-content;
		display: flex;
		flex-direction: column;
		height: auto;
		align-self: start;
		position: sticky;
		justify-self: end;
	}
	
	.bar {
		display: flex;
		cursor: pointer;
		user-select: none;
		font-family: "Poppins", sans-serif;
	}
	
	.filter {
		
		@include media-mobile {
			opacity: 0;
			transition: 0.2s ease all;
			
			&:not(.expand) {
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
	}
	
	.location{
		:global(.lucide) {
			color: var(--color-edge-highlight);
			stroke-width: 2.5px;
		}
	}
</style>
