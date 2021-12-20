<script lang="ts">
	import Loader from "$components/elements/loader.svelte"
	
	export let color: string = "";
	export let loading = false;
	export let light = false;
	export let iconOnly = false;
</script>

<button on:click class={ color } class:light class:iconOnly {...$$props}>
	{#if loading}
		<Loader dark={ light } />
	{:else}
		<slot></slot>
	{/if}
</button>

<style lang="scss">
	@import "../../scss/button";
	
	button {
		@include button;
	}
</style>
