<script lang="ts">
	import Button from "$components/button.svelte"
	import mouseOverTexts from "$lib/mouseOverTexts"
	
	import SearchIcon from "lucide-icons-svelte/search.svelte"
	import MapPinIcon from "lucide-icons-svelte/mapPin.svelte"

	import { isMobile } from "$lib/store"
	import { page } from "$app/stores"
	import { goto } from "$app/navigation"
	
	import { isKey, getGeoLocation } from "$lib/utils"
	
	export let hide = false;
	let locationText = $page.query.has("location") ? $page.query.get("location") : "";
	
	$: textSearch = locationText.trim().length > 0
	
	function resetLocaction() {
		if ($page.path.includes("search")) {
			$page.query.delete("location");
			$page.query.delete("lat");
			$page.query.delete("long");
		}
		
		if ($page.query.keys().length > 0) {
			goto("/search?" + $page.query.toString());
		} else {
			goto("/search");
		}
		
	}
	
	async function search(type) {
		switch(type) {
			case "text": {
				if (locationText.length < 2) {
					resetLocaction();
					return;
				}
				
				$page.query.set("location", locationText);
				break;
			}
			case "distance": {
				
				try {
					let pos = await getGeoLocation();
					$page.query.set("lat", pos.coords.latitude);
					$page.query.set("long",pos.coords.longitude);
				} catch(e) {
					console.log(e);
					resetLocaction();
					return;
				}
				break;
			}
		}

		goto("/search?" + $page.query.toString())
	}
</script>

<div class="search-bar" class:hide class:textSearch>
	
	<input type=text
	       title={ mouseOverTexts.locationSearch }
	       placeholder={ $isMobile ? "Suche nach Postleitzahl oder Ort" : "Suche nach PLZ oder Ort" }
	       on:keydown={ isKey("Enter", () => search("text")) }
	       bind:value={ locationText }
	/>
	


	<Button light
	        noShadow 
	        on:click={ () => search("distance") }
	        title={ mouseOverTexts.proximitySearch }
	        class="proximity-button">
			
		<MapPinIcon />
		<span class="hide-on-mobile">Umgebungssuche</span>
	</Button>
	
	<Button light
	        noShadow
	        iconOnly
	        on:click={ () => search("text") }
	        title={ mouseOverTexts.locationSearchButton }
	        class="search-button {textSearch ? "" : "collapsed"}">
		
		<SearchIcon />
	</Button>
	
</div>

<style lang="scss">
	@import "../scss/shadows";
	@import "../scss/mixins";
	
	* {
		--button-icononly-width: 38px;
	}
	
	.search-bar {
		background-color: var(--color-background-bright);
		border-radius: 4px;
		padding: 5px;
		display: grid;
		width: calc(100% - 80px);
		max-width: 560px;
		min-width: min(240px, 100vw);
		overflow: hidden;
		box-shadow: $rim-shadow-soft;
		grid-template-columns: 1fr auto 0;
		transition: 0.4s ease grid-template-columns;
		
		input {
			background-color: transparent;
			border: 0;
			margin: 0;
			font-size: 18px;
			outline: 0;
			padding: 0 0 0 10px;
			min-width: 0;
			font-family: 'Poppins', sans-serif;
			color: var(--color-edge);
		}
		
		input::placeholder {
			color: var(--color-edge-dimmed);
			font-weight: 500;
		}
		
		:global(button) {
			transition: 0.2s ease all;
			width: fit-content;
		}
		
		:global button:not(.collapsed) {
			margin-left: 4px;
		}

		:global .collapsed {
			opacity: 0;
		}
		
		:global .proximity-button {
			transition: 0.4s background-color;
		}
		
		:global .search-button:not(.light) {
			height: 35px;
		}
	}
	
	.textSearch {
		grid-template-columns: 1fr auto calc(var(--button-icononly-width) + 4px);
		
		:global button.proximity-button {
			background-color: transparent;
		}
	}
	
	@include media-mobile {
		.hide-on-mobile {
			display: none;
		}

		.search-bar {
			max-width: 400px;
		}
	}
</style>
