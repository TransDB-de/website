<script lang="ts">
	import type { Entry } from "$models/entry.model"
	import { subjectMapping, typeMapping, offerMapping, attributeMapping } from "$lib/entryMappings"
	import mouseOverTexts from "$lib/mouseOverTexts"
	
	import Tag from "$components/tag.svelte"
	import LightButton from "$components/lightButton.svelte"
	
	import PhoneIcon from "lucide-icons-svelte/phone.svelte"
	import MapIcon from "lucide-icons-svelte/map.svelte"
	import MailIcon from "lucide-icons-svelte/mail.svelte"
	import GlobeIcon from "lucide-icons-svelte/globe.svelte"
	import EditIcon from "lucide-icons-svelte/edit.svelte"
	import Share2Icon from "lucide-icons-svelte/share2.svelte"
	
	export let entry: Entry = null;
	
	$: isWithSubject = subjectMapping[entry.type];
	$: subjectName = isWithSubject ? subjectMapping[entry.type][entry.meta.subject] : null;
	
	let addressText = "";
	$: {
		if (entry.address.street) addressText += entry.address.street + " ";
		if (entry.address.house) addressText += entry.address.house + ", ";
		if (entry.address.plz) addressText += entry.address.plz + " ";
		
		addressText += entry.address.city;
	}
</script>

<div class="entry">
	<div class="data">
		<h1>
			{entry.name}
			
			{#if entry.accessible === "yes"}
				<span class="special-tag green"> Barrierefrei </span>
			{:else if entry.accessible === "no"}
				<span class="special-tag orange"> Nicht Barrierefrei </span>
			{/if}
		</h1>
		
		<p class="small-gap">
			<b> {entry.firstName} {entry.lastName} </b>
			
			{#if isWithSubject}
				<span> {subjectName} </span>
			{:else}
				<span title={mouseOverTexts[entry.type]}> {typeMapping[entry.type]} </span>
			{/if}
		</p>
		
		<p>
			<a href={`https://www.google.de/maps/search/${addressText}`} target="_blank" rel="noopener">
				<MapIcon />{ addressText }
			</a>
	
			{#if entry.telephone}
				<a href={`tel:${entry.telephone}`}>
					<PhoneIcon />{ entry.telephone }
				</a>
			{/if}
			
			{#if entry.email}
				<a href={`mailto:${entry.email}`}>
					<MailIcon />{ entry.email }
				</a>
			{/if}
			
			{#if entry.website}
				<a href={entry.website} target="_blank" rel="noopener">
					<GlobeIcon />{ entry.website }
				</a>
			{/if}
		</p>
		
		
		{#if entry.meta.offers}
			<p class="small-gap small-margin">
				<b> Angebote: </b>
				{#each entry.meta.offers as offer}
					<Tag title={mouseOverTexts[offer]}> {offerMapping[entry.type][offer]} </Tag>
				{/each}
			</p>
		{/if}
		
		{#if entry.meta.attributes}
			<p class="small-gap small-margin">
				<b> Eigenschaften: </b>
				{#each entry.meta.attributes as attribute}
					<Tag title={mouseOverTexts[attribute]}> {attributeMapping[entry.type][attribute]} </Tag>
				{/each}
			</p>
		{/if}
		
		{#if entry.meta.specials}
			<p>
				<b> Besonderheiten: </b> {entry.meta.specials}
			</p>
		{/if}
		
		{#if entry.meta.minAge}
			<p>
				<b> Mindestalter: </b> {entry.meta.minAge}
			</p>
		{/if}
	</div>
	
	<div class="controls">
		<LightButton>
			<EditIcon />
		</LightButton>
		
		<LightButton>
			<Share2Icon />
		</LightButton>
	</div>
</div>

<style lang="scss">
	@import "../scss/shadows";
	
	.entry {
		display: flex;
		background-color: var(--color-background-bright);
		box-shadow: $surface-shadow-soft;
		border-radius: 4px;
		padding: 10px 20px;
		
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
				
				&:last-child {
					margin: 0;
				}
			}
			
			b {
				font-weight: 500;
			}
			
			h1 {
				display: flex;
				flex-wrap: wrap;
				align-items: center;
				gap: 0 10px;
				margin: 0;
				font-size: 1.4em;
				font-weight: 600;
			}
			
			.special-tag {
				padding: 0px 8px;
				border-radius: 4px;
				font-size: 0.6em;
				font-weight: 400;
				
				&.green {
					background-color: var(--color-special-highlight);
				}
				
				&.orange {
					background-color: var(--color-special-warn);
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
			}
			
			:global(.lucide) {
				height: 18px;
				width: 18px;
			}
		}
		
		.controls {
			display: flex;
			flex-direction: column;
			gap: 10px;
		}
	}
</style>