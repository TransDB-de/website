<script lang="ts">
	interface TabOption {
		value: unknown;
		label: string;
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
			{option.label}
		</label>
	{/each}
</fieldset>

<style lang="scss">
	@use "../../../scss/shadows" as *;
	@use "../../../scss/input" as *;

	fieldset {
		display: flex;
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
