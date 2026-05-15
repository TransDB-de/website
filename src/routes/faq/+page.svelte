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

<div class="content">
	<props.data.FAQContent />
</div>

<style lang="scss">
	@use "../../scss/content" as *;

	.content {
		:global(h2) {
			font-size: 1.2em;
			margin-top: 0;
			border-bottom: none;
		}
	}
</style>
