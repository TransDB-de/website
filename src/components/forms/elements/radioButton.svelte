<script lang="ts">
	export let value: string = "";
	export let group: string = "";
	
	function onChange({ target }) {
		const { value, checked } = target;
		if (checked) {
			group = value
		}
	}
</script>

<label {...$$props}>
	<input type="radio"
	       bind:value
	       checked={ group === value }
	       on:change={ onChange }/>
	<span> <slot></slot> </span>
</label>

<style lang="scss">
	@import "../../../scss/shadows";
	
	label {
		display: flex;
		cursor: pointer;
	}
	
	span {
		padding: 5px 7px 5px 7px;
		border-left: 3px solid var(--color-rim);
		transition: 0.1s all;
		text-shadow: $edge-shadow-tiny;
		
		font-weight: 400;
		font-size: 1em;
		
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
