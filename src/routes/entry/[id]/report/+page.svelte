<script lang="ts">
	import type { PageProps } from "./$types";
	import ReportForm from "$components/forms/reportForm.svelte";
	import { t } from "$lib/localization.svelte";
	import PrimaryHeading from "$components/typography/PrimaryHeading.svelte";

	let { params, data }: PageProps = $props();
</script>

<svelte:head>
	<title>{t("report.title")}</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="content">
	<PrimaryHeading underline>{t("reportForm.heading")}</PrimaryHeading>
	<ReportForm ReportNote={data.ReportNote} entryId={params.id} />
</div>

<style lang="scss">
	@use "../../../../scss/content" as *;

	.content {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
</style>
