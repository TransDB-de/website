<script lang="ts" context="module">
	import { loadContents } from "$lib/loadContents";
	
	export async function load() {
		const props = await loadContents({
			name: "ReportNote",
			path: "report-note"
		});
		
		return { props };
	}
</script>

<script lang="ts">
	import ReportForm from "$components/forms/reportForm.svelte"
	import { t } from "$lib/localization"
    import type { SvelteComponentTyped } from "svelte";
	
	export let ReportNote: typeof SvelteComponentTyped;
</script>

<svelte:head>
	<title>{ t("report.title") }</title>
	<meta name="robots" content="noindex">
</svelte:head>

<div class="content">
	<ReportForm {ReportNote} />
</div>

<style lang="scss">
	@import "../scss/content";
</style>
