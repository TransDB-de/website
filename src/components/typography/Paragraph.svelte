<script lang="ts">
	import type { Snippet } from "svelte";

	interface Props {
		children: Snippet;
	}

	const props: Props = $props();
</script>

<p>
	{@render props.children()}
</p>

<style lang="scss">
	p {
		margin: 0;
		margin-left: 2px;
	}
</style>
