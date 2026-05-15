<script lang="ts">
	import type { Snippet } from "svelte";
	import { page } from "$app/stores";

	interface Props {
		exact?: boolean;
		href?: string;
		color?: string;
		shadow?: boolean;
		lineHeight?: string;
		lineOffset?: string;
		children?: Snippet;
		[key: string]: unknown;
	}

	let {
		exact = false,
		href = "/",
		color = "var(--color-edge-bright)",
		shadow = true,
		lineHeight = "3px",
		lineOffset = "0",
		children,
		...rest
	}: Props = $props();

	let active = $derived($page.url.pathname.startsWith(href) ? "active" : "");
	let activeExact = $derived($page.url.pathname === href ? "active" : "");
</script>

<a
	{...rest}
	{href}
	class="nav-link {exact ? activeExact : active}"
	class:shadow
	style="--color: {color}; --line-height: {lineHeight}; --line-offset: {lineOffset};"
>
	{#if children}{@render children()}{/if}
</a>

<style lang="scss">
	@use "../../scss/mixins" as *;
	@use "../../scss/shadows" as *;

	.nav-link {
		color: var(--color);
		display: flex;
		justify-content: center;
		align-items: center;
		text-decoration: none;
		font-weight: 500;
		font-size: 20px;
		margin: 10px 10px;
		cursor: pointer;
		white-space: nowrap;

		@include underline(
			$color: var(--color),
			$height: var(--line-height),
			$offset: var(--line-offset)
		);

		&:hover:after {
			width: 100% !important;
			opacity: 1 !important;
		}
		&.active:after {
			opacity: 1 !important;
			width: 70%;
		}
		&.shadow:after {
			box-shadow: $surface-shadow-small;
		}
		&.shadow {
			text-shadow: $edge-shadow-small;
		}
	}
</style>
