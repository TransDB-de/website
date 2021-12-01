<script lang="ts">
	import Form from "$components/forms/elements/form.svelte"
	import Input from "$components/forms/elements/input.svelte"
	import Select from "./elements/select.svelte"
	import Checkbox from "./elements/checkbox.svelte"
	import Button from "$components/button.svelte";
	import ErrorBox from "$components/errorBox.svelte";
	
	import { typeMapping, attributeMapping, offerMapping, typeDescriptions } from "$lib/entryMappings"
	import type { Entry } from "$models/entry.model";
	import mouseOverTexts from "$lib/mouseOverTexts";
	import axios from "axios";
	import { goto } from "$app/navigation";
	import { parseValidationErrors } from "$lib/utils";
	import type { ValidationErrorMap } from "$models/error";
	
	$: typePlaceholder = newEntry.type ? typeDescriptions[newEntry.type] : "";
	
	let loading = false;
	let errors: ValidationErrorMap = {};
	let formElement;

	let newEntry: Entry = {
		type: "",
		name: null,
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
	
	async function submit() {
		loading = true;
		
		//TODO: Replace console.log with actual error messages
		try {
			await axios.post("entries", newEntry);
			console.log("success")
		} catch(e) {
			switch(e.response.status) {
				case 422:
					errors = parseValidationErrors(e.response.data.problems);
					break;
				case 429:
					console.log("too many requests");
					break;
				default:
					console.log("unknown error");
					break;
			}
			
		} finally {
			loading = false;
		}
		
		console.log(errors);
		
		//formElement.reset();
		//goto("/submitted");
	}
</script>

<Form on:submit={submit} bind:this={formElement}>
	<h1>Einen neuen Eintrag einreichen</h1>
	
	<Select bind:value={newEntry.type} on:change={resetMeta}>
		<option value="" disabled selected>Kategorie wählen</option>
		
		{#each Object.entries(typeMapping) as [key, value]}
			<option value={key}>{value}</option>
		{/each}
	</Select>
	
	{#if newEntry.type}
		<Input bind:value={newEntry.name} placeholder={typePlaceholder} required minlength="100" maxlength="100" error={errors["name"]} />
	{/if}
	
	<h2>Adresse</h2>
	
	<div>
		<Input bind:value={newEntry.address.street} placeholder="Straße" required error={errors["address.street"]} />
		<Input bind:value={newEntry.address.house} placeholder="Hausnummer" required error={errors["address.house"]} />
	</div>
	
	<div>
		<Input bind:value={newEntry.address.city} placeholder="Stadt / Ort" required error={errors["address.city"]} />
		<Input bind:value={newEntry.address.plz} placeholder="Postleitzahl" required error={errors["address.plz"]} />
	</div>
	
	<h2>Ansprechpartner*in</h2>
	
	<div>
		<Input bind:value={newEntry.firstName} placeholder="Vorname" minlength="2" maxlength="30" error={errors["firstName"]} />
		<Input bind:value={newEntry.lastName} placeholder="Nachname" minlength="2" maxlength="30" error={errors["lastName"]} />		
	</div>
	
	<h2>Kontaktdaten</h2>
	
	<Input bind:value={newEntry.email} type="email" placeholder="E-Mail Adresse" minlength="5" maxlength="320" error={errors["email"]} />
	<Input bind:value={newEntry.telephone} type="text" placeholder="Telefonnummer" minlength="5" maxlength="30" error={errors["telephone"]} />
	<Input bind:value={newEntry.website} type="url" placeholder="Webseite" minlength="3" maxlength="500"  error={errors["website"]} />
	
	<h2>Spezifische Angaben</h2>
	
	{#if newEntry.type === "group"}
	
		{#each Object.entries(attributeMapping.group) as [key, value]}
			<Checkbox bind:group={newEntry.meta.attributes} value={key} title={mouseOverTexts[key]}>{value}</Checkbox>
		{/each}
		
		<Input bind:value={newEntry.meta.specials} type="text" placeholder="Besondere Angebote / Besonderheiten" maxlength="280" />
		<Input bind:value={newEntry.meta.minAge} type="number" placeholder="Mindestalter"/> 
		
	{:else if newEntry.type === "therapist"}
	
		<Select bind:value={newEntry.meta.subject} required>
			<option value="" disabled selected>Fachrichtung wählen</option>
			<option value="therapist">Psychologische*r Psychotherapeut*in</option>
			<option value="psychologist">Psychiater (Facharzt für Psychiatrie)</option>
		</Select>

		<h3>Angebote:</h3>
		
		<ErrorBox error={errors["meta.offers"]}>
			{#each Object.entries(offerMapping.therapist) as [key, value]}
				<Checkbox bind:group={newEntry.meta.offers} value={key} title={mouseOverTexts[key]}>{value}</Checkbox>
			{/each}
		</ErrorBox>
		
	{:else if newEntry.type === "surveyor"}
	
		{#each Object.entries(attributeMapping.surveyor) as [key, value]}
			<Checkbox bind:group={newEntry.meta.attributes} value={key} title={mouseOverTexts[key]}>{value}</Checkbox>
		{/each}
		
	{:else if newEntry.type === "surgeon"}
	
		<h3>Angebotene Operationen:</h3>
		
		<ErrorBox error={errors["meta.offers"]}>
			{#each Object.entries(offerMapping.surgeon) as [key, value]}
				<Checkbox bind:group={newEntry.meta.offers} value={key} title={mouseOverTexts[key]}>{value}</Checkbox>
			{/each}
		</ErrorBox>
		
	{:else if newEntry.type === "hairremoval"}
	
		<h3>Angebote:</h3>
		
		<ErrorBox error={errors["meta.offers"]}>
			{#each Object.entries(offerMapping.hairremoval) as [key, value]}
				<Checkbox bind:group={newEntry.meta.offers} value={key} title={mouseOverTexts[key]}>{value}</Checkbox>
			{/each}
		</ErrorBox>

		<h3>Weitere Infos:</h3>
		{#each Object.entries(attributeMapping.hairremoval) as [key, value]}
			<Checkbox bind:group={newEntry.meta.attributes} value={key} title={mouseOverTexts[key]}>{value}</Checkbox>
		{/each}
		
	{:else if newEntry.type === "endocrinologist"}
	
		{#each Object.entries(attributeMapping.endocrinologist) as [key, value]}
			<Checkbox bind:group={newEntry.meta.attributes} value={key} title={mouseOverTexts[key]}>{value}</Checkbox>
		{/each}
		
	{/if}
	
	<h3>Räumlichkeiten:</h3>
	
	<Select bind:value={newEntry.accessible}>
		<option value="unknown" selected>Barrierefreiheit unbekannt</option>
		<option value="yes">Barrierefrei</option>
		<option value="no">Nicht Barrierefrei</option>
	</Select>
	
	<p>
		Bitte beachte, dass dein Eintrag von unserem Team überprüft wird bevor er auf der Seite zu finden ist.
	</p>
	
	<Button {loading}>Abschicken</Button>
</Form>