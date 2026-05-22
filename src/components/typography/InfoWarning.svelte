<script lang="ts">
	import type { Snippet } from "svelte";
	import { slide } from "svelte/transition";

	interface Props {
		children: Snippet;
	}

	const props: Props = $props();
</script>

<p transition:slide>
	{@render props.children()}
</p>

<style lang="scss">
	p {
		margin: 0;
		background-color: var(--color-special-warn) !important;
		border-radius: 3px;
		padding: 5px 10px;
		font-size: 0.9em;
	}
</style>
