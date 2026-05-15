<script lang="ts">
	interface Props {
		checked: boolean;
		edit?: boolean;
		label?: string;
		class?: string;
	}

	let { checked = $bindable(false), ...props }: Props = $props();
</script>

<div class="editable-checkbox {props.class ?? ''}">
	{props.label}
	<!-- svelte-ignore a11y_label_has_associated_control -->
	<label class="checkbox" class:edit={props.edit}>
		{#if props.edit}
			<input type="checkbox" bind:checked />
		{/if}
		<span class="mark {checked ? 'selected' : ''}" class:edit={props.edit}></span>
	</label>
</div>

<style lang="scss">
	@use "../../scss/editable-field" as *;
	@use "../../scss/input" as *;

	.editable-checkbox {
		@include editable-field(input);
		position: relative;

		label {
			&.edit {
				cursor: pointer;
			}
		}

		input {
			@include hide-checkmark;
		}

		.mark {
			@include input-checkbox;

			&:not(.edit) {
				border-color: transparent;
			}

			&:before {
				content: "";
				position: absolute;
				transition: all 0.1s ease;
				left: 50%;
				top: 50%;
				width: 80%;
				height: 3px;
				background-color: var(--color-edge-error);
				transform: translate(-50%, -50%) scale(0) rotate(45deg);
			}

			&:not(.selected) {
				&:before {
					transform: translate(-50%, -50%) scale(1) rotate(-45deg);
				}

				&:after {
					transform: translate(-50%, -50%) rotate(-45deg);
					background-color: var(--color-edge-error);
					border: none;
					top: 50%;
					left: 50%;
					width: 3px;
					height: 80%;
					width: 3px;
				}
			}
		}
	}
</style>
