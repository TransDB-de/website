<script lang="ts">
	import { onDestroy } from "svelte"
	
	import Button from "$components/elements/button.svelte"
	import mouseOverTexts from "$lib/mouseOverTexts"
	
	import SearchIcon from "lucide-icons-svelte/search.svelte"
	import MapPinIcon from "lucide-icons-svelte/mapPin.svelte"

	import { isMobile, currentLocation } from "$lib/store"
	import { page, navigating } from "$app/stores"
	import { goto } from "$app/navigation"
	
	import { isKey, getGeoLocation } from "$lib/utils"
	
	export let hide = false;
	let locationText = $page.url.searchParams.get("location") ?? "";
	
	$: isTextSearch = locationText.trim().length > 0
	
	// React on navigating. Delete locationText if query is empty (resetted by user)
	const unsubscribeNav = navigating.subscribe((nav) => {
		if (!nav) return;
		
		if (nav.to.searchParams.has("location")) {
			locationText = nav.to.searchParams.get("location");
		}
		
		if (locationText && !nav.to.searchParams.has("location")) {
			locationText = "";
		}
	});
	
	onDestroy( unsubscribeNav );
	
	function resetLocaction() {
		if ($page.url.pathname.includes("search")) {
			$page.url.searchParams.delete("location");
			$page.url.searchParams.delete("lat");
			$page.url.searchParams.delete("long");
		}
		
		if ( $page.url.searchParams.toString() ) {
			goto("/search?" + $page.url.searchParams.toString());
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
				
				$page.url.searchParams.set("location", locationText);
				$page.url.searchParams.delete("lat");
				$page.url.searchParams.delete("long");
				break;
			}
			case "distance": {
				
				try {
					let pos = await getGeoLocation();
					$page.url.searchParams.set("lat", pos.coords.latitude.toString());
					$page.url.searchParams.set("long", pos.coords.longitude.toString());
					$page.url.searchParams.delete("location");
					locationText = "";
				} catch(e) {
					console.log(e);
					resetLocaction();
					return;
				}
				break;
			}
		}
		
		await goto("/search?" + $page.url.searchParams.toString(), { keepfocus: true });
	}
</script>

<div class="search-bar" class:hide class:isTextSearch {...$$props}>
	
	<input type=text
	       title={ mouseOverTexts.locationSearch }
	       placeholder={ $isMobile ? "Suche nach PLZ oder Ort" : "Suche nach Postleitzahl oder Ort" }
	       on:keydown={ isKey("Enter", () => search("text")) }
	       bind:value={ locationText }
	/>
	
	<Button light
	        on:click={ () => search("distance") }
	        title={ mouseOverTexts.proximitySearch }
	        class="proximity-button">
		
		<MapPinIcon />
		<span class="hide-on-mobile">Umgebungssuche</span>
	</Button>
	
	<Button light
	        iconOnly
	        on:click={ () => search("text") }
	        title={ mouseOverTexts.locationSearchButton }
	        class="search-button {isTextSearch ? "" : "collapsed"}">
		
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
		
		:global(.collapsed) {
			opacity: 0;
		}
		
		:global(.proximity-button) {
			transition: 0.4s background-color;
		}
		
		@include media-mobile {
			:global(.proximity-button .lucide) {
				margin: 0;
			}
			
			:global(.proximity-button) {
				padding: 7.5px;
			}
		}
		
		:global .search-button:not(.light) {
			height: 35px;
		}
	}
	
	.isTextSearch {
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
