<script lang="ts">
	import type { PageData } from "./$types";
	import { t } from "$lib/localization.svelte";

	interface Props {
		data: PageData;
	}

	const props: Props = $props();
</script>

<svelte:head>
	<title>{t("submitted.title")}</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="content">
	<props.data.SubmittedContent />
</div>

<style lang="scss">
	@use "../../scss/content" as *;
</style>
