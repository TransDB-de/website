<script lang="ts">
	import { onMount } from "svelte";
	import type { PageProps } from "./$types";
	import { apiRequestHandler } from "$lib/apiRequestHandler";
	import { popupError, popupOk } from "$components/popup.svelte";
	import { t } from "$lib/localization.svelte";
	import PrimaryHeading from "$components/typography/PrimaryHeading.svelte";
	import EntryComponent from "$components/entry/entry.svelte";
	import type { Entry, EntryStatus } from "$models/entry.model";
	import axios from "axios";
	import Loader from "$components/elements/loader.svelte";
	import SecondaryHeading from "$components/typography/SecondaryHeading.svelte";
	import LinkButton from "$components/elements/LinkButton.svelte";
	import ActivityCollection from "./activityCollection.svelte";
	import {
		Archive,
		BadgeCheck,
		Ban,
		CircleMinus,
		Eraser,
		FilePen,
		LockOpen,
		MapPin,
		Trash,
		Undo2
	} from "@lucide/svelte";
	import Button from "$components/elements/button.svelte";
	import { confirm } from "$components/confirm.svelte";
	import { prompt } from "$components/prompt.svelte";
	import { goto } from "$app/navigation";
	import { userdata } from "$lib/store";

	let { params }: PageProps = $props();

	let entry: Entry | null = $state(null);

	onMount(async () => {
		const result = await apiRequestHandler(axios.get<Entry>("manage/entries/" + params.id));

		result.handleErrors({
			404: () => popupError(t("errors.entryNotFound")),
			default: () => popupError(`${t("errors.unknown")}`)
		});

		if (result.success && result.data) {
			entry = result.data;
			return;
		}
	});

	async function changeEntryStatus(
		status: Partial<EntryStatus & { removeDuplication: boolean }>,
		comment?: string
	) {
		const result = await apiRequestHandler(
			axios.patch<Entry>(`/manage/entries/${params.id}/status`, { ...status, comment })
		);

		result.handleErrors({
			404: () => popupError(t("errors.entryNotFound")),
			default: () => popupError(`${t("errors.unknown")}`)
		});

		if (result.success) {
			entry!.status = { ...entry?.status, ...status } as EntryStatus;
			return true;
		}

		return false;
	}

	async function unapprove() {
		const confirmed = await prompt("Freischaltung aufheben?", {
			label: "Begründung",
			placeholder: "Warum soll die Freischaltung aufgehoben werden?",
			required: true
		});

		if (!confirmed) return;

		await changeEntryStatus({ approved: false }, confirmed);
	}

	async function deleteEntry() {
		const confirmed = await prompt("Eintrag löschen?", {
			label: "Begründung",
			placeholder: "Warum soll der Eintrag gelöscht werden?",
			required: true,
			destructive: true
		});

		if (!confirmed) return;

		const result = await apiRequestHandler(
			axios.delete<Entry>(`/manage/entries/${params.id}`, { data: { comment: confirmed } })
		);

		result.handleErrors({
			404: () => popupError(t("errors.entryNotFound")),
			default: () => popupError(`${t("errors.unknown")}`)
		});

		window.history.back();
		popupOk("Eintrag gelöscht");
	}

	async function blockEntry() {
		const confirmed = await prompt("Eintrag sperren?", {
			label: "Begründung",
			placeholder: "Warum soll der Eintrag gesperrt werden?",
			required: true,
			destructive: true
		});

		if (!confirmed) return;

		const success = await changeEntryStatus({ blocked: true }, confirmed);

		if (success) popupOk("Eintrag gesperrt");
	}

	async function unblockEntry() {
		const confirmed = await prompt("Eintrag entsperren?", {
			label: "Begründung",
			placeholder: "Warum soll der Eintrag entgesperrt werden?",
			required: true
		});

		if (!confirmed) return;

		const success = await changeEntryStatus({ blocked: false }, confirmed);

		if (success) popupOk("Eintrag entsperrt");
	}

	async function archiveEntry() {
		const confirmed = await prompt("Eintrag archivieren?", {
			label: "Begründung",
			placeholder: "Warum soll der Eintrag archiviert werden?",
			required: true,
			destructive: true
		});

		if (!confirmed) return;

		const success = await changeEntryStatus({ archived: true }, confirmed);

		if (success) popupOk("Eintrag archiviert");
	}

	async function unarchiveEntry() {
		const confirmed = await prompt("Eintrag wiederherstellen?", {
			label: "Begründung",
			placeholder: "Warum soll der Eintrag wiederhergestellt werden?",
			required: true
		});

		if (!confirmed) return;

		const success = await changeEntryStatus({ archived: false }, confirmed);

		if (success) popupOk("Eintrag wiederhergestellt");
	}

	async function removeDuplicate() {
		const confirmed = await confirm("Duplikatsmarkierung entfernen?");

		if (!confirmed) return;

		const success = await changeEntryStatus({ removeDuplication: true });

		if (success) popupOk("Duplikatsmarkierung entfernt");
	}

	async function retryGeo() {}
</script>

<svelte:head>
	<title>Trans*DB</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="content">
	{#if entry}
		<PrimaryHeading underline>Eintrag verwalten</PrimaryHeading>
		<EntryComponent {entry} manage={false} />

		<section>
			<LinkButton href={`${params.id}/edit`} light>
				<FilePen />
				Daten Bearbeiten
			</LinkButton>

			{#if entry.possibleDuplicate}
				<Button onclick={removeDuplicate} light color="edge-warn">
					<Eraser />
					Duplikatsmarkierung entfernen
				</Button>
			{/if}

			{#if !entry.location}
				<Button onclick={retryGeo} light>
					<MapPin />
					Geodaten neu laden
				</Button>
			{/if}

			{#if $userdata?.admin}
				<Button onclick={deleteEntry} light color="edge-error">
					<Trash />
					Löschen
				</Button>
			{/if}
		</section>

		<br />

		<SecondaryHeading underline>Status verwalten</SecondaryHeading>

		<section>
			{#if !entry.status?.approved}
				<Button light color="edge-highlight" onclick={() => changeEntryStatus({ approved: true })}>
					<BadgeCheck />
					Freischalten
				</Button>
			{:else}
				<Button href={`${params.id}/edit`} light onclick={unapprove}>
					<CircleMinus />
					Freischaltung aufheben
				</Button>
			{/if}

			{#if !entry.status?.blocked}
				<Button light onclick={blockEntry} color="edge-warn">
					<Ban />
					Sperren
				</Button>
			{:else}
				<Button href={`${params.id}/edit`} light color="edge-highlight" onclick={unblockEntry}>
					<LockOpen />
					Entsperren
				</Button>
			{/if}

			{#if !entry.status?.archived}
				<Button light color="edge-error" onclick={archiveEntry}>
					<Archive />
					Archivieren
				</Button>
			{:else}
				<Button light color="edge-highlight" onclick={unarchiveEntry}>
					<Archive />
					Wiederherstellen
				</Button>
			{/if}
		</section>

		<br />

		<SecondaryHeading underline>Aktivitätenverlauf</SecondaryHeading>
		<ActivityCollection entryId={params.id} />
	{:else}
		<Loader class="single-entry-view-loader" dark big />
	{/if}
</div>

<style lang="scss">
	@use "../../../scss/content" as *;
	@use "../../../scss/lengths" as *;
	@use "../../../scss/mixins" as *;

	.content {
		gap: 20px;
	}

	section {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
	}
</style>
