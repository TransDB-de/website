<script lang="ts">
	import EntryCollection from "$components/entryCollection.svelte";
	import DatabaseSearch from "$components/forms/databaseSearch.svelte";
</script>

<div class="database">
	<DatabaseSearch />
	<EntryCollection type="database" />
</div>

<style lang="scss">
	@use "../../../scss/lengths" as *;
	@use "../../../scss/mixins" as *;

	.database {
		width: 100%;
		max-width: 1200px;
		display: flex;
		flex-direction: column;
		padding: 18px;
		gap: 20px;

		@include media-mobile-small {
			padding: 18px 8px;
		}
	}
</style>
