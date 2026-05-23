<script lang="ts">
	import type { Snippet } from "svelte";

	interface Props {
		underline?: boolean;
		children: Snippet;
	}

	const props: Props = $props();
</script>

<h2 class:underline={props.underline}>
	{@render props.children()}
</h2>

<style lang="scss">
	h2 {
		font-size: 1.45rem;
		font-family: "Poppins", sans-serif;
		font-weight: 600;
		margin: 0;

		&.underline {
			border-bottom: 2px solid var(--color-edge-light);
		}
	}
</style>
