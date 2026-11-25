<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/state";
	import TabSelect from "$components/elements/TabSelect.svelte";
	import EntryCollection from "$components/entryCollection.svelte";
	import DatabaseSearch from "$components/forms/databaseSearch.svelte";
	import { EEntryStatusFilter } from "$models/entry.model";
	import { Archive, BadgeCheck, Ban, List } from "@lucide/svelte";

	let filter: EEntryStatusFilter = $state(
		(page.url.searchParams.get("ViewFilter") as EEntryStatusFilter) ?? EEntryStatusFilter.All
	);

	$effect(() => {
		let url = new URL(page.url.href);
		if (filter !== page.url.searchParams.get("ViewFilter")) {
			url.searchParams.set("ViewFilter", filter);
			goto(url);
		}
	});
</script>

<div class="manage">
	<DatabaseSearch />

	<TabSelect
		options={[
			{ value: EEntryStatusFilter.All, label: "Alle", icon: List },
			{ value: EEntryStatusFilter.Approve, label: "Freischalten", icon: BadgeCheck },
			{ value: EEntryStatusFilter.Blocked, label: "Gesperrt", icon: Ban },
			{ value: EEntryStatusFilter.Archived, label: "Archiviert", icon: Archive }
		]}
		bind:value={filter}
	/>

	<EntryCollection type="manage" />
</div>

<style lang="scss">
	@use "../../scss/lengths" as *;
	@use "../../scss/mixins" as *;

	.manage {
		width: 100%;
		max-width: 1200px;
		display: flex;
		flex-direction: column;
		padding: 18px;
		gap: 20px;

		@include media-mobile-small {
			padding: 18px 8px;
		}
	}
</style>
