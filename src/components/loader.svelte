<script lang="ts">
	export let dark = false;
</script>

<span class="loader" class:dark></span>

<style lang="scss">
	.loader {
		display: inline;
		height: 23px;
		width: 23px;
		border-radius: 50%;
		border: 2px solid transparent;
		border-top: 2px solid var(--color-edge-light);
		border-right: 2px solid var(--color-edge-light);
		animation: spin 0.4s linear infinite;
	}

	.loader.dark {
		border-top: 2px solid var(--color-edge);
		border-right: 2px solid var(--color-edge);
	}

	@keyframes spin {
		0% { transform: rotate(0deg); }
		100% { transform: rotate(360deg); }
	}
</style>
