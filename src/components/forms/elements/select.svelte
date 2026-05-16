<script module lang="ts">
	let uid = 0;
</script>

<script lang="ts">
	import InputWrapper from "./inputWrapper.svelte";
	import type { Snippet } from "svelte";

	interface Props {
		label: string | null;
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
		label,
		...rest
	}: Props = $props();

	uid += 1;
	const id = "select" + uid;
</script>

<InputWrapper {error} class={customClass} for={id} {label}>
	<select bind:value {...rest} {id}>
		{#if children}{@render children()}{/if}
	</select>
</InputWrapper>

<style lang="scss">
	select {
		cursor: pointer;
		padding-right: 28px;
	}
</style>
