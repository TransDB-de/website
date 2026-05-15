<script lang="ts">
	import type { Snippet } from "svelte";
	interface Props {
		children?: Snippet;
		[key: string]: unknown;
	}

	let { children, ...rest }: Props = $props();
</script>

<span class="tag" {...rest}>
	{#if children}{@render children()}{/if}
</span>

<style lang="scss">
	.tag {
		display: inline-flex;
		background-color: var(--color-surface-bright);
		padding: 3px 8px;
		border-radius: 4px;
		cursor: default;
	}
</style>
