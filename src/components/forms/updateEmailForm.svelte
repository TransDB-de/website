<script lang="ts">
	import Form from "$formElements/form.svelte"
	import Input from "$formElements/input.svelte"
	import Button from "$components/elements/button.svelte"
	
	import { parseValidationErrors } from "$lib/utils"
	import type { ValidationErrorMap } from "$models/error"
	import { popupOk, popupError, popupWarn } from "$components/popup.svelte";
	import axios from "axios"
	
	let errors: ValidationErrorMap = {};
	let loading: boolean = false;
	
	export let email: string = "";
	
	async function submit() {
		errors = {};
		loading = true;
		
		try {
			await axios.put("users/me/email", { email });
			popupOk("E-Mail geändert")
		} catch(e) {
			switch(e.response.status) {
				case 422: {
					errors = parseValidationErrors(e.response.data.problems);
					popupWarn("Bitte überprüfe deine Angaben");
					break;
				}
				case 409: {
					popupWarn("Ein Nutzer mit dieser E-Mail existiert bereits");
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
	}
</script>

<Form on:submit={ submit } >
	<h2>E-Mail ändern</h2>
	
	<Input bind:value={ email } type="email" placeholder="E-Mail Adresse" error={ errors["email"] } required />
	
	<Button { loading }>Speichern</Button>
</Form>
