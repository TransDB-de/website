<script lang="ts">
	import axios from "axios";
	import type { AxiosResponse } from "axios";

	import { onMount, onDestroy } from "svelte";
	import { fade } from "svelte/transition";
	import { flip } from "svelte/animate";
	import { page } from "$app/stores";
	import { browser } from "$app/environment";

	import { currentLocation } from "$lib/store";
	import { removeFromArray } from "$lib/utils";
	import type { EntriesResponse, Entry } from "$models/entry.model";

	import EntryComponent from "$components/entry/entry.svelte";
	import LoadMore from "$components/elements/loadMore.svelte";
	import { popupError } from "$components/popup.svelte";
	import { t } from "$lib/localization.svelte";
	import { apiRequestHandler } from "$lib/apiRequestHandler";
	import { afterNavigate } from "$app/navigation";

	interface Props {
		type?: "public" | "manage";
	}

	let { type = "public" }: Props = $props();

	let entries: Entry[] = $state([]);

	function fetchEntries(url: URL, pageCount = 0) {
		const params = Object.fromEntries<unknown>(url.searchParams.entries());
		params.page = pageCount;

		if (type === "manage") {
			return axios.get<EntriesResponse>("manage/entries", { params });
		}

		return axios.get<EntriesResponse>("entries", { params });
	}

	let more: boolean = $state(true);
	let pageCount: number = $state(0);
	let loading: boolean = $state(true);

	onMount(() => {
		loadInitialEntries($page.url);
	});

	// React on navigating eg. route and query changes to reload the entries with new filters
	afterNavigate((nav) => {
		if (nav && nav.to && nav.to?.url.search != nav.from?.url.search) {
			loadInitialEntries(nav.to.url);
		}
	});

	onDestroy(() => {
		$currentLocation = "";
	});

	async function loadInitialEntries(url: URL) {
		if (!browser) return;

		loading = true;

		const result = await apiRequestHandler(fetchEntries(url));

		result.handleErrors({
			default: (status) => popupError(`${t("errors.failedToLoad")} (${status})`)
		});

		loading = false;

		if (result.success && result.data) {
			entries = result.data.entries;
			$currentLocation = result.data.locationName ?? "";
			more = result.data.more;
			pageCount = 0;
		}
	}

	async function loadNextPage() {
		if (!more) return;
		loading = true;

		let params = Object.fromEntries<string | number>($page.url.searchParams.entries());
		params.page = pageCount + 1;

		const result = await apiRequestHandler(fetchEntries($page.url, params.page));

		loading = false;

		if (result.success && result.data) {
			entries = [...entries, ...result.data.entries];
			more = result.data.more;
			pageCount = params.page as number;
		}

		if (result.handleErrors) {
			result.handleErrors({
				422: () => popupError(t("errors.invalidFilter")),
				default: (status) => popupError(`${t("errors.failedToLoad")} (${status})`)
			});
		}
	}

	function removeEntry(entry: Entry) {
		entries = removeFromArray(entries, entry);
	}
</script>

<div class="entries-collection">
	{#each entries as entry (entry.id)}
		<div animate:flip={{ duration: 400 }} transition:fade={{ duration: 200 }}>
			<EntryComponent {entry} onremove={removeEntry} manage={type === "manage"} />
		</div>
	{/each}

	{#if more}
		<LoadMore onclick={loadNextPage} {loading} />
	{/if}

	{#if entries.length < 1 && !loading}
		<h3>Keine passenden Einträge gefunden</h3>
	{/if}
</div>

<style lang="scss">
	div.entries-collection {
		display: flex;
		flex-direction: column;
		gap: 20px;

		h3 {
			text-align: center;
		}
	}
</style>
