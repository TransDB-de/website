<script lang="ts">
	import InputWrapper from "./inputWrapper.svelte";
	import ChevronDownIcon from "lucide-icons-svelte/chevronDown.svelte";
	
	export let error = "";
	export let value = "";
</script>

<InputWrapper {error}>
	<select bind:value {...$$props} on:change>
		<slot />
	</select>
	<ChevronDownIcon />
</InputWrapper>

<style lang="scss">
	select {
		-moz-appearance: none;
		-webkit-appearance: none;
		cursor: pointer;
		padding-right: 28px;
	}
	
	select ~ :global(.lucide) {
		position: absolute;
		color: var(--color-edge-dimmed);
		pointer-events: none;
		right: 5px;
		width: 24px;
	}
</style>