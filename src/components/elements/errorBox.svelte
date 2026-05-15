<script lang="ts">
	import type { Snippet } from "svelte";

	interface Props {
		error?: string;
		children?: Snippet;
	}

	const props: Props = $props();

	let isError = $derived(!!props.error && props.error.length > 0);
</script>

<span class:isError>
	{#if isError}
		<span class="error">{props.error}</span>
	{/if}

	{#if props.children}{@render props.children()}{/if}
</span>

<style lang="scss">
	span {
		display: flex;
		flex-direction: column;
		position: relative;

		&.isError {
			border-radius: 4px;
			border: 2px solid var(--color-edge-error);
			padding: 6px 4px;
			margin-bottom: 20px;

			:global(.checkbox-container:last-child) {
				margin-bottom: 0;
			}
		}

		.error {
			font-size: 14px;
			font-weight: 500;
			color: var(--color-edge-error);
			position: absolute;
			left: 0;
			top: -18px;
		}
	}
</style>
