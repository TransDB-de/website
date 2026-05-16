<script lang="ts">
	import type { Snippet } from "svelte";

	interface Props {
		error?: string;
		label: string | null;
		for?: string;
		children?: Snippet;
		class?: string;
	}

	let {
		error = "",
		for: forElement = "",
		children,
		class: customClass = "",
		label
	}: Props = $props();

	let isError = $derived(!!error && error.length > 0);
</script>

<label class:isError class={customClass} for={forElement}>
	{#if label !== null}
		<b>
			{label}
		</b>
	{/if}
	{#if children}{@render children()}{/if}
	{#if isError}
		<span class="error">{error}</span>
	{/if}
</label>

<style lang="scss">
	@use "../../../scss/input" as *;

	@mixin inputs {
		:global(input),
		:global(select),
		:global(textarea) {
			@content;
		}
	}

	label {
		position: relative;
		margin-bottom: 15px;
		display: flex;
		flex-direction: column;
		width: 100%;
		gap: 0.4rem;

		b {
			margin-left: 2px;
			font-weight: 500;
		}

		@include inputs {
			@include input-box;
			@include input-font;

			width: 100%;
		}

		&.isError {
			@include inputs {
				border: 2px solid var(--color-edge-error);
			}
		}
	}

	span.error {
		margin-left: 2px;
		font-size: 14px;
		font-weight: 500;
		color: var(--color-edge-error);
	}
</style>
