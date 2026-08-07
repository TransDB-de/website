<script lang="ts">
	import type { PageProps } from "./$types";
	import ReportForm from "$components/forms/reportForm.svelte";
	import { t } from "$lib/localization.svelte";
	import PrimaryHeading from "$components/typography/PrimaryHeading.svelte";
	import type { Entry } from "$models/entry.model";
	import { onMount } from "svelte";
	import { apiRequestHandler } from "$lib/apiRequestHandler";
	import { popupError } from "$components/popup.svelte";
	import axios from "axios";
	import SubmitForm from "$components/forms/submitForm.svelte";
	import Loader from "$components/elements/loader.svelte";
	import { goto } from "$app/navigation";
	import Paragraph from "$components/typography/Paragraph.svelte";
	import LinkButton from "$components/elements/LinkButton.svelte";

	let { params, data }: PageProps = $props();

	let entry: Entry | null = $state(null);

	onMount(async () => {
		const result = await apiRequestHandler(
			axios.get<Entry>("/entries/" + params.id, { captcha: true })
		);

		result.handleErrors({
			404: () => popupError(t("errors.entryNotFound")),
			default: () => popupError(`${t("errors.unknown")}`)
		});

		if (result.success && result.data) {
			entry = result.data;
			return;
		}
	});
</script>

<svelte:head>
	<title>{t("edit.title")}</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="content">
	<PrimaryHeading underline>{t("edit.title")}</PrimaryHeading>
	<Paragraph>{t("edit.description")}</Paragraph>
	<LinkButton href={`/entry/${params.id}/report`} light color="edge-error"
		>{t("edit.report")}</LinkButton
	>

	{#if entry}
		<SubmitForm mode="edit" {entry} onSuccess={() => goto("/manage/" + params.id)} />
	{:else}
		<Loader class="single-entry-view-loader" dark big />
	{/if}
</div>

<style lang="scss">
	@use "../../../../scss/content" as *;

	.content {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
</style>
