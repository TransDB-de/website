<script lang="ts">
	import type { Entry } from "$models/entry.model";
	import { onMount } from "svelte";
	import axios from "axios";
	import { popupError } from "$components/popup.svelte";
	import EntryComponent from "$components/entry/entry.svelte";
	import Button from "$components/elements/button.svelte";
	import { t } from "$lib/localization.svelte";
	import Loader from "$components/elements/loader.svelte";
	import { goto } from "$app/navigation";
	import { apiRequestHandler } from "$lib/apiRequestHandler";

	interface Props {
		id: string;
	}

	const props: Props = $props();

	let entry: Entry | null = $state(null);

	onMount(async () => {
		const result = await apiRequestHandler(axios.get<Entry>("/entries/" + props.id));

		result.handleErrors({
			404: () => popupError(t("errors.entryNotFound")),
			default: () => popupError(`${t("errors.unknown")}`)
		});

		if (result.success && result.data) {
			entry = result.data;
			return;
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
		<span> - {t("entry.from")} {entry.address.city} </span>
	</h1>

	<EntryComponent {entry} />

	<Button
		class="single-entry-view-button"
		onclick={click}
		title={t("mouseOverTexts.searchNearbyButton")}
	>
		{t("entry.nearbyOffers")}
	</Button>
{:else}
	<Loader class="single-entry-view-loader" dark big />
{/if}

<style lang="scss">
	@use "../scss/lengths" as *;
	@use "../scss/mixins" as *;

	:global(.single-entry-view-loader) {
		align-self: center;
		margin-top: 2em;
	}

	:global(button.single-entry-view-button) {
		align-self: center;
		margin-top: 20px;
	}
</style>
