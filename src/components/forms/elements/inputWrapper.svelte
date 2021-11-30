<script lang="ts">
	export let error = "";
	
	$: isError = error.length > 0;
</script>

<!-- svelte-ignore a11y-label-has-associated-control -->
<label class:isError>
	{#if isError}
		<span class="error">{error}</span>
	{/if}
	
	<slot />
</label>


<style lang="scss">
	label {
		position: relative;
		margin-bottom: 20px;
		display: flex;
		flex-direction: column;
		width: 100%;
		
		&.isError {
			:global(input),
			:global(select),
			:global(textarea) {
				border: 2px solid var(--color-edge-error);
			}
		}
	}

	:global(input),
	:global(select),
	:global(textarea) {
		font-family: 'Poppins', sans-serif;
		font-size: 18px;
		color: var(--color-edge);
		background-color: var(--color-background-bright);
		outline: 0;
		border-radius: 4px;
		border: 2px solid var(--color-rim);
		padding: 6px 12px;
		transition: 0.2s ease border;
		width: 100%;
		
		&:hover {
			border: 2px solid var(--color-rim-hover);
		}
		
		&:focus {
			border: 2px solid var(--color-rim-active);
		}
		
		&::placeholder {
			color: var(--color-edge-dimmed);
			font-weight: 500;
		}
	}

	span.error {
		font-size: 14px;
		font-weight: 500;
		margin: 0 0 3px 3px;
		color: var(--color-edge-error);
	}
</style>