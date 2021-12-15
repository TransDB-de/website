<script lang="ts" context="module">
	import { writable } from "svelte/store"
	
	let entries = writable<Entry[]>( [] );
	
	export function removeEntry(entry: Entry) {
		entries.update((array: Entry[]) => {
			const index = array.indexOf(entry);
			
			if (index > -1) {
				array.splice(index, 1);
			}
			
			return array;
		});
	}
</script>

<script lang="ts">
	import axios from "axios"
	import type { AxiosResponse } from "axios"
	
	import { onMount, onDestroy } from "svelte"
	import { fade } from "svelte/transition"
	import { flip } from "svelte/animate"
	import type { Page } from "@sveltejs/kit"
	import { page, navigating } from "$app/stores"
	
	import { currentLocation } from "$lib/store"
	import { filters } from "$lib/filterLang"
	import type { EntriesResponse, Entry } from "$models/entry.model"
	
	import EntryComponent from "$components/entry.svelte"
	import EditableEntry from "$components/database/editableEntry.svelte"
	import LoadMore from "$components/loadMore.svelte"
	import { popupError } from "$components/popup.svelte"
	
	/** Type of EntryCollection */
	export let type: "search" | "unapproved" | "database" = "search";
	
	// what component to render for "entries"
	let entryComponent;
	// how and where to fetch data
	let fetchFunction: (pageObject: Page, pageCount?: number) => Promise< AxiosResponse<EntriesResponse> >;
	$: {
		switch (type) {
			case "search": {
				entryComponent = EntryComponent;
				fetchFunction = async (pageObject, pageCount = 0) => {
					let params = Object.fromEntries<string | number>(pageObject.query.entries());
					params.page = pageCount;
					return await axios.get<EntriesResponse>("entries", { params });
				}
				break;
			}
			
			case "unapproved": {
				entryComponent = EntryComponent;
				fetchFunction = async (pageObject, pageCount = 0) => {
					let params = Object.fromEntries<string | number>(pageObject.query.entries());
					params.page = pageCount;
					return await axios.get<EntriesResponse>("entries/unapproved", { params });
				}
				break;
			}
			
			case "database": {
				entryComponent = EditableEntry;
				fetchFunction = async (_pageObject, pageCount = 0) => {
					return axios.post<EntriesResponse>("entries/full", {
						page: pageCount,
						filter: $filters
					});
				}
				break;
			}
			
			default: {
				console.error(`No such type for EntryCollection: "${type}"`);
			}
		}
	}
	
	let more: boolean = true;
	let pageCount: number = 0;
	let loading: boolean = true;
	
	onMount(() => loadInitalEntries($page));
	
	// React on navigating eg. route and query changes to reload the entries with new filters
	const unsubscribe = navigating.subscribe((nav) => {
		if (nav && nav.to.path === "/search") {
			loadInitalEntries(nav.to);
		}
	});
	
	onDestroy(() => {
		$currentLocation = "";
		unsubscribe();
	});
	
	async function loadInitalEntries(pageObject: Page) {
		let res: AxiosResponse<EntriesResponse>;
		loading = true;
		
		try {
			res = await fetchFunction(pageObject);
		} catch(e) {
			popupError(`Fehler beim Laden (${e.response.status})`);
			loading = false;
			return;
		}
		
		$entries = res.data.entries;
		$currentLocation = res.data.locationName;
		more = res.data.more;
		
		loading = false;
	}
	
	async function loadNextPage() {
		if (!more) return;
		loading = true;
		
		let params = Object.fromEntries<string | number>($page.query.entries());
		params.page = pageCount + 1;
		
		let res: AxiosResponse<EntriesResponse>;
		
		try {
			res = await fetchFunction($page, params.page);
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
		
		$entries = [...$entries, ...res.data.entries];
		more = res.data.more;
		pageCount = params.page;
		
		loading = false;
	}
	
</script>

<div class="entries-collection">
	{#each $entries as entry (entry._id)}
		<div animate:flip={{duration: 400}} transition:fade={{duration: 200}}>
			<svelte:component this={ entryComponent } entry={ entry } />
		</div>
	{/each}
	
	{#if more}
		<LoadMore on:click={ loadNextPage } loading={ loading } />
	{/if}
</div>

<style lang="scss">
	div.entries-collection {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}
</style>
