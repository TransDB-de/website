<script lang="ts">
	import type { Snippet } from "svelte";

	interface Props {
		underline?: boolean;
		children: Snippet;
	}

	const props: Props = $props();
</script>

<h1 class:underline={props.underline}>
	{@render props.children()}
</h1>

<style lang="scss">
	h1 {
		font-size: 1.8rem;
		font-family: "Poppins", sans-serif;
		font-weight: 600;
		margin: 0;

		&.underline {
			border-bottom: 2px solid var(--color-edge-light);
		}
	}
</style>
