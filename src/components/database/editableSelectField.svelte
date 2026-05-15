<script lang="ts">
	interface Props {
		value?: string;
		mapping?: { [key: string]: string };
		edit?: boolean;
		label?: string;
		nullMapping?: string;
		[key: string]: unknown;
	}

	let {
		value = $bindable(""),
		mapping = {} as { [key: string]: string },
		edit = false,
		label = "",
		nullMapping = "",
		...rest
	}: Props = $props();
</script>

<div class="editable-select-field" {...rest}>
	{label}
	{#if edit}
		<select bind:value>
			{#if nullMapping !== ""}
				<option value={null}> {nullMapping} </option>
			{/if}

			{#each Object.entries(mapping) as [key, val]}
				<option value={key}> {val} </option>
			{/each}
		</select>
	{:else}
		<span> {mapping[value] ?? ""} </span>
	{/if}
</div>

<style lang="scss">
	@use "../../scss/editable-field" as *;

	.editable-select-field {
		@include editable-field(select);

		select {
			background-color: var(--color-background-bright);
			padding: 0;
		}
	}
</style>
