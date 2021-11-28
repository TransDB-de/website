<script lang="ts">
	import { goto } from '$app/navigation'
	import { page } from "$app/stores"
	
	export let hide = false;
	export let mobileExpand = false;
	export let collapsed = false;
	
	let title;
	let subtitle;
	let searchbar;
	
	$: active = $page.path.startsWith($$props.href);
	$: activeExact = $page.path === $$props.href;
	
	// toggles toe mobile nav menu
	function toggleNav() { mobileExpand = !mobileExpand }
</script>

<div class="header" class:hide>
	<div class="navbar" class:mobileExpand class:collapsed>
		<h1 class="title-mobile" on:click={() => goto("/")} > TransDB.de </h1>
		
		<nav on:click={toggleNav}>
			<a href="/" class:activeExact>Startseit</a>
			<a href="/search" class:active>Suche</a>
			<a href="/manage" class:active>Management</a>
			<a href="/submit" class:active>Neuer Eintrag</a>
		</nav>
		
		<span on:click={toggleNav} class="mobileNav">
			<!--MenuIcon class:mobileExpand-->
		</span>
	</div>
	
	<h1 class="title" bind:this={title} on:click={() => goto("/")}>Trans*DB</h1>
	
	<h2 class="subtitle" bind:this={subtitle}>Die Suchmaschine für trans* relevante Angebote</h2>
	
	<!--SearchBar class="searchbar" bind:this={searchbar} placeholder="Suche nach Postleitzahl oder Ort" mobilePlaceholder="Suche nach PLZ oder Ort" on:search={search}></SearchBar-->
	
</div>

<style lang="scss">
	@import "../scss/shadows";
	@import "../scss/lengths";
	
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
		
		box-shadow: $rim-shadow-regular;
		transition: 0.4s ease opacity, 0.4s ease height, 0s ease box-shadow;
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
		
		@media only screen and (min-width: $background-img-width) {
			&, &:after {
				background-position: top;
				background-size: auto 325px, cover;
			}
		}
		
		&.hide {
			height: 56px;
			transition: 0.4s ease opacity, 0.4s ease height, 0.8s ease box-shadow 0.2s;
			box-shadow: $no-shadow;
			
			& .title, & .subtitle, & .search-bar {
				opacity: 0!important;
				margin: 0;
				padding: 0;
			}
		}
		
		.title, .subtitle, .search-bar {
			transition: 0.3s ease-out all;
		}
		
		.title {
			color: #fff;
			font-size: 56px;
			text-shadow: $edge-shaodw-large;
			margin: 20px 0;
			cursor: pointer;
			user-select: none;
		}
		
		.subtitle {
			margin: 0 0 40px;
			color: white;
			text-shadow: $edge-sahdow-medium;
			text-align: center;
		}
		
		/** make all children of header appear in front of background */
		& > * {
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
			box-shadow: $rim-shadow-regular;
		}
		
		.header.hide & {
			@keyframes show-shadow {
				0% {
					box-shadow: 0 0 5px rgba(0, 0, 0, 0), 0 0 10px rgba(0, 0, 0, 0), 0 0 20px rgba(0, 0, 0, 0);
				}
				100% {
					box-shadow: 0 0 4px var(--color-text-shadow-strong), 0 0 8px var(--color-box-shadow-rim), 0 0 16px var(--color-box-shadow-glow);
				}
			}
			
			box-shadow: 0 0 5px rgba(0, 0, 0, 0), 0 0 10px rgba(0, 0, 0, 0), 0 0 20px rgba(0, 0, 0, 0);
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
			
			a {
				color: var(--color-edge-bright);
				display: flex;
				justify-content: center;
				align-items: center;
				text-decoration: none;
				font-weight: 500;
				font-size: 20px;
				margin: 10px 10px;
				position: relative;
				cursor: pointer;
				
				&:after {
					transition: 0.2s ease width, 0.2s ease opacity;
					display: inline-block;
					width: 0;
					content: "";
					opacity: 0;
					border-bottom: 3px solid var(--color-nav-link);
					box-shadow: 0.2px 0.5px 2px var(--color-box-shadow-strong), 0.5px 1.5px 4px var(--color-box-shadow-rim), 0 0 8px var(--color-box-shadow-glow);
					position: absolute;
					bottom: 0;
				}
				
				&:hover:after {
					width: 100%!important;
					opacity: 1;
				}
				
				&.activeExact:after, &.active:after {
					opacity: 1;
					width: 70%;
				}
			}
		}
	}
	
</style>
