<script lang="ts">
	import { t } from "$lib/localization.svelte";
	import PrimaryHeading from "$components/typography/PrimaryHeading.svelte";
	import LinkButton from "$components/elements/LinkButton.svelte";
	import { onMount } from "svelte";
	import { page } from "$app/state";
	import type { Entry } from "$models/entry.model";
	import Button from "$components/elements/button.svelte";
	import { confirm } from "$components/confirm.svelte";
	import { apiRequestHandler } from "$lib/apiRequestHandler";
	import axios from "axios";
	import { popupError, popupOk } from "$components/popup.svelte";
	import { goto } from "$app/navigation";
	import EntryComponent from "$components/entry/entry.svelte";
	import InfoWarning from "$components/typography/InfoWarning.svelte";
	import Paragraph from "$components/typography/Paragraph.svelte";
	import Loader from "$components/elements/loader.svelte";
	import Blockquote from "$components/typography/Blockquote.svelte";
	import { renderTextareaContent } from "$lib/utils";
	import type { EntryPatch } from "$models/patch.model";

	const revocationToken = page.url.searchParams.get("revocationToken");
	const entryId = page.url.searchParams.get("entryId");
	const patchId = page.url.searchParams.get("patchId");

	let revokeLoading = $state(false);

	async function revoke() {
		const confirmed = await confirm(t("patched.actions.revoke") + "?");

		if (!confirmed) return;

		revokeLoading = true;

		const result = await apiRequestHandler(
			axios.delete(`/entries/${entryId}/patches/${patchId}/${revocationToken}`)
		);

		result.handleErrors({
			400: () => popupError(t("errors.invalidRevocation")),
			422: () => popupError(t("errors.invalidRevocation")),
			default: () => popupError(`${t("errors.unknown")}`)
		});

		revokeLoading = false;

		if (result.success) {
			popupOk(t("patched.actions.revokeSuccessPopup"));
			return goto("/");
		}
	}

	let entryPatch = $state<EntryPatch | null>(null);

	onMount(async () => {
		if (!patchId) return;

		const result = await apiRequestHandler(
			axios.get<EntryPatch>(`/entries/${entryId}/patches/${patchId}/${revocationToken}`)
		);

		result.handleErrors({
			404: () => popupError(t("errors.entryNotFound")),
			default: () => popupError(`${t("errors.unknown")}`)
		});

		if (result.success) {
			entryPatch = result.data;
		}
	});
</script>

<svelte:head>
	<title>{t("patched.title")}</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="content">
	<PrimaryHeading underline>{t("patched.heading")}</PrimaryHeading>

	<Paragraph>
		{t("patched.description")}
	</Paragraph>

	<section>
		{#if revocationToken}
			<Button color="red" onclick={revoke} loading={revokeLoading}>
				{t("patched.actions.revoke")}
			</Button>
		{/if}

		<LinkButton href="/">{t("patched.actions.startpage")}</LinkButton>
	</section>

	{#if entryPatch}
		<Blockquote>
			{@html renderTextareaContent(entryPatch.comment)}
		</Blockquote>
		<!--<ProposalDiff
			entry={changeProposal.originalEntryState}
			proposal={changeProposal}
			rebased={changeProposal.changeProposal}
			simple
		/>-->
	{:else}
		<Loader dark big />
	{/if}
</div>

<style lang="scss">
	@use "../../scss/content" as *;

	.content {
		display: flex;
		flex-direction: column;
		gap: 1.2rem;
	}

	section {
		display: flex;
		gap: 10px;
	}
</style>
