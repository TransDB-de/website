<script lang="ts">
	import ActivityCollection from "../[id]/activityCollection.svelte";
</script>

<div class="content">
	<ActivityCollection />
</div>

<style lang="scss">
	@use "../../../scss/content" as *;
	@use "../../../scss/lengths" as *;
	@use "../../../scss/mixins" as *;

	.content {
		gap: 20px;
	}

	section {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
	}
</style>
