<script lang="ts">
	import { goto } from "$app/navigation";
	import SubmitForm from "$components/forms/submitForm.svelte";
	import { popupError, popupOk, popupWarn } from "$components/popup.svelte";
	import PrimaryHeading from "$components/typography/PrimaryHeading.svelte";
	import { env } from "$env/dynamic/public";
	import { apiRequestHandler } from "$lib/apiRequestHandler";
	import { t } from "$lib/localization.svelte";
	import type { CreateEntryResponse, Entry } from "$models/entry.model";
	import axios from "axios";

	async function submit(data: Entry) {
		const result = await apiRequestHandler(
			axios.post<CreateEntryResponse>("entries", data, { captcha: true })
		);

		const errors = result.handleErrors({
			422: () => popupWarn(t("errors.checkInput")),
			429: () => popupError(t("errors.tooMany")),
			default: () => popupError(`${t("errors.unknown")}`)
		});

		if (result.success) {
			if (typeof umami !== "undefined") umami.track(env.PUBLIC_UMAMI_EVENT_NEW_ENTRY);

			const redirect = new URL("/submitted", window.location.origin);

			redirect.searchParams.append("entryId", result.data!.entry.id!);
			redirect.searchParams.append("revocationToken", result.data!.revocationToken);

			if (result.data!.possibleDuplicate) {
				redirect.searchParams.append("duplicate", result.data!.possibleDuplicate.entryId);
			}

			goto(redirect);

			return { reset: true };
		} else {
			return { reset: false, errors };
		}
	}
</script>

<svelte:head>
	<title>{t("submit.title")}</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="content">
	<PrimaryHeading underline>{t("submitForm.header")}</PrimaryHeading>

	<SubmitForm onSubmit={submit} />
</div>

<style lang="scss">
	@use "../../scss/content-small" as *;

	.content {
		display: flex;
		flex-direction: column;
		gap: 1.2rem;
	}
</style>
