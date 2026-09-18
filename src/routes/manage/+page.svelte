<script lang="ts">
	import { goto, onNavigate } from "$app/navigation";
	import { page } from "$app/state";
	import EntryCollection from "$components/entryCollection.svelte";
	import DatabaseSearch from "$components/forms/databaseSearch.svelte";
	import TabSelect from "$components/forms/elements/TabSelect.svelte";
	import { EStatusFilter } from "$models/entry.model";
	import { Archive, BadgeCheck, Ban, List } from "@lucide/svelte";

	var currentFilter = $derived.by(() => {
		if (page.url.searchParams.has("approved", "false")) return EStatusFilter.Approve;
		if (page.url.searchParams.has("blocked", "true")) return EStatusFilter.Blocked;
		if (page.url.searchParams.has("archived", "true")) return EStatusFilter.Archived;
		return EStatusFilter.All;
	});

	var filter = $state<EStatusFilter>(currentFilter);

	$effect(() => {
		let url = new URL("/manage", window.location.origin);

		switch (filter) {
			case EStatusFilter.Approve: {
				url.search = new URLSearchParams({
					approved: "false",
					blocked: "false",
					archived: "false"
				}).toString();
				break;
			}
			case EStatusFilter.Blocked: {
				url.search = new URLSearchParams({
					blocked: "true"
				}).toString();
				break;
			}
			case EStatusFilter.Archived: {
				url.search = new URLSearchParams({
					archived: "true"
				}).toString();
				break;
			}
			default: {
				url.search = "";
			}
		}

		goto(url);
	});

	onNavigate(() => {});
</script>

<div class="manage">
	<DatabaseSearch />

	<TabSelect
		options={[
			{ value: EStatusFilter.All, label: "Alle", icon: List },
			{ value: EStatusFilter.Approve, label: "Freischalten", icon: BadgeCheck },
			{ value: EStatusFilter.Blocked, label: "Gesperrt", icon: Ban },
			{ value: EStatusFilter.Archived, label: "Archiviert", icon: Archive }
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
