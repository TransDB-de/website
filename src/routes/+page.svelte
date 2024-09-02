<script lang="ts" context="module">
	throw new Error("@migration task: Check code was safely removed (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292722)");

	// import { loadContents } from "$lib/loadContents";
	// 
	// export async function load() {
	// 	const props = await loadContents({
	// 		name: "Section1",
	// 		path: "index/section-1"
	// 	}, {
	// 		name: "Section2",
	// 		path: "index/section-2"
	// 	}, {
	// 		name: "Section3",
	// 		path: "index/section-3"
	// 	});
	// 	
	// 	return { props };
	// }
</script>

<script lang="ts">
	throw new Error("@migration task: Add data prop (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292707)");

	import SkylineLeft from "$assets/skyline_left.svg"
	import SkylineRight from "$assets/skyline_right.svg"
	import ContributeLarge from "$assets/contribute_large.svg"
	import ContributeSmall from "$assets/contribute_small.svg"
	import Heart from "$assets/heart.svg"
	
	import Button from "$components/elements/button.svelte"
	import OpenCollectiveButton from "$components/openCollectiveButton.svelte"
	
	import externalLinks from "$content/external-links.json"
	import { onMount } from "svelte"
	
	import { t } from "$lib/localization"
	
	export let Section1;
	export let Section2;
	export let Section3;
</script>

<svelte:head>
	<title>Trans*DB</title>
	<meta name="description" content={ t("index.description") }>
</svelte:head>

<div class="homepage">
	<div class="section one">
		<div class="conent">
			<svelte:component this={Section1} />
		</div>
		
		<div class="skyline">
			<img class="left" src={SkylineLeft} role="presentation" alt="" />
			<img class="right" src={SkylineRight} role="presentation" alt="" />
		</div>
	</div>
	
	<div class="stripe">
		<a class="submit" href="/submit">
			<Button>{ t("index.addNewEntry") }</Button>
		</a>

		<div class="section two">
			<h2>{ t("index.howToHelp") }</h2>

			<img class="contribute large" src={ContributeLarge} alt={ t("altTexts.contribute") } />
			<img class="contribute small" src={ContributeSmall} alt={ t("altTexts.contribute") } />
			
			<div class="content">
				<svelte:component this={Section2} />
			</div>
		</div>
	</div>
	
	<div class="section three">
		<h2>{ t("index.thankYou") }</h2>
		
		<div class="content">
			<svelte:component this={Section3} />
		</div>
		
		<img class="heart" src={Heart} alt={ t("altTexts.heart") } />
		
		<div class="donation">
			<OpenCollectiveButton href={externalLinks.donation}/>
		</div>
	</div>
</div>

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
			margin: 0.5em 0 1em;
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
		                     "txt img"
		                     "don don";
		
		:global(h2) {
			grid-area: h2;
		}
		
		.heart {
			grid-area: img;
		}
		
		.content {
			grid-area: txt;
		}
		
		.donation {
			grid-area: don;
			display: flex;
			flex-direction: column;
			align-items: center;
			pointer-events: all;
		}
		
		@include media-mobile {
			grid-template-columns: 100%;
			grid-template-areas: "h2"
			                     "img"
			                     "txt"
			                     "don";
			
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
