<script lang="ts">
	import type { PageProps } from "./$types";
	import { t } from "$lib/localization.svelte";
	import { goto } from "$app/navigation";
	import PrimaryHeading from "$components/typography/PrimaryHeading.svelte";
	import Button from "$components/elements/button.svelte";
	import type { Entry } from "$models/entry.model";
	import DisplayEntry from "$components/entry/DisplayEntry.svelte";

	let { params }: PageProps = $props();

	var entry: Entry | null = $state(null);

	function loaded(e: Entry) {
		entry = e;
	}

	function click() {
		if (entry) {
			goto("/search?location=" + entry.address.city);
		} else {
			goto("/search");
		}
	}
</script>

<svelte:head>
	<title>Trans*DB</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="content">
	{#if entry}
		<PrimaryHeading underline>
			<span> {entry.name} </span>
			<span> - {t("entry.from")} {entry.address.city} </span>
		</PrimaryHeading>
	{/if}

	<DisplayEntry id={params.id} {loaded} />

	{#if entry}
		<Button
			class="single-entry-view-button"
			onclick={click}
			title={t("mouseOverTexts.searchNearbyButton")}
		>
			{t("entry.nearbyOffers")}
		</Button>
	{/if}
</div>

<style lang="scss">
	@use "../../../scss/content" as *;

	@use "../../../scss/lengths" as *;
	@use "../../../scss/mixins" as *;
	@use "../../../scss/shadows" as *;

	:global(button.single-entry-view-button) {
		align-self: center;
	}

	.content {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
</style>
