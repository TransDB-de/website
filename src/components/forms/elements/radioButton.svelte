<label>
	<input type="radio" {...$$props}>
	<span> <slot /> </span>
</label>

<style lang="scss">
	@import "../../../scss/colors";
	@import "../../../scss/shadows";
	
	label {
		display: flex;
		font-weight: 400;
		cursor: pointer;
	}
	
	span {
		padding: 5px 7px 5px 7px;
		border-left: 3px solid var(--color-rim);
		transition: 0.1s all;
		text-shadow: $edge-shadow-tiny;
		
		&:hover, input:hover ~ & {
			padding: 5px 2px 5px 12px;
		}
		
		input:checked ~ & {
			padding: 5px 2px 5px 12px;
			color: var(--color-edge-highlight);
			border-left: 3px solid var(--color-edge-highlight);
		}
	}
	
	input {
		opacity: 0;
		position: absolute;
		cursor: pointer;
	}
</style>
