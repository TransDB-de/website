<script lang="ts">
	export let value = "";
	export let mapping: {[key: string]: string} = {};
	export let edit = false;
	export let label = "";
</script>

<div class="editable-select-field" {...$$props}>
	{ label }
	{#if edit}
		<select bind:value={ value }>
			{#each Object.entries(mapping) as [key, val]}
				<option value={ key }> { val } </option> 
			{/each}
		</select>
	{:else}
		<span> { mapping[value] } </span>
	{/if}
</div>

<style lang="scss">
	@import "../../scss/editable-field";
	
	.editable-select-field {
		@include editable-field(select);
	}
</style>
