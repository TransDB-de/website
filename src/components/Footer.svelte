<script lang="ts">
	import GitHubBrandIcon from "$components/icons/GitHubBrandIcon.svelte"
	import InstagramBrandIcon from "$components/icons/InstagramBrandIcon.svelte"
	
	import externalLinks from "$content/externalLinks.json"
</script>

<div class="footer">
	
	<div>
		<a href="/imprint">Impressum</a>
		<a href="/pricavy">Datenschutz</a>
		<a href="https://github.com/TransDB-de" target="_blank">GitHub</a>
	</div>
	
	<div>
		<a href={externalLinks.social.github} target="_blank" rel="noopener" class="github low">
			<GitHubBrandIcon />
		</a>
		<a href={externalLinks.social.instagram} target="_blank" rel="noopener" class="instagram low">
			<InstagramBrandIcon />
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
		
		&:after {
			transition: 0.2s ease width, 0.2s ease opacity;
			display: inline-block;
			width: 0;
			content: "";
			opacity: 0;
			border-bottom: 2px solid var(--color-edge);
			position: absolute;
			bottom: -2px;
		}
		
		&:hover:after{
			width: 100%!important;
			opacity: 1;
		}
		
		&.low:after {
			bottom: -8px;
		}
		
		&.github {
			color: var(--color-brand-gh);
			
			&:after {
				border-bottom: 3px solid var(--color-brand-gh);
			}
		}
		
		&.instagram {
			color: var(--color-brand-ig);
			
			&:after {
				border-bottom: 3px solid var(--color-brand-ig);
			}
		}
		
		:global(svg) {
			height: 35px;
			width: 35px;
			fill: currentColor;
		}
	}
</style>