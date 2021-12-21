<script lang="ts">
	import type { Entry } from "$models/entry.model"
	
	import { typeMapping, offerMapping, attributeMapping, accessibleMapping, subjectMapping } from "$lib/entryMappings"
	import mouseOverTexts from "$lib/mouseOverTexts"
	
	import axios from "axios"
	import { getObjChanges, replaceFields } from "$lib/utils"
	import { popupOk, popupError } from "$components/popup.svelte"
	
	import EditableInputField from "$components/database/editableInputField.svelte"
	import EditableSelectField from "$components/database/editableSelectField.svelte"
	import EditableCheckbox from "$components/database/editableCheckbox.svelte"
	import EditableRadioList from "$components/database/editableRadioList.svelte"
	import Button from "$components/elements/button.svelte"
	import DeleteEntryButton from "$components/entry/deleteEntryButton.svelte"
	
	import AlertTriangleIcon from "lucide-icons-svelte/alertTriangle.svelte"
	import SaveIcon from "lucide-icons-svelte/save.svelte"
	import EditIcon from "lucide-icons-svelte/edit.svelte"
	import XIcon from "lucide-icons-svelte/x.svelte"
	import LinkIcon from "lucide-icons-svelte/link.svelte"
	
	let edit: boolean = false;
	export let entry: Entry = null;
	
	// Deep copy
	let _entry: Entry = null;
	_entry = JSON.parse(JSON.stringify(entry));
	
	let noGeoData = false;
	$: noGeoData = _entry.approved && !_entry.location;
	
	let geoNotRefetched: boolean = false;
	
	let noContactDetails: boolean = false;
	$: noContactDetails = !_entry.website && !_entry.email && !_entry.telephone;
	
	function editEntry() {
		edit = true;
		geoNotRefetched = true;
	}
	
	function cancelEdit() {
		edit = false;
		_entry = JSON.parse(JSON.stringify(entry));
	}
	
	function copyLink() {
		navigator.clipboard.writeText(`${window.location.origin}/manage/database?id=${_entry._id}`);
		popupOk("Link in die Zwischenablage kopiert!");
	}
	
	async function saveChanges() {
		let changes = getObjChanges(entry, _entry);
		changes = replaceFields(changes, "", null);
		
		if (Object.keys(changes).length < 1) return;
		
		edit = false;
		
		try {
			await axios.patch(`entries/${_entry._id}/edit`, changes);
			
			entry = JSON.parse(JSON.stringify(_entry));
			
			popupOk("Änderungen gespeichert");
		} catch (e) {
			if (e.response) {
				popupError(`Fehler beim Speichern (${e.response.status})`);
			} else {
				popupError("Unbekannter Fehler beim Speichern");
			}
		}
	}
	
	async function refetchGeo() {
		geoNotRefetched = false;
		
		try {
			await axios.patch(`entries/${entry._id}/updateGeo`);
			popupOk("Geodaten-Update angefragt. Bitte warte ein wenig und lade die Seite dann neu");
		} catch (e) {
			if (e.response) {
				popupError(`Fehler (${e.response.status})`);
			} else {
				popupError("Unbekannter Fehler");
			}
		}
	}
</script>


