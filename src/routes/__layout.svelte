<script>
	import { fade } from "svelte/transition"
	import Footer from "$components/Footer.svelte"
</script>

<div class="app">
	<!--Header/-->
	
	<div transition:fade={{ duration: 0.6 }} class="page">
		<slot />
	</div>
	
	<Footer />
</div>

<style lang="scss">
	@import "../scss/colors";
	
	:global * {
		box-sizing: border-box;
	}
	
	:global html {
		min-height: 100vh;
	}
	
	:global body {
		margin: 0;
		background-color: var(--color-background);
		color: var(--color-text);
		display: flex;
		flex-direction: column;
		font-family: "Fira Sans", sans-serif;
		overflow: auto;
		min-height: 100vh;
	}
	
	:global(h1, h2, h3, h4, h5, h6) {
		font-family: "Poppins", sans-serif;
	}
	
	.app {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	
	.page {
		width: 100%;
	}
</style>
