<script lang="ts">
	import Form from "$formElements/form.svelte"
	import Input from "$formElements/input.svelte"
	import Button from "$components/elements/button.svelte"
	import Checkbox from "$formElements/checkbox.svelte"
	
	import UserPlusIcon from "lucide-icons-svelte/userPlus.svelte"
	
	import { fetchUsers } from "$components/usersCollection.svelte"
	
	import { parseValidationErrors } from "$lib/utils"
	import type { ValidationErrorMap } from "$models/error"
	import { popupError, popupWarn } from "$components/popup.svelte"
	import axios from "axios"
	import type { User } from "$models/user.model"
	
	let errors: ValidationErrorMap = {};
	let loading: boolean = false;
	let formElement;
	
	let createUser = {
		username: "",
		email: "",
		admin: false
	}
	
	async function submit() {
		errors = {};
		loading = true;
		
		try {
			let res = await axios.post<User>("users", createUser);
			let user: User = res.data;
			
			await navigator.clipboard.writeText(user.password);
			popupWarn("Nutzer hinzugefügt - Passwort in Zwischenablage kopiert");
			fetchUsers();
		} catch(e) {
			switch(e.response.status) {
				case 422: {
					errors = parseValidationErrors(e.response.data.problems);
					popupWarn("Bitte überprüfe deine Angaben");
					break;
				}
				case 409: {
					popupWarn("Dieser Benutzer existiert bereits");
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

<Form on:submit={ submit } bind:this={ formElement } class="inline">
	<Input bind:value={ createUser.username } type="text" placeholder="Benutzername" error={ errors["username"] } required minlength="4" maxlength="16" />
	<Input bind:value={ createUser.email } type="email" placeholder="E-Mail Adresse" error={ errors["email"] } required />
	<Checkbox bind:checked={ createUser.admin } single value="admin">Admin</Checkbox>
	
	<Button { loading } iconOnly>
		<UserPlusIcon />
	</Button>
</Form>