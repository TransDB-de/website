<script lang="ts">
	import Button from "$components/button.svelte"
	import mouseOverTexts from "$lib/mouseOverTexts"
	import { MapPinIcon, SearchIcon } from "svelte-feather-icons"
	import { createEventDispatcher } from "svelte"
	import { isMobile } from "$lib/store"
	
	let dispatch = createEventDispatcher();
	
	export let hide = false;
	let locationText = "";
	
	$: textSearch = locationText.trim().length > 0
	
	function keydown(event: KeyboardEvent) {
		if (event.code === "Enter") search();
	}
	
	function search() {
		
	}
	
	function distanceSearch() {
		navigator.geolocation.getCurrentPosition((pos) => {
			dispatch("search", { lat: pos.coords.latitude, long: pos.coords.longitude })
		}, (error) => {
			this.resetLocaction();
		});
	}
</script>

<div class="search-bar" class:hide class:textSearch>
	
	<input type=text
	       title={mouseOverTexts.locationSearch}
	       placeholder={$isMobile ? "Suche nach Postleitzahl oder Ort" : "Suche nach PLZ oder Ort"}
	       on:keydown={keydown}
	       bind:value={locationText}
	/>
	


	<Button light
	        noShadow 
	        on:click={distanceSearch}
	        title={mouseOverTexts.proximitySearch}
	        class="proximity-button">
			
		<MapPinIcon />
		<span class="hide-on-mobile">Umgebungssuche</span>
	</Button>
	
	<Button light
	        noShadow
	        iconOnly
	        on:click={search}
	        title={mouseOverTexts.locationSearchButton}
	        class="search-button {textSearch ? "" : "collapsed"}">
		
		<SearchIcon />
	</Button>
	
</div>