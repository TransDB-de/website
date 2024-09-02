<script lang="ts">
	import SingleEntryView from "$components/singleEntryView.svelte";

	import { page } from "$app/stores";
</script>

<svelte:head>
	<title>Trans*DB</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="content">
	<SingleEntryView id={$page.params.id} />
</div>

<style lang="scss">
	@import "../../scss/content";
</style>
