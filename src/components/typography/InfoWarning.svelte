<script lang="ts">
	import type { Snippet } from "svelte";

	interface Props {
		children: Snippet;
	}

	const props: Props = $props();
</script>

<p>
	{@render props.children()}
</p>

<style lang="scss">
	p {
		margin: 0;
		background-color: color-mix(in srgb, var(--color-special-warn) 75%, transparent 10%);
		border: 2px dashed var(--color-edge-warn);
		border-radius: 3px;
		padding: 10px 15px;
		font-size: 0.9em;
		font-weight: 500;
	}
</style>
