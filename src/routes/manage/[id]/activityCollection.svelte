<script lang="ts">
	import { onMount } from "svelte";
	import axios from "axios";
	import { browser } from "$app/environment";
	import type { EntryActivity } from "$models/activity.model";
	import { apiRequestHandler } from "$lib/apiRequestHandler";
	import { popupError } from "$components/popup.svelte";
	import { t } from "$lib/localization.svelte";
	import LoadMore from "$components/elements/loadMore.svelte";
	import ActivityItem from "./activityItem.svelte";

	interface Props {
		entryId?: string;
	}

	let { entryId }: Props = $props();

	let activities: EntryActivity[] = $state([]);
	let more = $state(false);
	let pageCount = $state(0);
	let loading = $state(true);

	onMount(async () => {
		if (!browser) return;

		await initialLoad();
	});

	export async function initialLoad() {
		loading = true;
		const result = await apiRequestHandler(
			axios.get<EntryActivity[]>(entryId ? `activities/entry/${entryId}` : "activities", {
				params: { page: 0 }
			})
		);
		result.handleErrors({
			default: (status) => popupError(`${t("errors.failedToLoad")} (${status})`)
		});
		loading = false;

		if (result.success && result.data) {
			activities = result.data;
			more = result.data.length > 0;
		}
	}

	async function loadNextPage() {
		if (!more || loading) return;
		loading = true;
		const nextPage = pageCount + 1;

		const result = await apiRequestHandler(
			axios.get<EntryActivity[]>(entryId ? `activities/entry/${entryId}` : "activities", {
				params: { page: nextPage }
			})
		);
		loading = false;

		if (result.success && result.data) {
			if (result.data.length === 0) {
				more = false;
			} else {
				activities = [...activities, ...result.data];
				pageCount = nextPage;
			}
		}
	}
</script>

<div class="activity-collection">
	{#if activities.length > 0}
		{#each activities as activity (activity.id)}
			<ActivityItem {activity} showEntry={!entryId} />
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
		gap: 10px;
	}

	.empty {
		color: var(--color-edge-dimmed);
		text-align: center;
	}
</style>
