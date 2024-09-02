<script lang="ts">
	export let error = "";

	let forElement = "";
	export { forElement as for };

	$: isError = error && error.length > 0;
</script>

<label class:isError {...$$props} for={forElement}>
	{#if isError}
		<span class="error">{error}</span>
	{/if}

	<slot></slot>
</label>

<style lang="scss">
	@import "../../../scss/input";

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
			@include input-box;
			@include input-font;

			width: 100%;
		}

		&.isError {
			@include inputs {
				border: 2px solid var(--color-edge-error);
			}
		}
	}

	span.error {
		position: absolute;
		top: -18px;
		font-size: 14px;
		font-weight: 500;
		color: var(--color-edge-error);
	}
</style>
