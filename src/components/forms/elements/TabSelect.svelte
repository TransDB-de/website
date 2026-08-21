<script lang="ts">
	import type { Icon } from "@lucide/svelte";
	import type { Snippet } from "svelte";

	interface TabOption {
		value: unknown;
		label: string;
		icon?: typeof Icon;
	}

	interface Props {
		options: TabOption[];
		value: unknown;
		name?: string;
	}

	let { options, value = $bindable(), name }: Props = $props();

	let groupName = $derived(name ?? `tabs-${Math.random().toString(36).slice(2, 9)}`);
</script>

<fieldset>
	{#each options as option (option.value)}
		<label>
			<input type="radio" name={groupName} value={option.value} bind:group={value} />
			<option.icon size="20" strokeWidth="2.5" />
			{option.label}
		</label>
	{/each}
</fieldset>

<style lang="scss">
	@use "../../../scss/shadows" as *;
	@use "../../../scss/input" as *;

	fieldset {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		border: none;
		padding: 0;
	}

	label {
		position: relative;
		display: flex;
		align-items: center;
		cursor: pointer;

		@include input-box;
		@include input-font;

		padding: 2px 8px;

		gap: 5px;

		font-weight: 600;
		color: color-mix(in srgb, var(--color-edge) 80%, transparent);

		&:has(input:checked) {
			border-color: var(--color-edge);
			color: var(--color-edge);
		}
	}

	label:has(input:focus-visible) {
		outline: 2px solid var(--color-edge-highlight);
		outline-offset: 2px;
	}

	input {
		position: absolute;
		width: 1px;
		height: 1px;
		opacity: 0;
		pointer-events: none;

		&:focus-visible + label {
			outline: 2px solid var(--color-edge-highlight);
			outline-offset: 2px;
		}
	}
</style>
