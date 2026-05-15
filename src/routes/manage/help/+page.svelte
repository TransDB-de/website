<script lang="ts">
	import type { PageData } from "./$types";

	interface Props {
		data: PageData;
	}

	const props: Props = $props();
</script>

<div class="content">
	<props.data.DatabaseHelp />
</div>

<style lang="scss">
	@use "../../../scss/content" as *;
</style>
