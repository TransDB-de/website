<script lang="ts">
	import Form from "$formElements/form.svelte"
	import Input from "$formElements/input.svelte"
	import Button from "$components/button.svelte"

	import axios from "axios"
	import { goto } from "$app/navigation"
	import type { LoginResponse } from "$models/user.model"
	
	import { token, userdata } from "$lib/store"
	import { popupError, popupOk } from "$components/popup.svelte"
	
	let loading = false;
	let formElement;
	
	let login = {
		username: "",
		password: ""
	}
	
	async function submit() {
		loading = true;
		
		try {
			let loginResponse: LoginResponse = (await axios.post<LoginResponse>("users/me/login", login)).data;
			
			$token = loginResponse.token;
			$userdata = loginResponse.user;
			
			popupOk("Angemeldet");
		} catch(e) {
			switch(e.response.status) {
				case 401: {
					popupError("Ungültige Anmeldedaten");
					break;
				}
				case 429: {
					popupError("Zu viele Versuche");
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
		goto("/manage");
	}
</script>

<Form on:submit={ submit } bind:this={ formElement }>
	<h1> Anmeldung für Teammitglieder </h1>
	
	<Input bind:value={ login.username } placeholder="Benutzername" required minlength="4" maxlength="16" />
	<Input bind:value={ login.password } type="password" placeholder="Passwort" required minlength="8" maxlength="1024" />
	
	<Button { loading }> Anmelden </Button>
</Form>
