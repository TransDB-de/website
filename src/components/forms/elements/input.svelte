<script module lang="ts">
	let uid = 0;
</script>

<script lang="ts">
	import InputWrapper from "./inputWrapper.svelte";

	interface Props {
		error?: string;
		value?: string | number | null;
		type?: string;
		label: string | null;
		required?: boolean;
		[key: string]: unknown;
	}

	let {
		error = "",
		value = $bindable<string | number | null | undefined>(),
		type = "",
		label,
		required,
		...rest
	}: Props = $props();

	uid += 1;
	const id = "input" + uid;

	// An emptied input means null
	function normalize(input: string | number | null) {
		value = input === "" ? null : input;
	}
</script>

<InputWrapper {error} for={id} {label} {required}>
	{#if type == "number"}
		<input bind:value={() => value ?? "", normalize} type="number" {required} {...rest} {id} />
	{:else}
		<input bind:value={() => value ?? "", normalize} {type} {...rest} {id} />
	{/if}
</InputWrapper>
