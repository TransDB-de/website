<script lang="ts">
	export let name: string = "";
	export let title: string = "";
	export let image: string = "";
</script>

<div class="member-card">
	<img src={image} alt="team member picture" />
	<h3>{name}</h3>
	<h4>{title}</h4>
</div>

<style lang="scss">
	@import "../scss/shadows";
	
	.member-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 20px;
		width: 210px;
		user-select: none;
		
		img {
			height: 100px;
			width: 100px;
			border-radius: 4px;
			box-shadow: $surface-shadow-small;
			margin-bottom: 10px;
		}
		
		h3 {
			margin: 0;
		}
		
		h4 {
			margin: 0;
			color: var(--color-edge-dimmed);
			font-weight: 500;
			font-size: 0.8em;
		}
	}
</style>