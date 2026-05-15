<script module lang="ts">
	let uid = 0;
</script>

<script lang="ts">
	import InputWrapper from "./inputWrapper.svelte";

	interface Props {
		error?: string;
		value?: string;
		maxlength?: number;
		[key: string]: unknown;
	}

	let { error = "", value = $bindable(""), maxlength = 1200, ...rest }: Props = $props();

	uid += 1;
	const id = "textarea" + uid;
</script>

<InputWrapper {error} for={id}>
	<textarea rows="4" bind:value {maxlength} {...rest} {id}></textarea>
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
