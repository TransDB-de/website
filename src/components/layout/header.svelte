<script lang="ts">
	import { goto } from "$app/navigation";
	import { browser } from "$app/environment";
	import { page } from "$app/stores";
	import NavLink from "$components/elements/navLink.svelte";
	import MenuIcon from "$components/icons/menuIcon.svelte";
	import SearchBar from "$components/searchBar.svelte";
	import { token } from "$lib/store";
	import { t } from "$lib/localization";

	let expand = $state(false);
	let navbar: HTMLElement | undefined = $state();
	let scrollY = $state(0);
	let component: HTMLElement | undefined = $state();

	let opacity = $derived.by(() => {
		if (browser && component && navbar) {
			const frac = scrollY / (component.scrollHeight - navbar.scrollHeight);
			const _opacity = Math.max(1 - frac, 0);
			return _opacity.toFixed(2);
		}
		return "1.0";
	});

	let collapsed = $derived.by(() => {
		if (browser && component && navbar) {
			return scrollY / (component.scrollHeight - navbar.scrollHeight) > 1;
		}
		return false;
	});

	const hiddenRoutes = ["/manage", "/submit", "/imprint", "/privacy", "/login"];
	let hide = $derived(Boolean(hiddenRoutes.find((e) => $page.url.pathname.startsWith(e))));

	function toggleNav() {
		expand = !expand;
	}
</script>

<svelte:window bind:scrollY />

<div class="header" class:hide bind:this={component}>
	<div class="navbar" class:expand class:collapsed bind:this={navbar}>
		<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
		<h1 class="title-mobile" onclick={() => goto("/")}>TransDB.de</h1>

		<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
		<nav onclick={toggleNav}>
			<NavLink href="/" exact={true}>{t("header.homepage")}</NavLink>
			<NavLink href="/search">{t("header.search")}</NavLink>
			<NavLink href="/faq">FAQ</NavLink>
			{#if $token}
				<NavLink href="/manage">Management</NavLink>
			{/if}
			<NavLink href="/submit">{t("header.newEntry")}</NavLink>
		</nav>

		<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
		<span onclick={toggleNav} class="mobileNav">
			<MenuIcon {expand} />
		</span>
	</div>

	<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
	<h1 class="title" onclick={() => goto("/search")} style="--opacity: {opacity}">Trans*DB</h1>

	<h2 class="subtitle" style="--opacity: {opacity}">{t("header.subtitle")}</h2>

	<SearchBar style="--opacity: {opacity}" />
</div>

<style lang="scss">
	@use "../../scss/shadows" as *;
	@use "../../scss/lengths" as *;
	@use "../../scss/mixins" as *;

	$background-img-width: 1625px;
	$header-height-expanded: 325px;
	$header-height-collapsed: 56px;

	.header {
		display: flex;
		flex-direction: column;
		align-items: center;
		z-index: 2;
		padding: 40px 0 0 0;
		height: $header-height-expanded;
		width: 100%;
		overflow: hidden;
		box-shadow: $rim-shadow-medium;
		transition:
			0.4s ease height,
			0s ease box-shadow;
		font-family: "Poppins", sans-serif;

		h1 {
			padding-right: 0 !important;
		}

		&:after {
			top: 0;
			left: 0;
			width: 100%;
			height: 56px;
			position: fixed;
			content: " ";
			z-index: 1;
		}

		&,
		&:after {
			background-image: var(--banner-overlay), var(--banner-gradient);
			background-position: top left;
			background-attachment: fixed;
			background-size:
				calc(min(200vw, $background-img-width)) auto,
				calc(min(200vw, $background-img-width));
		}

		@include media-min-width($background-img-width) {
			&,
			&:after {
				background-position: top;
				background-size:
					auto 325px,
					cover;
			}
		}

		&.hide {
			height: 56px;
			transition:
				0.4s ease height,
				0.8s ease box-shadow 0.2s;
			box-shadow: $no-shadow;

			& .title,
			& .subtitle {
				opacity: 0 !important;
				margin: 0;
				padding: 0;
			}

			& :global(.search-bar) {
				opacity: 0 !important;
				margin: 0;
				padding: 0;
			}
		}

		.title,
		.subtitle,
		:global(.search-bar) {
			transition: 0.1s ease-out all;
		}

		.title {
			color: #fff;
			font-size: 56px;
			font-weight: 700;
			text-shadow: $edge-shaodw-large;
			margin: 20px 0;
			cursor: pointer;
			user-select: none;
			opacity: var(--opacity);
		}

		.subtitle {
			margin: 0 0 40px;
			color: white;
			text-shadow: $edge-sahdow-medium;
			text-align: center;
			opacity: var(--opacity);

			@include media-mobile {
				display: none;
			}
		}

		:global(.search-bar) {
			opacity: var(--opacity);
		}

		@include media-mobile {
			height: 250px;
		}

		& > :global(*) {
			z-index: 10;
		}
	}

	.navbar {
		z-index: 100;
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		min-height: 56px;
		color: white;
		text-shadow: $edge-shadow-small;
		position: fixed;
		top: 0;
		transition: 0s ease box-shadow;

		&.collapsed {
			box-shadow: $rim-shadow-medium;
		}

		.header.hide & {
			@keyframes show-shadow {
				0% {
					box-shadow: $no-shadow;
				}
				100% {
					box-shadow: $rim-shadow-medium;
				}
			}
			box-shadow: $no-shadow;
			animation-name: show-shadow;
			animation-duration: 0.8s;
			animation-delay: 0.2s;
			animation-timing-function: ease;
			animation-fill-mode: forwards;
		}

		.title-mobile {
			margin: 0;
			font-size: 24px;
			padding-left: 10px;
			cursor: pointer;
		}

		nav {
			display: flex;
		}

		@include media-mobile {
			&.expand {
				background-color: var(--color-surface-highlight-active) !important;
				z-index: 100;
			}

			nav {
				opacity: 0;
				width: 0;
				height: 0;
				overflow: hidden;
			}

			&.expand nav {
				position: absolute;
				align-items: center;
				width: 100%;
				height: auto;
				opacity: 1;
				top: 53px;
				left: 0;
				display: flex;
				flex-direction: column;
				background-color: var(--color-surface-highlight-active);
				z-index: 100;

				:global(.nav-link) {
					font-size: 24px;
					padding: 5px;
				}
			}
		}
	}

	.mobileNav {
		display: none;

		@include media-mobile {
			display: flex;
			padding: 0 10px;
			align-items: center;
			cursor: pointer;
		}
	}
</style>
