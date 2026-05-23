<script lang="ts">
	import type { Snippet } from "svelte";

	interface Props {
		underline?: boolean;
		children: Snippet;
	}

	const props: Props = $props();
</script>

<h3 class:underline={props.underline}>
	{@render props.children()}
</h3>

<style lang="scss">
	h3 {
		font-size: 1.2rem;
		font-family: "Poppins", sans-serif;
		font-weight: 600;
		margin: 0;

		&.underline {
			border-bottom: 2px solid var(--color-edge-light);
		}
	}
</style>
