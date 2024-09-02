<script lang="ts">
	import type { Entry } from "$models/entry.model";
	import { onMount } from "svelte";
	import axios from "axios";
	import { popupError } from "$components/popup.svelte";
	import EntryComponent from "$components/entry/entry.svelte";
	import Button from "$components/elements/button.svelte";
	import { t } from "$lib/localization";
	import Loader from "$components/elements/loader.svelte";
	import { goto } from "$app/navigation";

	export let id: string;
	let entry: Entry = null;

	onMount(async () => {
		try {
			let res = await axios.get<Entry>("/entries/" + id);
			entry = res.data;
		} catch (e) {
			switch (e.response.status) {
				case 404: {
					popupError(t("errors.entryNotFound"));
					break;
				}
				default: {
					popupError(`${t("errors.unknown")} (${e.response.status})`);
					break;
				}
			}
		}
	});

	function click() {
		if (entry) {
			goto("/search?location=" + entry.address.city);
		} else {
			goto("/search");
		}
	}
</script>

{#if entry}
	<h1>
		<span> {entry.name} </span>
		<span> - aus {entry.address.city} </span>
	</h1>

	<EntryComponent {entry} />

	<Button
		class="single-entry-view-button"
		on:click={click}
		title={t("mouseOverTexts.searchNearbyButton")}
	>
		Mehr Angebote in dieser Gegend
	</Button>
{:else}
	<Loader class="single-entry-view-loader" dark big />
{/if}

<style lang="scss">
	@import "../scss/lengths";
	@import "../scss/mixins";

	:global(.single-entry-view-loader) {
		align-self: center;
		margin-top: 2em;
	}

	:global(button.single-entry-view-button) {
		align-self: center;
		margin-top: 20px;
	}
</style>
