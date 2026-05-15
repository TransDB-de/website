<script lang="ts">
	import type { Snippet } from "svelte";

	interface Props {
		onsubmit?: () => void;
		children?: Snippet;
		[key: string]: unknown;
	}

	let { onsubmit: onSubmitProp, children, ...rest }: Props = $props();

	let form: HTMLFormElement;

	export function reset() {
		form.reset();
	}
</script>

<form
	onsubmit={(e) => {
		e.preventDefault();
		onSubmitProp?.();
	}}
	bind:this={form}
	{...rest}
>
	{#if children}{@render children()}{/if}
</form>

<style lang="scss">
	@use "../../../scss/mixins" as *;

	form {
		display: flex;
		flex-direction: column;

		:global(div) {
			display: flex;
			justify-content: space-between;
			width: 100%;
			gap: 10px;

			@include media-mobile {
				flex-direction: column;
				gap: 0;
			}
		}

		&.inline {
			flex-direction: row;
			width: 100%;
			gap: 10px;

			@include media-mobile {
				flex-direction: column;
				gap: 0px;

				:global(button:last-child) {
					max-width: 80px;
				}
			}
		}

		&:not(.inline) {
			:global(button:last-child) {
				margin-bottom: 20px;
				align-self: center;
				min-width: 200px;

				@include media-mobile {
					min-width: 0;
				}
			}
		}

		:global(button:last-child) {
			min-width: 40px;
		}
	}
</style>
