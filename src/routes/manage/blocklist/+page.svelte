<script lang="ts">
	import EntryCollection from "$components/entryCollection.svelte";
</script>

<div>
	<EntryCollection type="blocklist" />
</div>

<style lang="scss">
	@use "../../../scss/lengths" as *;

	div {
		display: flex;
		flex-direction: column;
		gap: 20px;
		max-width: $conent-max-width;
		width: 100%;
		padding: 18px 10px;
	}
</style>
