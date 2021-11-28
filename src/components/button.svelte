<script lang="ts">
	import Loader from "$components/loader.svelte";
	
	export let color: string = "";
	export let loading = false;
	export let light = false;
	export let iconOnly = false;
	export let noShadow = false;
</script>

<button class={color} class:noShadow class:light class:iconOnly {...$$props}>
	{#if loading}
		<Loader dark={light} />
	{:else}
		<slot />
	{/if}
</button>

<style lang="scss">
	@import "../scss/shadows.scss";
	
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
		
		&:hover,
		&:focus {
			background-color: var(--color-surface-primary-hover);
		}
		
		&:active {
			background-color: var(--color-surface-primary-active);
		}
		
		/* shadows */
		
		&:not(.noShadow) {
			box-shadow: $surface-shadow-soft;
		}
		
		&:hover:not(.noShadow),
		&:focus:not(.noShadow) {
			box-shadow: $surface-shadow-strong;
		}
		
		/* icons */
		
		:global(.feather) {
			stroke-width: 3;
			margin-right: 5px;
			width: 18px;
			height: 18px;
		}
		
		&.iconOnly {
			padding: 8px;
			
			:global(.feather) {
				margin: 0;
			}
		}
		
		/* lightweight button */
		
		&.light {
			background-color: var(--color-surface-bright);
			box-shadow: none;
			color: var(--color-edge);
			padding: 5px 10px;
			
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
	}
</style>