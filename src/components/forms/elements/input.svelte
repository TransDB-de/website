<script module lang="ts">
	let uid = 0;
</script>

<script lang="ts">
	import InputWrapper from "./inputWrapper.svelte";

	interface Props {
		error?: string;
		value?: string | number;
		type?: string;
		label: string | null;
		[key: string]: unknown;
	}

	let {
		error = "",
		value = $bindable<string | number | undefined>(),
		type = "",
		label,
		...rest
	}: Props = $props();

	uid += 1;
	const id = "input" + uid;
</script>

<InputWrapper {error} for={id} {label}>
	{#if type == "number"}
		<input bind:value type="number" {...rest} {id} />
	{:else}
		<input bind:value {type} {...rest} {id} />
	{/if}
</InputWrapper>
