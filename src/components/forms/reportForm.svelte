<script lang="ts">
	import Form from "$formElements/form.svelte";
	import EntryComponent from "$components/entry/entry.svelte";
	import Textarea from "$formElements/textarea.svelte";
	import Button from "$components/elements/button.svelte";
	import Loader from "$components/elements/loader.svelte";
	import Select from "$formElements/select.svelte";
	import { popupError, popupOk } from "$components/popup.svelte";

	import { page } from "$app/stores";
	import { goto } from "$app/navigation";
	import { slide } from "svelte/transition";

	import type { Entry } from "$models/entry.model";
	import { onMount, type SvelteComponentTyped } from "svelte";
	import axios from "axios";
	import type { Report } from "$models/report.model";
	import { t } from "$lib/localization";

	let entry: Entry = null;
	let loading = false;
	let formElement;

	let report: Report = {
		id: $page.url.searchParams.get("id"),
		type: "",
		message: ""
	};

	export let ReportNote: typeof SvelteComponentTyped;

	onMount(async () => {
		try {
			let res = await axios.get<Entry>("/entries/" + $page.url.searchParams.get("id"));
			entry = res.data;
		} catch (e) {
			switch (e.response.status) {
				case 404: {
					popupError(t("errors.entryNotFound"));
					break;
				}
				default: {
					popupError(`${t("errors.unknown")} (${e.response.status})`);
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
			switch (e.response.status) {
				case 500: {
					popupError(t("errors.reportFailed"));
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
		popupOk(t("reportForm.successPopup"));
		goto("/reported");
	}
</script>

<h1>{t("reportForm.heading")}</h1>

{#if entry}
	<EntryComponent {entry} />
{:else}
	<div class="loader-container">
		<Loader dark />
	</div>
{/if}

<Form on:submit={submit} bind:this={formElement} class="report-form">
	<Select required bind:value={report.type}>
		<option value="" disabled selected>{t("reportForm.categories")[0]}</option>
		<option value="edit">{t("reportForm.categories")[1]}</option>
		<option value="report">{t("reportForm.categories")[2]}</option>
		<option value="other">{t("reportForm.categories")[3]}</option>
	</Select>

	{#if report.type === "edit"}
		<p class="info" transition:slide>
			{t("reportForm.note")}
		</p>
	{/if}

	<Textarea
		bind:value={report.message}
		placeholder={t("reportForm.placeholder")}
		requried
		minlength="10"
		maxlength={1200}
	/>

	<svelte:component this={ReportNote} />

	<Button {loading}>{t("reportForm.submit")}</Button>
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
