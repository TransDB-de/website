<script lang="ts">
	import MemberCard from "./memberCard.svelte"
	import members from "$content/team-members.json"
	import { shuffleArray, seed } from "$lib/utils"
	
	seed( Math.floor(Date.now() / 1000 / 60) );
</script>

<div class="team-members">
	{#each shuffleArray(members) as member, i}
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
