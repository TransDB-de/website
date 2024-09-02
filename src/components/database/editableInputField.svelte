<script lang="ts">
	export let label = "";
	export let value: string | number = "";
	export let edit = false;
	export let number = false;
</script>

<div class="editable-input-field" {...$$props}>
	{label}
	{#if edit}
		{#if number}
			<input type="number" bind:value />
		{:else}
			<input type="text" bind:value />
		{/if}
	{:else}
		<span title={`${value}`}> {value ?? ""} </span>
	{/if}
</div>

<style lang="scss">
	@import "../../scss/editable-field";

	.editable-input-field {
		@include editable-field(input);
	}
</style>
