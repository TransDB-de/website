<script lang="ts">
	import { fade } from "svelte/transition";
	import { page } from "$app/stores";
	import { browser, dev } from "$app/environment";
	import Footer from "$components/layout/footer.svelte";
	import Header from "$components/layout/header.svelte";
	import Popup from "$components/popup.svelte";
	import Confirm from "$components/confirm.svelte";

	import { initLocalization } from "$lib/localization.svelte";
	import "$lib/axios";
	import { env } from "$env/dynamic/public";
	import axios from "axios";
	import { token } from "$lib/store";
	import { afterNavigate } from "$app/navigation";

	import "@fontsource/poppins/500.css";
	import "@fontsource/poppins/600.css";
	import "@fontsource/poppins/700.css";
	import "@fontsource/fira-sans/400.css";
	import "@fontsource/fira-sans/500.css";
	import "@fontsource/fira-sans/600.css";

	import type { LayoutData } from "./$types";
	import type { Snippet } from "svelte";

	interface Props {
		data: LayoutData;
		children: Snippet;
	}

	let { data, children }: Props = $props();

	initLocalization(data);

	// Set synchronously so the header is present before any child onMount fires
	if (browser && data.apiToken) {
		axios.defaults.headers.common["X-CSRF-Token"] = data.apiToken;
	}

	$effect(() => {
		if (data.apiToken) {
			axios.defaults.headers.common["X-CSRF-Token"] = data.apiToken;
		}
	});

	let path = $derived($page.url.pathname.startsWith("/manage") ? "/manage" : $page.url.pathname);

	if (dev && browser) {
		localStorage.setItem("umami.disabled", "1");
	}

	const noTrackPaths = ["/manage", "/login"];

	afterNavigate(({ to }) => {
		const navPath = to?.url.pathname.startsWith("/manage") ? "/manage" : to?.url.pathname;
		const noTrack = !navPath || noTrackPaths.includes(navPath) || Boolean($token);

		if (!noTrack && env.PUBLIC_UMAMI_SRC && typeof umami !== "undefined") {
			umami.track((props) => ({ ...props, url: navPath }));
		}
	});
</script>

<svelte:head>
	{#if env.PUBLIC_UMAMI_SRC}
		<script
			defer
			src={env.PUBLIC_UMAMI_SRC}
			data-website-id={env.PUBLIC_UMAMI_WEBSITE_ID}
			data-auto-track="false"
		>
		</script>
	{/if}
</svelte:head>

<div class="app">
	<Header />

	{#key path}
		<div in:fade={{ duration: 200 }} class="page">
			{@render children()}
		</div>
	{/key}

	<Footer />
	<Popup />
	<Confirm />
</div>

<style lang="scss">
	@use "../scss/colors" as *;

	:global * {
		box-sizing: border-box;
	}

	:global(body) {
		margin: 0;
		background-color: var(--color-background);
		color: var(--color-edge);
		font-size: 18px;
		display: flex;
		flex-direction: column;
		font-family: "Fira Sans", sans-serif;
		min-height: 100vh;
		overflow-y: scroll;
	}

	:global(h1, h2, h3, h4, h5, h6) {
		font-family: "Poppins", sans-serif;
		font-weight: 600;
	}

	.app {
		display: flex;
		flex-direction: column;
		align-items: center;
		min-height: 100vh;
	}

	.page {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
