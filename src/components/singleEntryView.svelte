<script lang="ts">
	import type { Entry } from "$models/entry.model"
	import { onMount } from "svelte"
	import axios from "axios";
	import { popupError } from "$components/popup.svelte"
	import EntryComponent from "$components/entry/entry.svelte"
	import Button from "$components/elements/button.svelte"
	import mouseOverTexts from "$lib/mouseOverTexts"
	import Loader from "$components/elements/loader.svelte";
	import { goto } from "$app/navigation"
	
	export let id: string;
	let entry: Entry = null
	
	onMount(async () => {
		try {
			let res = await axios.get<Entry>("/entries/" + id);
			entry = res.data;
		} catch (e) {
			switch(e.response.status) {
				case 404: {
					popupError("Eintrag nicht gefunden");
					break;
				}
				default: {
					popupError(`Unbekannter Fehler (${e.response.status})`)
					break;
				}	
			}
		}
	});
	
	function click() {
		if (entry) {
			goto("/search?location=" + entry.address.city);
		} else {
			goto("/search")
		}
	}
</script>

{#if entry}
	<h1>
		<span> { entry.name } </span>
		<span> - aus { entry.address.city } </span>
	</h1>
	
	<EntryComponent entry={ entry } />
	
	<Button on:click={ click } title={ mouseOverTexts["searchNearbyButton"] }>
		Mehr Angebote in dieser Gegend
	</Button>
	
{:else}
	<Loader dark big />
{/if}
<style lang="scss">
	h1 {
		span {
			display: inline-block;
		}
	}
	
	:global(.entry) {
		margin-bottom: 20px;
	}
	
	:global(button) {
		align-self: center;
	}
</style>