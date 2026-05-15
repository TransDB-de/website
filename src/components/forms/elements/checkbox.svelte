<script lang="ts">
	import type { Snippet } from "svelte";

	interface Props {
		group?: string[];
		value?: string;
		checked?: boolean;
		single?: boolean;
		children?: Snippet;
		[key: string]: unknown;
	}

	let {
		group = $bindable<string[]>([]),
		value = "",
		checked = $bindable(false),
		single = false,
		children,
		...rest
	}: Props = $props();

	/*
	 * Group bindings on custom components with checkboxes has to be done manually
	 * https://github.com/sveltejs/svelte/issues/2308
	 */
	function onChange(event: Event) {
		if (single) return;

		const target = event.target as HTMLInputElement;
		const { value: val, checked: isChecked } = target;
		if (isChecked) {
			group = [...group, val];
		} else {
			group = group.filter((item: string) => item !== val);
		}
	}
</script>

<label class="checkbox-container">
	{#if children}{@render children()}{/if}
	<input type="checkbox" {...rest} {value} bind:checked onchange={onChange} />
	<span class="checkmark"></span>
</label>

<style lang="scss">
	@use "../../../scss/input" as *;

	label {
		display: flex;
		align-items: center;
		position: relative;
		margin-bottom: 15px;
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
