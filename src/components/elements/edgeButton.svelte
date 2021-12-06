<script lang="ts">
	import Loader from "$components/elements/loader.svelte";
	
	export let color: string = "";
	export let loading: boolean = false;
</script>

<button on:click {...$$props} class={ color }>
	{#if !loading}
		<slot></slot>
	{:else}
		<Loader />
	{/if}
</button>

<style lang="scss">
	@import "../../scss/mixins";
	
	button {
		display: flex;
		align-items: center;
		justify-content: center;
		background: none;
		border: none;
		cursor: pointer;
		padding: 0;
		color: var(--color-edge-faded);
		transition: 0.2s color;
		width: 25px;
		height: 25px;
		
		&:hover {
			color: var(--color-edge);
		}
		
		&.highlight {
			color: var(--color-edge-highlight);
		}
		
		&.warn {
			color: var(--color-edge-warn);
		}
		
		:global(.lucide) {
			width: 1.8em;
			height: 1.8em;
		}
		
		@include media-mobile {
			color: var(--color-edge);
		}
	}
</style>
