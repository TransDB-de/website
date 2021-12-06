<script lang="ts">
	import Form from "$components/forms/elements/form.svelte"
	import Input from "$components/forms/elements/input.svelte"
	import Button from "$components/elements/button.svelte"
	
	import { parseValidationErrors } from "$lib/utils"
	import type { ValidationErrorMap } from "$models/error"
	import { popupOk, popupError, popupWarn } from "$components/popup.svelte";
	import axios from "axios"
	
	let errors: ValidationErrorMap = {};
	let loading: boolean = false;
	let formElement;
	
	export let username: string = "";
	
	async function submit() {
		errors = {};
		loading = true;
		
		try {
			await axios.put("users/me/username", { username });
			popupOk("Benutzername geändert")
		} catch(e) {
			switch(e.response.status) {
				case 422: {
					errors = parseValidationErrors(e.response.data.problems);
					popupWarn("Bitte überprüfe deine Angaben");
					break;
				}
				case 409: {
					popupWarn("Dieser Benutzername ist schon vergeben");
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

<Form on:submit={ submit } bind:this={ formElement }>
	<h2>Benutzername ändern</h2>
	
	<Input bind:value={ username } type="text" placeholder="Benutzername" error={ errors["username"] } required minlength="4" maxlength="16" />
	
	<Button { loading }>Speichern</Button>
</Form>