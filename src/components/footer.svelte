<script lang="ts">
	import GitHubBrandIcon from "$brandIcons/gitHubBrandIcon.svelte"
	import InstagramBrandIcon from "$brandIcons/instagramBrandIcon.svelte"
	import DiscordBrandIcon from "$brandIcons/discordBrandIcon.svelte"
	import KofiBrandIcon from "$brandIcons/kofiBrandIcon.svelte"
	
	import externalLinks from "$content/external-links.json"
</script>

<div class="footer">
	
	<div>
		<a href="/imprint">Impressum</a>
		<a href="/privacy">Datenschutz</a>
		<a href="/about">Über uns</a>
		<a href="/faq">FAQ</a>
	</div>
	
	<div class="low-hover-bar">
		<a href={externalLinks.social.instagram} target="_blank" rel="noopener" title="Folge uns auf Instagram">
			<InstagramBrandIcon />
		</a>
		<a href={externalLinks.social.github} target="_blank" rel="noopener" title="Besuche uns auf GitHub">
			<GitHubBrandIcon />
		</a>
		<a href={externalLinks.social.discord} target="_blank" rel="noopener" class="l-icon" title="Trete unserem Discord Server bei">
			<DiscordBrandIcon />
		</a>
		<a href={externalLinks.donation} target="_blank" rel="noopener" class="xl-icon" title="Unterstütze uns auf Ko-fi">
			<KofiBrandIcon />
		</a>
	</div>
	
</div>

<style lang="scss">	
	@import "../scss/mixins";
	
	.footer {
		display: flex;
		justify-content: space-around;
		padding: 20px;
		margin-top: auto;
		background-color: var(--color-background-dimmed);
		width: 100%;
		text-align: center;
		
		div {
			display: flex;
			flex-direction: row;
			align-items: center;
			gap: 10px;
			
			&.low-hover-bar {
				a:after {
					bottom: -6px;
				}
			}
		}
	}
	
	@include media-mobile {
		.footer {
			flex-direction: column;
			gap: 20px;
			
			div {
				flex-wrap: wrap;
				
				&:first-child {
					flex-wrap: wrap;
					justify-content: center;
				}
				
				&:last-child {
					justify-content: center;
				}
			}
		}
	}
	
	@include media-mobile-small {
		div {
			&:first-child {
				flex-direction: column;
			}
		}
	}
	
	a {
		font-size: 1.1em;
		color: var(--color-edge);
		margin: 0 10px;
		display: inline-flex;
		justify-content: center;
		text-decoration: none;
		font-weight: 500;
		text-align: center;
		border: none;
		
		@include underline(
			$height: 2px,
			$offset: -2px,
			$color: var(--color-edge)
		);
		
		&:hover:after{
			width: 100%!important;
			opacity: 1;
		}
		
		&.l-icon {
			:global(svg) {
				height: 35px;
				width: 35px;
			}
		}
		
		&.xl-icon {
			:global(svg) {
				height: 38px;
				width: 38px;
			}
		}
		
		:global(svg) {
			height: 30px;
			width: 30px;
			fill: currentColor;
		}
	}
</style>
