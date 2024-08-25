<script lang="ts">
	import GitHubBrandIcon from "$brandIcons/gitHubBrandIcon.svelte"
	import InstagramBrandIcon from "$brandIcons/instagramBrandIcon.svelte"
	import DiscordBrandIcon from "$brandIcons/discordBrandIcon.svelte"
	import OpenCollectiveBrandIcon from "$brandIcons/openCollectiveIcon.svelte"
	
	import externalLinks from "$content/external-links.json"
	
	import NavLink from "$components/elements/navLink.svelte"
	
	import * as ackee from "$lib/ackee"
	import config from "$lib/config"
	import { t } from "$lib/localization"
    import LocaleSwitcher from "$components/localeSwitcher.svelte";
	
	const linkOptions = {
		lineHeight: "2px",
		lineOffset: "-2px",
		shadow: false,
		color: "var(--color-edge)"
	}
	
	function linkClicked(event: MouseEvent) {
		ackee.logEvent(config.ackee_eventId_social, (event.currentTarget as HTMLLinkElement).href);
	}
</script>

<footer>
	
	<section>
		<LocaleSwitcher />
	</section>

	<nav>
		<NavLink {...linkOptions} href="/imprint">{ t("footer.imprint") }</NavLink>
		<NavLink {...linkOptions} href="/privacy">{ t("footer.privacy") }</NavLink>
		<NavLink {...linkOptions} href="/about">{ t("footer.aboutUs") }</NavLink>
		<NavLink {...linkOptions} href="/faq">FAQ</NavLink>
	</nav>
	
	<section>
		<a href={externalLinks.social.instagram} target="_blank" rel="noopener" title={ t("footer.instagramPlaceholder") } on:click={ linkClicked }>
			<InstagramBrandIcon />
		</a>
		<a href={externalLinks.social.github} target="_blank" rel="noopener" title={ t("footer.githubPlaceholder") } on:click={ linkClicked }>
			<GitHubBrandIcon />
		</a>
		<a href={externalLinks.social.discord} target="_blank" rel="noopener" class="l-icon" title={ t("footer.discordPlaceholder") } on:click={ linkClicked }>
			<DiscordBrandIcon />
		</a>
		<a href={externalLinks.donation} target="_blank" rel="noopener" title={ t("footer.openCollectivePlaceholder") }>
			<OpenCollectiveBrandIcon />
		</a>
	</section>
	
</footer>

<style lang="scss">
	@import "../../scss/mixins";
	
	footer {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		padding: 20px;
		margin-top: auto;
		background-color: var(--color-background-dimmed);
		width: 100%;
		text-align: center;
		
		nav, section {
			display: flex;
			flex-direction: row;
			align-items: center;
			gap: 10px;
		}

		nav {
			justify-content: center;
		}

		section {
			a:after {
				bottom: -6px;
			}

			&:last-child {
				justify-content: end;
			}
		}
	}
	
	@include media-mobile {
		footer {
			grid-template-columns: 1fr;
			gap: 20px;
			
			section, nav {
				justify-content: center;

				&:last-child {
					justify-content: center;
				}
			}

			nav {
				flex-wrap: wrap;
			}
		}
	}
	
	@include media-mobile-small {
		footer {
			nav {
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
		
		:global(svg) {
			height: 30px;
			width: 30px;
			fill: currentColor;
		}
	}
</style>
