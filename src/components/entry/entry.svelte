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
	import ArchiveEntryButton from "$components/entry/archiveEntryButton.svelte";

	import {
		Phone,
		Map,
		Mail,
		Globe,
		Share2,
		Navigation,
		AlertTriangle,
		FilePen
	} from "@lucide/svelte";

	import { subjectMapping, offerMapping, attributeMapping } from "$lib/entryMappings";
	import LinkButton from "$components/elements/LinkButton.svelte";

	interface Props {
		entry: Entry;
		onremove?: (entry: Entry) => void;
		actions?: "approve" | "edit";
	}

	const props: Props = $props();

	let isWithSubject = $derived(subjectMapping[props.entry.type]);
	let subjectName = $derived(
		isWithSubject ? tEntry("subjectMapping")[props.entry.subject ?? ""] : null
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
		let url = "/entry/" + props.entry.id;

		if (navigator.share) {
			navigator.share({ url });
		} else {
			navigator.clipboard.writeText(window.location.origin + url);
			popupOk(t("infos.copiedLinkToClipboard"));
		}
	}
</script>

<article>
	<div class="data">
		<div class="heading">
			<h2>{props.entry.name}</h2>

			{#if props.entry.accessible === true}
				<span class="special-tag green" title={t("mouseOverTexts.barrierFree")}>
					{t("entryMapping.accessibleMapping.yes")}
				</span>
			{:else if props.entry.accessible === false}
				<span class="special-tag orange" title={t("mouseOverTexts.notBarrierFree")}>
					{t("entryMapping.accessibleMapping.no")}
				</span>
			{/if}

			{#if props.actions === "edit" && props.entry.status?.blocked}
				<span class="special-tag red"> Blockiert </span>
			{/if}
		</div>

		<h3 class="small-gap">
			{#if isWithSubject}
				<b> {subjectName} </b>
			{:else}
				<b> {tEntry("typeMapping")[props.entry.type]} </b>
			{/if}

			{#if props.entry.contact?.firstName || props.entry.contact?.lastName}
				<span>
					{tEntry("academicTitleMapping")[props.entry.contact?.academicTitle ?? ""] ?? ""}
					{props.entry.contact?.firstName ?? ""}
					{props.entry.contact?.lastName ?? ""}
				</span>
			{/if}
		</h3>

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

		{#if props.entry.offers && props.entry.offers.length > 0 && props.entry.type in offerMapping}
			<p class="small-gap small-margin">
				<b> {t("entry.offers")}: </b>
				{#each props.entry.offers as offer (offer)}
					<Tag title={tEntry("offerDetails")[offer]}>{tEntry("offerMapping")[offer]}</Tag>
				{/each}
			</p>
		{/if}

		{#if props.entry.attributes && props.entry.attributes.length > 0 && props.entry.type in attributeMapping}
			<section class="small-gap small-margin">
				<b> {t("entry.attributes")}: </b>
				{#each props.entry.attributes as attribute (attribute)}
					<Tag title={tEntry("attributeDetails")[attribute]}>
						{tEntry("attributeMapping")[attribute]}
					</Tag>
				{/each}
			</section>
		{/if}

		{#if props.entry.specials}
			<section class="small-gap small-margin specials">
				<b> {t("entry.specials")}: </b>
				<pre>{props.entry.specials}</pre>
			</section>
		{/if}

		{#if props.entry.distance}
			<p class="small-gap distance" title={t("mouseOverTexts.distance")}>
				<Navigation /> <b> {props.entry.distance.toFixed(1)} km - {props.entry.address.city} </b>
			</p>
		{/if}

		{#if !props.entry.status?.approved && props.entry.possibleDuplicate}
			<p class="small-gap">
				<a class="warn-link" href={possibleDuplicateLink} target="_blank">
					<AlertTriangle />
					{t("entry.possibleDuplicate")}
				</a>
			</p>
		{/if}
	</div>

	<div class="controls">
		{#if props.actions === "approve"}
			<ApproveEntryButton onremove={props.onremove} entry={props.entry} />
			<BlocklistEntryButton onremove={props.onremove} entry={props.entry} />
			<ArchiveEntryButton onremove={props.onremove} entry={props.entry} />
			<DeleteEntryButton onremove={props.onremove} entry={props.entry} />
		{:else if props.actions === "edit"}
			<LinkButton
				light
				iconOnly
				href={"/manage/database/entry/" + props.entry.id}
				title={t("mouseOverTexts.editEntry")}
			>
				<FilePen />
			</LinkButton>
			<DeleteEntryButton onremove={props.onremove} entry={props.entry} />
		{:else}
			<EdgeButton
				onclick={() => goto("/report?id=" + props.entry.id)}
				title={t("mouseOverTexts.report")}
			>
				<FilePen />
			</EdgeButton>

			<EdgeButton onclick={share} title={t("mouseOverTexts.share")}>
				<Share2 />
			</EdgeButton>
		{/if}
	</div>
</article>

<style lang="scss">
	@use "../../scss/shadows" as *;
	@use "../../scss/mixins" as *;

	article {
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

			p,
			h3,
			section {
				display: flex;
				align-items: center;
				flex-wrap: wrap;
				gap: 10px 20px;
				margin: 0 0 20px 0;
				font-size: 0.9em;

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

			section.specials {
				flex-direction: column;
				align-items: flex-start;
				pre {
					margin: 0;
					font-size: inherit;
					font-family: inherit;
					color: inherit;
					white-space: preserve-breaks;
				}
			}

			b {
				font-weight: 500;
			}

			h3 {
				font-size: 1rem;
				font-weight: 400;
				margin: 0 0 20px 2px;
				font-family: inherit;

				b {
					font-weight: 600;
				}
			}

			.heading {
				display: flex;
				flex-wrap: wrap;
				align-items: center;
				gap: 0 10px;

				h2 {
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

					&.orange {
						background-color: var(--color-special-warn);
					}

					&.red {
						background-color: var(--color-special-error);
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
