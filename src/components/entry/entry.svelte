<script lang="ts">
	import type { Entry } from "$models/entry.model";

	import { goto } from "$app/navigation";
	import { userdata } from "$lib/store";
	import { t, tEntry } from "$lib/localization.svelte";

	import Tag from "$components/elements/tag.svelte";
	import EdgeButton from "$components/elements/edgeButton.svelte";
	import { popupOk } from "$components/popup.svelte";

	import DeleteEntryButton from "$components/entry/deleteEntryButton.svelte";
	import ApproveEntryButton from "$components/entry/approveEntryButton.svelte";
	import BlocklistEntryButton from "$components/entry/blocklistEntryButton.svelte";

	import { Phone, Map, Mail, Globe, Edit, Share2, Navigation, AlertTriangle } from "@lucide/svelte";

	import { subjectMapping, typeMapping, offerMapping, attributeMapping } from "$lib/entryMappings";

	interface Props {
		entry: Entry;
		onremove?: (entry: Entry) => void;
	}

	const props: Props = $props();

	let isWithSubject = $derived(subjectMapping[props.entry.type]);
	let subjectName = $derived(
		isWithSubject ? tEntry("subjectMapping")[props.entry.meta.subject ?? ""] : null
	);
	let website = $derived(props.entry.website ? new URL(props.entry.website).host : null);
	let possibleDuplicateLink = $derived(
		props.entry.possibleDuplicate && $userdata?.admin
			? "/manage/database?id=" + props.entry.possibleDuplicate
			: "/entry/" + props.entry.possibleDuplicate
	);

	let addressText = $derived.by(() => {
		let text = "";
		if (props.entry.address.street) text += props.entry.address.street + " ";
		if (props.entry.address.house) text += props.entry.address.house + ", ";
		if (props.entry.address.plz) text += props.entry.address.plz + " ";
		text += props.entry.address.city;
		return text;
	});

	function share() {
		let url = "/entry/" + props.entry._id;

		if (navigator.share) {
			navigator.share({ url });
		} else {
			navigator.clipboard.writeText(window.location.origin + url);
			popupOk(t("infos.copiedLinkToClipboard"));
		}
	}
</script>

