<script lang="ts">
	import axios from "axios";
	import { browser } from "$app/environment";
	import type { EntryActivity } from "$models/activity.model";
	import type { PaginatedEntryResponse } from "$models/entry.model";
	import { apiRequestHandler } from "$lib/apiRequestHandler";
	import { popupError } from "$components/popup.svelte";
	import { t } from "$lib/localization.svelte";
	import LoadMore from "$components/elements/loadMore.svelte";
	import ActivityItem from "./activityItem.svelte";
	import SubHeading from "$components/typography/SubHeading.svelte";
	import { LogsIcon } from "@lucide/svelte";
	import {
		EEntryChangeProposalStatus,
		type EntryChangeProposal,
		type PublicEntryChangeProposal
	} from "$models/proposal.model";
	import ChangeProposal from "./changeProposal.svelte";
	import Select from "$components/forms/elements/select.svelte";
	import TabSelect from "$components/forms/elements/TabSelect.svelte";
	import { flip } from "svelte/animate";
	import { fade } from "svelte/transition";
	import Loader from "$components/elements/loader.svelte";

	interface Props {
		entryId?: string;
	}

	let { entryId }: Props = $props();

	let changesets: PublicEntryChangeProposal[] = $state([]);
	let more = $state(false);
	let pageCount = $state(0);
	let loading = $state(true);

	$effect(() => {
		if (!browser) return;
		initialLoad();
	});

	let filter = $state(EEntryChangeProposalStatus.Open);

	function fetchActivities(page: number, status: EEntryChangeProposalStatus) {
		return axios.get<PaginatedEntryResponse<PublicEntryChangeProposal>>("manage/proposals", {
			params: { page, entryId, status }
		});
	}

	export async function initialLoad() {
		loading = true;
		const result = await apiRequestHandler(fetchActivities(0, filter));
		result.handleErrors({
			default: (status) => popupError(`${t("errors.failedToLoad")} (${status})`)
		});
		loading = false;

		if (result.success && result.data) {
			changesets = result.data.items;
			more = result.data.more;
			pageCount = 0;
		}
	}

	async function loadNextPage() {
		if (!more || loading) return;
		loading = true;
		const nextPage = pageCount + 1;

		const result = await apiRequestHandler(fetchActivities(nextPage, filter));
		loading = false;

		if (result.success && result.data) {
			changesets = [...changesets, ...result.data.items];
			more = result.data.more;
			pageCount = nextPage;
		}
	}
</script>

<TabSelect
	options={[
		{ value: EEntryChangeProposalStatus.Open, label: "Offen" },
		{ value: null, label: "Gesamt" }
	]}
	bind:value={filter}
/>

<div class="activity-collection">
	{#if changesets.length > 0}
		<section>
			{#each changesets as changeset (changeset.id)}
				<ChangeProposal proposal={changeset} showEntry={!entryId} />
			{/each}
		</section>
	{/if}

	{#if more}
		<LoadMore disableInfiniteScroll onclick={loadNextPage} {loading} />
	{/if}

	{#if changesets.length === 0 && !loading}
		<p class="empty">Keine Änderungsvorschläge vorhanden</p>
	{/if}

	{#if loading}
		<Loader dark big />
	{/if}
</div>

<style lang="scss">
	.activity-collection {
		display: flex;
		flex-direction: column;
		gap: 12px;

		header {
			display: grid;
			grid-template-columns: 1fr auto;
			padding: 0.4rem 0 0 0;

			&:first-child {
				padding: 0;
			}

			span {
				border-bottom: 2px solid var(--color-edge-light);
				opacity: 0.7;
				font-weight: 500;
				font-size: 0.92rem;
				display: inline-flex;
				align-items: center;
				gap: 0.2rem;
			}
		}

		section {
			display: flex;
			flex-direction: column;
			gap: 12px;
		}
	}
	.empty {
		color: var(--color-edge-dimmed);
		margin: 0;
	}
</style>
