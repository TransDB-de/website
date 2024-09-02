<script lang="ts">
	export let group = [];
	export let value = "";
	export let checked = false;
	export let single = false;

	/*
	 * Group bindings on custom components with checkboxes has to be done manually
	 * https://github.com/sveltejs/svelte/issues/2308
	 */
	function onChange({ target }) {
		if (single) return;

		const { value, checked } = target;
		if (checked) {
			group = [...group, value];
		} else {
			group = group.filter((item) => item !== value);
		}
	}
</script>

<label class="checkbox-container">
	<slot></slot>
	<input type="checkbox" {...$$props} {value} bind:checked on:change={onChange} />
	<span class="checkmark"></span>
</label>

<style lang="scss">
	@import "../../../scss/input";

	label {
		display: flex;
		align-items: center;
		position: relative;
		margin-bottom: 20px;
		cursor: pointer;
		text-align: left;
		font-size: 18px;
		padding-left: 35px;
		user-select: none;
		min-height: 28px;
		-webkit-tap-highlight-color: transparent;

		input {
			@include hide-checkmark;
		}
	}

	/* Create a custom checkbox */
	.checkmark {
		@include input-checkbox;
	}
</style>
