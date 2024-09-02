<script lang="ts" context="module">
	import { writable } from "svelte/store";
	let uid = writable<number>(0);
</script>

<script lang="ts">
	import InputWrapper from "./inputWrapper.svelte";

	export let error = "";
	export let value: string | number | undefined;
	export let type = "";

	$uid += 1;
	let id = "input" + $uid;
</script>

<InputWrapper {error} for={id}>
	{#if type == "number"}
		<input bind:value on:change on:focus on:blur type="number" {...$$props} {id} />
	{:else}
		<input bind:value on:change on:focus on:blur {...$$props} {id} />
	{/if}
</InputWrapper>
