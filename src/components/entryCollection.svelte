<script lang="ts">
	import axios from "axios"
	import type { AxiosResponse } from "axios"
	
	import { onMount, onDestroy, tick } from "svelte"
	import { fade } from "svelte/transition"
	import { flip } from "svelte/animate"
	import { page, navigating } from "$app/stores"
	import { browser } from "$app/env"
	
	import { currentLocation } from "$lib/store"
	import { filters } from "$lib/filterLang.client"
	import { removeFromArray, timeout } from "$lib/utils"
	import type { EntriesResponse, Entry } from "$models/entry.model"
	
	import EntryComponent from "$components/entry/entry.svelte"
	import EditableEntry from "$components/database/editableEntry.svelte"
	import LoadMore from "$components/elements/loadMore.svelte"
	import { popupError } from "$components/popup.svelte"
	
	/** Type of EntryCollection */
	export let type: "search" | "unapproved" | "database" | "blocklist" = "search";
	
	let entries: Entry[] = [];
	
	// component to render for "entries"
	let entryComponent;
	// how and where to fetch data
	let fetchFunction: (url: URL, pageCount?: number) => Promise< AxiosResponse<EntriesResponse> >;
	
	switch (type) {
		case "search": {
			entryComponent = EntryComponent;
			fetchFunction = async (url, pageCount = 0) => {
				let params = Object.fromEntries<string | number>(url.searchParams.entries());
				params.page = pageCount;
				return await axios.get<EntriesResponse>("entries", { params });
			}
			break;
		}
		
		case "unapproved": {
			entryComponent = EntryComponent;
			fetchFunction = async (url, pageCount = 0) => {
				let params = Object.fromEntries<string | number>(url.searchParams.entries());
				params.page = pageCount;
				return await axios.get<EntriesResponse>("entries/unapproved", { params });
			}
			break;
		}
		
		case "database": {
			entryComponent = EditableEntry;
			fetchFunction = async (_url, pageCount = 0) => {
				return axios.post<EntriesResponse>("entries/full", {
					page: pageCount,
					filter: filters.filters
				});
			}
			break;
		}
		
		case "blocklist": {
			entryComponent = EntryComponent;
			
			fetchFunction = async (_url, pageCount = 0) => {
				let _filters = filters.filters;
				
				if (!("boolTrue" in _filters)) {
					_filters["boolTrue"] = [];
				}
				
				_filters["boolTrue"].push("blocked");
				
				return axios.post<EntriesResponse>("entries/full", {
					page: pageCount,
					filter: _filters
				});
			}
			break;
		}
		
		default: {
			console.error(`No such type for EntryCollection: "${type}"`);
		}
	}
	
	let more: boolean = true;
	let pageCount: number = 0;
	let loading: boolean = true;
	
	onMount(() => {
		loadInitalEntries($page.url);
	});
	
	let unsubscribeFilters = filters.subscribe((fil) => {
		loadInitalEntries($page.url);
	});
	
	// React on navigating eg. route and query changes to reload the entries with new filters
	const unsubscribe = navigating.subscribe((nav) => {
		if (nav && nav.to.pathname === "/search" && nav.from.pathname === "/search") {
			loadInitalEntries(nav.to);
		}
	});
	
	onDestroy(() => {
		$currentLocation = "";
		unsubscribe();
		unsubscribeFilters();
	});
	
	async function loadInitalEntries(url: URL) {
		if (!browser) return;
		
		let res: AxiosResponse<EntriesResponse>;
		loading = true;
		
		try {
			res = await fetchFunction(url);
		} catch(e) {
			if (e.response) {
				popupError(`Fehler beim Laden (${e.response.status})`);
			} else {
				popupError(`Unbekannter Fehler`);
				console.error(e);
			}
			
			loading = false;
			return;
		}
		
		entries = res.data.entries;
		$currentLocation = res.data.locationName;
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
			res = await fetchFunction($page.url, params.page);
		} catch(e) {
			switch(e.response.status) {
				case 422: {
					popupError(`Ungültige Filter`);
					break;
				}
				
				default: {
					popupError(`Fehler beim Laden (${e.response.status})`);
					break;
				}
			}
			loading = false;
			return;
		}
		
		entries = [...entries, ...res.data.entries];
		more = res.data.more;
		pageCount = params.page;
		
		loading = false;
	}
	
	function removeEntry(event: CustomEvent<Entry>) {
		entries = removeFromArray(entries, event.detail);
	}
</script>

<div class="entries-collection">
	{#each entries as entry (entry._id)}
		<div animate:flip={{duration: 400}} transition:fade={{duration: 200}}>
			<svelte:component this={ entryComponent } entry={ entry } on:remove={ removeEntry } />
		</div>
	{/each}
	
	{#if more}
		<LoadMore on:click={ loadNextPage } loading={ loading } />
	{/if}
	
	{#if entries.length < 1 && !loading}
		<h3> Keine passenden Einträge gefunden </h3>
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
