<script lang="ts">
	import type { PageData } from "./$types";
	import ReportForm from "$components/forms/reportForm.svelte";
	import { t } from "$lib/localization";

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
	<ReportForm ReportNote={props.data.ReportNote} />
</div>

<style lang="scss">
	@use "../../scss/content" as *;
</style>
