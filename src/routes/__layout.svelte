<script context="module">
	import ackee from "$lib/ackee"
	import "$lib/axios";
	
	// runs every time "page" changes
	export async function load({ page }) {
		ackee(page.path);
		return {};
	}
</script>

<script>
	import { fade } from "svelte/transition"
	import Footer from "$components/footer.svelte"
	import Header from "$components/header.svelte"
	import Popup from "$components/popup.svelte"
	import Confirm from "$components/confirm.svelte"
	
	import { page } from '$app/stores'
	
	// key which triggers fade transition between pages
	/*let path = "";
	
	// do not fade in manage subpaths
	$: {
		path = $page.path
		//if (path.startsWith("/manage")) {
		//	path = "/manage"
		//}
	}*/
</script>

<div class="app">
	<Header />
	
	{#key $page.path}
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
