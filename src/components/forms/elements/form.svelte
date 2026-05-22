<script lang="ts">
	import type { Snippet } from "svelte";

	interface Props {
		onsubmit?: () => void;
		children?: Snippet;
		[key: string]: unknown;
	}

	let { onsubmit: onSubmitProp, children, ...rest }: Props = $props();

	let form: HTMLFormElement;

	export function reset() {
		form.reset();
	}
</script>

<form
	onsubmit={(e) => {
		e.preventDefault();
		onSubmitProp?.();
	}}
	bind:this={form}
	{...rest}
>
	{#if children}{@render children()}{/if}
</form>

<style lang="scss">
	@use "../../../scss/mixins" as *;

	form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
</style>
