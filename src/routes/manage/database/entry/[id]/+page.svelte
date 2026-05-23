<script lang="ts">
	import SubmitForm from "$components/forms/submitForm.svelte";
	import Button from "$components/elements/button.svelte";
	import Loader from "$components/elements/loader.svelte";
	import DeleteEntryButton from "$components/entry/deleteEntryButton.svelte";
	import { popupOk, popupError } from "$components/popup.svelte";
	import { t } from "$lib/localization.svelte";
	import { apiRequestHandler } from "$lib/apiRequestHandler";
	import type { Entry } from "$models/entry.model";
	import axios from "axios";
	import { onMount } from "svelte";
	import { goto } from "$app/navigation";
	import type { PageProps } from "./$types";
	import { Link, RefreshCw } from "@lucide/svelte";
	import PrimaryHeading from "$components/typography/PrimaryHeading.svelte";
	import SecondaryHeading from "$components/typography/SecondaryHeading.svelte";

	let { params }: PageProps = $props();

	let entry: Entry | null = $state(null);
	let geoLoading = $state(false);

	onMount(async () => {
		const result = await apiRequestHandler(axios.get<Entry>(`entries/${params.id}`));

		result.handleErrors({
			404: () => popupError(t("errors.entryNotFound")),
			default: () => popupError(t("errors.unknown"))
		});

		if (result.success && result.data) {
			entry = result.data;
		}
	});

	function copyLink() {
		navigator.clipboard.writeText(`${window.location.origin}/manage/database/entry/${entry!._id}`);
		popupOk(t("infos.copiedLinkToClipboard"));
	}

	async function refetchGeo() {
		geoLoading = true;

		const result = await apiRequestHandler(axios.patch(`entries/${entry!._id}/updateGeo`));

		result.handleErrors({
			default: () => popupError(t("errors.unknown"))
		});

		geoLoading = false;

		if (result.success) {
			popupOk("Geodaten-Update angefragt. Bitte warte ein wenig und lade die Seite dann neu.");
		}
	}
</script>

<div class="content">
	{#if entry}
		<PrimaryHeading underline>Eintrag bearbeiten</PrimaryHeading>

		<SubmitForm mode="edit" {entry} />

		<br />

		<SecondaryHeading underline>Aktionen</SecondaryHeading>

		<section class="action-buttons">
			<Button light onclick={copyLink} title={t("mouseOverTexts.copyLink")}>
				<Link />
				Link kopieren
			</Button>

			<Button light loading={geoLoading} onclick={refetchGeo} title={t("mouseOverTexts.reloadGeo")}>
				<RefreshCw />
				Geodaten neu laden
			</Button>

			<DeleteEntryButton withText {entry} onremove={() => goto("/manage/database")} />
		</section>
	{:else}
		<Loader dark big />
	{/if}
</div>

<style lang="scss">
	@use "../../../../../scss/content-small" as *;

	.content {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.action-buttons {
		display: flex;
		gap: 10px;
		flex-wrap: wrap;
		align-items: center;
	}
</style>
