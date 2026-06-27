<script lang="ts">
	import Form from "$formElements/form.svelte";
	import EntryComponent from "$components/entry/entry.svelte";
	import Textarea from "$formElements/textarea.svelte";
	import Button from "$components/elements/button.svelte";
	import Loader from "$components/elements/loader.svelte";
	import Select from "$formElements/select.svelte";
	import { popupError, popupOk } from "$components/popup.svelte";

	import { goto } from "$app/navigation";
	import { slide } from "svelte/transition";

	import type { Entry } from "$models/entry.model";
	import type { Component } from "svelte";
	import { onMount } from "svelte";
	import axios from "axios";
	import type { Report } from "$models/report.model";
	import { t } from "$lib/localization.svelte";
	import type { ValidationErrorMap } from "$models/error";
	import { apiRequestHandler } from "$lib/apiRequestHandler";
	import InfoWarning from "$components/typography/InfoWarning.svelte";

	interface Props {
		ReportNote: Component;
		entryId: string;
	}

	const props: Props = $props();

	let entry: Entry | null = $state(null);
	let loading = $state(false);
	let formElement: Form;

	let report = $state<Report>({
		id: props.entryId,
		type: "",
		message: ""
	});

	let errors: ValidationErrorMap = $state({});

	onMount(async () => {
		const result = await apiRequestHandler<Entry>(axios.get("/entries/" + props.entryId));

		errors = result.handleErrors({
			404: () => popupError(t("errors.entryNotFound")),
			default: () => popupError(`${t("errors.unknown")}`)
		});

		if (result.success && result.data) {
			entry = result.data;
		}
	});

	async function submit() {
		loading = true;

		const result = await apiRequestHandler(axios.post("/report", report));

		loading = false;

		if (result.success) {
			formElement.reset();
			popupOk(t("reportForm.successPopup"));
			goto("/reported");
		} else {
			errors = result.handleErrors({
				500: () => popupError(t("errors.reportFailed")),
				429: () => popupError(t("errors.tooMany")),
				default: () => popupError(`${t("errors.unknown")}`)
			});
		}
	}
</script>

{#if entry}
	<EntryComponent {entry} />
{:else}
	<div class="loader-container">
		<Loader dark />
	</div>
{/if}

<Form onsubmit={submit} bind:this={formElement} class="report-form">
	<Select required bind:value={report.type} label={t("reportForm.categories")[0]}>
		<option value="" disabled selected>{t("reportForm.categories")[0] + "..."}</option>
		<option value="Edit">{t("reportForm.categories")[1]}</option>
		<option value="Report">{t("reportForm.categories")[2]}</option>
		<option value="Other">{t("reportForm.categories")[3]}</option>
	</Select>

	{#if report.type === "Edit"}
		<InfoWarning>
			{t("reportForm.note")}
		</InfoWarning>
	{/if}

	<Textarea
		bind:value={report.message}
		label={t("reportForm.placeholder")}
		placeholder={t("reportForm.placeholder") + "..."}
		required
		minlength="10"
		maxlength={1200}
		error={errors["message"]}
	/>

	<section class="md">
		<props.ReportNote />
	</section>

	<Button {loading}>{t("reportForm.submit")}</Button>
</Form>

<style lang="scss">
	@use "../../scss/content" as *;
	:global(.report-form) {
		margin-top: 20px;
	}

	.loader-container {
		display: flex;
		justify-content: center;
		margin-bottom: 20px;
	}

	section.md {
		display: flex;
		flex-direction: column;
	}
</style>
