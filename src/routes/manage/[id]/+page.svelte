<script lang="ts">
	import { onMount } from "svelte";
	import type { PageProps } from "./$types";
	import { apiRequestHandler } from "$lib/apiRequestHandler";
	import { popupError, popupOk, popupWarn } from "$components/popup.svelte";
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
	import RadioToggle from "$components/forms/elements/radioToggle.svelte";
	import InfoWarning from "$components/typography/InfoWarning.svelte";

	let { params }: PageProps = $props();

	let entry = $state<Entry | null>(null);
	let loading = $state(true);
	let activitiesCollectionComponent = $state<ReturnType<typeof ActivityCollection>>();

	onMount(async () => {
		const result = await apiRequestHandler(axios.get<Entry>("manage/entries/" + params.id));

		result.handleErrors({
			404: () => popupError(t("errors.entryNotFound")),
			default: () => popupError(`${t("errors.unknown")}`)
		});

		if (result.success && result.data) {
			entry = result.data;
			loading = false;
			return;
		}
	});

	async function changeEntryStatus(
		status: Partial<EntryStatus & { removeDuplication: boolean }>,
		confirmWithComment?: { text: string; required: boolean; destructive?: boolean }
	) {
		let comment: string | null = null;

		if (confirmWithComment) {
			const confirmed = await prompt(confirmWithComment.text, {
				label: "Begründung",
				placeholder: "Warum " + confirmWithComment.text,
				required: confirmWithComment.required,
				destructive: confirmWithComment.destructive
			});

			if (confirmed) {
				comment = confirmed;
			} else {
				return false;
			}
		}

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

	async function approval(value: string | boolean | undefined): Promise<void> {
		if (value) {
			const success = await changeEntryStatus({ approved: true });
			if (success) {
				popupOk("Eintrag freigeschaltet");
				activitiesCollectionComponent?.initialLoad();
			}
		} else {
			const success = await changeEntryStatus(
				{ approved: false },
				{ text: "Freischaltung entziehen?", required: true }
			);

			if (!success) {
				entry!.status!.approved = !Boolean(value);
			} else {
				if (success) {
					popupWarn("Freischaltung entzogen");
					activitiesCollectionComponent?.initialLoad();
				}
			}
		}
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

	async function ban(value: string | boolean | undefined): Promise<void> {
		if (value) {
			const success = await changeEntryStatus(
				{ blocked: true },
				{ text: "Eintrag sperren?", required: true, destructive: true }
			);
			if (success) {
				popupWarn("Eintrag gesperrt");
				activitiesCollectionComponent?.initialLoad();
			}
		} else {
			const success = await changeEntryStatus(
				{ blocked: false },
				{ text: "Eintrag entsperren?", required: true }
			);

			if (!success) {
				entry!.status!.blocked = !Boolean(value);
			} else {
				if (success) {
					popupOk("Eintrag entsperrt");
					activitiesCollectionComponent?.initialLoad();
				}
			}
		}
	}

	async function archive(value: string | boolean | undefined): Promise<void> {
		if (value) {
			const success = await changeEntryStatus(
				{ archived: true },
				{ text: "Eintrag archivieren?", required: true, destructive: true }
			);
			if (success) {
				popupWarn("Eintrag archiviert");
				activitiesCollectionComponent?.initialLoad();
			}
		} else {
			const success = await changeEntryStatus(
				{ archived: false },
				{ text: "Eintrag wiederherstellen?", required: true }
			);

			if (!success) {
				entry!.status!.archived = !Boolean(value);
			} else {
				if (success) {
					popupOk("Eintrag wiederhergestellt");
					activitiesCollectionComponent?.initialLoad();
				}
			}
		}
	}

	async function removeDuplicate() {
		const confirmed = await confirm("Duplikatsmarkierung entfernen?");

		if (!confirmed) return;

		const success = await changeEntryStatus({ removeDuplication: true });

		if (success) {
			popupOk("Duplikatsmarkierung entfernt");
			entry!.possibleDuplicate = null;
		}
	}

	async function retryGeo() {
		const confirmed = await confirm("Geodaten neu laden?");

		if (!confirmed) return;

		const result = await apiRequestHandler(axios.put(`/manage/entries/${params.id}/updateGeo`));

		result.handleErrors({
			404: () => popupError(t("errors.entryNotFound")),
			default: () => popupError(`${t("errors.unknown")}`)
		});

		if (result.success) popupOk("Geodaten werden im Hintergrund neu geladen");
	}
</script>

<svelte:head>
	<title>Trans*DB</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="content">
	{#if !loading && entry}
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

			{#if !entry.location && entry.status?.approved}
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
			<RadioToggle
				label="Freigeschaltet"
				icon={BadgeCheck}
				labelColor="var(--color-edge-highlight)"
				bind:value={entry.status!.approved}
				onchange={approval}
				options={[
					{ value: true, label: "Ja", color: "var(--color-surface-highlight)" },
					{ value: false, label: "Nein", color: "var(--color-surface-primary)" }
				]}
			/>
			<RadioToggle
				label="Gesperrt"
				icon={Ban}
				labelColor="var(--color-edge)"
				bind:value={entry.status!.blocked}
				onchange={ban}
				options={[
					{ value: true, label: "Ja", color: "var(--color-surface-warn)" },
					{ value: false, label: "Nein", color: "var(--color-surface-primary)" }
				]}
			/>
			<RadioToggle
				label="Archiviert"
				icon={Archive}
				labelColor="var(--color-edge-warn)"
				bind:value={entry.status!.archived}
				onchange={archive}
				options={[
					{ value: true, label: "Ja", color: "var(--color-surface-warn-alt)" },
					{ value: false, label: "Nein", color: "var(--color-surface-primary)" }
				]}
			/>
		</section>

		<br />
	{:else if !loading}
		<InfoWarning>Eintrag konnte nicht geladen werden</InfoWarning>
	{:else}
		<Loader class="single-entry-view-loader" dark big />
	{/if}

	<SecondaryHeading underline>Aktivitätenverlauf</SecondaryHeading>
	<ActivityCollection bind:this={activitiesCollectionComponent} entryId={params.id} />
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
