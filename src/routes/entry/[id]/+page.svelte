<script lang="ts">
	import { onMount } from "svelte";
	import type { PageProps } from "./$types";
	import { apiRequestHandler } from "$lib/apiRequestHandler";
	import { popupError } from "$components/popup.svelte";
	import { t } from "$lib/localization.svelte";
	import { goto } from "$app/navigation";
	import PrimaryHeading from "$components/typography/PrimaryHeading.svelte";
	import EntryComponent from "$components/entry/entry.svelte";
	import Button from "$components/elements/button.svelte";
	import type { Entry } from "$models/entry.model";
	import axios from "axios";
	import Loader from "$components/elements/loader.svelte";

	let { params }: PageProps = $props();

	let entry: Entry | null = $state(null);

	onMount(async () => {
		const result = await apiRequestHandler(axios.get<Entry>("/entries/" + params.id));

		result.handleErrors({
			404: () => popupError(t("errors.entryNotFound")),
			default: () => popupError(`${t("errors.unknown")}`)
		});

		if (result.success && result.data) {
			entry = result.data;
			return;
		}
	});

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

<div class="content md">
	{#if entry}
		<PrimaryHeading underline>
			<span> {entry.name} </span>
			<span> - {t("entry.from")} {entry.address.city} </span>
		</PrimaryHeading>

		<EntryComponent {entry} />

		<Button
			class="single-entry-view-button"
			onclick={click}
			title={t("mouseOverTexts.searchNearbyButton")}
		>
			{t("entry.nearbyOffers")}
		</Button>
	{:else}
		<Loader class="single-entry-view-loader" dark big />
	{/if}
</div>

<style lang="scss">
	@use "../../../scss/content" as *;

	@use "../../../scss/lengths" as *;
	@use "../../../scss/mixins" as *;

	:global(.single-entry-view-loader) {
		align-self: center;
		margin-top: 2em;
	}

	:global(button.single-entry-view-button) {
		align-self: center;
		margin-top: 20px;
	}
</style>
