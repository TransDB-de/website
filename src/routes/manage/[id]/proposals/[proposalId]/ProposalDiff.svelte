<script lang="ts">
	import {
		EEntryChangeProposalStatus,
		type EntryChangeProposal,
		type TChangeProposal
	} from "$models/proposal.model";
	import StringValueDiff from "./StringValueDiff.svelte";
	import { tEntry, t } from "$lib/localization.svelte";
	import TagValueDiff from "./TagValueDiff.svelte";
	import TabSelect from "$components/forms/elements/TabSelect.svelte";
	import type { Entry } from "$models/entry.model";
	import { ERebaseViewState } from "$lib/rebase";
	import InfoWarning from "$components/typography/InfoWarning.svelte";

	interface Props {
		proposal: EntryChangeProposal;
		entry: Entry;
		rebased: TChangeProposal;
	}

	const props: Props = $props();

	let useRebase = $state<ERebaseViewState>(
		props.proposal.status !== EEntryChangeProposalStatus.Open
			? ERebaseViewState.Original
			: ERebaseViewState.Rebase
	);

	const original = $derived.by(() => {
		switch (useRebase) {
			case ERebaseViewState.Rebase:
			case ERebaseViewState.Unrebased: {
				return props.entry;
			}
			case ERebaseViewState.Original: {
				return props.proposal.originalEntryState;
			}
			case ERebaseViewState.Applied: {
				// This tab only shows up once the proposal is resolved (see rebaseViews below),
				// so this is always set by then. It's saved from decision time, not recalculated
				// against the live entry.
				return props.proposal.decisionEntryStateBefore!;
			}
		}
	});
	const changeset = $derived.by(() => {
		switch (useRebase) {
			case ERebaseViewState.Rebase: {
				return props.rebased;
			}
			case ERebaseViewState.Original:
			case ERebaseViewState.Unrebased: {
				return props.proposal.changeProposal;
			}
			case ERebaseViewState.Applied: {
				return props.proposal.decisionEntryStateAfter!;
			}
		}
	});

	let nameLabel = $derived(original.type ? tEntry("typeDescriptions")[original.type] : "");

	function accessibilityMapping(accessible: boolean | null): string {
		if (accessible === true) {
			return t("entryMapping.accessibleMapping.yes");
		} else if (accessible === false) {
			return t("entryMapping.accessibleMapping.no");
		} else {
			return t("entryMapping.accessibleMapping.unknown");
		}
	}

	function offerMapping(offers: string[]) {
		return offers.map((o) => tEntry("offerMapping")[o]);
	}

	function attributeMapping(attributes: string[]) {
		return attributes.map((a) => tEntry("attributeMapping")[a]);
	}

	const rebaseViews = $derived.by(() => {
		let views = [];
		if (props.proposal.status === EEntryChangeProposalStatus.Open) {
			views.push({ label: "Bereinigt (Rebase)", value: ERebaseViewState.Rebase });
			views.push({ label: "Rohfassung/Überschreiben", value: ERebaseViewState.Unrebased });
		} else {
			// Accepted and Rejected both get a saved "what the rebase turned into at decision
			// time" view. For Rejected this never actually happened, see the InfoWarning below.
			views.push({ label: "Änderung", value: ERebaseViewState.Applied });
		}
		views.push({ label: "Ursprünglich", value: ERebaseViewState.Original });

		return views;
	});
</script>

<TabSelect options={rebaseViews} bind:value={useRebase} />

