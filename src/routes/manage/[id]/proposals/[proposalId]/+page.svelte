<script lang="ts">
	import {
		EEntryChangeProposalStatus,
		proposalToPublic,
		type ChangeProposalWithRebaseResponse,
		type EntryChangeProposal,
		type TChangeProposal
	} from "$models/proposal.model";
	import { onMount } from "svelte";
	import type { PageProps } from "./$types";
	import { apiRequestHandler } from "$lib/apiRequestHandler";
	import axios from "axios";
	import { popupError, popupOk, popupWarn } from "$components/popup.svelte";
	import { t } from "$lib/localization.svelte";
	import Loader from "$components/elements/loader.svelte";
	import InfoWarning from "$components/typography/InfoWarning.svelte";
	import PrimaryHeading from "$components/typography/PrimaryHeading.svelte";
	import ProposalDiff from "./ProposalDiff.svelte";
	import ChangeProposal from "../../changeProposal.svelte";
	import Button from "$components/elements/button.svelte";
	import { Check, SquareCheck, SquareX, Trash, X } from "@lucide/svelte";
	import SecondaryHeading from "$components/typography/SecondaryHeading.svelte";
	import Paragraph from "$components/typography/Paragraph.svelte";
	import { confirm } from "$components/confirm.svelte";
	import { prompt } from "$components/prompt.svelte";
	import { goto } from "$app/navigation";
	import type { Entry } from "$models/entry.model";
	import ManageNav from "../../../manageNav.svelte";
	import Checkbox from "$components/forms/elements/checkbox.svelte";

	let { params }: PageProps = $props();

	let proposalResponse = $state<ChangeProposalWithRebaseResponse | null>(null);

	let loading = $state(true);
	let useRebase = $state(true);

	let publicProposal = $derived(
		proposalResponse ? proposalToPublic(proposalResponse.proposal) : null
	);

	onMount(async () => {
		const result = await apiRequestHandler(
			axios.get<ChangeProposalWithRebaseResponse>("manage/proposals/" + params.proposalId)
		);

		result.handleErrors({
			404: () => popupError(t("errors.entryNotFound")),
			default: () => popupError(`${t("errors.unknown")}`)
		});

		if (result.success && result.data) {
			proposalResponse = result.data;

			loading = false;
			return;
		}
	});

	async function changeStatus(accept: boolean) {
		let comment = undefined;

		if (accept === false) {
			const result = await prompt("Vorschlag ablehnen?", {
				label: "Begründung",
				placeholder: "Warum soll dieser Vorschlag abgelehnt werden?",
				required: true,
				destructive: true
			});

			if (result) {
				comment = result;
			} else {
				return;
			}
		}

		const decision = accept ? "accept" : "reject";

		const result = await apiRequestHandler(
			axios.patch(`/manage/proposals/${proposalResponse?.proposal?.id}/${decision}`, {
				comment,
				useRebase
			})
		);

		result.handleErrors({
			404: () => popupError(t("errors.entryNotFound")),
			400: () => popupWarn("Kann nicht geändert werden, Vorschlag bereits verarbeitet"),
			default: () => popupError(`${t("errors.unknown")}`)
		});

		if (result.success) {
			if (accept) {
				popupOk("Änderungsvorschlag angenommen und angewandt");
			} else {
				popupOk("Änderungsvorschlag abgelehnt");
			}

			goto(`/manage/${params.id}`);
		}
	}

	async function deleteProposal() {
		const confirmed = await prompt("Änderungsvorschlag wirklich unwiederruflich löschen?", {
			label: "Begründung",
			placeholder: "Warum soll dieser Vorschlag gelöscht werden?",
			required: true,
			destructive: true
		});

		if (!confirmed) return;

		const result = await apiRequestHandler(
			axios.delete(`/manage/proposals/${proposalResponse?.proposal?.id}`, {
				data: { comment: confirmed }
			})
		);

		result.handleErrors({
			404: () => popupError(t("errors.entryNotFound")),
			400: () => popupWarn("Kann nicht gelöscht werden"),
			default: () => popupError(`${t("errors.unknown")}`)
		});

		if (result.success) {
			popupOk("Änderungsvorschlag gelöscht");
			goto(`/manage/${params.id}`);
		}
	}
</script>

<svelte:head>
	<title>Trans*DB</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="content">
	{#if !loading && proposalResponse}
		<PrimaryHeading underline>Änderungsvorschlag</PrimaryHeading>

		<ChangeProposal proposal={publicProposal!} />

		<SecondaryHeading underline>Datenvergleich</SecondaryHeading>

		<ProposalDiff
			proposal={proposalResponse.proposal}
			entry={proposalResponse.currentEntry}
			rebased={proposalResponse.rebasedProposal}
		/>

		{#if proposalResponse.proposal.status === EEntryChangeProposalStatus.Open}
			<SecondaryHeading underline>Aktionen</SecondaryHeading>

			<Checkbox single bind:checked={useRebase}>
				Aktuellen Änderungsvorschlag (Rebase) verwenden
			</Checkbox>

			{#if !useRebase}
				<InfoWarning>
					Das anwenden des urspünglichen Änderungsvorschlags kann unbeabsichtigt Daten überschreiben
					und zurücksetzten. Diese Option sollte in der Regel nie benutzt werden müssen!
				</InfoWarning>
			{/if}

			<section>
				<Button light color="edge-success" onclick={() => changeStatus(true)}>
					<Check />
					Annehmen
				</Button>
				<Button light color="edge-warn" onclick={() => changeStatus(false)}>
					<X />
					Ablehnen
				</Button>

				<Button light color="edge-error" onclick={deleteProposal}>
					<Trash />
					Löschen
				</Button>
			</section>
		{/if}
	{:else if !loading}
		<InfoWarning>Vorschlag konnte nicht geladen werden</InfoWarning>
	{:else}
		<Loader class="single-entry-view-loader" dark big />
	{/if}
</div>

<style lang="scss">
	@use "../../../../../scss/content" as *;
	@use "../../../../../scss/lengths" as *;
	@use "../../../../../scss/mixins" as *;

	.content {
		gap: 20px;
	}

	section {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
	}
</style>
