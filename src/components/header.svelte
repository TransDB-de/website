<script lang="ts">
	import { goto } from "$app/navigation"
	import NavLink from "./navLink.svelte"
	import MenuIcon from "$components/icons/menuIcon.svelte"
	import SearchBar from "$components/searchBar.svelte"
	import { browser } from "$app/env"
	import { page } from "$app/stores"
	
	let mobileExpand = false;
	let navbar;
	
	let windowY: number;
	let opacity = "1.0";
	let component;
	let collapsed = false;
	
	const hiddenRoutes = [
		"/manage",
		"/submit",
		"/imprint",
		"/privacy"
	];
	
	let hide = false;
	$: hide = Boolean(hiddenRoutes.find( (e) => 
		$page.path.startsWith(e)
	));
	
	$: {
		if (browser && component) {
			let frac = (windowY / (component.scrollHeight - navbar.scrollHeight));
			
			let _opacity = (1 - frac);
			_opacity = _opacity > 0 ? _opacity: 0;
			
			opacity = _opacity.toFixed(2);
			collapsed = frac > 1;
		}
	}
	
	// toggles toe mobile nav menu
	function toggleNav() { mobileExpand = !mobileExpand }
</script>

<svelte:window bind:scrollY={windowY}/>

<div class="header" class:hide bind:this={ component } style="--opacity: {opacity}">
	<div class="navbar {mobileExpand ? 'expand' : ''}" class:collapsed bind:this={ navbar } >
		<h1 class="title-mobile" on:click={() => goto("/")} > TransDB.de </h1>
		
		<nav on:click={toggleNav}>
			<NavLink href="/" exact={true}>Startseite</NavLink>
			<NavLink href="/search">Suche</NavLink>
			<NavLink href="/manage">Management</NavLink>
			<NavLink href="/submit">Neuer Eintrag</NavLink>
		</nav>
		
		<span on:click={toggleNav} class="mobileNav">
			<MenuIcon expand={ mobileExpand } />
		</span>
	</div>
	
	<h1 class="title" on:click={() => goto("/")}>Trans*DB</h1>
	
	<h2 class="subtitle">Die Suchmaschine für trans* relevante Angebote</h2>
	
	<SearchBar />
	
</div>

<style lang="scss">
	@import "../scss/shadows";
	@import "../scss/lengths";
	@import "../scss/mixins";
	
	$background-img-width: 1625px;
	$header-height-expanded: 325px;
	$header-height-collapsed: 56px;
	
	
	.header {
		display: flex;
		flex-direction: column;
		align-items: center;
		
		padding: 40px 0 0 0;
		height: $header-height-expanded;
		width: 100%;
		overflow: hidden;
		
		box-shadow: $rim-shadow-medium;
		transition: 0.4s ease height, 0s ease box-shadow;
		font-family: "Poppins", sans-serif;
		
		&:after {
			top: 0;
			left: 0;
			width: 100%;
			height: 56px;
			position: fixed;
			content: " ";
			z-index: 1;
		}
		
		&, &:after {
			background-image: var(--banner-overlay), var(--banner-gradient);
			background-position: top left;
			background-attachment: fixed;
			background-size: calc(min(200vw, $background-img-width)) auto, calc(min(200vw, $background-img-width));
		}
		
		@include media-min-width($background-img-width) {
			&, &:after {
				background-position: top;
				background-size: auto 325px, cover;
			}
		}
		
		&.hide {
			height: 56px;
			transition:  0.4s ease height, 0.8s ease box-shadow 0.2s;
			box-shadow: $no-shadow;
			
			& .title, & .subtitle, :global(& .search-bar) {
				opacity: 0!important;
				margin: 0;
				padding: 0;
			}
		}
		
		.title, .subtitle, :global(.search-bar) {
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
		
		/** make all children of header appear in front of background */
		& > :global(*) {
			z-index: 10;
		}
	}
	
	.navbar {
		/** z-index higher than other children of .header, for mouse event priority */
		z-index: 100;
		
		display: flex;
		justify-content: space-between;
		width: 100%;
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
			padding: 10px;
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
