<script context="module">
	import Ackee from "$lib/ackee"
	import config from "$lib/config"
	
	import axios from "axios";
	axios.defaults.baseURL = config.axios.baseURL;
	
	// runs every time "page" changes
	export async function load({ page }) {
		Ackee(page.path);
		return {};
	}
</script>

<script>
	import { fade } from "svelte/transition"
	import Footer from "$components/footer.svelte"
	import Header from "$components/header.svelte"
	import Popup from "$components/popup.svelte"
</script>

<div class="app">
	<Header />
	
	<div transition:fade={{ duration: 0.6 }} class="page">
		<slot></slot>
	</div>
	
	<Footer />
	<Popup />
</div>

<style lang="scss">
	@import "../scss/colors";
	
	:global * {
		box-sizing: border-box;
	}
	
	:global body {
		margin: 0;
		background-color: var(--color-background);
		color: var(--color-edge);
		font-size: 18px;
		display: flex;
		flex-direction: column;
		font-family: "Fira Sans", sans-serif;
		overflow: auto;
		min-height: 100vh;
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
