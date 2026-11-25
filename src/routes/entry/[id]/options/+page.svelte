<script lang="ts">
	import type { PageProps } from "./$types";
	import { t } from "$lib/localization.svelte";
	import PrimaryHeading from "$components/typography/PrimaryHeading.svelte";
	import type { Entry } from "$models/entry.model";
	import LinkButton from "$components/elements/LinkButton.svelte";
	import { SquarePen, Trash, TriangleAlert } from "@lucide/svelte";
	import DisplayEntry from "$components/entry/DisplayEntry.svelte";

	let { params }: PageProps = $props();

	var entry: Entry | null = $state(null);

	function loaded(e: Entry) {
		entry = e;
	}
</script>

<svelte:head>
	<title>Trans*DB</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="content">
	<PrimaryHeading underline>
		{t("options.title")}
	</PrimaryHeading>

	<DisplayEntry id={params.id} {loaded} />

	{#if entry}
		<section>
			<LinkButton href={`/entry/${params.id}/patch`}>
				<SquarePen />
				{t("options.patch")}
			</LinkButton>

			<LinkButton href={`/entry/${params.id}/remove`} color="red">
				<Trash />
				{t("options.remove")}
			</LinkButton>

			<LinkButton href={`/entry/${params.id}/report`} color="orange">
				<TriangleAlert />
				{t("options.report")}
			</LinkButton>
		</section>
	{/if}
</div>

<style lang="scss">
	@use "../../../../scss/content" as *;

	@use "../../../../scss/lengths" as *;
	@use "../../../../scss/mixins" as *;
	@use "../../../../scss/shadows" as *;

	:global(button.single-entry-view-button) {
		align-self: center;
	}

	.content {
		display: flex;
		flex-direction: column;
		gap: 1rem;

		section {
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(min(100%, 16rem), 1fr));
			gap: 15px;
			padding: 0 5px;

			> :global(:last-child) {
				grid-column: 1 / -1;
			}
		}
	}
</style>
