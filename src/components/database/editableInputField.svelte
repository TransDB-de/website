<script lang="ts">
	interface Props {
		label?: string;
		value?: string | number;
		edit?: boolean;
		number?: boolean;
		[key: string]: unknown;
	}

	let { label = "", value = $bindable<string | number>(""), edit = false, number = false, ...rest }: Props =
		$props();
</script>

<div class="editable-input-field" {...rest}>
	{label}
	{#if edit}
		{#if number}
			<input type="number" bind:value />
		{:else}
			<input type="text" bind:value />
		{/if}
	{:else}
		<span title={`${value}`}> {value ?? ""} </span>
	{/if}
</div>

<style lang="scss">
	@use "../../scss/editable-field" as *;

	.editable-input-field {
		@include editable-field(input);
	}
</style>
