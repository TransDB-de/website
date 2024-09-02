<script lang="ts">
	import DatabaseFilter from "$components/database/databaseFilter.svelte";
	import EntryCollection from "$components/entryCollection.svelte";
</script>

<div>
	<DatabaseFilter />
	<EntryCollection type="blocklist" />
</div>

<style lang="scss">
	@import "../../scss/lengths";

	div {
		display: flex;
		flex-direction: column;
		gap: 20px;
		max-width: $conent-max-width;
		width: 100%;
		padding: 18px 10px;
	}
</style>
