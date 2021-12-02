<script lang="ts">
	import InputWrapper from "./inputWrapper.svelte"
	
	export let error = "";
	export let value: string | number | undefined;
</script>

<InputWrapper { error }>
	<input bind:value {...$$props} />
</InputWrapper>
