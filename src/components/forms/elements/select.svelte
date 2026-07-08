<script module lang="ts">
	let uid = 0;
</script>

<script lang="ts">
	import InputWrapper from "./inputWrapper.svelte";
	import type { Snippet } from "svelte";

	interface Props {
		label: string | null;
		error?: string;
		value?: string | boolean | null;
		class?: string;
		required?: boolean;
		children?: Snippet;
		[key: string]: unknown;
	}

	let {
		error = "",
		value = $bindable(""),
		class: customClass = "",
		children,
		label,
		required,
		...rest
	}: Props = $props();

	uid += 1;
	const id = "select" + uid;
</script>

<InputWrapper {error} class={customClass} for={id} {label} {required}>
	<select bind:value {required} {...rest} {id}>
		{#if children}{@render children()}{/if}
	</select>
</InputWrapper>

<style lang="scss">
	select {
		cursor: pointer;
		padding-right: 28px;
	}
</style>
