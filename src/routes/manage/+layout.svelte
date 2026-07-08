<script lang="ts">
	import ManageNav from "./manageNav.svelte";

	import type { Snippet } from "svelte";

	interface Props {
		children: Snippet;
	}

	const props: Props = $props();
</script>

<svelte:head>
	<title>Management - Trans*DB</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<ManageNav />

{@render props.children()}
