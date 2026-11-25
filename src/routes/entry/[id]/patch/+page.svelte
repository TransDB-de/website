<script lang="ts">
	import type { PageProps } from "./$types";
	import { t } from "$lib/localization.svelte";
	import PrimaryHeading from "$components/typography/PrimaryHeading.svelte";
	import type { Entry } from "$models/entry.model";
	import { onMount } from "svelte";
	import { apiRequestHandler } from "$lib/apiRequestHandler";
	import { popupError, popupOk, popupWarn } from "$components/popup.svelte";
	import axios from "axios";
	import SubmitForm from "$components/forms/submitForm.svelte";
	import Loader from "$components/elements/loader.svelte";
	import { goto } from "$app/navigation";
	import Paragraph from "$components/typography/Paragraph.svelte";
	import LinkButton from "$components/elements/LinkButton.svelte";
	import { ExternalLink } from "@lucide/svelte";
	import DividerRow from "$components/elements/DividerRow.svelte";
	import type { EntryPatchResponse } from "$models/patch.model";

	let { params }: PageProps = $props();

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

	async function submit(data: Entry, comment: string) {
		const result = await apiRequestHandler(
			axios.put<EntryPatchResponse>(`entries/${data.id}`, { ...data, comment })
		);

		const errors = result.handleErrors({
			422: () => popupWarn(t("errors.checkInput")),
			default: () => popupError(`${t("errors.unknown")}`)
		});

		if (result.success) {
			popupOk(t("submitForm.savedPopup"));

			const redirect = new URL("/patch-submitted", window.location.origin);

			redirect.searchParams.append("patchId", result.data!.patchId);
			redirect.searchParams.append("entryId", params.id);
			redirect.searchParams.append("revocationToken", result.data!.revocationToken);

			goto(redirect);

			return { reset: true };
		} else {
			return { reset: false, errors };
		}
	}
</script>

<svelte:head>
	<title>{t("patch.title")}</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="content">
	<PrimaryHeading underline>{t("patch.title")}</PrimaryHeading>
	<Paragraph>{t("patch.description")}</Paragraph>

	<section>
		<LinkButton href={`/entry/${params.id}/report`} color="red">
			<ExternalLink />
			{t("patch.report")}
		</LinkButton>
	</section>

	<DividerRow />

	{#if entry}
		<SubmitForm mode="public-edit" {entry} onSubmit={submit} />
	{:else}
		<Loader class="single-entry-view-loader" dark big />
	{/if}
</div>

<style lang="scss">
	@use "../../../../scss/content" as *;

	section {
		display: flex;
		justify-content: center;
		padding: 5px 0 10px 0;
	}

	.content {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
</style>
