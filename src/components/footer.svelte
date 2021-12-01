<script lang="ts">
	import GitHubBrandIcon from "$components/icons/gitHubBrandIcon.svelte"
	import InstagramBrandIcon from "$components/icons/instagramBrandIcon.svelte"
	import DiscordBrandIcon from "$components/icons/discordBrandIcon.svelte"

	import externalLinks from "$content/external-links.json"
</script>

<div class="footer">
	
	<div>
		<a href="/imprint">Impressum</a>
		<a href="/privacy">Datenschutz</a>
		<a href="/about">Über uns</a>
		<a href="/faq">FAQ</a>
	</div>
	
	<div>
		<a href={externalLinks.social.instagram} target="_blank" rel="noopener" class="instagram low" title="Folge uns auf Instagram">
			<InstagramBrandIcon />
		</a>
		<a href={externalLinks.social.github} target="_blank" rel="noopener" class="github low" title="Besuche uns auf GitHub">
			<GitHubBrandIcon />
		</a>
		<a href={externalLinks.social.discord} target="_blank" rel="noopener" class="discord low" title="Trete unserem Discord Server bei">
			<DiscordBrandIcon />
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
		}
	}
	
	@include media-mobile {
		.footer {
			flex-direction: column;
			gap: 20px;
			
			div {
				flex-wrap: wrap;
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
		
		&.low:after {
			bottom: -6px;
		}
		
		:global(svg) {
			height: 30px;
			width: 30px;
			fill: currentColor;
		}
	}
</style>
