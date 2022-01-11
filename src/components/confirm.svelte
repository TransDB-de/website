<script lang="ts" context="module">	
	import { writable } from "svelte/store"
	
	let visible = writable<boolean>(false);
	let text = writable<string>("");
	let confirmed = writable<boolean>(false);
	
	export async function confirm(message: string): Promise<boolean> {
		visible.set(true);
		text.set(message);
		
		// saves resolve function to trigger it later
		let resolve: (boolean) => void;
		let promise = new Promise<boolean>((res) => { resolve = res });
		
		// ignore inital store call
		let listen = false;
		// null 'confirmed', so we can listen to both 'true' and 'false'
		confirmed.set(null);
		
		let unsubsribe = confirmed.subscribe((_confirmed) => {
			if (listen) {
				// resolve promise with user input
				resolve(_confirmed);
			}
		});
		
		// start listening to changes in 'confirmed'
		listen = true;
		
		// await user input
		let result = await promise;
		
		// remove subscription and fade out
		unsubsribe();
		visible.set(false);
		
		return result;
	}
</script>

<script lang="ts">
	import Button from "$components/elements/button.svelte"
</script>

<div class="modal-container { $visible ? 'visible' : '' }">
	<div class="modal">
		
		<h2> { $text } </h2>
		
		<div>
			<Button on:click={ () => $confirmed = true } >
				Ja
			</Button>
			
			<Button color="red" on:click={ () => $confirmed = false } >
				Nein
			</Button>
		</div>
		
	</div>
</div>

<style lang="scss">
	@import "../scss/shadows";
	
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
		transition: visibility 0s linear 0.2s, opacity 0.2s;
		
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
