<script lang="ts">
	import Form from "$formElements/form.svelte";
	import EntryComponent from "$components/entry/entry.svelte";
	import Textarea from "$formElements/textarea.svelte";
	import Button from "$components/elements/button.svelte";
	import Loader from "$components/elements/loader.svelte";
	import Select from "$formElements/select.svelte";
	import { popupError, popupOk, popupWarn } from "$components/popup.svelte";

	import { page } from "$app/stores";
	import { goto } from "$app/navigation";
	import { slide } from "svelte/transition";

	import type { Entry } from "$models/entry.model";
	import type { Component } from "svelte";
	import { onMount } from "svelte";
	import axios from "axios";
	import type { Report } from "$models/report.model";
	import { t } from "$lib/localization";
	import { parseValidationErrors } from "$lib/utils";
	import type { ValidationErrorMap } from "$models/error";

	interface Props {
		ReportNote: Component;
	}

	const props: Props = $props();

	let entry: Entry | null = $state(null);
	let loading = $state(false);
	let formElement: Form;

	let report: Report = $state({
		id: $page.url.searchParams.get("id"),
		type: "",
		message: ""
	});

	let errors: ValidationErrorMap = $state({});

	onMount(async () => {
		try {
			let res = await axios.get<Entry>("/entries/" + $page.url.searchParams.get("id"));
			entry = res.data;
		} catch (e: any) {
			if (!e.response) {
				popupError(t("errors.unknown"));
				return;
			}
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
		} catch (e: any) {
			if (!e.response) {
				popupError(t("errors.unknown"));
				loading = false;
				return;
			}
			switch (e.response.status) {
				case 422: {
					errors = parseValidationErrors(e.response.data.problems);
					popupWarn(t("errors.checkInput"));
					break;
				}
				case 500: {
					popupError(t("errors.reportFailed"));
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

<Form onsubmit={submit} bind:this={formElement} class="report-form">
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
		error={errors["message"]}
	/>

	<props.ReportNote />

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
