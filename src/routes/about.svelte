<script lang="ts">
	import MemberCardCollection from "$components/memberCardCollection.svelte"
	import KofiButton from "$components/kofiButton.svelte"
	import TechStack from "$components/techStack.svelte"
	
	import DownloadIcon from "lucide-icons-svelte/download.svelte"
	
	import DonationContent from "$content/about/donation.md"
	import TechStackContent from "$content/about/tech-stack.md"
	import NonCommercial from "$content/about/non-commercial.md"
	import SocialMedia from "$content/about/social-media.md"
	import MotivationContent from "$content/about/motivation.md"
	import FlyerContent from "$content/about/flyer.md"
	
	//import externalLinks from "$content/external-links.json"
</script>

<template lang="pug">
	div.section
		h2 Das Trans*DB Team
		div.inner
			MemberCardCollection
	
	div.section
		h2 Motivation
		div.inner
			MotivationContent
	
	div.section
		h2 Social Media
		div.inner
			SocialMedia
	
	div.section
		h2 Nicht-Kommerziell
		div.inner
			NonCommercial
	
	div.section
		h2 Unser Tech-Stack
		div.inner
			TechStackContent
			TechStack
			
	div.section
		h2 Der offizielle Trans*DB Flyer
		div.inner
			FlyerContent
			div.row
				img(src="/img/transdb_flyer_preview_front.png")
				img(src="/img/transdb_flyer_preview_back.png")
			
			a.light(href="/files/transdb_flyer_a6.pdf" download title="A6 (PDF)")
				DownloadIcon
				| Flyer herunterladen
			a.light(href="/files/transdb_flyer_print.pdf" download title="Druckversion mit Abschnittrand und Farbprofil (PDF)")
				DownloadIcon
				| Profi-Druckdaten
	
	//div.section
	//	h2 Unterstütze uns mit einer Spende
	//	div.inner
	//		DonationContent
	//		KofiButton(href="{externalLinks.donation}")
</template>

<style lang="scss">
	@import "../scss/lengths";
	@import "../scss/shadows";
	@import "../scss/button";
	
	.section {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 65px 12px;
		width: 100%;
		
		:global(p) {
			line-height: 1.4em;
			font-size: 1.1em;
			text-align: left;
			font-weight: 500;
			
			margin: 0 0 1.3em 0;
			
			&:last-child {
				margin-bottom: 0;
			}
		}
		
		:global(h2) {
			text-align: center;
			font-size: 1.8em;
			margin: 0 0 0.6em 0;
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
			
			.row {
				display: flex;
				flex-wrap: wrap;
				gap: 1.3em;
				margin: 0 0 1.3em 0;
			
				img {
					max-height: 400px;
					border-radius: 4px;
					box-shadow: $surface-shadow-small;
				}
			}
			
			:global(p) {
				text-align: center;
			}
			
			:global(a) {
				color: var(--color-edge-highlight);
				text-decoration: none;
				border-bottom: 2px solid var(--color-edge-highlight);
			}
			
			a[download] {
				@include button;
				margin-bottom: 10px;
				
				&:last-child {
					margin-bottom: 0;
				}
			}
		}
	}
</style>
