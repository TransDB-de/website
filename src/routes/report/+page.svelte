<script lang="ts">
	import type { PageData } from "./$types";
	import ReportForm from "$components/forms/reportForm.svelte";
	import { t } from "$lib/localization.svelte";
	import PrimaryHeading from "$components/typography/PrimaryHeading.svelte";

	interface Props {
		data: PageData;
	}

	const props: Props = $props();
</script>

<svelte:head>
	<title>{t("report.title")}</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="content">
	<PrimaryHeading underline>{t("reportForm.heading")}</PrimaryHeading>
	<ReportForm ReportNote={props.data.ReportNote} />
</div>

<style lang="scss">
	@use "../../scss/content" as *;

	.content {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
</style>
