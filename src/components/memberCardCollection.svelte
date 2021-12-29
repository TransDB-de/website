<script lang="ts">
	import MemberCard from "./memberCard.svelte"
	
	import members from "$content/about/team-members.json"
</script>

<div class="team-members">
	{#each members as member}
		<MemberCard name={member.name} title={member.title} image={member.imageURL} socials={member.socials} />
	{/each}
</div>

<style lang="scss">
	.team-members {
		width: 100%;
		display: grid;
		align-items: stretch;
		justify-items: center;
		grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
	}
</style>
