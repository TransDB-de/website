<script lang="ts">
	import Form from "$formElements/form.svelte"
	import Input from "$formElements/input.svelte"
	import Select from "$formElements/select.svelte"
	import Checkbox from "$formElements/checkbox.svelte"
	
	import Button from "$components/elements/button.svelte"
	import ErrorBox from "$components/elements/errorBox.svelte"
	import { popupOk, popupError, popupWarn } from "$components/popup.svelte"
	
	import { typeMappingData, attributeMapping, offerMapping, typeDescriptions, attributeDetails, subjectMapping, academicTitleMapping } from "$lib/entryMappings"
	import type { Entry } from "$models/entry.model"
	import mouseOverTexts from "$lib/mouseOverTexts"
	import axios from "axios"
	import { goto } from "$app/navigation"
	import { parseValidationErrors } from "$lib/utils"
	import type { ValidationErrorMap } from "$models/error"
	
	$: typePlaceholder = newEntry.type ? typeDescriptions[newEntry.type] : "";
	$: hasAttributes = newEntry.type ? attributeMapping[newEntry.type] ? true : false : null;
	$: attributesObject = hasAttributes ? ( attributeDetails[newEntry.type] ? Object.entries(attributeDetails[newEntry.type]) : Object.entries(attributeMapping[newEntry.type]) ) : null;
	
	let loading = false;
	let errors: ValidationErrorMap = {};
	let formElement;
	
	let newEntry: Entry = {
		type: "",
		name: null,
		academicTitle: null,
		firstName: null,
		lastName: null,
		telephone: null,
		email: null,
		website: null,
		accessible: "unknown",
		address: {
			city: null,
			plz: null,
			street: null,
			house: null
		},
		meta: {
			attributes: [],
			offers: [],
			specials: null,
			subject: null
		}
	}
	
	function resetMeta() {
		newEntry.meta = {
			attributes: [],
			offers: [],
			specials: "",
			subject: ""
		}
	}
	
	// Check and correct the contents of the Website field
	function checkWebsite(val) {
		const httpRegex = /^https?:\/\//gm;
		const removePrefixRegex = /^[a-z]*:?\/?\//gmi;
		
		if (!newEntry.website) { return; }
		
		if (newEntry.website.match(httpRegex)) { return; }
		
		// clear possibly faulty website prefix
		newEntry.website = newEntry.website.replace(
			removePrefixRegex, ""
		);
		
		// prefix https://
		newEntry.website = "https://" + newEntry.website;
	}
	
	async function submit() {
		loading = true;
		
		try {
			await axios.post("entries", newEntry);
			popupOk("Eintrag eingereicht")
		} catch(e) {
			switch(e.response.status) {
				case 422: {
					errors = parseValidationErrors(e.response.data.problems);
					popupWarn("Bitte überprüfe deine Angaben");
					break;
				}
				case 429: {
					popupError("Zu oft eingereicht. Bitte warte einige Minuten bis zum nächsten Versuch");
					break;
				}
				default: {
					popupError(`Unbekannter Fehler (${e.response.status})`);
					break;
				}
			}
			
			loading = false;
			return;
		}
		
		loading = false;
		formElement.reset();
		goto("/submitted");
	}
</script>

<Form on:submit={ submit } bind:this={ formElement }>
	<h1> Einen neuen Eintrag einreichen </h1>
	
	<Select bind:value={newEntry.type} on:change={resetMeta}>
		<option value="" disabled selected> Kategorie wählen </option>
		
		{#each Object.entries(typeMappingData) as [key, value]}
			<option value={ key }> { value } </option>
		{/each}
	</Select>
	
	{#if newEntry.type}
		<Input bind:value={ newEntry.name } placeholder={ typePlaceholder } required minlength="1" maxlength="160" error={ errors["name"] } />
	{/if}
	
	<h2> Adresse </h2>
	
	<div>
		<Input bind:value={ newEntry.address.street } placeholder="Straße" minlength="0" maxlength="50" error={ errors["address.street"] } />
		<Input bind:value={ newEntry.address.house } placeholder="Hausnummer" minlength="0" maxlength="10" error={ errors["address.house"] } />
	</div>
	
	<div>
		<Input bind:value={ newEntry.address.city } placeholder="Stadt / Ort" required minlength="2" maxlength="50" error={ errors["address.city"] } />
		<Input bind:value={ newEntry.address.plz } placeholder="Postleitzahl" minlength="0" maxlength="10" error={ errors["address.plz"] } />
	</div>
	
	<h2> Ansprechpartner*in </h2>
	
	<div>
		<Select bind:value={newEntry.academicTitle} on:change={resetMeta}>
			<option value={null} selected> Kein Titel </option>
			
			{#each Object.entries(academicTitleMapping) as [key, value]}
				<option value={ key }> { value } </option>
			{/each}
		</Select>
		<Input bind:value={ newEntry.firstName } placeholder="Vorname" minlength="2" maxlength="30" error={ errors["firstName"] } />
		<Input bind:value={ newEntry.lastName } placeholder="Nachname" minlength="2" maxlength="30" error={ errors["lastName"] } />		
	</div>
	
	<h2> Kontaktdaten </h2>
	
	<Input bind:value={ newEntry.email } type="email" placeholder="E-Mail Adresse" minlength="5" maxlength="320" error={ errors["email"] } />
	<Input bind:value={ newEntry.telephone } type="text" placeholder="Telefonnummer" minlength="5" maxlength="30" error={ errors["telephone"] } />
	<Input bind:value={ newEntry.website } type="url" placeholder="Webseite" minlength="3" maxlength="500"  error={ errors["website"] } on:change={ checkWebsite } />
	
	<h2> Spezifische Angaben </h2>
	
	{#if offerMapping[newEntry.type]}
		<h3> Angebote: </h3>

		{#each Object.entries(offerMapping[newEntry.type]) as [key, value]}
			<Checkbox bind:group={ newEntry.meta.offers } value={ key }> { value } </Checkbox>
		{/each}
	{/if}
	
	{#if hasAttributes}
		{#if offerMapping[newEntry.type]}
			<h3> Weitere Angaben: </h3>
		{/if}
		
		{#each attributesObject as [key, value]}
			<Checkbox bind:group={ newEntry.meta.attributes } value={ key }> { value } </Checkbox>
		{/each}
	{/if}
	
	{#if newEntry.type === "group"}
		
		<Input bind:value={ newEntry.meta.specials } type="text" placeholder="Besondere Angebote / Besonderheiten" maxlength="280" />
		<Input bind:value={ newEntry.meta.minAge } type="number" placeholder="Mindestalter"/> 
		
	{:else if newEntry.type === "therapist"}
		<h3> Fachrichtung: </h3>
		
		<Select bind:value={ newEntry.meta.subject } required>
			<option value="" disabled selected> Fachrichtung wählen </option>
			
			{#each Object.entries(subjectMapping.therapist) as [key, value]}
				<option value={ key }> { value } </option>
			{/each}
		</Select>
	{/if}
	
	<h3> Barrierefreiheit: </h3>
	
	<Select bind:value={ newEntry.accessible }>
		<option value="unknown" selected> Barrierefreiheit unbekannt </option>
		<option value="yes"> Barrierefrei </option>
		<option value="no"> Nicht Barrierefrei </option>
	</Select>
	
	<p>
		Bitte beachte, dass dein Eintrag von unserem Team überprüft wird bevor er auf der Seite zu finden ist.
	</p>
	
	<Button { loading }> Abschicken </Button>
</Form>
