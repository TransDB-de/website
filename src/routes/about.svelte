<script lang="ts" context="module">
	import { loadContents } from "$lib/loadContents";
	
	export async function load() {
		const props = await loadContents({
			name: "DonationContent",
			path: "about/donation"
		}, {
			name: "TechStackContent",
			path: "about/tech-stack"
		}, {
			name: "NonCommercial",
			path: "about/non-commercial"
		}, {
			name: "SocialMedia",
			path: "about/social-media"
		}, {
			name: "MotivationContent",
			path: "about/motivation"
		}, {
			name: "FlyerContent",
			path: "about/flyer"
		});
		
		return { props };
	}
</script>

<script lang="ts">
	import MemberCardCollection from "$components/memberCardCollection.svelte"
	import OpenCollectiveButton from "$components/openCollectiveButton.svelte"
	import TechStack from "$components/techStack.svelte"
	
	import DownloadIcon from "lucide-icons-svelte/download.svelte"
	
	export let DonationContent;
	export let TechStackContent;
	export let NonCommercial;
	export let SocialMedia;
	export let MotivationContent;
	export let FlyerContent;
	
	import externalLinks from "$content/external-links.json"

	import { t } from "$lib/localization"
</script>

<svelte:head>
	<title>{ t("about.title") }</title>
	<meta name="description" content={ t("about.meta.description") }>
</svelte:head>

<template lang="pug">
	div.section
		h2 { t("about.team") }
		div.inner
			MemberCardCollection
	
	div.section
		h2 { t("about.donation") }
		div.inner
			DonationContent
			OpenCollectiveButton(href="{externalLinks.donation}")
	
	div.section
		h2 Motivation
		div.inner
			MotivationContent
	
	div.section
		h2 Social Media
		div.inner
			SocialMedia
	
	div.section
		h2 Non-Profit
		div.inner
			NonCommercial
	
	div.section
		h2 { t("about.techStack") }
		div.inner
			TechStackContent
			TechStack
			
	div.section
		h2 { t("about.flyer") }
		div.inner
			FlyerContent
			div.flyer-preview
				img(src="/img/transdb_flyer_preview_front.png" alt="Flyer vorne")
				img(src="/img/transdb_flyer_preview_back.png" alt="Flyer hinten")
			
			a.light(href="/files/transdb_flyer_a6.pdf" download title="A6 (PDF)")
				DownloadIcon
				| { t("about.downloadFlyer") }
			a.light(href="/files/transdb_flyer_print.pdf" download title="Druckversion mit Abschnittrand und Farbprofil (PDF)")
				DownloadIcon
				| { t("about.downloadFlyerProfessional") }
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
			
			.flyer-preview {
				display: grid;
				grid-template-columns: 1fr 1fr;
				gap: 18px;
				max-width: 100%;
				margin-bottom: 18px;
				
				img {
					display: block;
					max-height: 400px;
					max-width: 100%;
					
					border-radius: 4px;
					box-shadow: $surface-shadow-small;
				}
			}
			
			:global(p) {
				text-align: center;
			}
			
			:global(a:not([class])) {
				color: var(--color-edge-highlight);
				text-decoration: none;
				border-bottom: 2px solid var(--color-edge-highlight);
			}
			
			a[download] {
				@include button;
				margin-bottom: 10px;
				text-decoration: none;
				
				&:last-child {
					margin-bottom: 0;
				}
			}
		}
	}
</style>
