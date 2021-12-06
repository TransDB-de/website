<script lang="ts">
	import Form from "$components/forms/elements/form.svelte"
	import Input from "$components/forms/elements/input.svelte"
	import Button from "$components/elements/button.svelte"
	
	import { parseValidationErrors } from "$lib/utils"
	import type { ValidationErrorMap } from "$models/error"
	import { popupOk, popupError, popupWarn } from "$components/popup.svelte";
	import axios from "axios"
	
	let verifyPassword: string = "";
	
	let errors: ValidationErrorMap = {};
	let loading: boolean = false;
	let formElement;
	
	let updatePasswordObject = {
		old: "",
		new: ""
	}
	
	async function submit() {
		errors = {};
		
		if (verifyPassword !== updatePasswordObject.new) {
			errors.new = "Werte ungleich";
			errors.verify = "Werte ungleich";
			popupWarn("Neue Passwörter ungleich");
			return;
		}
		
		loading = true;
		
		try {
			await axios.put("users/me/password", updatePasswordObject);
			popupOk("Neues Passwort gesetzt")
		} catch(e) {
			switch(e.response.status) {
				case 422: {
					errors = parseValidationErrors(e.response.data.problems);
					popupWarn("Bitte überprüfe deine Angaben");
					break;
				}
				case 400: {
					errors.old = "Falsches Passwort"
					popupWarn("Altes Passwort falsch");
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
	}
</script>

<Form on:submit={ submit } bind:this={ formElement }>
	<h2>Passwort ändern</h2>
	
	<Input bind:value={ updatePasswordObject.old } type="password" placeholder="Altes Passwort" error={ errors["old"] } required minlength="8" maxlength="1024" />
	<Input bind:value={ updatePasswordObject.new } type="password" placeholder="Neues Passwort" error={ errors["new"] } required minlength="8" maxlength="1024" />
	<Input bind:value={ verifyPassword } type="password" placeholder="Neues Passwort wiederholen" error={ errors["verify"] } required minlength="8" maxlength="1024" />
	
	<Button { loading }>Speichern</Button>
</Form>