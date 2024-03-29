<script lang="ts">
	import Form from "$formElements/form.svelte"
	import EntryComponent from "$components/entry/entry.svelte"
	import Textarea from "$formElements/textarea.svelte"
	import Button from "$components/elements/button.svelte"
	import Loader from "$components/elements/loader.svelte"
	import Select from "$formElements/select.svelte"
	import { popupError, popupOk } from "$components/popup.svelte"
	
	import ReportNote from "$content/report-note.md"
	
	import { page } from "$app/stores"
	import { goto } from "$app/navigation"
	import { slide } from "svelte/transition";
	
	import type { Entry } from "$models/entry.model"
	import { onMount } from "svelte"
	import axios from "axios"
	import type { Report } from "$models/report.model"
	
	let entry: Entry = null;
	let loading = false;
	let formElement;
	
	let report: Report = {
		id: $page.url.searchParams.get("id"),
		type: "",
		message: ""
	}
	
	onMount(async () => {
		try {
			let res = await axios.get<Entry>("/entries/" + $page.url.searchParams.get("id"));
			entry = res.data;
		} catch (e) {
			switch(e.response.status) {
				case 404: {
					popupError("Eintrag nicht gefunden");
					break;
				}
				default: {
					popupError(`Unbekannter Fehler (${e.response.status})`)
					break;
				}	
			}
		}
	});
	
	async function submit() {
		loading = true;
		
		try {
			await axios.post<Entry>("/report", report);
		} catch (e) {
			switch(e.response.status) {
				case 500: {
					popupError("Meldung konnte nicht gesendet werden");
					break;
				}
				default: {
					popupError(`Unbekannter Fehler (${e.response.status})`)
					break;
				}
			}
			
			loading = false;
			return;
		}
		
		loading = false;
		formElement.reset();
		popupOk("Meldung erfolgreich abgesendet");
		goto("/reported");
	}
</script>

<h1> Eintrag melden </h1>

{#if entry}
	<EntryComponent { entry } />
{:else}
	<div class="loader-container">
		<Loader dark />
	</div>
{/if}

<Form on:submit={ submit } bind:this={ formElement } class="report-form">
	
	<Select required bind:value={ report.type }>
		<option value="" disabled selected>Kategorie wählen</option>
		<option value="edit">Änderung vorschlagen</option>
		<option value="report">Nicht empfehlenswert</option>
		<option value="other">Sonstiges</option>
	</Select>
	
	{#if report.type === "edit"}
		<p class="info" transition:slide>
			Bitte gebe bei einem Änderungsvorschlag immer an, wie die neuen Daten lauten.
		</p>
	{/if}

	<Textarea bind:value={ report.message } placeholder="Beschreibe dein Anliegen / deine Änderungsvorschläge" requried minlength="10" maxlength={ 1200 } />
	
	<ReportNote />
	
	<Button { loading }>Melden</Button>
</Form>

<style lang="scss">
	:global(.report-form) {
		margin-top: 20px;
	}
	
	.loader-container {
		display: flex;
		justify-content: center;
		margin-bottom: 20px;
	}
</style>