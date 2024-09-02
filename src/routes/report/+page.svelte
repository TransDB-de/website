<script lang="ts" context="module">
	throw new Error(
		"@migration task: Check code was safely removed (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292722)"
	);

	// import { loadContents } from "$lib/loadContents";
	//
	// export async function load() {
	// 	const props = await loadContents({
	// 		name: "ReportNote",
	// 		path: "report-note"
	// 	});
	//
	// 	return { props };
	// }
</script>

<script lang="ts">
	throw new Error(
		"@migration task: Add data prop (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292707)"
	);

	import ReportForm from "$components/forms/reportForm.svelte";
	import { t } from "$lib/localization";
	import type { SvelteComponentTyped } from "svelte";

	export let ReportNote: typeof SvelteComponentTyped;
</script>

<svelte:head>
	<title>{t("report.title")}</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="content">
	<ReportForm {ReportNote} />
</div>

<style lang="scss">
	@import "../scss/content";
</style>
