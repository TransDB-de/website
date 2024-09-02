<script lang="ts" context="module">
	import { writable } from "svelte/store";
	let uid = writable<number>(0);
</script>

<script lang="ts">
	import InputWrapper from "./inputWrapper.svelte";

	export let error = "";
	export let value: string = "";
	export let maxlength: number = 1200;

	$uid += 1;
	let id = "select" + $uid;
</script>

<InputWrapper {error} for={id}>
	<textarea rows="4" bind:value on:change {maxlength} {...$$props} {id}></textarea>
	{#if value.length > maxlength - 50}
		<span> {value.length} / {maxlength} </span>
	{/if}
</InputWrapper>

<style lang="scss">
	textarea {
		resize: vertical;
	}

	span {
		position: absolute;
		right: 5px;
		bottom: -20px;
		color: var(--color-edge-error);
		font-size: 12px;
		font-weight: 600;
	}
</style>
