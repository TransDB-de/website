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
	import { onMount } from "svelte"
	import axios from "axios"
	import type { AxiosResponse } from "axios"
	import { currentLocation } from "$lib/store"
	
	import type { EntriesResponse, Entry } from "$models/entry.model"
	import { fade } from "svelte/transition"
	import { flip } from "svelte/animate"
	
	import EditableEntry from "$components/database/editableEntry.svelte"
	import LoadMore from "$components/loadMore.svelte"
	import { popupError } from "$components/popup.svelte"
	
	import { filters } from "$lib/filterLang"
	
	let more: boolean = true;
	let pageCount: number = 0;
	let loading: boolean = true;
	
	onMount(() => loadInitalEntries());
	
	async function loadInitalEntries() {
		let res;
		loading = true;
		
		try {
			res = await axios.post<EntriesResponse>("entries/full", {
				page: 0,
				filter: $filters
			});
		} catch(e) {
			popupError(`Fehler beim Laden (${e.response.status})`);
			loading = false;
			return;
		}
		
		$entries = res.data.entries;
		more = res.data.more;
		
		loading = false;
	}
	
	async function loadNextPage() {
		if (!more) return;
		loading = true;
		
		let res: AxiosResponse<EntriesResponse>;
		
		pageCount++;
		
		try {
			res = await axios.post<EntriesResponse>("entries/full", {
				page: pageCount,
				filter: $filters
			});
		} catch(e) {
			popupError(`Fehler beim Laden (${e.response.status})`);
		}
		
		$entries = [...$entries, ...res.data.entries];
		more = res.data.more;
		
		loading = false;
	}
	
</script>

<div class="entries-collection">
	{#each $entries as entry (entry._id)}
		<div animate:flip={{duration: 400}} transition:fade={{duration: 200}}>
			<EditableEntry entry={entry} />
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
