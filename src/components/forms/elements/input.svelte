<script module lang="ts">
	let uid = 0;
</script>

<script lang="ts">
	import InputWrapper from "./inputWrapper.svelte";

	interface Props {
		error?: string;
		value?: string | number;
		type?: string;
		[key: string]: unknown;
	}

	let {
		error = "",
		value = $bindable<string | number | undefined>(),
		type = "",
		...rest
	}: Props = $props();

	uid += 1;
	const id = "input" + uid;
</script>

<InputWrapper {error} for={id}>
	{#if type == "number"}
		<input bind:value type="number" {...rest} {id} />
	{:else}
		<input bind:value {type} {...rest} {id} />
	{/if}
</InputWrapper>
