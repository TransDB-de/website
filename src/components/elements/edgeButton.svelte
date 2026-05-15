<script lang="ts">
	import type { Snippet } from "svelte";
	import Loader from "$components/elements/loader.svelte";

	interface Props {
		color?: string;
		loading?: boolean;
		children?: Snippet;
		onclick?: (e: MouseEvent) => void;
		[key: string]: unknown;
	}

	let { color = "", loading = false, children, onclick, ...rest }: Props = $props();
</script>

<button {onclick} {...rest} class={color}>
	{#if !loading}
		{#if children}{@render children()}{/if}
	{:else}
		<Loader />
	{/if}
</button>

<style lang="scss">
	@use "../../scss/mixins" as *;

	button {
		display: flex;
		align-items: center;
		justify-content: center;
		background: none;
		border: none;
		cursor: pointer;
		padding: 0;
		color: var(--color-edge-faded);
		transition: 0.2s color;
		width: 25px;
		height: 25px;

		&:hover {
			color: var(--color-edge);
		}
		&.highlight {
			color: var(--color-edge-highlight);
		}
		&.warn {
			color: var(--color-edge-warn);
		}

		:global(.lucide) {
			width: 1.8em;
			height: 1.8em;
		}

		@include media-mobile {
			color: var(--color-edge);
		}
	}
</style>
