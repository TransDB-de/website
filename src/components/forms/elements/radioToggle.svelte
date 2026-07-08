<script lang="ts">
	import { type Icon } from "@lucide/svelte";
	import Loader from "$components/elements/loader.svelte";

	export interface RadioToggleOption {
		value: string | boolean;
		label: string;
		color?: string;
	}

	interface Props {
		label: string;
		labelColor?: string;
		icon?: typeof Icon;
		options: RadioToggleOption[];
		value?: string | boolean;
		loading?: boolean;
		onchange?: (value: string | boolean | undefined) => void | Promise<void>;
		[key: string]: unknown;
	}

	let {
		label,
		labelColor = "var(--color-edge-highlight)",
		icon,
		options,
		value = $bindable(),
		loading = $bindable(),
		onchange,
		...rest
	}: Props = $props();

	const id = $props.id();
	const groupName = id + "-toggle";

	async function handleChange() {
		const result = onchange?.(value);
		if (result instanceof Promise) {
			loading = true;
			try {
				await result;
			} finally {
				loading = false;
			}
		}
	}
</script>

<fieldset {...rest} style="--options-count: {options.length}; --label-color: {labelColor}">
	<legend>
		{#if icon}
			{@const IconComponent = icon}
			<IconComponent size={22} strokeWidth={2.5} />
		{/if}
		{label}
	</legend>
	{#if loading}
		<div class="loader-area">
			<Loader dark />
		</div>
	{:else}
		{#each options as option (option.value)}
			<label>
				<input
					type="radio"
					name={groupName}
					bind:group={value}
					value={option.value}
					onchange={handleChange}
				/>
				<span style={option.color ? `--badge-color: ${option.color}` : undefined}>
					{option.label}
				</span>
			</label>
		{/each}
	{/if}
</fieldset>

<style lang="scss">
	@use "../../../scss/input" as *;

	fieldset {
		display: grid;
		grid-template-columns: 4fr repeat(var(--options-count), 1fr);
		align-items: center;
		column-gap: 0.5rem;

		@include input-box;
		@include input-font;

		width: 100%;
		margin: 0;
		box-sizing: border-box;
		transition: 0.2s ease border;

		&:hover {
			border-color: var(--color-rim-hover);
		}

		.loader-area {
			grid-column: 2 / -1;
			display: flex;
			justify-content: flex-end;
			align-items: center;
			padding-right: 4px;
			height: 35px;
		}

		legend {
			display: flex;
			align-items: center;
			gap: 0.4rem;
			padding: 0;
			margin: 0 0.6rem 0 0;
			float: left;

			color: var(--label-color);
			font-weight: 600;
			font-size: 1rem;
		}

		label {
			cursor: pointer;

			span {
				display: flex;
				justify-content: center;
				width: 100%;
				background-color: var(--color-surface-bright);
				color: var(--color-edge);
				padding: 5px 10px;
				border-radius: 4px;
				font-size: 0.9em;
				font-family: "Poppins", sans-serif;
				font-weight: 600;
				user-select: none;
				min-height: 35px;
				transition:
					0.2s ease background-color,
					0.2s ease color;
			}

			&:hover span {
				background-color: var(--color-surface-bright-hover);
			}

			input:checked ~ span {
				background-color: var(--badge-color);
				color: var(--color-edge-bright);
			}

			&:hover input:checked ~ span,
			input:checked:hover ~ span {
				background-color: oklch(from var(--badge-color) calc(l * 0.92) c h);
			}

			input {
				@include hide-checkmark;
			}
		}
	}
</style>
