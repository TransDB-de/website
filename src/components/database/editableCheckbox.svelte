<script lang="ts">
	export let checked = false;
	export let edit = false;
	export let label = "";
</script>

<div class="editable-checkbox" {...$$props}>
	{ label }
	<!-- svelte-ignore a11y-label-has-associated-control -->
	<label class="checkbox" class:edit>
		{#if edit}
			<input type="checkbox" bind:checked={ checked } />
		{/if}
		<div class="mark { checked ? "selected" : "false" }"></div>
	</label>
</div>

<style lang="scss">
	@import "../../scss/editable-field";
	
	.editable-checkbox {
		@include editable-field(input);
	}
	
</style>
