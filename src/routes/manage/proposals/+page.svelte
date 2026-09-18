<script lang="ts">
	import ChangeProposalCollection from "../[id]/changeProposalCollection.svelte";
</script>

<div class="content">
	<ChangeProposalCollection />
</div>

<style lang="scss">
	@use "../../../scss/content" as *;
	@use "../../../scss/lengths" as *;
	@use "../../../scss/mixins" as *;

	.content {
		gap: 20px;
	}
</style>
