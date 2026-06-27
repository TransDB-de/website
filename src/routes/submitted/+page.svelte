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

	async function revoke() {
		const revocationToken = page.url.searchParams.get("revocationToken");
		const entryId = page.url.searchParams.get("entryId");

		const confirmed = await confirm(t("submitted.actions.revoke") + "?");

		if (!confirmed) return;

		const result = await apiRequestHandler(
			axios.delete(`/entries/${entryId}/revoke/${revocationToken}`)
		);

		result.handleErrors({
			400: () => popupError(t("errors.invalidRevocation")),
			422: () => popupError(t("errors.invalidRevocation")),
			default: () => popupError(`${t("errors.unknown")}`)
		});

		if (result.success) {
			popupOk(t("submitted.actions.revokeSuccessPopup"));
			return goto("/");
		}
	}

	let duplicateEntry = $state<Entry | null>(null);

	onMount(async () => {
		const duplicateEntryId = page.url.searchParams.get("duplicate");

		if (!duplicateEntryId) return;

		const result = await apiRequestHandler(axios.get<Entry>(`/entries/${duplicateEntryId}`));

		result.handleErrors({
			404: () => popupError(t("errors.entryNotFound")),
			default: () => popupError(`${t("errors.unknown")}`)
		});

		if (result.success) {
			duplicateEntry = result.data;
		}
	});
</script>

<svelte:head>
	<title>{t("submitted.title")}</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="content">
	<PrimaryHeading underline>{t("submitted.heading")}</PrimaryHeading>

	<Paragraph>
		{t("submitted.description")}
	</Paragraph>

	{#if duplicateEntry}
		<InfoWarning>
			{t("submitted.duplicationWarning")}
		</InfoWarning>
		<EntryComponent entry={duplicateEntry} />
	{/if}

	<section>
		{#if page.url.searchParams.has("revocationToken")}
			<Button color="red" onclick={revoke}>{t("submitted.actions.revoke")}</Button>
		{/if}

		<LinkButton href="/">{t("submitted.actions.startpage")}</LinkButton>
	</section>
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
