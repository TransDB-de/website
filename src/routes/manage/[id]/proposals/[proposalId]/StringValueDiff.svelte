<script lang="ts">
	interface Props {
		label: string;
		before?: string | null;
		after?: string | null;
	}

	const props: Props = $props();

	const hasChanged = $derived.by(() => props.before !== props.after);

	const isEmpty = $derived(!props.before && !props.after);
</script>

<div>
	<dt>
		{props.label}
	</dt>
	<dd class:empty={isEmpty}>
		{#if hasChanged}
			{#if props.before}
				<del>
					{props.before}
				</del>
			{/if}

			{#if props.after}
				<ins>
					{props.after}
				</ins>
			{/if}
		{:else}
			<span>{props.before ?? "--"}</span>
		{/if}
	</dd>
</div>

<style lang="scss">
	@use "../../../../../scss/colors" as *;

	div {
		display: block;
	}

	dt {
		font-weight: 500;
		font-size: 1rem;
	}

	dd {
		margin: 0;
		display: flex;
		gap: 0.2rem;

		&.empty {
			span {
				opacity: 0.65;
			}
		}

		del {
			color: var(--color-edge-error);
			font-weight: 500;
		}

		ins {
			color: var(--color-edge-success);
			font-weight: 500;
			text-decoration: none;
		}
	}
</style>
