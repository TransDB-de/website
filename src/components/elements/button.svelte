<script lang="ts">
	import type { Snippet } from "svelte";
	import Loader from "$components/elements/loader.svelte";

	interface Props {
		color?: string;
		loading?: boolean;
		light?: boolean;
		iconOnly?: boolean;
		children?: Snippet;
		onclick?: (e: MouseEvent) => void;
		[key: string]: unknown;
	}

	let { color = "", loading = false, light = false, iconOnly = false, children, onclick, ...rest }: Props =
		$props();
</script>

<button {onclick} class={color} class:light class:iconOnly {...rest}>
	{#if loading}
		<Loader dark={light} />
	{:else if children}
		{@render children()}
	{/if}
</button>

<style lang="scss">
	@use "../../scss/button" as *;

	button {
		@include button;
	}
</style>
