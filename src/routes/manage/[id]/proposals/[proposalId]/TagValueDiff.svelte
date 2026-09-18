<script lang="ts">
	import Tag from "$components/elements/tag.svelte";

	interface Props {
		before?: string[] | null;
		after?: string[] | null;
	}

	const props: Props = $props();

	type DiffEntry = {
		value: string;
		type: "added" | "removed" | "unchanged";
	};

	function diffArrays(before: string[], after: string[]): DiffEntry[] {
		const remainingAfter = [...after];
		const result: DiffEntry[] = [];

		for (const value of before) {
			const index = remainingAfter.indexOf(value);
			if (index === -1) {
				result.push({ value, type: "removed" });
			} else {
				result.push({ value, type: "unchanged" });
				remainingAfter.splice(index, 1);
			}
		}

		for (const value of remainingAfter) {
			result.push({ value, type: "added" });
		}

		return result;
	}

	const values = $derived.by(() => diffArrays(props.before ?? [], props.after ?? []));
</script>

<section>
	{#if values.length}
		{#each values as value}
			<Tag data-type={value.type}>{value.value}</Tag>
		{/each}
	{:else}
		<span>---</span>
	{/if}
</section>

<style lang="scss">
	@use "../../../../../scss/colors" as *;

	section {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		align-items: center;

		:global([data-type="added"]) {
			background-color: var(--color-special-highlight);
		}

		:global([data-type="removed"]) {
			background-color: var(--color-special-error);
		}
	}
</style>
