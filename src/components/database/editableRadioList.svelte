<script lang="ts">
	import TagCheckbox from "$formElements/tagCheckbox.svelte"

	export let label = "";
	export let value = [];
	export let mapping: {[key: string]: string} = {};
	export let edit = false;
</script>

<div class="editable-radio-list">
	{ label }
	{#if edit}
		<div class="list edit">
			{#each Object.entries(mapping) as [key, val]}
				<TagCheckbox value={ key } bind:group={ value } >
					{ val }
				</TagCheckbox>
			{/each}
		</div>
	{:else}
		<ul class="list show">
			{#each value as val}
				<li> { mapping[val] } </li>
			{/each}
		</ul>
	{/if}
</div>

<style lang="scss">
	@import "../../scss/mixins";
	
	.editable-radio-list {
		font-weight: 400;
		font-size: 0.9em;
		color: var(--color-edge-dimmed);
		display: flex;
		flex-direction: column;
		
		.list {
			display: flex;
			flex-wrap: wrap;
			justify-content: flex-start;
			
			&.show {
				padding: 0;
				
				li {
					display: inline-block;
					background-color: var(--color-surface-highlight);
					color: var(--color-edge);
					
					padding: 3px 8px;
					border-radius: 4px;
					margin: 2px;
				}
			}
		}
	}
</style>
