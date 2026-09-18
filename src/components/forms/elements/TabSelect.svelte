<script lang="ts">
	import type { Icon } from "@lucide/svelte";

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
	@use "../../../scss/mixins" as *;

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

		@include input-font;

		padding: 2px 8px;

		gap: 5px;

		font-weight: 600;
		color: color-mix(in srgb, var(--color-edge) 84%, transparent);

		transition:
			0.12s ease background-color,
			0.12s ease color;

		&:hover {
			background-color: var(--color-surface-bright);
			color: var(--color-edge);
		}

		border-radius: 4px;

		&:has(input:checked) {
			border-color: var(--color-edge);
			color: var(--color-edge);
			background-color: var(--color-surface-bright);

			&::after {
				opacity: 1 !important;
				width: calc(100% - 20px);
			}
		}

		position: relative;
		justify-content: center;

		&:after {
			position: absolute;
			display: inline-block;
			height: 0;
			width: 50%;
			bottom: -6px;
			border-radius: 32px;
			border: 2px solid var(--color-surface-highlight);
			content: "";
			opacity: 0;

			transition:
				0.2s ease width,
				0.2s ease opacity;
		}
	}

	input {
		position: absolute;
		width: 1px;
		height: 1px;
		opacity: 0;
		pointer-events: none;
	}
</style>
