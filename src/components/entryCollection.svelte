<script lang="ts">
	import axios from "axios";
	import type { AxiosResponse } from "axios";

	import { onMount, onDestroy, untrack } from "svelte";
	import { fade } from "svelte/transition";
	import { flip } from "svelte/animate";
	import { page, navigating } from "$app/stores";
	import { browser } from "$app/environment";

	import { currentLocation } from "$lib/store";
	import { filters } from "$lib/filterLang.client";
	import { removeFromArray, timeout } from "$lib/utils";
	import type { EntriesResponse, Entry } from "$models/entry.model";

	import EntryComponent from "$components/entry/entry.svelte";
	import EditableEntry from "$components/database/editableEntry.svelte";
	import LoadMore from "$components/elements/loadMore.svelte";
	import { popupError } from "$components/popup.svelte";
	import { t } from "$lib/localization";

	interface Props {
		type?: "search" | "unapproved" | "database" | "blocklist";
	}

	let { type: collectionType }: Props = $props();

	let entries: Entry[] = $state([]);

	// how and where to fetch data — type prop is fixed at construction time, read once
	let fetchFunction: (url: URL, pageCount?: number) => Promise<AxiosResponse<EntriesResponse>>;

	untrack(() => {
	switch (collectionType ?? "search") {
		case "search": {
			fetchFunction = async (url, pageCount = 0) => {
				let params = Object.fromEntries<string | number>(url.searchParams.entries());
				params.page = pageCount;
				return await axios.get<EntriesResponse>("entries", { params });
			};
			break;
		}

		case "unapproved": {
			fetchFunction = async (url, pageCount = 0) => {
				let params = Object.fromEntries<string | number>(url.searchParams.entries());
				params.page = pageCount;
				return await axios.get<EntriesResponse>("entries/unapproved", { params });
			};
			break;
		}

		case "database": {
			fetchFunction = async (_url, pageCount = 0) => {
				return axios.post<EntriesResponse>("entries/full", {
					page: pageCount,
					filter: filters.filters
				});
			};
			break;
		}

		case "blocklist": {
			fetchFunction = async (_url, pageCount = 0) => {
				let _filters = { ...$filters };

				if (!("boolTrue" in _filters)) {
					_filters["boolTrue"] = [];
				}

				(_filters["boolTrue"] as string[]).push("blocked");

				return axios.post<EntriesResponse>("entries/full", {
					page: pageCount,
					filter: _filters
				});
			};
			break;
		}

		default: {
			console.error(`No such type for EntryCollection: "${collectionType}"`);
		}
	}
	});

	let more: boolean = $state(true);
	let pageCount: number = $state(0);
	let loading: boolean = $state(true);

	onMount(() => {
		loadInitialEntries($page.url);
	});

	let unsubscribeFilters = filters.subscribe((fil) => {
		loadInitialEntries($page.url);
	});

	// React on navigating eg. route and query changes to reload the entries with new filters
	const unsubscribeNav = navigating.subscribe((nav) => {
		if (nav && nav.to?.url.pathname === "/search" && nav.from?.url.pathname === "/search") {
			loadInitialEntries(nav.to.url);
		}
	});

	onDestroy(() => {
		$currentLocation = "";
		unsubscribeNav();
		unsubscribeFilters();
	});

	async function loadInitialEntries(url: URL) {
		if (!browser) return;

		let res: AxiosResponse<EntriesResponse>;
		loading = true;

		try {
			res = await fetchFunction(url);
		} catch (e: any) {
			if (e.response) {
				popupError(`${t("errors.failedToLoad")} (${e.response.status})`);
			} else {
				popupError(t("errors.unknown"));
				console.error(e);
			}

			loading = false;
			return;
		}

		entries = res.data.entries;
		$currentLocation = res.data.locationName ?? "";
		more = res.data.more;

		loading = false;
		pageCount = 0;
	}

	async function loadNextPage() {
		if (!more) return;
		loading = true;

		let params = Object.fromEntries<string | number>($page.url.searchParams.entries());
		params.page = pageCount + 1;

		let res: AxiosResponse<EntriesResponse>;

		try {
			res = await fetchFunction($page.url, params.page as number);
		} catch (e: any) {
			if (!e.response) {
				popupError(t("errors.unknown"));
				loading = false;
				return;
			}
			switch (e.response.status) {
				case 422: {
					popupError(t("errors.invalidFilter"));
					break;
				}

				default: {
					popupError(`${t("errors.failedToLoad")} (${e.response.status})`);
					break;
				}
			}
			loading = false;
			return;
		}

		entries = [...entries, ...res.data.entries];
		more = res.data.more;
		pageCount = params.page as number;

		loading = false;
	}

	function removeEntry(entry: Entry) {
		entries = removeFromArray(entries, entry);
	}
</script>

<div class="entries-collection">
	{#each entries as entry (entry._id)}
		<div animate:flip={{ duration: 400 }} transition:fade={{ duration: 200 }}>
			{#if collectionType === "database"}
				<EditableEntry {entry} onremove={removeEntry} />
			{:else}
				<EntryComponent {entry} onremove={removeEntry} />
			{/if}
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
