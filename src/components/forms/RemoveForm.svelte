<script lang="ts">
	import Form from "$formElements/form.svelte";

	import Textarea from "$formElements/textarea.svelte";
	import Button from "$components/elements/button.svelte";

	import { popupError, popupOk, popupWarn } from "$components/popup.svelte";

	import { goto } from "$app/navigation";

	import axios from "axios";
	import type { Report } from "$models/report.model";
	import { t } from "$lib/localization.svelte";
	import { apiRequestHandler } from "$lib/apiRequestHandler";
	import type { EntryPatchResponse } from "$models/patch.model";

	interface Props {
		entryId: string;
	}

	const props: Props = $props();

	let loading = $state(false);
	let formElement: Form;

	let comment: string = $state("");

	let errors: Record<string, string> = $state({});

	async function submit() {
		loading = true;

		const result = await apiRequestHandler(
			axios.post<EntryPatchResponse>(
				`/entries/${props.entryId}/archive`,
				{ comment },
				{ captcha: true }
			)
		);

		loading = false;

		if (result.success) {
			formElement.reset();
			popupOk(t("submitForm.savedPopup"));

			const redirect = new URL("/patch-submitted", window.location.origin);

			redirect.searchParams.append("patchId", result.data!.patchId);
			redirect.searchParams.append("entryId", props.entryId);
			redirect.searchParams.append("revocationToken", result.data!.revocationToken);

			goto(redirect);
		} else {
			errors = result.handleErrors({
				500: () => popupError(t("errors.reportFailed")),
				422: () => popupWarn(t("errors.checkInput")),
				429: () => popupError(t("errors.tooMany")),
				default: () => popupError(`${t("errors.unknown")}`)
			});
		}
	}
</script>

<Form onsubmit={submit} bind:this={formElement} class="report-form">
	<Textarea
		bind:value={comment}
		label={t("remove.label")}
		placeholder={t("remove.placeholder")}
		required
		minlength="5"
		maxlength={2000}
		error={errors["message"]}
	/>

	<Button {loading}>{t("remove.submit")}</Button>
</Form>

<style lang="scss">
	@use "../../scss/content" as *;
	:global(.report-form) {
		margin-top: 20px;
	}
</style>
