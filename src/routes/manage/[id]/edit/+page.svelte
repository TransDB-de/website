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
	import { goto } from "$app/navigation";

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
</script>

<div class="content">
	{#if entry}
		<PrimaryHeading underline>Eintrag bearbeiten</PrimaryHeading>

		<SubmitForm mode="edit" {entry} onSuccess={() => goto("/manage/" + params.id)} />
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
