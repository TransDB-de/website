<script lang="ts">
	import { onMount } from "svelte";
	import axios from "axios";
	import { page } from "$app/stores"
	
	import type { EntriesResponse, Entry } from "$models/entry.model"
	
	import EntryComponent from "$components/entry.svelte"
	import LoadMore from "$components/loadMore.svelte"
	import { popupError } from "$components/popup.svelte"
	
	let entries: Entry[] = [];
	let locationName: string = "";
	let more: boolean = true;
	let pageCount: number = 0;
	let loading: boolean = true;
	
	onMount(async () => {
		let res;
		
		try {
			res = await axios.get<EntriesResponse>("entries", { params: $page.query })
		} catch {
			popupError("Fehler beim Laden");
			loading = false;
			return;
		}
		
		entries = res.data.entries;
		locationName = res.data.locationName;
		more = res.data.more;
		
		loading = false;
	});
	
	async function loadNextPage() {
		if (!more) return;
		loading = true;
		
		let newPage = pageCount + 1;
		
		$page.query.set("page", newPage.toString());
		let res;
		
		try {
			res = await axios.get<EntriesResponse>("entries", { params: $page.query })
		} catch {
			popupError("Fehler beim Laden");
			loading = false;
			return;
		}
		
		entries = [...res.data.entries, ...entries];
		more = res.data.more;
		pageCount = newPage;
		
		loading = false;
	}
	
</script>

<div>
	{#each entries as entry}
		<EntryComponent entry={entry} />
	{/each}
	
	{#if more}
		<LoadMore on:click={ loadNextPage } loading={ loading } />
	{/if}
</div>

<style lang="scss">
	div {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}
</style>