<div class="editable-entry">
	<div class="auto-grid">
		<div class="header">
			<EditableInputField label="Name des Eintrags" bind:value={ _entry.name } { edit } />
			<EditableSelectField label="Kategorie" bind:value={ _entry.type } mapping={ typeMapping } { edit } />
			<EditableCheckbox label="Blacklisted" bind:checked={ _entry.blacklisted } { edit } class="narrow"/>
			<EditableCheckbox label="Freigeschaltet" bind:checked={ _entry.approved } { edit } class="narrow"/>
		</div>
		
		<div>
			<span class="group-title"> Adresse </span>
			<div class="sub-grid">
				<EditableInputField label="Straße" bind:value={ _entry.address.street } { edit } />
				<EditableInputField label="Hausnummer" bind:value={ _entry.address.house } { edit } />
				<EditableInputField label="Postleitzahl" bind:value={ _entry.address.plz } { edit } />
				<EditableInputField label="Stadt / Ort" bind:value={ _entry.address.city } { edit } />
			</div>
			
			{#if noGeoData}
				<span class="warn">
					<AlertTriangleIcon /> <span>Keine Geo-Daten vorhanden!</span>
				
					{#if edit && geoNotRefetched}
						<Button light title={mouseOverTexts["reloadGeo"]} on:click={ refetchGeo }>Erneut versuchen</Button>
					{/if}
				</span>
			{/if}
		</div>
		
		<div>
			<span class="group-title"> Kontaktdaten </span>
			
			<div class="sub-grid">
				<EditableInputField label="Vorname" bind:value={ _entry.firstName } { edit } />
				<EditableInputField label="Nachname" bind:value={ _entry.lastName } { edit } />
				
				<EditableInputField label="Webseite" bind:value={ _entry.website } { edit } />
				<EditableInputField label="E-Mail" bind:value={ _entry.email } { edit } />
				<EditableInputField label="Telefonnummer" bind:value={ _entry.telephone } { edit } />
			</div>
			
			{#if noContactDetails}
				<span class="warn">
					<AlertTriangleIcon /> <span>Dieser Eintrag hat keine Kontaktdaten!</span>
				</span>
			{/if}
		</div>
		
		<div class="sub-grid">
			<EditableRadioList label="Angebote" bind:value={ _entry.meta.offers } mapping={ offerMapping[_entry.type] } { edit } />
			<EditableRadioList label="Attribute" bind:value={ _entry.meta.attributes } mapping={ attributeMapping[_entry.type] } { edit } />
		</div>
		
		<div class="sub-grid">
			<EditableInputField label="Besonderheiten" bind:value={ _entry.meta.specials } { edit } />
			<EditableInputField label="Mindestalter" number bind:value={ _entry.meta.minAge } { edit } />
			
			{#if subjectMapping[_entry.type]}
				<EditableSelectField label="Fachrichtung" bind:value={ _entry.meta.subject } mapping={ accessibleMapping } { edit } />
			{/if}
			
			<EditableSelectField label="Barrierefrei" bind:value={ _entry.accessible } mapping={ accessibleMapping } { edit } />
		</div>
	</div>
	
	<div class="controls">
		{#if edit}
			<Button light iconOnly on:click={ saveChanges }  title={ mouseOverTexts["saveChanges"] }> <SaveIcon /> </Button>
			<Button light iconOnly on:click={ cancelEdit } title={ mouseOverTexts["discardChanges"] }> <XIcon /> </Button>
			<DeleteEntryButton on:remove { entry } />
		{:else}
			<Button light iconOnly on:click={ editEntry } title={ mouseOverTexts["editEntry"] }> <EditIcon /> </Button>
			<Button light iconOnly on:click={ copyLink } title={ mouseOverTexts["copyLink"] }> <LinkIcon /> </Button>
		{/if}
	</div>
</div>

<style lang="scss">
	@import "../../scss/shadows";
	@import "../../scss/mixins";
	
	.editable-entry {
		display: flex;
		background-color: var(--color-background-bright);
		box-shadow: $surface-shadow-soft;
		border-radius: 4px;
		padding: 10px;
		gap: 10px;
		
		@include media-mobile {
			flex-direction: column;
		}
		
		.controls {
			display: flex;
			flex-direction: column;
			gap: 10px;
		}
		
		.group-title {
			font-size: 0.9em;
			font-weight: 500;
			margin-left: -2px;
			margin-top: -2px;
		}
		
		.header {
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
			overflow: hidden;
			
			@include media-mobile {
				grid-template-columns: 1fr;
			}
			
			gap: 10px;
			grid-column: 1 / -1;
			
			:global(div) {
				grid-column: span 2;
				
				@include media-mobile {
					grid-column: unset;
				}
			}
			
			:global(.narrow) {
				grid-column: span 1;
			}
		}
	}
	
	.auto-grid {
		display: grid;
		flex-grow: 1;
		gap: 10px;
		grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
		
		@include media-mobile {
			grid-template-columns: minmax(0, 1fr);
		}
		
		:global(.lucide) {
			height: 18px;
			width: 18px;
			min-height: 18px;
			min-width: 18px;
		}
		
		// Every div element (including components) that is in the entry gets a border
		& > :global(div) {
			border-radius: 4px;
			padding: 5px 8px;
			border: 1px solid var(--color-rim-bright);
		}
		
		& > div {
			display: flex;
			flex-direction: column;
			gap: 10px;
			
			span {
				font-size: 0.8em;
				color: var(--color-edge-dimmed);
			}
		}
		
		.sub-grid {
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
			min-width: 0;
			
			@include media-mobile {
				grid-template-columns: minmax(0, 1fr);
			}
			
			gap: 10px;
		}
		
		.warn {
			display: flex;
			align-items: center;
			justify-content: flex-start;
			gap: 10px;
			min-height: 35px;
			
			&, span {
				color: var(--color-edge-warn);
				font-size: 15px;
			}
			
			:global(button) {
				min-height: unset;
			}
		}
	}
</style>
