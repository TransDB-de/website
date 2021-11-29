<script lang="ts">
	export let required = false;
	export let error = "";
	
	$: isError = error.length > 0;
</script>

<label class:isError>
	{#if isError}
		<span class="error">{error}</span>
	{/if}
	<input {...$$props} {required} />
</label>


<style lang="scss">
	@import "../scss/mixins";
	
	label {
		margin-bottom: 20px;
		display: flex;
		flex-direction: column;
		
		&.isError {
			input {
				border: 2px solid var(--color-edge-error);
			}
		}
	}

	input {
		font-family: 'Poppins', sans-serif;
		font-size: 18px;
		color: var(--color-edge);
		background-color: var(--color-background-bright);
		outline: 0;
		border-radius: 4px;
		border: 2px solid var(--color-surface-bright);
		padding: 6px 12px;
		transition: 0.2s ease border;
		width: 100%;
		
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