<script lang="ts">
	import SubmitForm from "$components/forms/submitForm.svelte";
	import Loader from "$components/elements/loader.svelte";
	import { popupOk, popupError } from "$components/popup.svelte";
	import { t } from "$lib/localization.svelte";
	import { apiRequestHandler } from "$lib/apiRequestHandler";
	import type { Entry } from "$models/entry.model";
	import axios from "axios";
	import { onMount } from "svelte";
	import type { PageProps } from "../$types";
	import PrimaryHeading from "$components/typography/PrimaryHeading.svelte";

	let { params }: PageProps = $props();

	let entry: Entry | null = $state(null);

	onMount(async () => {
		const result = await apiRequestHandler(axios.get<Entry>(`manage/entries/${params.id}`));

		result.handleErrors({
			404: () => popupError(t("errors.entryNotFound")),
			default: () => popupError(t("errors.unknown"))
		});

		if (result.success && result.data) {
			entry = result.data;
		}
	});

	function copyLink() {
		navigator.clipboard.writeText(`${window.location.origin}/manage/entry/${entry!.id}`);
		popupOk(t("infos.copiedLinkToClipboard"));
	}

	async function refetchGeo() {
		const result = await apiRequestHandler(axios.put(`manage/entries/${entry!.id}/updateGeo`));

		result.handleErrors({
			default: () => popupError(t("errors.unknown"))
		});

		if (result.success) {
			popupOk("Geodaten-Update angefragt. Bitte warte ein wenig und lade die Seite dann neu.");
		}
	}
</script>

<div class="content">
	{#if entry}
		<PrimaryHeading underline>Eintrag bearbeiten</PrimaryHeading>

		<SubmitForm mode="edit" {entry} />
	{:else}
		<Loader dark big />
	{/if}
</div>

<style lang="scss">
	@use "../../../../scss/content-small" as *;

	.content {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
</style>
