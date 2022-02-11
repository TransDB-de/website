<script lang="ts" context="module">
	import { writable } from "svelte/store"
	let uid = writable<number>(0);
</script>

<script lang="ts">
	import InputWrapper from "./inputWrapper.svelte"
	
	export let error = "";
	export let value: string | number | undefined;
	
	$uid += 1;
	let id = "input" + $uid;
</script>

<InputWrapper { error } for={ id }>
	<input bind:value on:change {...$$props} id={ id } />
</InputWrapper>
