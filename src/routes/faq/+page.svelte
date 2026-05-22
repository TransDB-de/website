<script lang="ts">
	import type { PageData } from "./$types";
	import { t } from "$lib/localization.svelte";

	interface Props {
		data: PageData;
	}

	const props: Props = $props();
</script>

<svelte:head>
	<title>FAQ - Trans*DB</title>
	<meta name="description" content={t("faq.description")} />
</svelte:head>

<div class="content md">
	<props.data.FAQContent />
</div>

<style lang="scss">
	@use "../../scss/content" as *;
</style>
