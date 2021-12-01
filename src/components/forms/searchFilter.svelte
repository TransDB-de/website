<script lang="ts">
	import ChevronRightIcon from "lucide-icons-svelte/chevronRight.svelte"
	import MapPinIcon from "lucide-icons-svelte/mapPin.svelte"
	
	import RadioButton from "$formElements/radioButton.svelte"
	import CheckboxButton from "$formElements/checkboxButton.svelte"
	
	import mouseOverTexts from "$lib/mouseOverTexts"
	import { attributeMapping, offerMapping, typeMapping } from "$lib/entryMappings"
	
	let scrollY = 0;
	let expand = false;
	
	let location = null;
	let selectedType = "any";
	
	function toggleExpand() { expand = !expand }
	
	function filtersUpdated() {}
</script>

<svelte:window bind:scrollY={ scrollY }></svelte:window>

<div class="search-filter" class:expand style="--window-scroll-y: { scrollY }">
	<div class="bar" on:click={ toggleExpand }>
		<span>
			<ChevronRightIcon />
		</span>
		
		<h1> Spezifische Filter </h1>
	</div>
	
	<div class="filter">
		{#if location}
			<h2> Standort </h2>
			
			<p class="location" title={ mouseOverTexts[location] }>
				<MapPinIcon />
				<span> { location } </span>
			</p>
		{/if}
		
		<h2> Kategorien </h2>
		
		<select class="mobile" on:click={ filtersUpdated }>
			{#each Object.entries(typeMapping) as [key, value]}
				<option value={ key } title={ mouseOverTexts[key] }> { value } </option>
			{/each}
		</select>
		
		<fieldset class="desktop radio-buttons" on:click={ filtersUpdated }>
			{#each Object.entries(typeMapping) as [key, value]}
				<RadioButton value={ key } title={ mouseOverTexts[key] }> { value } </RadioButton>
			{/each}
		</fieldset>
		
		<h2> Textsuche </h2>
		
		<input type="text"
		       placeholder="Suche Namen oder Personen"/>
		
		{#if offerMapping[selectedType] || attributeMapping[selectedType]}
			<h2> Angebote </h2>
			
			<fieldset class="offers" on:click={ filtersUpdated }>
				{#each Object.entries(offerMapping[selectedType]) as [key, value]}
					<CheckboxButton>
						{ value }
					</CheckboxButton>
				{/each}
				
				{#each Object.entries(attributeMapping[selectedType]) as [key, value]}
					<CheckboxButton>
						{ value }
					</CheckboxButton>
				{/each}
			</fieldset>
		{/if}
		
	</div>
</div>

<style lang="scss">
	@import "../../scss/mixins";
	
	.mobile {
		visibility: hidden;
		
		@include media-mobile {
			visibility: inherit;
		}
	}
	
	.desktop {
		visibility: inherit;
		
		@include media-mobile {
			visibility: hidden;
		}
	}
</style>
