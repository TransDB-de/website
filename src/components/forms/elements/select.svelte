<script lang="ts" context="module">
	import { writable } from "svelte/store";
	let uid = writable<number>(0);
</script>

<script lang="ts">
	import InputWrapper from "./inputWrapper.svelte";
	import ChevronDownIcon from "lucide-icons-svelte/chevronDown.svelte";

	export let error = "";
	export let value = "";

	let customClass = "";
	export { customClass as class };

	$uid += 1;
	let id = "select" + $uid;
</script>

<InputWrapper {error} class={customClass} for={id}>
	<select bind:value {...$$props} on:change {id}>
		<slot></slot>
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
