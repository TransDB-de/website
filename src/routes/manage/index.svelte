<script lang="ts">
	import EntryCollection from "$components/entryCollection.svelte"
</script>

<div>
	<EntryCollection type="unapproved"/>
</div>

<style lang="scss">
	@import "../../scss/lengths";
	
	div {
		display: flex;
		flex-direction: column;
		max-width: $conent-max-width;
		width: 100%;
		padding: 20px 10px;
	}
</style>
