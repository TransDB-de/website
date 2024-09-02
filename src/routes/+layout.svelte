<script context="module" lang="ts">
	throw new Error(
		"@migration task: Check code was safely removed (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292722)"
	);

	// import type { Load } from "@sveltejs/kit"
	//
	// import { get } from "svelte/store"
	// import { browser } from "$app/env";
	//
	// import { injectSession } from "$lib/axios"
	// import config, { populateConfig } from "$lib/config"
	// import { initLocalization } from "$lib/localization"
	// import { token } from "$lib/store"
	//
	// let configLoaded = false;
	//
	// // runs every time "page" changes
	// export const load: Load = async ({ url, session }) => {
	// 	if (!configLoaded) {
	// 		populateConfig(session);
	// 		configLoaded = true;
	// 	}
	//
	// 	injectSession(session);
	// 	await initLocalization(session);
	//
	// 	let path = url.pathname.startsWith("/manage") ? "/manage" : url.pathname;
	//
	// 	// do not track some paths
	// 	// also don't track team members
	// 	let noTrack = ["/manage", "/login"].includes(path) || Boolean(get(token));
	//
	// 	if (!noTrack && browser && config.umami_src) {
	// 		// use custom url beacuse we only want path name without query params
	// 		await umami.track((props) => ({...props, url: path}));
	// 	}
	//
	// 	return {
	// 		props: { path }
	// 	};
	// }
</script>

<script lang="ts">
	throw new Error(
		"@migration task: Add data prop (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292707)"
	);

	import { fade } from "svelte/transition";
	import Footer from "$components/layout/footer.svelte";
	import Header from "$components/layout/header.svelte";
	import Popup from "$components/popup.svelte";
	import Confirm from "$components/confirm.svelte";
	import { dev } from "$app/env";

	// key which triggers fade transition between pages
	export let path: string;

	if (dev && browser) {
		localStorage.setItem("umami.disabled", "1");
	}
</script>

<svelte:head>
	{#if config.umami_src}
		<script
			defer
			src={config.umami_src}
			data-website-id={config.umami_website_id}
			data-auto-track="false"
		>
		</script>
	{/if}
</svelte:head>

<div class="app">
	<Header />

	{#key path}
		<div in:fade={{ duration: 200 }} class="page">
			<slot></slot>
		</div>
	{/key}

	<Footer />
	<Popup />
	<Confirm />
</div>

<style lang="scss">
	@import "../scss/colors";

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
		overflow: -moz-scrollbars-vertical;
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
