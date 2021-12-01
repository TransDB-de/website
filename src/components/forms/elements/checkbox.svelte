<script lang="ts">
	export let group = [];
	export let value = "";
	export let checked = false;
	
	/*
	* Group bindings on custom components with checkboxes has to be done manually
	* https://github.com/sveltejs/svelte/issues/2308
	*/
	function onChange({ target }) {
		const { value, checked } = target;
		if (checked) {
			group = [...group, value]
		} else {
			group = group.filter((item) => item !== value);
		}
	}
</script>

<label class="checkbox-container">
	<slot />
	<input
		type="checkbox"
		{...$$props}
		{value}
		checked={group.includes(value)}
		on:change={onChange}
	/>
	<span class="checkmark"></span>
</label>

<style lang="scss">
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
		
		// Hide the browser's default checkbox
		input {
			position: absolute;
			opacity: 0;
			cursor: pointer;
			height: 0;
			width: 0;
		}
		
		&:hover input ~ .checkmark {
			border: 2px solid var(--color-rim-hover);
		}
		
		input:checked ~ .checkmark:after {
			transform: scale(1) rotate(45deg);
		}
	}
	
	/* Create a custom checkbox */
	.checkmark {
		position: absolute;
		border-radius: 4px;
		border: 2px solid var(--color-rim);
		left: 0;
		height: 28px;
		width: 28px;
		background-color: var(--color-background-bright);
		transition: 0.2s ease border;
		
		&:after {
			content: "";
			position: absolute;
			transition: all 0.1s ease;
			left: 8px;
			top: 3px;
			width: 6px;
			height: 12px;
			border: solid var(--color-edge-highlight);
			border-width: 0 3px 3px 0;
			transform: scale(0) rotate(20deg);
		}
	}
</style>
