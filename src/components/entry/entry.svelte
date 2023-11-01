<script lang="ts">
	import type { Entry } from "$models/entry.model"
	import { subjectMapping, typeMapping, offerMapping, attributeMapping, academicTitleMapping } from "$lib/entryMappings"
	import mouseOverTexts from "$lib/mouseOverTexts"
	
	import { goto } from "$app/navigation"
	import { userdata } from "$lib/store"
	
	import Tag from "$components/elements/tag.svelte"
	import EdgeButton from "$components/elements/edgeButton.svelte"
	import { popupOk } from "$components/popup.svelte"
	
	import DeleteEntryButton from "$components/entry/deleteEntryButton.svelte"
	import ApproveEntryButton from "$components/entry/approveEntryButton.svelte"
	import BlocklistEntryButton from "$components/entry/blocklistEntryButton.svelte"
	
	import PhoneIcon from "lucide-icons-svelte/phone.svelte"
	import MapIcon from "lucide-icons-svelte/map.svelte"
	import MailIcon from "lucide-icons-svelte/mail.svelte"
	import GlobeIcon from "lucide-icons-svelte/globe.svelte"
	import EditIcon from "lucide-icons-svelte/edit.svelte"
	import Share2Icon from "lucide-icons-svelte/share2.svelte"
	import NavigationIcon from "lucide-icons-svelte/navigation.svelte"
	import AlertTriangleIcon from "lucide-icons-svelte/alertTriangle.svelte"
	
	export let entry: Entry = null;
	
	$: isWithSubject = subjectMapping[entry.type];
	$: subjectName = isWithSubject ? subjectMapping[entry.type][entry.meta.subject] : null;
	$: website = entry.website ? new URL(entry.website).host : null;
	$: possibleDuplicateLink = entry.possibleDuplicate && $userdata?.admin ? "/manage/database?id=" + entry.possibleDuplicate : "/entry/" + entry.possibleDuplicate
	
	let addressText = "";
	$: {
		addressText = "";
		
		if (entry.address.street) addressText += entry.address.street + " ";
		if (entry.address.house) addressText += entry.address.house + ", ";
		if (entry.address.plz) addressText += entry.address.plz + " ";
		
		addressText += entry.address.city;
	}
	
	function share() {
		let url = "/entry/" + entry._id;
		
		if (navigator.share) {
			navigator.share({ url });
		} else {
			navigator.clipboard.writeText(window.location.origin + url);
			popupOk("Link in die Zwischenablage kopiert!");
		}
	}
</script>

<div class="entry">
	<div class="data">
		<div class="heading">
			<h1> { entry.name } </h1>
			
			{#if entry.accessible === "yes"}
				<span class="special-tag green" title={ mouseOverTexts["barrierFree"] }> Barrierefrei </span>
			{:else if entry.accessible === "no"}
				<span class="special-tag orange" title={ mouseOverTexts["notBarrierFree"] }> Nicht Barrierefrei </span>
			{/if}
		</div>
		
		<p class="small-gap">
			{#if isWithSubject}
				<b> { subjectName } </b>
			{:else}
				<b title={ mouseOverTexts[entry.type] }> { typeMapping[entry.type] } </b>
			{/if}
			
			{#if entry.firstName || entry.lastName}
				<span> { academicTitleMapping[entry.academicTitle] ?? "" } { entry.firstName ?? "" } { entry.lastName ?? "" } </span>
			{/if}
		</p>
		
		<p>
			<a href={`https://www.google.de/maps/search/${addressText}`} target="_blank" rel="noopener">
				<MapIcon /><span>{ addressText }</span>
			</a>
			
			{#if entry.telephone}
				<a href={`tel:${ entry.telephone }`}>
					<PhoneIcon /><span>{ entry.telephone }</span>
				</a>
			{/if}
			
			{#if entry.email}
				<a href={`mailto:${ entry.email }`}>
					<MailIcon /><span>{ entry.email }</span>
				</a>
			{/if}
			
			{#if entry.website}
				<a href={ entry.website } target="_blank" rel="noopener">
					<GlobeIcon /><span>{ website }</span>
				</a>
			{/if}
		</p>
		
		
		{#if entry.meta.offers && entry.meta.offers.length > 0 && entry.type in offerMapping}
			<p class="small-gap small-margin">
				<b> Angebote: </b>
				{#each entry.meta.offers as offer}
					{#if offer in offerMapping[entry.type]}
						<Tag title={ mouseOverTexts[offer] }> { offerMapping[entry.type][offer] } </Tag>
					{/if}
				{/each}
			</p>
		{/if}
		
		{#if entry.meta.attributes && entry.meta.attributes.length > 0 && entry.type in attributeMapping}
			<p class="small-gap small-margin">
				<b> Eigenschaften: </b>
				{#each entry.meta.attributes as attribute}
					{#if attribute in attributeMapping[entry.type]}
						<Tag title={ mouseOverTexts[attribute] }> { attributeMapping[entry.type][attribute] } </Tag>
					{/if}
				{/each}
			</p>
		{/if}
		
		{#if entry.meta.specials}
			<p class="small-gap small-margin">
				<b> Besonderheiten: </b> { entry.meta.specials }
			</p>
		{/if}
		
		{#if entry.meta.minAge}
			<p class="small-gap small-margin">
				<b> Mindestalter: </b> { entry.meta.minAge }
			</p>
		{/if}
		
		{#if entry.distance}
			<p class="small-gap distance" title={ mouseOverTexts["distance"] }>
				<NavigationIcon /> <b> { entry.distance.toFixed(1) } km - { entry.address.city } </b> 
			</p>
		{/if}
		
		{#if !entry.approved && entry.possibleDuplicate}
			<p class="small-gap">
				<a class="warn-link" href={possibleDuplicateLink} target="_blank">
					<AlertTriangleIcon /> Mögliches Duplikat
				</a>
			</p>
		{/if}
	</div>
	
	{#if !entry.blocked}
		<div class="controls">
			{#if !entry.approved}
				<ApproveEntryButton on:remove { entry } />
				<BlocklistEntryButton on:remove { entry } />
				<DeleteEntryButton on:remove { entry } />
			{:else}
				<EdgeButton on:click={() => goto("/report?id=" + entry._id)} title={ mouseOverTexts["report"] }>
					<EditIcon />
				</EdgeButton>
				
				<EdgeButton on:click={share} title={ mouseOverTexts["share"] }>
					<Share2Icon />
				</EdgeButton>
			{/if}
		</div>
	{/if}
	
</div>

<style lang="scss">
	@import "../../scss/shadows";
	@import "../../scss/mixins";
	
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
				
				&:first-of-type{
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
