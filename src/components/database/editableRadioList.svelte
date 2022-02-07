<script lang="ts">
	import TagCheckbox from "$formElements/tagCheckbox.svelte"

	export let label = "";
	export let value = [];
	export let mapping: {[key: string]: string} = {};
	export let edit = false;
	
	let mappingList = [];
	$: {
		if (mapping) {
			mappingList = Object.entries(mapping);
		} else {
			mappingList = [];
		}
		
		if (value === null) {
			value = [];
		}
	}
</script>

<div class="editable-radio-list">
	{ label }
	{#if edit}
		<div class="list edit">
			{#each mappingList as [key, val]}
				<TagCheckbox value={ key } bind:group={ value } >
					{ val }
				</TagCheckbox>
			{/each}
		</div>
	{:else}
		<ul class="list show">
			{#if value}
				{#each value as val}
					<li> { mapping[val] } </li>
				{/each}
			{/if}
		</ul>
	{/if}
</div>

<style lang="scss">
	@import "../../scss/mixins";
	
	.editable-radio-list {
		display: flex;
		flex-direction: column;
		font-weight: 400;
		font-size: 0.8em;
		color: var(--color-edge-dimmed);
		
		.list {
			display: flex;
			flex-wrap: wrap;
			justify-content: flex-start;
			
			&.show {
				padding: 0;
				margin: 0;
				
				li {
					display: inline-flex;
					background-color: var(--color-surface-highlight);
					color: var(--color-edge-bright);
					
					font-size: 0.9em;
					padding: 3px 8px;
					border-radius: 4px;
					margin: 2px;
				}
			}
		}
	}
</style>
