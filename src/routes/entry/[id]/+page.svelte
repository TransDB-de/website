<script lang="ts">
	import SingleEntryView from "$components/singleEntryView.svelte";
	import type { PageProps } from "./$types";

	let { params }: PageProps = $props();
</script>

<svelte:head>
	<title>Trans*DB</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="content">
	<SingleEntryView id={params.id!} />
</div>

<style lang="scss">
	@use "../../../scss/content" as *;
</style>