<div class="entry">
	<div class="data">
		<div class="heading">
			<h1>{props.entry.name}</h1>

			{#if props.entry.accessible === "yes"}
				<span class="special-tag green" title={t("mouseOverTexts.barrierFree")}>
					{t("entryMapping.accessibleMapping.yes")}
				</span>
			{:else if props.entry.accessible === "no"}
				<span class="special-tag orange" title={t("mouseOverTexts.notBarrierFree")}>
					{t("entryMapping.accessibleMapping.no")}
				</span>
			{/if}
		</div>

		<p class="small-gap">
			{#if isWithSubject}
				<b> {subjectName} </b>
			{:else}
				<b> {tEntry("typeMapping")[props.entry.type]} </b>
			{/if}

			{#if props.entry.firstName || props.entry.lastName}
				<span>
					{tEntry("academicTitleMapping")[props.entry.academicTitle ?? ""] ?? ""}
					{props.entry.firstName ?? ""}
					{props.entry.lastName ?? ""}
				</span>
			{/if}
		</p>

		<p>
			<a href={`https://www.google.de/maps/search/${addressText}`} target="_blank" rel="noopener">
				<Map /><span>{addressText}</span>
			</a>

			{#if props.entry.telephone}
				<a href={`tel:${props.entry.telephone}`}>
					<Phone /><span>{props.entry.telephone}</span>
				</a>
			{/if}

			{#if props.entry.email}
				<a href={`mailto:${props.entry.email}`}>
					<Mail /><span>{props.entry.email}</span>
				</a>
			{/if}

			{#if props.entry.website}
				<a href={props.entry.website} target="_blank" rel="noopener">
					<Globe /><span>{website}</span>
				</a>
			{/if}
		</p>

		{#if props.entry.meta.offers && props.entry.meta.offers.length > 0 && props.entry.type in offerMapping}
			<p class="small-gap small-margin">
				<b> {t("entry.offers")}: </b>
				{#each props.entry.meta.offers as offer (offer)}
					<Tag title={tEntry("offerDetails")[offer]}>{tEntry("offerMapping")[offer]}</Tag>
				{/each}
			</p>
		{/if}

		{#if props.entry.meta.attributes && props.entry.meta.attributes.length > 0 && props.entry.type in attributeMapping}
			<p class="small-gap small-margin">
				<b> {t("entry.attributes")}: </b>
				{#each props.entry.meta.attributes as attribute (attribute)}
					<Tag title={tEntry("attributeDetails")[attribute]}>
						{tEntry("attributeMapping")[attribute]}
					</Tag>
				{/each}
			</p>
		{/if}

		{#if props.entry.meta.specials}
			<p class="small-gap small-margin">
				<b> {t("entry.specials")}: </b>
				{props.entry.meta.specials}
			</p>
		{/if}

		{#if props.entry.meta.minAge}
			<p class="small-gap small-margin">
				<b> {t("entry.minage")}: </b>
				{props.entry.meta.minAge}
			</p>
		{/if}

		{#if props.entry.distance}
			<p class="small-gap distance" title={t("mouseOverTexts.distance")}>
				<Navigation /> <b> {props.entry.distance.toFixed(1)} km - {props.entry.address.city} </b>
			</p>
		{/if}

		{#if !props.entry.approved && props.entry.possibleDuplicate}
			<p class="small-gap">
				<a class="warn-link" href={possibleDuplicateLink} target="_blank">
					<AlertTriangle />
					{t("entry.possibleDuplicate")}
				</a>
			</p>
		{/if}
	</div>

	{#if !props.entry.blocked}
		<div class="controls">
			{#if !props.entry.approved}
				<ApproveEntryButton onremove={props.onremove} entry={props.entry} />
				<BlocklistEntryButton onremove={props.onremove} entry={props.entry} />
				<DeleteEntryButton onremove={props.onremove} entry={props.entry} />
			{:else}
				<EdgeButton
					onclick={() => goto("/report?id=" + props.entry._id)}
					title={t("mouseOverTexts.report")}
				>
					<Edit />
				</EdgeButton>

				<EdgeButton onclick={share} title={t("mouseOverTexts.share")}>
					<Share2 />
				</EdgeButton>
			{/if}
		</div>
	{/if}
</div>

<style lang="scss">
	@use "../../scss/shadows" as *;
	@use "../../scss/mixins" as *;

	.entry {
		display: flex;
		background-color: var(--color-background-bright);
		box-shadow: $surface-shadow-soft;
		border-radius: 4px;
		padding: 15px 15px 15px 20px;
		gap: 5px;

		.controls {
			display: flex;
			flex-direction: column;
			gap: 10px;
		}

		@include media-mobile-small {
			padding: 10px;
			flex-direction: column;
			gap: 10px;

			.controls {
				flex-direction: row;
				gap: 20px;
				justify-content: center;
			}
		}

		.data {
			display: flex;
			flex-direction: column;
			flex: 1;

			p {
				display: flex;
				align-items: center;
				flex-wrap: wrap;
				gap: 10px 20px;
				margin: 0 0 20px 0;
				font-size: 0.9em;

				&:first-of-type {
					margin: 0 0 20px 5px;
				}

				&.small-gap {
					gap: 5px 10px;
				}

				&.small-margin {
					margin: 0 0 10px 0;
				}

				&.distance {
					color: var(--color-edge-highlight);
					cursor: default;
				}

				&:last-child {
					margin: 0;
				}
			}

			b {
				font-weight: 500;
			}

			.heading {
				display: flex;
				flex-wrap: wrap;
				align-items: center;
				gap: 0 10px;

				h1 {
					font-size: 1.4em;
					font-weight: 600;
					margin: -4px 0 6px 0;
					word-break: break-word;
					max-width: 100%;
					line-height: 1.2em;
				}

				.special-tag {
					padding: 2px 8px;
					border-radius: 4px;
					font-size: 0.8em;
					font-weight: 400;
					margin: -4px 0 6px 0;
					cursor: default;

					&.green {
						background-color: var(--color-special-highlight);
					}

					&.orange {
						background-color: var(--color-special-warn);
					}
				}
			}

			a {
				display: inline-flex;
				align-items: center;
				gap: 5px;
				color: var(--color-edge);
				text-decoration: none;

				&:hover {
					text-decoration: underline;
				}

				span {
					word-break: break-word;
					max-width: 100%;
				}
			}

			.warn-link {
				font-weight: 500;
				color: var(--color-edge-warn);
				gap: 10px;

				:global(.lucide) {
					stroke-width: 2.5px;
					min-height: 22px;
					min-width: 22px;
				}
			}

			:global(.lucide) {
				height: 18px;
				width: 18px;
				min-height: 18px;
				min-width: 18px;
			}
		}
	}
</style>
