<script module lang="ts">
	import { writable } from "svelte/store";

	const visible = writable<boolean>(false);
	const text = writable<string>("");
	const confirmed = writable<boolean | null>(false);

	export async function confirm(message: string): Promise<boolean> {
		visible.set(true);
		text.set(message);

		let resolve: (value: boolean) => void;
		let promise = new Promise<boolean>((res) => {
			resolve = res;
		});

		let listen = false;
		confirmed.set(null);

		let unsubscribe = confirmed.subscribe((_confirmed) => {
			if (listen && _confirmed !== null) {
				resolve(_confirmed);
			}
		});

		listen = true;

		let result = await promise;

		unsubscribe();
		visible.set(false);

		return result;
	}
</script>

<script lang="ts">
	import Button from "$components/elements/button.svelte";
</script>

<div class="modal-container {$visible ? 'visible' : ''}">
	<div class="modal">
		<h2>{$text}</h2>
		<div>
			<Button onclick={() => ($confirmed = true)}>Ja</Button>
			<Button color="red" onclick={() => ($confirmed = false)}>Nein</Button>
		</div>
	</div>
</div>

<style lang="scss">
	@use "../scss/shadows" as *;

	.modal-container {
		display: flex;
		align-items: center;
		justify-content: center;
		position: fixed;
		top: 0;
		height: 100%;
		width: 100%;
		background-color: rgba(0, 0, 0, 0.2);
		-webkit-backdrop-filter: blur(5px);
		backdrop-filter: blur(5px);
		visibility: hidden;
		opacity: 0;
		transition:
			visibility 0s linear 0.2s,
			opacity 0.2s;

		&.visible {
			visibility: visible;
			opacity: 1;
			transition: opacity 0.2s;
		}

		.modal {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			padding: 20px;
			border-radius: 4px;
			background-color: var(--color-background);
			box-shadow: $surface-shadow-soft;
			max-width: 500px;

			h2 {
				font-weight: 500;
				margin: 0 0 20px 0;
				text-align: center;
			}

			div {
				display: flex;
				gap: 20px;
			}
		}
	}
</style>
