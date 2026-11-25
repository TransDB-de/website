<script lang="ts">
	import type { PageProps } from "./$types";
	import { t } from "$lib/localization.svelte";
	import PrimaryHeading from "$components/typography/PrimaryHeading.svelte";
	import DisplayEntry from "$components/entry/DisplayEntry.svelte";
	import type { Entry } from "$models/entry.model";
	import RemoveForm from "$components/forms/RemoveForm.svelte";
	import Paragraph from "$components/typography/Paragraph.svelte";

	let { params }: PageProps = $props();

	var entry: Entry | null = $state(null);

	function loaded(e: Entry) {
		entry = e;
	}
</script>

<svelte:head>
	<title>{t("remove.title")}</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="content">
	<PrimaryHeading underline>{t("remove.heading")}</PrimaryHeading>

	<DisplayEntry id={params.id} {loaded} />

	<RemoveForm entryId={params.id} />
</div>

<style lang="scss">
	@use "../../../../scss/content" as *;

	.content {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
</style>
