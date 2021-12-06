<script lang="ts">
	import type { Entry } from "$models/entry.model"
	
	import { typeMapping, offerMapping, attributeMapping } from "$lib/entryMappings"
	import mouseOverTexts from "$lib/mouseOverTexts";
	
	import EditableInputField from "$components/database/editableInputField.svelte"
	import EditableSelectField from "$components/database/editableSelectField.svelte"
	import EditableCheckbox from "$components/database/editableCheckbox.svelte"
	import EditableRadioList from "$components/database/editableRadioList.svelte"
	import Button from "$components/elements/button.svelte"
	
	import AlertTriangleIcon from "lucide-icons-svelte/alertTriangle.svelte"
	
	let edit: boolean = false;
	export let entry: Entry = null;
	
	// Deep copy
	let _entry: Entry = null;
	$: _entry = JSON.parse(JSON.stringify(entry));
	
	let noGeoData = false;
	$: noGeoData = _entry.approved && !_entry.location;
	
	let geoNotRefetched: boolean = false;
	
	let noContactDetails: boolean = false;
	$: noContactDetails = !_entry.website && !_entry.email && !_entry.telephone;
</script>

<div class="editable-entry" class:edit>
	<EditableInputField label="Name des Eintrags" bind:value={ _entry.name } />
	<EditableSelectField label="Kategorie" bind:value={ _entry.type } mapping={ typeMapping } />
	<EditableCheckbox label="Freigeschaltet" bind:checked={ _entry.approved } />
	
	<div>
		<span> Adresse </span>
		<EditableInputField label="Straße" bind:value={ _entry.address.street } />
		<EditableInputField label="Hausnummer" bind:value={ _entry.address.house } />
		<EditableInputField label="Postleitzahl" bind:value={ _entry.address.plz } />
		<EditableInputField label="Stadt / Ort" bind:value={ _entry.address.city } />
		
		{#if noGeoData}
			<span class="warn">
				<AlertTriangleIcon /> Keine Geo-Daten vorhanden!
			
				{#if !edit && geoNotRefetched}
					<Button light title={mouseOverTexts["reloadGeo"]}>Erneut versuchen</Button>
				{/if}
			</span>
		{/if}
	</div>
	
	<div>
		<span> Kontaktdaten </span>
		
		<EditableInputField label="Vorname" bind:value={ _entry.firstName } />
		<EditableInputField label="Nachname" bind:value={ _entry.lastName } />
		
		<EditableInputField label="Webseite" bind:value={ _entry.website } />
		<EditableInputField label="E-Mail" bind:value={ _entry.email } />
		<EditableInputField label="Telefonnummer" bind:value={ _entry.telephone } />
		
		{#if noContactDetails}
			<span class="warn">
				<AlertTriangleIcon /> Dieser Eintrag hat keine Kontaktdaten!
			</span>
		{/if}
	</div>
	
	<EditableRadioList label="Angebote" bind:value={ _entry.meta.offers } mapping={ offerMapping[_entry.type] } />
	<EditableRadioList label="Attribute" bind:value={ _entry.meta.attributes } mapping={ attributeMapping[_entry.type] } />
	
	<div>
		<EditableInputField label="Besonderheiten" bind:value={ _entry.meta.specials } />
		<EditableInputField label="Mindestalter" number bind:value={ _entry.meta.minAge } />
		
	</div>
</div>

<style lang="scss">
	
</style>
