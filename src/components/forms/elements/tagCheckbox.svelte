<script lang="ts">
	import type { Snippet } from "svelte";

	interface Props {
		value?: string;
		group?: string[];
		children?: Snippet;
		[key: string]: unknown;
	}

	let { value = "", group = $bindable<string[]>([]), children, ...rest }: Props = $props();

	function onChange(event: Event) {
		const target = event.target as HTMLInputElement;
		const { value: val, checked } = target;
		if (checked) {
			group = [...group, val];
		} else {
			group = group.filter((item: string) => item !== val);
		}
	}
</script>

<label {...rest}>
	<input type="checkbox" {value} checked={group.includes(value)} onchange={onChange} />
	<span>
		{#if children}{@render children()}{/if}
	</span>
</label>

<style lang="scss">
	@use "../../../scss/mixins" as *;

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
