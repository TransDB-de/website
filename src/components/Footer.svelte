<script lang="ts">
	import GitHubBrandIcon from "$components/icons/GitHubBrandIcon.svelte"
	import InstagramBrandIcon from "$components/icons/InstagramBrandIcon.svelte"
	import DiscordBrandIcon from "$components/icons/DiscordBrandIcon.svelte"

	import externalLinks from "$content/externalLinks.json"
</script>

<div class="footer">
	
	<div>
		<a href="/imprint">Impressum</a>
		<a href="/privacy">Datenschutz</a>
		<a href="/about">Über uns</a>
	</div>
	
	<div>
		<a href={externalLinks.social.github} target="_blank" rel="noopener" class="github low">
			<GitHubBrandIcon />
		</a>
		<a href={externalLinks.social.instagram} target="_blank" rel="noopener" class="instagram low">
			<InstagramBrandIcon />
		</a>
		<a href={externalLinks.social.discord} target="_blank" rel="noopener" class="discord low">
			<DiscordBrandIcon />
		</a>
	</div>
	
</div>

<style lang="scss">	
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
	
	a {
		font-size: 1.1em;
		color: var(--color-edge);
		margin: 0 10px;
		display: inline-flex;
		justify-content: center;
		text-decoration: none;
		font-weight: 500;
		position: relative;
		text-align: center;
		border: none;
		
		&:after {
			transition: 0.2s ease width, 0.2s ease opacity;
			display: inline-block;
			width: 0;
			content: "";
			opacity: 0;
			border-bottom-width: 2px;
			border-bottom-style: solid;
			border-color: var(--color-edge);
			position: absolute;
			bottom: -2px;
		}
		
		&:hover:after{
			width: 100%!important;
			opacity: 1;
		}
		
		&.low:after {
			bottom: -6px;
		}
		
		&.github {
			color: var(--color-brand-gh);
			
			&:after {
				border-color: var(--color-brand-gh);
			}
		}
		
		&.instagram {
			color: var(--color-brand-ig);
			
			&:after {
				border-color: var(--color-brand-ig);
			}
		}

		&.discord {
			color: var(--color-brand-discord);

			&:after {
				border-color: var(--color-brand-discord);
			}
		}
		
		:global(svg) {
			height: 30px;
			width: 30px;
			fill: currentColor;
		}
	}
</style>