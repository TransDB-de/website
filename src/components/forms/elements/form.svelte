<script lang="ts">
	let form: HTMLFormElement;
	
	export function reset() {
		form.reset();
	}
</script>

<form on:submit|preventDefault bind:this={form}>
	<slot />
</form>

<style lang="scss">
	@import "../../../scss/mixins";
	
	form {
		display: flex;
		flex-direction: column;
		
		&.inline {
			flex-direction: row;
			flex-wrap: wrap;
		}
		
		:global(div) {
			display: flex;
			justify-content: space-between;
			width: 100%;
			gap: 10px;
			
			@include media-mobile {
				flex-direction: column;
				gap: 0;
			}
		}
		
		:global(button:last-child) {
			margin-bottom: 20px;
		}
	}
</style>
