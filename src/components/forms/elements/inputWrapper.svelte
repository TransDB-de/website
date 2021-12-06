<script lang="ts">
	export let error = "";
	
	let forElement = "";
	export {forElement as for};
	
	$: isError = error && error.length > 0;
</script>

<label class:isError {...$$props} for={ forElement }>
	{#if isError}
		<span class="error">{error}</span>
	{/if}
	
	<slot></slot>
</label>


<style lang="scss">
	@mixin inputs {
		:global(input),
		:global(select),
		:global(textarea) {
			@content;
		}
	}
	
	label {
		position: relative;
		margin-bottom: 20px;
		display: flex;
		flex-direction: column;
		width: 100%;
		
		@include inputs {
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
			min-width: 300px;
			
			&::placeholder {
				color: var(--color-edge-dimmed);
				font-weight: 500;
			}
		}
		
		&:not(.isError) {
			@include inputs {
				&:hover{
					border: 2px solid var(--color-rim-hover);
				}
				
				&:focus {
					border: 2px solid var(--color-rim-active);
				}
			}
		}
		
		&.isError {
			@include inputs {
				border: 2px solid var(--color-edge-error);
			}
		}
		
		/*
		:global(input:invalid),
		:global(select:invalid),
		:global(textarea:invalid) {
			border: 2px solid var(--color-edge-warn);
		}*/
	}
	
	span.error {
		position: absolute;
		top: -18px;
		font-size: 14px;
		font-weight: 500;
		color: var(--color-edge-error);
	}
</style>
