<script lang="ts">
	import Form from "$formElements/form.svelte";
	import Input from "$formElements/input.svelte";
	import Button from "$components/elements/button.svelte";

	import axios from "axios";
	import { goto } from "$app/navigation";
	import type { ApiUserList, LoginResponse } from "$models/user.model";

	import { usercache, userdata } from "$lib/store";
	import { popupError, popupOk } from "$components/popup.svelte";
	import { apiRequestHandler } from "$lib/apiRequestHandler";
	import { tick } from "svelte";

	let loading = $state(false);

	let login = $state({
		email: "",
		password: ""
	});

	async function submit() {
		loading = true;

		const result = await apiRequestHandler(axios.post<LoginResponse>("auth/login", login));

		result.handleErrors({
			401: () => popupError("Ungültige Anmeldedaten"),
			429: () => popupError("Zu viele Versuche"),
			default: () => popupError(`Unbekannter Fehler`)
		});

		const usercacheResult = await apiRequestHandler(axios.get<ApiUserList>("users"));

		usercacheResult.handleErrors({
			default: () => popupError(`Unbekannter Fehler`)
		});

		loading = false;

		if (result.success && result.data) {
			$userdata = result.data;
			$usercache = usercacheResult.data;

			await tick();

			goto("/manage");
			popupOk("Angemeldet");
		}

		login = { email: "", password: "" };
	}
</script>

<Form onsubmit={submit}>
	<Input
		bind:value={login.email}
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
