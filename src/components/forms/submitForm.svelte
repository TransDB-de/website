<script lang="ts">
	import Form from "$formElements/form.svelte"
	import Input from "$formElements/input.svelte"
	import Select from "$formElements/select.svelte"
	import Checkbox from "$formElements/checkbox.svelte"
	
	import Button from "$components/elements/button.svelte"
	import ErrorBox from "$components/elements/errorBox.svelte"
	import { popupOk, popupError, popupWarn } from "$components/popup.svelte"
	
	import type { Entry } from "$models/entry.model"
	import config from "$lib/config"
	import { t, tEntry } from "$lib/localization"
	import axios from "axios"
	import { goto } from "$app/navigation"
	import { parseValidationErrors, type NestedDict } from "$lib/utils"
	import type { ValidationErrorMap } from "$models/error"
	import { slide } from "svelte/transition"
	
	import { typeMapping, offerMapping, attributeMapping, subjectMapping, academicTitleMapping } from "$lib/entryMappings";
	
	$: typePlaceholder = newEntry.type ? tEntry("typeDescriptions")[newEntry.type] : "";

	let loading = false;
	let errors: ValidationErrorMap = {};
	let formElement;
	let isSpecialsFocused = false;
	
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
			subject: null,
			minAge: null
		}
	}
	
	function resetMeta() {
		newEntry.meta = {
			attributes: [],
			offers: [],
			specials: "",
			subject: "",
			minAge: null
		}
	}

	function specialsFocus(value: boolean) {
		isSpecialsFocused = value;
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
			popupOk(t("submitForm.submittedPopup"))
		} catch(e) {
			switch(e.response.status) {
				case 422: {
					errors = parseValidationErrors(e.response.data.problems);
					popupWarn(t("errors.checkInput"));
					break;
				}
				case 429: {
					popupError(t("errors.tooMany"));
					break;
				}
				default: {
					popupError(`${t("errors.unknown")} (${e.response.status})`);
					break;
				}
			}
			
			loading = false;
			return;
		}
		
		loading = false;
		formElement.reset();
		
		if (typeof umami !== "undefined") umami.track(config.umami_event_new_entry);
		
		goto("/submitted");
	}
</script>

<Form on:submit={ submit } bind:this={ formElement }>
	<h1> { t("submitForm.header") } </h1>
	
	<Select bind:value={ newEntry.type } on:change={ resetMeta }>
		<option value="" disabled selected> { t("submitForm.selectCategory") } </option>
		
		{#each typeMapping as type}
			<option value={ type }> { tEntry("typeMapping")[type] } </option>
		{/each}
	</Select>
	
	{#if newEntry.type}
		<Input bind:value={ newEntry.name } placeholder={ typePlaceholder } required minlength="1" maxlength="160" error={ errors["name"] } />
	{/if}
	
	<h2> { t("submitForm.address") } </h2>
	
	<div>
		<Input bind:value={ newEntry.address.street } placeholder={ t("submitForm.street") } minlength="0" maxlength="50" error={ errors["address.street"] } />
		<Input bind:value={ newEntry.address.house } placeholder={ t("submitForm.house") } minlength="0" maxlength="10" error={ errors["address.house"] } />
	</div>
	
	<div>
		<Input bind:value={ newEntry.address.city } placeholder={ t("submitForm.city") } required minlength="2" maxlength="50" error={ errors["address.city"] } />
		<Input bind:value={ newEntry.address.plz } placeholder={ t("submitForm.plz") } minlength="0" maxlength="10" error={ errors["address.plz"] } />
	</div>
	
	<h2> { t("submitForm.contact") } </h2>
	
	<div>
		<Select bind:value={newEntry.academicTitle} on:change={ resetMeta }>
			<option value={null} selected> { t("submitForm.noTitle") } </option>
			
			{#each academicTitleMapping as title}
				<option value={ title }> { tEntry("academicTitleMapping")[title] } </option>
			{/each}
		</Select>
		<Input bind:value={ newEntry.firstName } placeholder={ t("submitForm.firstName") } minlength="2" maxlength="30" error={ errors["firstName"] } />
		<Input bind:value={ newEntry.lastName } placeholder={ t("submitForm.lastName") } minlength="2" maxlength="30" error={ errors["lastName"] } />		
	</div>
	
	<h2> { t("submitForm.contactDetails") } </h2>
	
	<Input bind:value={ newEntry.email } type="email" placeholder={ t("submitForm.email") } minlength="5" maxlength="320" error={ errors["email"] } />
	<Input bind:value={ newEntry.telephone } type="text" placeholder={ t("submitForm.tel") } minlength="5" maxlength="30" error={ errors["telephone"] } />
	<Input bind:value={ newEntry.website } type="url" placeholder={ t("submitForm.website") } minlength="3" maxlength="500"  error={ errors["website"] } on:change={ checkWebsite } />
	
	<h2> { t("submitForm.specifics") } </h2>
	
	{#if offerMapping[newEntry.type]}
		<h3> { t("submitForm.offers") } </h3>

		<ErrorBox error={ errors["meta.offers"] }>
			{#each offerMapping[newEntry.type] as offer}
				<Checkbox bind:group={ newEntry.meta.offers } value={ offer }> { tEntry("offerDetails")[offer] } </Checkbox>
			{/each}
		</ErrorBox>
	{/if}
	
	{#if attributeMapping[newEntry.type]}
		{#if offerMapping[newEntry.type]}
			<h3> { t("submitForm.attributes") } </h3>
		{/if}
		
		{#each attributeMapping[newEntry.type] as attribute}
			<Checkbox bind:group={ newEntry.meta.attributes } value={ attribute }> { tEntry("attributeDetails")[attribute] } </Checkbox>
		{/each}
	{/if}
	
	{#if isSpecialsFocused}
		<p class="info" transition:slide>
			{t("submitForm.specialsInfo")[0]}<br/>
			{t("submitForm.specialsInfo")[1]}
		</p>
	{/if}

	<Input bind:value={ newEntry.meta.specials } on:focus={() => specialsFocus(true)} on:blur={() => specialsFocus(false)} type="text" placeholder={ t("submitForm.specials") } maxlength="280" />
	
	{#if newEntry.type === "group"}
		
		<Input bind:value={ newEntry.meta.minAge } type="number" placeholder={ t("submitForm.minAge") }/> 
		
	{:else if newEntry.type === "therapist"}
		<h3> { t("submitForm.subject") } </h3>
		
		<Select bind:value={ newEntry.meta.subject } required>
			<option value="" disabled selected> { t("submitForm.selectSubject") } </option>
			
			{#each subjectMapping[newEntry.type] as subject}
				<option value={ subject }> { tEntry("subjectMapping")[subject] } </option>
			{/each}
		</Select>
	{/if}
	
	<h3> { t("submitForm.accessibility") } </h3>
	
	<Select bind:value={ newEntry.accessible }>
		<option value="unknown" selected> { t("submitForm.accessibilityUnknown") } </option>
		<option value="yes"> { t("submitForm.accessible") } </option>
		<option value="no"> { t("submitForm.notAccessible") } </option>
	</Select>
	
	<p>
		{ t("submitForm.info") }
	</p>
	
	<Button { loading }> {t("submitForm.submit")} </Button>
</Form>

<style lang="scss">
	h3::after {
		content: ":";
	}
</style>
