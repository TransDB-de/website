<script lang="ts">
	import type { Snippet } from "svelte";
	import Loader from "$components/elements/loader.svelte";

	interface Props {
		color?: string;
		light?: boolean;
		iconOnly?: boolean;
		children: Snippet;
		href: string;
		edge?: boolean;
		[key: string]: unknown;
	}

	let {
		color = "",
		light = false,
		iconOnly = false,
		children,
		href,
		edge = false,
		...rest
	}: Props = $props();
</script>

<a {href} class={color} class:light class:iconOnly class:edge {...rest}>
	{@render children()}
</a>

<style lang="scss">
	@use "../../scss/button" as *;

	a {
		@include button;
		text-decoration: none;
	}
</style>
