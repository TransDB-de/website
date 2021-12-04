<script lang="ts">
	import InputWrapper from "./inputWrapper.svelte"
	
	export let error = "";
	export let value: string | number | undefined;
</script>

<InputWrapper { error } for="input">
	<input bind:value on:change {...$$props} id="input" />
</InputWrapper>
