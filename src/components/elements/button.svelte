<script lang="ts">
	import Loader from "$components/elements/loader.svelte"
	
	export let color: string = "";
	export let loading = false;
	export let light = false;
	export let iconOnly = false;
</script>

<button on:click class={ color } class:light class:iconOnly {...$$props}>
	{#if loading}
		<Loader dark={ light } />
	{:else}
		<slot></slot>
	{/if}
</button>

<style lang="scss">
	@import "../../scss/shadows.scss";
	
	button {
		border: 0;
		color: white;
		background-color: var(--color-surface-primary);
		cursor: pointer;
		font-size: 0.9em;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 600;
		padding: 8px 16px;
		border-radius: 4px;
		outline: 0;
		transition: 0.12s ease background-color;
		font-family: "Poppins", sans-serif;
		height: 40px;
		
		&:hover,
		&:focus {
			background-color: var(--color-surface-primary-hover);
		}
		
		&:active {
			background-color: var(--color-surface-primary-active);
		}
		
		/* shadows */
		
		&:not(.light) {
			box-shadow: $surface-shadow-soft;
		}
		
		&:hover:not(.light),
		&:focus:not(.light) {
			box-shadow: $surface-shadow-strong;
		}
		
		/* icons */
		
		:global(.lucide) {
			stroke-width: 2.5;
			margin-right: 5px;
			width: 20px;
			height: 20px;
		}
		
		&.iconOnly {
			padding: 8px;
			
			:global(.lucide) {
				margin: 0;
			}
		}
		
		/* lightweight button */
		
		&.light {
			background-color: var(--color-surface-bright);
			
			&:not(.red):not(.edge-error):not(.edge-highlight) {
				color: var(--color-edge);
			}
			
			padding: 5px 10px;
			height: unset;
			min-height: 35px;
			
			&.iconOnly {
				padding: 5px;
				min-width: 35px;
			}
			
			&:hover,
			&:focus {
				background-color: var(--color-surface-bright-hover);
			}
			
			&:active {
				background-color: var(--color-surface-bright-active);
			}
		}
		
		/* colored button */
		&.red {
			background-color: var(--color-surface-warn);
		}

		&.red:hover,
		&.red:focus {
			background-color: var(--color-surface-warn-hover);
		}

		&.red:active {
			background-color: var(--color-surface-warn-active);
		}
		
		&.edge-highlight {
			color: var(--color-edge-highlight);
		}
		
		&.edge-error {
			color: var(--color-edge-error);
		}
	}
</style>
