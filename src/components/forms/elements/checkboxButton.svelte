<label>
	<input type="checkbox" {...$$props} />
	<span> <slot /> </span>
</label>

<style lang="scss">
	@import "../../../scss/colors";
	@import "../../../scss/mixins";
	
	label {
		margin: 2px;
	}
	
	span {
		display: inline-flex;
		background-color: var(--color-surface-bright);
		padding: 3px 8px;
		border-radius: 4px;
		cursor: pointer;
		
		@include media-mobile {
			font-size: 17px;
			padding: 4px 8px;
		}
		
		&:hover, input:hover ~ & {
			background-color: var(--color-surface-bright-hover);
		}
		
		input:checked ~ & {
			background-color: var(--color-surface-highlight);
			color: var(--color-edge-bright);
		}
		
		input:checked:hover ~ &, input:checked ~ &:hover {
			background-color: var(--color-surface-highlight-hover);
		}
	}
	
	input {
		opacity: 0;
		position: absolute;
		cursor: pointer;
	}
</style>
