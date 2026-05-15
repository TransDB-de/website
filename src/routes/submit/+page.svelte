<script lang="ts">
	import SubmitForm from "$components/forms/submitForm.svelte";
	import { t } from "$lib/localization";
</script>

<svelte:head>
	<title>{t("submit.title")}</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="content">
	<SubmitForm />
</div>

<style lang="scss">
	@use "../../scss/content-small" as *;
</style>
