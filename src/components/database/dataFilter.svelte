<script lang="ts">
	import Button from "$components/elements/button.svelte"
	
	let suggestions: string[] = [];
	let focused = false;
	let input = "";
	
	let dropdownVisible = false;
	$: dropdownVisible = suggestions.length > 0 && focused
</script>

<div class="text-filter">
	
	<div class="autocomplete">
		
		<input type="text">
		
		<ul class="dropdown" class:dropdownVisible>
			{#each suggestions as suggestion}
				<li>
					<span class="input"> { input } </span>
					<span class="suggestion"> { suggestion } </span>
				</li>
			{/each}
		</ul>
		
	</div>
	
	<Button> Filtern </Button>
	
</div>

<style lang="scss">
	.text-filter {
		display: grid;
		grid-template-columns: 1fr auto;
		
		.autocomplete {
			position: relative;
			width: 100%;
		}
		
		:global(button) {
			margin-left: 16px;
		}
	}
	
</style>
