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
		<span class="mark { checked ? "selected" : "false" }" class:edit></span>
	</label>
</div>

<style lang="scss">
	@import "../../scss/editable-field";
	@import "../../scss/input";
	
	.editable-checkbox {
		@include editable-field(input);
		position: relative;
		
		label {
			&.edit {
				cursor: pointer;
			}
		}
		
		input {
			@include hide-checkmark;
		}
		
		.mark {
			@include input-checkbox;
			
			&:not(.edit) {
				border-color: transparent;
			}
			
			&:edit() {
				transform: unset !important;
			}
		}
	}
	
</style>
