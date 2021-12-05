<script lang="ts">
	import Section1 from "$content/index/section-1.md"
	import Section2 from "$content/index/section-2.md"
	import Section3 from "$content/index/section-3.md"
	
	import SkylineLeft from "$assets/skyline_left.svg"
	import SkylineRight from "$assets/skyline_right.svg"
	import ContributeLarge from "$assets/contribute_large.svg"
	import ContributeSmall from "$assets/contribute_small.svg"
	import Heart from "$assets/heart.svg"
	
	import Button from "$components/elements/button.svelte"
</script>

<svelte:head>
	<title>Trans*DB</title>
	<meta name="description" content="Eine öffentliche Liste und Suchmaschine für trans*relevante medizinische Leistungen und Communityangebote. Finde Arztpersonen, TherapeutInnen oder andere Anlaufstellen.">
</svelte:head>


<template lang="pug">
div.homepage
	div.section.one
		div.content
			Section1
			
		div.skyline
			// svelte-ignore a11y-missing-attribute
			img.left(src!="{SkylineLeft}")
			// svelte-ignore a11y-missing-attribute
			img.right(src!="{SkylineRight}")
	
	div.stripe
		a.submit(href="/submit")
			Button Einen neuen Eintrag einreichen
		
		div.section.two
			h2 Wie kann ich helfen?
			
			img.contribute.large(src!="{ContributeLarge}" alt="Mehrere Hände beschriften einen Papierbogen")
			img.contribute.small(src!="{ContributeSmall}" alt="Mehrere Hände beschriften einen Papierbogen")
			
			div.content
				Section2
	
	div.section.three
		h2 Vielen Dank!
		div.content
			Section3
		
		img.heart(src!="{Heart}" alt="Ein Herz in den Farben der Trans-Pride Flagge")
</template>


<style lang="scss">
	@import "../scss/lengths";
	@import "../scss/mixins";
	@import "../scss/shadows";
	
	.homepage {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		
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
			margin: 1.2em 0;
		}
	}
	
	.section {
		position: relative;
		padding: 45px 12px;
		width: 100%;
		
		max-width: 1100px;
		
		pointer-events: none;
		
		&:not(.one) {
			display: grid;
			column-gap: 48px;
			align-items: center;
		}
	}
	
	$skyline-height: 256px;
	
	.section.one {
		display: flex;
		align-items: center;
		flex-direction: column;
		
		:global(p) {
			text-align: center;
			max-width: 580px;
		}
		
		.skyline {
			display: block;
			z-index: -1;
			
			position: relative;
			margin-top: -158px;
			
			height: $skyline-height;
			width: 100%;
			
			img {
				position: absolute;
				height: 100%;
				
				&.left {
					left: 0;
				}
				
				&.right {
					right: 0;
				}
			}
			
			@include media-max-width(950px) {
				height: calc( min($skyline-height, calc(50vw - 24px)));
				margin-top: 0;
			}
		}
	}
	
	.stripe {
		width: 100%;
		background-color: var(--color-background-bright);
		
		display: flex;
		flex-direction: column;
		align-items: center;
		
		position: relative;
		
		.submit {
			text-decoration: none;
			position: absolute;
			top: -17.188px;
			
			:global(button) {
				font-weight: 900;
				font-size: 18px;
				height: 45px;
				text-shadow: $rim-shadow-soft;
				background: var(--submit-button-gradient);
			}
		}
	}
	
	.section.two {
		grid-template-columns: 2fr 3fr;
		grid-template-areas: "h2  h2 "
		                     "img txt";
		
		:global(h2) {
			grid-area: h2;
		}
		
		.contribute {
			grid-area: img;
			
			&.small {
				display: none;
			}
		}
		
		.content {
			grid-area: txt;
			width: 100%;
		}
		
		@include media-mobile {
			grid-template-columns: 100%;
			grid-template-areas: "h2"
			                     "img"
			                     "txt";
			
			.content {
				display: flex;
				flex-direction: column;
				align-items: center;
				padding-top: 1em;
			}
			
			:global(p) {
				text-align: center;
				max-width: 540px;
			}
			
			.contribute {
				&.large{
					display: none;
				}
				
				&.small {
					display:block;
				}
			}
		}
	}
	
	
	.section.three {
		grid-template-columns: 3fr 2fr;
		grid-template-areas: "h2  h2 "
		                     "txt img";
		
		:global(h2) {
			grid-area: h2;
		}
		
		.heart {
			grid-area: img;
		}
		
		.content {
			grid-area: txt;
		}
		
		@include media-mobile {
			grid-template-columns: 100%;
			grid-template-areas: "h2"
			                     "img"
			                     "txt";
			
			justify-items: center;
			
			.heart {
				max-height: 320px;
			}
			
			.content {
				display: flex;
				flex-direction: column;
				align-items: center;
				padding-top: 1em;
			}
			
			:global(p) {
				text-align: center;
			}
		}
	}
</style>
