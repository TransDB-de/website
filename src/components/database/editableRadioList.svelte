<script lang="ts">
	import TagCheckbox from "$formElements/tagCheckbox.svelte";

	interface Props {
		label?: string;
		value?: string[];
		mapping?: { [key: string]: string };
		edit?: boolean;
	}

	let { value = $bindable<string[]>([]), ...props }: Props = $props();

	let mappingList = $derived(props.mapping ? Object.entries(props.mapping) : []);
</script>

<div class="editable-radio-list">
	{props.label}
	{#if props.edit}
		<div class="list edit">
			{#each mappingList as [key, val]}
				<TagCheckbox value={key} bind:group={value}>
					{val}
				</TagCheckbox>
			{/each}
		</div>
	{:else}
		<ul class="list show">
			{#if value}
				{#each value as val}
					{#if props.mapping && val in props.mapping}
						<li>{props.mapping[val]}</li>
					{/if}
				{/each}
			{/if}
		</ul>
	{/if}
</div>

<style lang="scss">
	@use "../../scss/mixins" as *;

	.editable-radio-list {
		display: flex;
		flex-direction: column;
		font-weight: 400;
		font-size: 0.8em;
		color: var(--color-edge-dimmed);

		.list {
			display: flex;
			flex-wrap: wrap;
			justify-content: flex-start;

			&.show {
				padding: 0;
				margin: 0;

				li {
					display: inline-flex;
					background-color: var(--color-surface-highlight);
					color: var(--color-edge-bright);

					font-size: 0.9em;
					padding: 3px 8px;
					border-radius: 4px;
					margin: 2px;
				}
			}
		}
	}
</style>
