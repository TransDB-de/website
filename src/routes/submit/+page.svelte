<script lang="ts">
	import SubmitForm from "$components/forms/submitForm.svelte";
	import PrimaryHeading from "$components/typography/PrimaryHeading.svelte";
	import { t } from "$lib/localization.svelte";
</script>

<svelte:head>
	<title>{t("submit.title")}</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="content">
	<PrimaryHeading underline>{t("submitForm.header")}</PrimaryHeading>

	<SubmitForm />
</div>

<style lang="scss">
	@use "../../scss/content-small" as *;

	.content {
		display: flex;
		flex-direction: column;
		gap: 1.2rem;
	}
</style>
