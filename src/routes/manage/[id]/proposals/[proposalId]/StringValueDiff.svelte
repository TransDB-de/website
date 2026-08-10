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
				<span class="before">
					{props.before}
				</span>
			{/if}

			{#if props.after}
				<span class="after">
					{props.after}
				</span>
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

		span.before {
			color: var(--color-edge-error);
			font-weight: 500;
		}

		span.after {
			color: var(--color-edge-success);
			font-weight: 500;
		}
	}
</style>
