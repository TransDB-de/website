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

	interface Props {
		entryId?: string;
	}

	let { entryId }: Props = $props();

	let activities: EntryActivity[] = $state([]);
	let more = $state(false);
	let pageCount = $state(0);
	let loading = $state(true);

	let groupedActivities = $derived.by(() => {
		const groups = new Map<string, EntryActivity[]>();

		for (const activity of activities) {
			const label = activity.timestamp
				? new Date(activity.timestamp).toLocaleDateString("de-DE", {
						day: "2-digit",
						month: "long",
						year: "numeric"
					})
				: "Unbekannt";

			const group = groups.get(label);

			if (!group) {
				groups.set(label, [activity]);
			} else {
				group.push(activity);
			}
		}

		return Array.from(groups.entries()).map(([label, items]) => ({ label, items }));
	});

	$effect(() => {
		if (!browser) return;
		initialLoad();
	});

	function fetchActivities(page: number) {
		const endpoint = entryId ? `activities/entry/${entryId}` : "activities";
		return axios.get<PaginatedEntryResponse<EntryActivity>>(endpoint, { params: { page } });
	}

	export async function initialLoad() {
		loading = true;
		const result = await apiRequestHandler(fetchActivities(0));
		result.handleErrors({
			default: (status) => popupError(`${t("errors.failedToLoad")} (${status})`)
		});
		loading = false;

		if (result.success && result.data) {
			activities = result.data.items;
			more = result.data.more;
			pageCount = 0;
		}
	}

	async function loadNextPage() {
		if (!more || loading) return;
		loading = true;
		const nextPage = pageCount + 1;

		const result = await apiRequestHandler(fetchActivities(nextPage));
		loading = false;

		if (result.success && result.data) {
			activities = [...activities, ...result.data.items];
			more = result.data.more;
			pageCount = nextPage;
		}
	}
</script>

<div class="activity-collection">
	{#if activities.length > 0}
		{#each groupedActivities as group (group.label)}
			<header>
				<SubHeading underline>
					{group.label}
				</SubHeading>
				<span>
					<LogsIcon size={18} strokeWidth={2.5} />
					{group.items.length}
				</span>
			</header>
			<section>
				{#each group.items as activity (activity.id)}
					<ActivityItem {activity} showEntry={!entryId} />
				{/each}
			</section>
		{/each}
	{/if}

	{#if more}
		<LoadMore onclick={loadNextPage} {loading} />
	{/if}

	{#if activities.length === 0 && !loading}
		<p class="empty">Keine Aktivitäten vorhanden</p>
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
	p.empty {
		color: var(--color-edge-dimmed);
		margin: 0;
	}
</style>