<section>
	{#if useRebase === ERebaseViewState.Unrebased}
		<b>Ursprünglicher Änderungsvorschlag</b> unverändert angewendet auf den <b>aktuellen Eintrag</b>
	{:else if useRebase === ERebaseViewState.Original}
		<b>Eintrag zum Zeitpunkt des Vorschlages</b> mit
		<b>ursprünglichem Änderungsvorschlag</b>
	{:else if useRebase === ERebaseViewState.Applied}
		<b>Eintrag zum Entscheidungszeitpunkt</b> mit
		<b>den tatsächlich errechneten Änderungen</b>
	{:else}
		<b>Aktueller Eintrag</b> mit
		<b>errechneten, tatsächlich gewollten Änderungen</b>
	{/if}
</section>

{#if useRebase === ERebaseViewState.Unrebased}
	<InfoWarning>
		Diese Ansicht zeigt den Änderungsvorschlag in seiner ursprünglichen, rohen Fassung. Der
		Vorschlag basiert noch auf dem Eintrag, wie er zum damaligen Zeitpunkt war. Zwischenzeitliche
		Änderungen am Eintrag werden dabei nicht berücksichtigt bzw. wieder überschrieben/zurückgesetzt.
		Nutze für die tatsächlich anzuwendenden Änderungen die Ansicht "Rebase".
	</InfoWarning>
{:else if useRebase === ERebaseViewState.Original}
	<InfoWarning>
		Diese Ansicht vergleicht den Eintrag zum Zeitpunkt der Erstellung dieses Vorschlags, nicht den
		aktuellen Eintrag. Der Eintrag kann sich seitdem bereits verändert haben.
	</InfoWarning>
{:else if useRebase === ERebaseViewState.Applied && props.proposal.status === EEntryChangeProposalStatus.Rejected}
	<InfoWarning>
		Dieser Vorschlag wurde abgelehnt und nie auf den Eintrag angewendet. Diese Ansicht zeigt, was
		zum Zeitpunkt der Ablehnung durch einen Rebase tatsächlich passiert wäre.
	</InfoWarning>
{/if}

<article>
	<dl class="break">
		<StringValueDiff label={nameLabel} before={original.name} after={changeset.name} />
		<StringValueDiff
			label={t("submitForm.categoryLabel")}
			before={tEntry("typeMapping")[original.type]}
			after={tEntry("typeMapping")[changeset.type]}
		/>
	</dl>

	<br />

	<h2>{t("submitForm.contact")}</h2>
	<dl>
		<StringValueDiff
			label={t("submitForm.academicTitle")}
			before={original.contact?.academicTitle}
			after={changeset.contact?.academicTitle}
		/>
		<StringValueDiff
			label={t("submitForm.firstName")}
			before={original.contact?.firstName}
			after={changeset.contact?.firstName}
		/>
		<StringValueDiff
			label={t("submitForm.lastName")}
			before={original.contact?.lastName}
			after={changeset.contact?.lastName}
		/>
	</dl>

	<br />

	<h2>{t("submitForm.address")}</h2>
	<dl>
		<StringValueDiff
			label={t("submitForm.street")}
			before={original.address.street}
			after={changeset.address.street}
		/>
		<StringValueDiff
			label={t("submitForm.house")}
			before={original.address.house}
			after={changeset.address.house}
		/>
		<StringValueDiff
			label={t("submitForm.plz")}
			before={original.address.plz}
			after={changeset.address.plz}
		/>
		<StringValueDiff
			label={t("submitForm.city")}
			before={original.address.city}
			after={changeset.address.city}
		/>
	</dl>

	<br />

	<h2>{t("submitForm.contactDetails")}</h2>
	<dl class="break">
		<StringValueDiff
			label={t("submitForm.email")}
			before={original.email}
			after={changeset.email}
		/>
		<StringValueDiff
			label={t("submitForm.tel")}
			before={original.telephone}
			after={changeset.telephone}
		/>
		<StringValueDiff
			label={t("submitForm.website")}
			before={original.website}
			after={changeset.website}
		/>
	</dl>

	<h2>{t("submitForm.offers")}</h2>
	<TagValueDiff before={offerMapping(original.offers)} after={offerMapping(changeset.offers)} />

	<br />

	<h2>{t("submitForm.attributes")}</h2>
	<TagValueDiff
		before={attributeMapping(original.attributes)}
		after={attributeMapping(changeset.attributes)}
	/>

	<br />

	<h2>{t("submitForm.specifics")}</h2>
	<dl class="break">
		<StringValueDiff
			label={t("submitForm.subject")}
			before={original.subject}
			after={changeset.subject}
		/>
		<StringValueDiff
			label={t("submitForm.accessibility")}
			before={accessibilityMapping(original.accessible)}
			after={accessibilityMapping(changeset.accessible)}
		/>
		<StringValueDiff
			label={t("submitForm.specials")}
			before={original.specials}
			after={changeset.specials}
		/>
	</dl>
</article>

<style lang="scss">
	@use "../../../../../scss/colors" as *;
	@use "../../../../../scss/shadows" as *;

	article {
		display: flex;
		flex-direction: column;
		gap: 10px;
		background-color: var(--color-background-bright);
		box-shadow: $surface-shadow-soft;
		border-radius: 4px;
		padding: 15px 15px 15px 20px;

		h2 {
			font-size: 1.12rem;
			margin: 0;
			border-bottom: 2px dotted var(--color-edge-light);
		}

		dl {
			margin: 0;
			display: flex;
			flex-wrap: wrap;
			gap: 10px 20px;

			&.break {
				flex-direction: column;
			}
		}
	}
</style>
