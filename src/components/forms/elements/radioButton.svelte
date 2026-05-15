<script lang="ts">
	import type { Snippet } from "svelte";

	interface Props {
		value?: string;
		group?: string;
		children?: Snippet;
		[key: string]: unknown;
	}

	let { value = "", group = $bindable(""), children, ...rest }: Props = $props();

	function onChange(event: Event) {
		const target = event.target as HTMLInputElement;
		const { value: val, checked } = target;
		if (checked) {
			group = val;
		}
	}
</script>

<label {...rest}>
	<input type="radio" bind:value checked={group === value} onchange={onChange} />
	<span>
		{#if children}{@render children()}{/if}
	</span>
</label>

<style lang="scss">
	@use "../../../scss/shadows" as *;

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

		&:hover,
		input:hover ~ & {
			padding: 5px 2px 5px 12px;
		}

		input:checked ~ & {
			padding: 5px 2px 5px 12px;
			color: var(--color-edge-highlight);
			border-left: 3px solid var(--color-edge-highlight);
			font-weight: 500;
		}
	}

	input {
		opacity: 0;
		position: absolute;
		cursor: pointer;
	}
</style>
