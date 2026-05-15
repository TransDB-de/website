<script module lang="ts">
	let uid = 0;
</script>

<script lang="ts">
	import InputWrapper from "./inputWrapper.svelte";
	import { ChevronDown } from "@lucide/svelte";
	import type { Snippet } from "svelte";

	interface Props {
		error?: string;
		value?: string;
		class?: string;
		children?: Snippet;
		[key: string]: unknown;
	}

	let {
		error = "",
		value = $bindable(""),
		class: customClass = "",
		children,
		...rest
	}: Props = $props();

	uid += 1;
	const id = "select" + uid;
</script>

<InputWrapper {error} class={customClass} for={id}>
	<select bind:value {...rest} {id}>
		{#if children}{@render children()}{/if}
	</select>
	<ChevronDown />
</InputWrapper>

<style lang="scss">
	select {
		-moz-appearance: none;
		-webkit-appearance: none;
		cursor: pointer;
		padding-right: 28px;
	}

	select ~ :global(.lucide) {
		position: absolute;
		color: var(--color-edge-dimmed);
		pointer-events: none;
		right: 6px;
		width: 24px;
		top: 8px;
	}
</style>
