<script lang="ts">
	import type { Snippet } from "svelte";

	interface Props {
		children: Snippet;
	}

	const props: Props = $props();
</script>

<blockquote>
	{@render props.children()}
</blockquote>

<style lang="scss">
	blockquote {
		background-color: var(--color-background-dimmed);
		font-weight: 500;
		padding: 10px 35px;
		margin: 0;
		border-radius: 4px;
		position: relative;

		&::before {
			position: absolute;
			left: 10px;
			top: 8px;
			font-size: 2rem;
			opacity: 0.65;
			content: "🙷";
		}
	}
</style>
