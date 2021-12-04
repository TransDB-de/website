<button on:click>
	<slot />
</button>

<style lang="scss">
	button {
		background: none;
		border: none;
		cursor: pointer;
		padding: 0;
		color: var(--color-edge-faded);
		transition: 0.2s color;
		
		&:hover {
			color: var(--color-edge);
		}
		
		:global(.lucide) {
			width: 1.8em;
			height: 1.8em;
		}
	}
</style>