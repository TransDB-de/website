<script lang="ts">
	let form: HTMLFormElement;

	import { createEventDispatcher } from "svelte";

	const dispatch = createEventDispatcher();

	export function reset() {
		form.reset();
	}

	export function handleSubmit(e) {
		dispatch("submit");
	}
</script>

<form on:submit|preventDefault={handleSubmit} bind:this={form} {...$$props}>
	<slot></slot>
</form>

<style lang="scss">
	@import "../../../scss/mixins";

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
