<script lang="ts">
	import DatabaseFilter from "$components/database/databaseFilter.svelte"
	import DatabaseHelpAndDownload from "$components/database/databaseHelpAndDownload.svelte"
	import EntryCollection from "$components/entryCollection.svelte"
</script>

<div class="database">
	<DatabaseFilter />
	<DatabaseHelpAndDownload />
	<EntryCollection type="database" />
</div>

<style lang="scss">
	@import "../../scss/lengths";
	@import "../../scss/mixins";
	
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
