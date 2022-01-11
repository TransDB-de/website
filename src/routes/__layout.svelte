<script context="module" lang="ts">
	import ackee from "$lib/ackee"
	import { injectSession } from "$lib/axios"
	import { populateConfig } from "$lib/config"
	import type { Load } from "@sveltejs/kit"
	
	let configLoaded = false;
	
	// runs every time "page" changes
	export const load: Load = async ({ url, session }) => {
		if (!configLoaded) {
			populateConfig(session);
			injectSession(session);
			
			configLoaded = true;
		}
		
		ackee(url.pathname);
		
		let path = url.pathname.startsWith("/manage") ? "/manage" : url.pathname;
		
		return {
			props: { path }
		};
	}
</script>

<script lang="ts">
	import { fade } from "svelte/transition"
	import Footer from "$components/footer.svelte"
	import Header from "$components/header.svelte"
	import Popup from "$components/popup.svelte"
	import Confirm from "$components/confirm.svelte"
	
	// key which triggers fade transition between pages
	export let path: string;
</script>

<div class="app">
	<Header />
	
	{#key path}
		<div in:fade={{duration: 200}} class="page">
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
