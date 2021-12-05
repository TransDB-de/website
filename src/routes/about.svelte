<script lang="ts">
	import MemberCardCollection from "$components/memberCardCollection.svelte"
	import KofiButton from "$components/kofiButton.svelte"
	import TechStack from "$components/techStack.svelte"
	
	import DonationContent from "$content/about/donation.md"
	import TechStackContent from "$content/about/tech-stack.md"
	
	import externalLinks from "$content/external-links.json"
</script>

<template lang="pug">
	div.section
		h2 Das Trans*DB Team
		div.inner
			MemberCardCollection
		
	div.section
		h2 Social Media
		div.inner
		
	div.section
		h2 Nicht-Kommerziell
		p.inner
		
	div.section
		h2 Unser Tech-Stack
		div.inner
			TechStackContent
			TechStack
		
	div.section
		h2 Unterstütze uns mit einer Spende
		div.inner
			DonationContent
			KofiButton(href="{externalLinks.donation}")
</template>

<style lang="scss">
	@import "../scss/lengths";
	
	.section {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 65px 12px;
		width: 100%;
		//pointer-events: none;
		
		:global(p) {
			line-height: 1.4em;
			font-size: 1.17em;
			text-align: left;
			font-weight: 500;
			
			margin-top: 0;
		}
		
		:global(h2) {
			text-align: center;
			font-size: 1.8em;
			margin: 0 0 1.2em 0;
		}
		
		&:nth-child(2n) {
			background-color: var(--color-background-bright);
		}
		
		.inner {
			width: 100%;
			max-width: 1100px;
			display: flex;
			flex-direction: column;
			align-items: center;
			
			:global(p) {
				text-align: center;
			}
		}
	}
	
	:global(#kofiframe) {
		border:none;
		height: 560px;
		width:100%;
		background: white;
	}
</style>
