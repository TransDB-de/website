<script lang="ts">
	import Form from "$formElements/form.svelte";
	import Input from "$formElements/input.svelte";
	import Button from "$components/elements/button.svelte";

	import axios from "axios";
	import { goto } from "$app/navigation";
	import type { LoginResponse } from "$models/user.model";

	import { token, userdata } from "$lib/store";
	import { popupError, popupOk } from "$components/popup.svelte";
	import { apiRequestHandler } from "$lib/apiRequestHandler";
	import { tick } from "svelte";

	let loading = $state(false);

	let login = $state({
		username: "",
		password: ""
	});

	async function submit() {
		loading = true;

		const result = await apiRequestHandler(axios.post<LoginResponse>("access/login", login));

		result.handleErrors({
			401: () => popupError("Ungültige Anmeldedaten"),
			429: () => popupError("Zu viele Versuche"),
			default: () => popupError(`Unbekannter Fehler`)
		});

		loading = false;

		if (result.success && result.data) {
			$token = result.data.token;
			$userdata = result.data.user;

			await tick();

			goto("/manage");
			popupOk("Angemeldet");
		}

		login = { username: "", password: "" };
	}
</script>

<Form onsubmit={submit}>
	<h1>Anmeldung für Teammitglieder</h1>

	<Input
		bind:value={login.username}
		label="E-Mail"
		placeholder="CMS E-Mail..."
		required
		minlength="4"
		maxlength="256"
	/>
	<Input
		bind:value={login.password}
		type="password"
		label="Passwort"
		placeholder="CMS Passwort..."
		required
		minlength="8"
		maxlength="2024"
	/>

	<Button {loading}>Anmelden</Button>
</Form>
