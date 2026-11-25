<script lang="ts">
	import Loader from "$components/elements/loader.svelte";
	import EntryComponent from "$components/entry/entry.svelte";
	import { popupError } from "$components/popup.svelte";
	import { apiRequestHandler } from "$lib/apiRequestHandler";
	import { t } from "$lib/localization.svelte";
	import type { Entry } from "$models/entry.model";
	import axios from "axios";
	import { onMount } from "svelte";

	const props: { id: string; loaded: (entry: Entry) => void } = $props();

	let entry: Entry | null = $state(null);

	onMount(async () => {
		const result = await apiRequestHandler(
			axios.get<Entry>("/entries/" + props.id, { captcha: true })
		);

		result.handleErrors({
			404: () => popupError(t("errors.entryNotFound")),
			default: () => popupError(`${t("errors.unknown")}`)
		});

		if (result.success && result.data) {
			entry = result.data;
			props.loaded(entry);
			return;
		}
	});
</script>

{#if entry}
	<EntryComponent {entry} />
{:else}
	<Loader class="single-entry-view-loader" dark big />
{/if}

<style lang="scss">
	:global(.single-entry-view-loader) {
		align-self: center;
		margin-top: 2em;
	}
</style>
