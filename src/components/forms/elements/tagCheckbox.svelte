<script lang="ts">
	export let value: string = "";
	export let group: string[] = [];

	function onChange({ target }) {
		const { value, checked } = target;
		if (checked) {
			group = [...group, value];
		} else {
			group = group.filter((item) => item !== value);
		}
	}
</script>

<label {...$$props}>
	<input type="checkbox" bind:value checked={group.includes(value)} on:change={onChange} />
	<span> <slot></slot> </span>
</label>

<style lang="scss">
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
		font-size: 0.9em;

		@include media-mobile {
			padding: 4px 8px;
		}

		&:hover,
		input:hover ~ & {
			background-color: var(--color-surface-bright-hover);
		}

		input:checked ~ & {
			background-color: var(--color-surface-highlight);
			color: var(--color-edge-bright);
		}

		input:checked:hover ~ &,
		input:checked ~ &:hover {
			background-color: var(--color-surface-highlight-hover);
		}
	}

	input {
		opacity: 0;
		position: absolute;
		cursor: pointer;
	}
</style>
