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
	import { onMount, onDestroy } from "svelte"
	import { page, navigating } from "$app/stores"
	import axios from "axios"
	import type { AxiosResponse } from "axios"
	import { currentLocation } from "$lib/store"
	
	import type { EntriesResponse, Entry } from "$models/entry.model"
	import { fade } from "svelte/transition"
	import { flip } from "svelte/animate"
	
	import EntryComponent from "$components/entry.svelte"
	import LoadMore from "$components/loadMore.svelte"
	import { popupError } from "$components/popup.svelte"
	
	export let unapproved: boolean = false;
	
	let more: boolean = true;
	let pageCount: number = 0;
	let loading: boolean = true;
	
	onMount(() => loadInitalEntries($page.query));
	
	// React on navigating eg. route and query changes to reload the entries with new filters
	const unsubscribe = navigating.subscribe((nav) => {
		if (nav && nav.to.path === "/search") {
			loadInitalEntries(nav.to.query);
		}
	});
	
	onDestroy(() => {
		$currentLocation = "";
		unsubscribe();
	});
	
	async function loadInitalEntries(params: URLSearchParams) {
		let res;
		loading = true;
		
		try {
			res = await axios.get<EntriesResponse>(unapproved ? "entries/unapproved" : "entries", { params })
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
			res = await axios.get<EntriesResponse>(unapproved ? "entries/unapproved" : "entries", { params });
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
		<div animate:flip={{duration: 400}} transition:fade={{duration: 200}}><EntryComponent entry={entry} /></div>
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
